"use client";

import { useState } from "react";
import { Trail } from "./TrailText";

import LetsTalk from "./LetsTalk";
import MenuButton from "./MenuButton";
import NewsFilterButton from "./NewsFilterButton";
import MobileMenuButton from "./MobileMenuButton";
import MobileMenu from "./MobileMenu";
import Link from "next/link";
import Image from "next/image";

function Navbar() {
  // Desktop trail animation
  const [open] = useState(true);

  // Mobile menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Navbar small screen */}
      <div className="fixed top-0 left-0 z-50 w-full py-6 lg:hidden px-6">
        <div className="flex items-center justify-between w-full font-extrabold pb-2">
          <div className="tracking-wider font-extrabold text-3xl cursor-pointer">
            <Link href="/"><Image src={'/appify_black.png'} width={'100'} height={'100'} alt="Appify" /></Link>
          </div>
          <div className="flex items-center gap-2">
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
            <Link href="/"><Image src={'/appify_black.png'} width={'130'} height={'45'} alt="Appify" /></Link>
          </div>
          <div className="hidden lg:flex items-center justify-around font-AeonikMedium">
            <Trail open={open} className="flex items-center">
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
