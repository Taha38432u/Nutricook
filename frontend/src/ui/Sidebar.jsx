import Logo from "./Logo.jsx";
import MainNav from "./MainNav.jsx";

function Sidebar() {
  return (
    <div className="flex items-center justify-between gap-12 bg-gray-800 px-5 py-2">
      <Logo />
      <MainNav />
    </div>
  );
}

export default Sidebar;
