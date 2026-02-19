"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Trail } from "./TrailText";

import LetsTalk from "./LetsTalk";
import MenuButton from "./MenuButton";
import NewsFilterButton from "./NewsFilterButton";
import MobileMenuButton from "./MobileMenuButton";
import MobileMenu from "./MobileMenu";
import Link from "next/link";
import Image from "next/image";

interface NavbarProps {
  showBackButton?: boolean;
  backHref?: string;
  logoColor?: "black" | "white" | "auto";
}

function Navbar({ showBackButton = false, backHref = "/services", logoColor = "auto" }: NavbarProps) {
  const pathname = usePathname();
  
  // Determine logo color
  const getLogoColor = () => {
    if (logoColor === "black") return false;
    if (logoColor === "white") return true;
    // Auto mode: detect based on route
    const darkBackgroundRoutes = ["/about"];
    return darkBackgroundRoutes.includes(pathname);
  };
  
  const shouldInvertLogo = getLogoColor();
  // Desktop trail animation
  const [open] = useState(true);

  // Mobile menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Navbar small screen */}
      <div className="fixed top-0 left-0 z-[9999] w-full py-6 lg:hidden px-6">
        <div className="flex items-center justify-between w-full font-extrabold pb-2">
          <div className="tracking-wider font-extrabold text-3xl cursor-pointer">
            <Link href="/">
              <Image 
                src={'/appify_black.png'} 
                width={'100'} 
                height={'100'} 
                alt="Appify"
                className={shouldInvertLogo ? "filter brightness-0 invert" : ""}
              />
            </Link>
          </div>
          <div className="flex items-center gap-2">
            {showBackButton && (
              <Link
                href={backHref}
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#E4E6EF] hover:bg-[#d5d7e3] transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            )}
            <MobileMenuButton
              isOpen={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
            />
            <NewsFilterButton />
          </div>
        </div>
      </div>

      {/* Mobile off-canvas menu */}
      <MobileMenu
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* Navbar large screen */}
      <div className="fixed top-0 left-0 w-full px-[4.1vw] z-50 ">
        <div className="items-start justify-between hidden lg:flex pt-14 pb-10">
          <div className="tracking-wider font-AeonikMedium text-4xl">
            <Link href="/">
              <Image 
                src={'/appify_black.png'} 
                width={'130'} 
                height={'45'} 
                alt="Appify"
                className={shouldInvertLogo ? "filter brightness-0 invert" : ""}
              />
            </Link>
          </div>
          <div className="hidden lg:flex items-center justify-around font-AeonikMedium">
            <Trail open={open} className="flex items-center">
              {showBackButton && (
                <Link
                  href={backHref}
                  className="inline-flex items-center gap-2 bg-[#E4E6EF] hover:bg-[#d5d7e3] transition-colors mr-3"
                  style={{
                    fontSize: "0.875em",
                    fontFamily: "AeonikMedium",
                    borderRadius: "6.25em",
                    padding: "0 2em",
                    height: "3.4em",
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="uppercase font-medium">Back</span>
                </Link>
              )}
              {/* <MusicButton /> */}
              <LetsTalk />
              <MenuButton />
              <NewsFilterButton />
            </Trail>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
