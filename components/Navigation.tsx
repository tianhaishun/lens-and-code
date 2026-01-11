import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cinema-black/80 backdrop-blur-md border-b border-cinema-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-cinema-gold rounded-full flex items-center justify-center">
              <span className="text-cinema-black font-bold text-xl">J</span>
            </div>
            <span className="cinema-title text-xl text-cinema-gold">Justin&apos;s Blog</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="elegant-link text-sm tracking-wider hover:text-cinema-gold transition-colors"
            >
              首页
            </Link>
            <Link
              href="/articles"
              className="elegant-link text-sm tracking-wider hover:text-cinema-gold transition-colors"
            >
              文章
            </Link>
            <Link
              href="/projects"
              className="elegant-link text-sm tracking-wider hover:text-cinema-gold transition-colors"
            >
              项目
            </Link>
            <Link
              href="/about"
              className="elegant-link text-sm tracking-wider hover:text-cinema-gold transition-colors"
            >
              关于
            </Link>
            <Link
              href="/admin"
              className="px-4 py-2 bg-cinema-gray hover:bg-cinema-gold hover:text-cinema-black rounded transition-all duration-300 text-sm"
            >
              管理
            </Link>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden text-cinema-gold">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
