
export default function Header() {
  return (
    <nav className="w-full md:h-22.5 bg-gray-200">
      <div className="max-w-7xl  mx-auto flex items-center justify-between px-8 py-4">
        {/* Left - Logo + Text */}
        <div className="flex items-center gap-3">
          <img src="/logo-icon.png" alt="logo" className="w-10 h-10" />

          <div className="hidden sm:block">
            <h1 className="font-semibold text-black text-lg">Dawit</h1>
            <p className="text-xs text-gray-500">Product & UX/UI Designer</p>
          </div>
        </div>

        {/* Right - Navigation */}
        <ul className=" h-8 flex items-center justify-center-center md:gap-8 gap-4 text-gray-700 text-lg">
          <li className="hover:text-black cursor-pointer">About</li>
          <li className="hover:text-black cursor-pointer">Work</li>
          <li className="hover:text-black cursor-pointer">Resume</li>
          <li className="hover:text-black cursor-pointer hidden md:block">
            Language
          </li>

          <li className="md:hidden">
            <button className="bg-black text-white px-5 py-2 rounded-full">
              Contact
            </button>
          </li>
          <li className="hidden md:inline">Contact</li>
        </ul>
      </div>
    </nav>
  );
}
