const Sidebar = ({ isOpen }) => {
  return (
    <aside
      className={`bg-base-200 shadow-lg transition-all duration-300 min-h-screen flex flex-col
        ${isOpen ? "w-64 p-4 opacity-100" : "w-0 p-0 opacity-0 overflow-hidden pointer-events-none"}`}
    >
      {/* Header Section */}
      <div className="flex items-center gap-3 mb-6">
        <div className="avatar">
          <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src="https://i.pravatar.cc/100" alt="User" />
          </div>
        </div>
        <div>
          <h2 className="text-lg font-bold">John Doe</h2>
          <p className="text-sm text-gray-500">Admin</p>
        </div>
      </div>

      {/* Navigation */}
      <ul className="menu menu-vertical gap-1 text-base">
        <li>
          <a href="/" className="hover:bg-primary hover:text-primary-content rounded-lg">
            home
          </a>
        </li>
        <li>
          <a href="/chat" className="hover:bg-primary hover:text-primary-content rounded-lg">
            chats
          </a>
        </li>
        <li>
          <a className="hover:bg-primary hover:text-primary-content rounded-lg">
            Settings
          </a>
        </li>
      </ul>

      {/* Footer */}
      <div className="mt-auto pt-4 border-t border-base-300">
        <p className="text-xs text-gray-500 text-center">
          © {new Date().getFullYear()} My App
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
