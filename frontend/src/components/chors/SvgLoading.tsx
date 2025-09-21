import { Orbitron} from "next/font/google";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-orbitron",
});

const SvgLoading = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-transparent">
      <svg viewBox="0 0 400 160">
        <text
          x="50%"
          y="50%"
          dy=".32em"
          textAnchor={"middle"}
          className={`${orbitron.className} text-6xl font-extrabold tracking-tight stroke-white loading-svg sm:text-xl`}
          strokeWidth=".2"
        >
          Infotrek&apos;25
        </text>
        <text
          x="50%"
          y="50%"
          dy=".32em"
          dx="2.5em"
          textAnchor={"middle"}
          className="text-4xl font-extrabold stroke-white loading-svg sm:text-xl"
          strokeWidth=".2"
        >
          .
        </text>
      </svg>
    </div>
  );
};
export default SvgLoading;