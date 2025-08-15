import { LogOutIcon } from "lucide-react";
import useLogout from "../hooks/useLogout";

const Header = ({ toggleSidebar }) => {
  const { logoutMutation } = useLogout();
  return (
    <header className="navbar bg-base-300 shadow-md px-4">
      {/* Sidebar Toggle */}
      <div className="flex-none">
        <button
          className="btn btn-square btn-ghost"
          onClick={toggleSidebar}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Branding */}
      <div className="flex-1 px-2 mx-2 flex items-center gap-2">
      </div>

      {/* Right Side Menu */}
      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src="https://i.pravatar.cc/100" alt="User" />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-200 rounded-box w-52"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li><a>Settings</a></li>
            <button className="btn btn-ghost btn-circle" onClick={logoutMutation}>
            <LogOutIcon className="h-6 w-6 text-base-content opacity-70" />
          </button>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
