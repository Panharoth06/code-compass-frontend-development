"use client";

export const LogoScroller = () => {
  return (
    <>
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .group:hover .animate-marquee {
          animation-play-state: paused;
        }
      `}</style>
      <div className="group flex overflow-hidden py-2 [--gap:1.5rem] [gap:var(--gap)] flex-row max-w-full" 
           style={{
             maskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)'
           }}>
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <div
              className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row"
              key={i}
            >
              <div className="flex items-center justify-center w-28 sm:w-32 md:w-36 lg:w-40 h-12 sm:h-14 md:h-16 lg:h-18">
                <img 
                  src="/image/iSTAD_Full.png" 
                  alt="Logo 1" 
                  className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain opacity-70 hover:opacity-90 transition-opacity duration-300 filter dark:brightness-110 brightness-90"
                />
              </div>
              <div className="flex items-center justify-center w-24 sm:w-28 md:w-32 lg:w-36 h-12 sm:h-14 md:h-16 lg:h-18">
                <img 
                  src="/image/iSTAD_Full.png" 
                  alt="Logo 2" 
                  className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain opacity-70 hover:opacity-90 transition-opacity duration-300 filter dark:brightness-110 brightness-90"
                />
              </div>
              <div className="flex items-center justify-center w-24 sm:w-28 md:w-32 lg:w-36 h-12 sm:h-14 md:h-16 lg:h-18">
                <img 
                  src="/image/iSTAD_Full.png" 
                  alt="Logo 3" 
                  className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain opacity-70 hover:opacity-90 transition-opacity duration-300 filter dark:brightness-110 brightness-90"
                />
              </div>
              <div className="flex items-center justify-center w-24 sm:w-28 md:w-32 lg:w-36 h-12 sm:h-14 md:h-16 lg:h-18">
                <img 
                  src="/image/iSTAD_Full.png" 
                  alt="Logo 4" 
                  className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain opacity-70 hover:opacity-90 transition-opacity duration-300 filter dark:brightness-110 brightness-90"
                />
              </div>
              <div className="flex items-center justify-center w-24 sm:w-28 md:w-32 lg:w-36 h-12 sm:h-14 md:h-16 lg:h-18">
                <img 
                  src="/image/iSTAD_Full.png" 
                  alt="Logo 5" 
                  className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain opacity-70 hover:opacity-90 transition-opacity duration-300 filter dark:brightness-110 brightness-90"
                />
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export const LogoScrollerReverse = () => {
  return (
    <>
      <style jsx>{`
        @keyframes marquee-reverse {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-reverse {
          animation: marquee-reverse 30s linear infinite;
        }
        .group:hover .animate-marquee-reverse {
          animation-play-state: paused;
        }
      `}</style>
      <div className="group flex overflow-hidden py-2 px-4 sm:px-6 md:px-8 lg:px-10 [--gap:1.5rem] [gap:var(--gap)] flex-row max-w-full"
           style={{
             maskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)'
           }}>
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <div
              className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee-reverse flex-row"
              key={i}
            >
              <div className="flex items-center justify-center w-24 sm:w-28 md:w-32 lg:w-36 h-12 sm:h-14 md:h-16 lg:h-18">
                <img 
                  src="/image/iSTAD_Full.png" 
                  alt="Logo 6" 
                  className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain opacity-70 hover:opacity-90 transition-opacity duration-300 filter dark:brightness-110 brightness-90"
                />
              </div>
              <div className="flex items-center justify-center w-24 sm:w-28 md:w-32 lg:w-36 h-12 sm:h-14 md:h-16 lg:h-18">
                <img 
                  src="/image/iSTAD_Full.png" 
                  alt="Logo 7" 
                  className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain opacity-70 hover:opacity-90 transition-opacity duration-300 filter dark:brightness-110 brightness-90"
                />
              </div>
              <div className="flex items-center justify-center w-24 sm:w-28 md:w-32 lg:w-36 h-12 sm:h-14 md:h-16 lg:h-18">
                <img 
                  src="/image/iSTAD_Full.png" 
                  alt="Logo 8" 
                  className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain opacity-70 hover:opacity-90 transition-opacity duration-300 filter dark:brightness-110 brightness-90"
                />
              </div>
              <div className="flex items-center justify-center w-24 sm:w-28 md:w-32 lg:w-36 h-12 sm:h-14 md:h-16 lg:h-18">
                <img 
                  src="/image/iSTAD_Full.png" 
                  alt="Logo 9" 
                  className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain opacity-70 hover:opacity-90 transition-opacity duration-300 filter dark:brightness-110 brightness-90"
                />
              </div>
              <div className="flex items-center justify-center w-24 sm:w-28 md:w-32 lg:w-36 h-12 sm:h-14 md:h-16 lg:h-18">
                <img 
                  src="/image/iSTAD_Full.png" 
                  alt="Logo 10" 
                  className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain opacity-70 hover:opacity-90 transition-opacity duration-300 filter dark:brightness-110 brightness-90"
                />
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

// Demo component showing how to use both scrollers
const LogoMarqueeDemo = () => {
  return (
    <div className="mx-auto max-w-md sm:max-w-lg md:max-w-6xl lg:max-w-7xl">
      <div className="space-y-3 sm:space-y-4 p-3 sm:p-4 rounded-lg sm:rounded-xl">
        <LogoScroller />
        <LogoScrollerReverse />
      </div>
    </div>
  );
};

export default LogoMarqueeDemo;