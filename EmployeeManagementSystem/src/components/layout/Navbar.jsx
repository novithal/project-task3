import {
  Menu,
  Bell,
  Search,
  ChevronDown,
} from "lucide-react";

import { useHR } from "../../context/HRContext";
import Avatar from "../common/Avatar";

function Navbar({ onMenuClick }) {
  const { admin } = useHR();

  return (
    <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-7">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
        >
          <Menu size={22} />
        </button>

        <div className="hidden items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 sm:flex">
          <Search size={17} className="text-slate-400" />

          <input
            placeholder="Search anything..."
            className="w-48 bg-transparent text-sm outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100">
          <Bell size={20} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <div className="flex items-center gap-3 border-l border-slate-200 pl-4">
          <Avatar name={admin.name} />

          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-slate-800">
              {admin.name}
            </p>

            <p className="text-xs text-slate-500">
              {admin.role}
            </p>
          </div>

          <ChevronDown
            size={16}
            className="hidden text-slate-400 sm:block"
          />
        </div>
      </div>
    </header>
  );
}

export default Navbar;