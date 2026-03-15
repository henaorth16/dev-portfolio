interface FooterProps {
  name: string;
  year: number;
  className?: string;
}

export default function Footer({ name, year, className = "" }: FooterProps) {
  return (
    <footer className={`bg-gray-900 text-white py-8 ${className}`}>
      <div className="container mx-auto px-4 text-center">
        <p className="text-gray-400">
          © {year} {name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
