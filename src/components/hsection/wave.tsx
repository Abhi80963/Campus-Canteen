// components/WaveDivider.tsx
const WaveDivider = () => {
  return (
    <div className="w-full overflow-hidden bg-[#f9f3ec]">
      <svg
        viewBox="0 0 1440 320"
        className="w-full h-[100px] md:h-[150px]"
        preserveAspectRatio="none"
      >
        <path
          fill="#ffffff"
          d="M0,64L48,90.7C96,117,192,171,288,192C384,213,480,203,576,170.7C672,139,768,85,864,96C960,107,1056,181,1152,186.7C1248,192,1344,128,1392,96L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
    </div>
  );
};

export default WaveDivider;
