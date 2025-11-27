const LetsTalk = () => {
  return (
    <button
      id="header-right-talk-btn"
      style={{ opacity: 1, transform: "translate3d(0px, 0em, 0px)", display: "block", pointerEvents: "auto", marginRight: "1rem" }}
    >
      <a href="#"></a>
      <div id="header-right-talk-container" style={{ opacity: 1 }}>
        <span id="header-right-talk-btn-arrow">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="none"
            viewBox="0 0 16 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M2.343 8h11.314m0 0-4.984 4.984M13.657 8 8.673 3.016"
            ></path>
          </svg>
        </span>
        <span id="header-right-talk-btn-text" className="font-Aeonik uppercase font-medium text-lg p-0">Hello</span>
        <span id="header-right-talk-btn-dots">
          <span className="header-right-talk-btn-dot"></span>
        </span>
      </div>
    </button>
  );
};

export default LetsTalk;
