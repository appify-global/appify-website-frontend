import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black">
      {/* Large 404 background text */}
      <span
        className="pointer-events-none absolute select-none text-[40vw] font-black leading-none tracking-tighter text-white/[0.07] sm:text-[30vw] md:text-[25vw]"
        aria-hidden="true"
      >
        404
      </span>

      {/* Foreground content */}
      <div className="relative z-10 flex flex-col items-center gap-6 px-4 text-center">
        <h1 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">
          Page not found
        </h1>
        <Link
          href="/"
          className="rounded-full bg-[#FF2D9B] px-10 py-4 text-base font-semibold text-white transition-opacity hover:opacity-90 sm:text-lg"
        >
          Back to homepage
        </Link>
      </div>
    </div>
  );
}
