
export default function Header() {
  return (
    <nav className="w-full md:h-22.5 bg-muted">
      <div className="max-w-7xl  mx-auto flex items-center justify-between px-8 py-4">
        {/* Left - Logo + Text */}
        <div className="flex items-center gap-3">
          <img src="/logo-icon.png" alt="logo" className="w-10 h-10" />

          <div className="hidden sm:block">
            <h1 className="font-semibold text-foreground text-lg">Dawit</h1>
            <p className="text-xs text-foreground">Product & UX/UI Designer</p>
          </div>
        </div>

        {/* Right - Navigation */}
        <ul className=" h-8 flex items-center justify-center-center md:gap-8 gap-4 text-foreground text-lg">
          <li className="hover:text-primary cursor-pointer"><a href="about">About</a></li>
          <li className="hover:text-primary cursor-pointer"><a href="work">Work</a></li>
          <li className="hover:text-primary cursor-pointer"><a href="https://googleDriveLink" download>Resume</a></li>
          <li className="hover:text-primary cursor-pointer hidden md:block">
            Language
          </li>

          <li className="md:hidden">
            <a href="/contact" className="bg-primary text-primary-foreground px-5 py-2 rounded-full">
              Contact
            </a>
          </li>
          <li className="hover:text-primary cursor-pointer hidden md:inline">Contact</li>
        </ul>
      </div>
    </nav>
  );
}
