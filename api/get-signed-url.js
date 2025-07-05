import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ detail: 'Method Not Allowed' });
  }

  try {
    const { filePath } = req.body;
    if (!filePath) {
      return res.status(400).json({ detail: "filePath가 필요합니다." });
    }

    const { data, error } = await supabaseAdmin.storage
      .from('audio-bucket')
      .createSignedUrl(filePath, 60);

    if (error) {
      throw error;
    }

    res.status(200).json({ signedUrl: data.signedUrl });
  } catch (error) {
    res.status(500).json({ detail: error.message });
  }
}