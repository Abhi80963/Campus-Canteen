"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCartStore } from "@/stores/useCartStore";
import { Button } from "@/components/ui/button";
import { Menu, X, Search } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";

const navLinks = [
  { href: "/menu", label: "Menu" },
  { href: "/orders", label: "My Orders" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const { items } = useCartStore();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setShowSearch(false);
    }
  };

  return (
    <nav
      className={`w-full sticky top-0 z-50 transition-all ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-white/95 backdrop-blur-sm py-3"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left: Logo */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2 text-2xl font-bold hover:text-blue-700 transition-colors">
              <Image src="/logo.png" alt="Campus Canteen Logo" width={40} height={40} />
              <span className="hidden sm:inline">Campus Canteen</span>
              <span className="inline sm:hidden">CC</span>
            </Link>
          </div>

          {/* Center: Search Bar */}
          <div className="hidden md:flex flex-grow justify-center">
            <form onSubmit={handleSearch} className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Search food items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-4 pr-10 py-2 w-full rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600"
              >
                <Search size={18} />
              </button>
            </form>
          </div>

          {/* Right: Links */}
          <div className="hidden md:flex items-center space-x-4 flex-shrink-0">
            <Link href="/cart">
              <Button
                variant="ghost"
                size="icon"
                className="relative font-bold text-xl tracking-tight text-gray-700 transition-all duration-300 hover:text-blue-400 hover:underline underline-offset-8 decoration-2 rounded-full"
              >
                <span className="text-4xl">🛒</span>
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative font-bold text-xl tracking-tight text-gray-700 transition-all duration-300 hover:text-blue-400 hover:underline underline-offset-8 decoration-2"
              >
                {link.label}
              </Link>
            ))}

            
          </div>

          {/* Mobile menu buttons */}
          <div className="flex md:hidden items-center space-x-3 flex-shrink-0">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-full"
              onClick={() => setShowSearch(!showSearch)}
            >
              <Search size={20} />
            </Button>
            <Link href="/cart">
              <Button
                variant="ghost"
                size="icon"
                className="relative text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-full"
              >
                <span className="text-2xl">🛒</span>
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-full"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        {showSearch && (
          <div className="md:hidden mt-3 pb-2">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search food items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-10 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                autoFocus
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600"
              >
                <Search size={18} />
              </button>
            </form>
          </div>
        )}

        {/* Mobile Nav Links */}
        {isOpen && (
          <div className="md:hidden bg-white shadow-lg">
            <div className="px-4 pt-2 pb-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    pathname === link.href
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
