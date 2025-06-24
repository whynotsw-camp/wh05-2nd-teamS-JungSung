import type { VercelRequest, VercelResponse } from '@vercel/node';
import { google } from 'googleapis';
import formidable from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const form = formidable({ multiples: false });
  const { files } = await new Promise<{ files: formidable.Files }>((resolve, reject) => {
    form.parse(req, (err, _fields, files) => {
      if (err) reject(err);
      else resolve({ files });
    });
  });

  const file = Array.isArray(files.file) ? files.file[0] : files.file;
  if (!file) {
    res.status(400).json({ error: 'No file uploaded' });
    return;
  }

  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_CLIENT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/drive']
  });
  const drive = google.drive({ version: 'v3', auth });

  const driveRes = await drive.files.create({
    requestBody: {
      name: file.originalFilename || 'audio',
      parents: [process.env.GOOGLE_DRIVE_FOLDER_ID as string],
    },
    media: {
      mimeType: file.mimetype || 'audio/wav',
      body: fs.createReadStream((file as any).filepath || (file as any).path),
    },
    fields: 'id',
  });

  const fileId = driveRes.data.id;

  const audioBuffer = fs.readFileSync((file as any).filepath || (file as any).path);
  const hfRes = await fetch(
    'https://api-inference.huggingface.co/models/o0dimplz0o/Whisper-Large-v3-turbo-STT-Zeroth-KO-v2',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.HF_API_KEY}`,
        'Content-Type': 'audio/wav',
      },
      body: audioBuffer,
    }
  );

  const hfJson = await hfRes.json();
  const transcript = hfJson.text || '';

  res.status(200).json({ transcript, fileId });
}