import {
  ChartBarIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

const navItems = [
  { id: "dashboard", label: "대시보드", icon: ChartBarIcon },
  { id: "voc", label: "VOC 분석", icon: ChatBubbleLeftRightIcon },
  { id: "report", label: "리포트", icon: DocumentTextIcon },
];

interface SidebarProps {
  isOpen: boolean;
}

export function Sidebar({ isOpen }: SidebarProps) {
  return (
    <aside
      className={`fixed top-16 left-0 bottom-0 w-64 bg-white shadow-lg transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-200 md:translate-x-0`}
    >
      <nav className="mt-4">
        <ul>
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="flex items-center px-4 py-2 hover:bg-gray-100"
              >
                <item.icon className="w-5 h-5 text-uplus-navy-alt mr-3" />
                <span className="font-text text-uplus-navy">{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
