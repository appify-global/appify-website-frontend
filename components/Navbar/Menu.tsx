import { useSpring, a } from "@react-spring/web";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { NewsletterForm } from "@/components/NewsletterForm";

interface MenuProps {
  open: boolean;
  onOutsideClick: (event: MouseEvent | TouchEvent) => void;
}

const Menu: React.FC<MenuProps> = ({ open, onOutsideClick }) => {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const handleChildClick = useCallback((event: MouseEvent | TouchEvent) => {
    if (ref.current && !ref.current?.contains(event.target as Node)) {
      onOutsideClick(event);
    }
  }, [onOutsideClick]);

  // Handle navigation with full page reload to ensure scroll reset
  const handleLinkClick = useCallback((e: React.MouseEvent, href: string) => {
    e.preventDefault();
    // Use window.location for full page reload to ensure scroll reset
    if (href !== pathname) {
      window.location.href = href;
    }
  }, [pathname]);

  useEffect(() => {
    document.addEventListener("click", handleChildClick);
    return () => {
      document.removeEventListener("click", handleChildClick);
    };
  }, [handleChildClick]);

  const [contents, contentsApi] = useSpring(() => ({
    from: { y: 100, opacity: 0, transform: "rotate(20deg)" },
  }));

  const [news, newsApi] = useSpring(() => ({
    from: { y: 100, opacity: 0, transform: "rotate(-20deg)" },
  }));
  // Track whether we're in a closing animation (delayed hide)
  const [isClosing, setIsClosing] = useState(false);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const prevOpenRef = useRef(open);

  useEffect(() => {
    // Clear any existing timeout
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }

    // Only handle closing transition - no setState when opening
    // because `open` prop already controls visibility
    if (!open && prevOpenRef.current) {
      // Start closing: use setTimeout to avoid synchronous setState
      setTimeout(() => setIsClosing(true), 0);
      hideTimeoutRef.current = setTimeout(() => {
        setIsClosing(false);
      }, 500);
    }

    prevOpenRef.current = open;

    contentsApi.start({
      y: open ? 0 : 100,
      opacity: open ? 1 : 0,
      transform: open ? `rotate(0deg)` : `rotate(20deg)`,
    });

    newsApi.start({
      y: open ? 0 : 100,
      opacity: open ? 1 : 0,
      transform: open ? `rotate(0deg)` : `rotate(-20deg)`,
    });

    return () => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, [open, contentsApi, newsApi]);

  // Show menu if open OR during closing animation
  const hidden = open || isClosing;

  return (
    <>
      {hidden && (
        <div
          className="absolute top-[4rem] right-0 w-[calc(100vw-3rem)] sm:w-[20rem] max-w-[20rem] origin-top-right"
          style={{ transform: 'scale(0.72)' }}
          ref={ref}
        >
          {/* Contents */}
          <a.div
            className="rounded-xl bg-white flex flex-col font-Aeonik text-2xl sm:text-2xl p-5 sm:p-8"
            style={contents}
          >
            <div className="flex justify-between pb-3">
              <Link href="/" onClick={(e) => handleLinkClick(e, "/")}>HOME</Link>
              {pathname === "/" && <div>•</div>}
            </div>
            <div className="flex justify-between py-3">
              <Link href={"/about"} onClick={(e) => handleLinkClick(e, "/about")}>ABOUT US</Link>
              {pathname === "/about" && <div>•</div>}
            </div>
            <div className="flex justify-between py-3">
              <Link href="/projects" onClick={(e) => handleLinkClick(e, "/projects")}>PROJECTS</Link>
              {pathname?.startsWith("/projects") && <div>•</div>}
            </div>
            <div className="flex justify-between pt-3">
              <Link href="/services" onClick={(e) => handleLinkClick(e, "/services")}>SERVICES</Link>
              {pathname?.startsWith("/services") && <div>•</div>}
            </div>
          </a.div>

          {/* Newsletter */}
          <a.div
            className="rounded-xl bg-white flex flex-col p-5 sm:p-8 my-2"
            style={news}
          >
            <div className="font-Aeonik text-2xl sm:text-3xl">
              Subscribe to our newsletter
            </div>
            <NewsletterForm
              formClassName="flex justify-between bg-[#F0F1FA] p-3 sm:p-4 rounded-xl mt-4 sm:mt-6 text-[#BEBFC7] text-base sm:text-xl"
              inputClassName="bg-[#F0F1FA] w-full outline-none"
              arrowSize={30}
            />
          </a.div>

          {/* News Room */}
          <a.div className="bg-black text-white p-5 sm:p-8 rounded-xl" style={contents}>
            <Link href="/news" onClick={(e) => handleLinkClick(e, "/news")}>
              <div className="flex justify-between text-2xl sm:text-2xl">
                <div>NEWS ROOM</div>
                <svg
                  width="30px"
                  height="30px"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                >
                  <path
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 12-6-6m6 6-6 6m6-6H5"
                    transform="rotate(-45, 12, 12)"
                  />
                </svg>
              </div>
            </Link>
          </a.div>
        </div>
      )}
    </>
  );
};

export default Menu;
