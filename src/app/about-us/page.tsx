import { Hero1 } from "@/components/general/hero1";

export default function Page() {
  return (
    <>
      {/* About Us Section */}
      <div className="flex flex-col items-center justify-center gap-4 py-32 rounded-2xl px-6 sm:px-12 md:px-24 lg:px-36 max-w-7xl mx-auto">
        <h3 className="text-3xl font-semibold">About Us</h3>
        <p className="text-center max-w-4xl text-base sm:text-lg leading-relaxed">
          CodeCompass is a private online platform established in August 2015 by
          Winston Tang and headquartered in Palo Alto, California. As of 2025,
          its leadership includes Hercy Chang as CEO.
        </p>
      </div>

      {/* Hero1 Component Section */}
      <div className="flex justify-center px-6 py-16 max-w-7xl mx-auto">
        <Hero1 />
      </div>

      {/* Our Story Title */}
      <h3 className="text-4xl sm:text-5xl font-extrabold py-16 px-6 sm:px-12 max-w-7xl mx-auto">
        Our Story
      </h3>

      {/* Grid Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 max-w-7xl mx-auto px-6 sm:px-12 pb-24">
        {[1, 2, 3, 4, 5, 6].map((num) => (
          <div key={num} className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-6xl sm:text-7xl font-bold text-gray-700">
                {num.toString().padStart(2, "0")}
              </span>
              <p className="font-bold text-lg sm:text-xl">
                Founded in Silicon Valley
              </p>
            </div>
            <p className="max-w-prose text-gray-600 text-sm sm:text-base leading-relaxed">
              Winston Tang launched LeetCode with the vision of helping
              developers prepare for technical interviews through coding
              challenges and problem-solving practice.
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
