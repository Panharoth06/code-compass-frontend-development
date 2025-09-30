"use client"

import { useState, useEffect } from "react"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
"use client"

import { useState, useEffect } from "react"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
// import { FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";

// =================== Data ===================
const stats = [
  { value: "100+", label: "Algorithm Challenges" },
  { value: "150K+", label: "Developer Community" },
  { value: "95%", label: "Interview Success" },
  { value: "FAANG", label: "Placement Rate" },
]
]

interface TeamCardProps {
  name: string
  role: string
  image: string
  size?: string
  index?: boolean
}

interface StatCardProps {
  value: string
  label: string
  value: string
  label: string
}

// Custom SVG Icons to replace react-icons
// const FacebookIcon = () => (
//   <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
//     <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
//   </svg>
// )

// const LinkedInIcon = () => (
//   <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
//     <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v11.452zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
//   </svg>
// )

// const GitHubIcon = () => (
//   <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
//     <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
//   </svg>
// )

// Data
const mentors = [
  {
    name: "Mr. Kay Kao",
    name: "Mr. Kay Kao",
    role: "Instructor",
    image: "/image/teacherkeo.jpg",
    image: "/image/teacherkeo.jpg",
  },
  {
    name: "Mr. Sreng Chipor",
    role: "Instructor",
    image: "/image/mentor-2.jpg",
    role: "Instructor",
    image: "/image/mentor-2.jpg",
  },
];



const coreTeam = [
  {
    name: "Chheng Panharoth",
    name: "Chheng Panharoth",
    role: "Full-Stack Developer",
    image: "/image/team-leader.jpg",
    image: "/image/team-leader.jpg",
  },
  {
    name: "Chheng Devith",
    name: "Chheng Devith",
    role: "Full-Stack Developer",
    image: "/image/devit.jpg",
    image: "/image/devit.jpg",
  },
  {
    name: "Rin Bunvarn",
    name: "Rin Bunvarn",
    role: "Full-Stack Developer",
    image: "/image/bunvarn.jpg",
    image: "/image/bunvarn.jpg",
  },
  {
    name: "Hor Rotha",
    name: "Hor Rotha",
    role: "Full-Stack Developer",
    image: "/image/rotha.jpg",
    image: "/image/rotha.jpg",
  },
  {
    name: "Seu Narong",
    role: "Full-Stack Developer",
    image: "/image/narong.jpg",
    name: "Seu Narong",
    role: "Full-Stack Developer",
    image: "/image/narong.jpg",
  },
  {
    name: "Mom Raksmey",
    name: "Mom Raksmey",
    role: "Full-Stack Developer",
    image: "/image/raksmey.jpg",
    image: "/image/raksmey.jpg",
  },
  {
    name: "Thang Kimsang",
    name: "Thang Kimsang",
    role: "Full-Stack Developer",
    image: "/image/kimsang.jpg",
    image: "/image/kimsang.jpg",
  },
];



// =================== Components ===================

// Reusable Stat Card
function StatCard({ value, label }: StatCardProps) {
  return (
    <div className=" p-6 rounded-xl text-center shadow-2xl border border-white/20 ">
      <p className="text-4xl font-bold text-primary">{value}</p>
      <p className="mt-2 text-muted-foreground">{label}</p>
    <div className=" p-6 rounded-xl text-center shadow-2xl border border-white/20 ">
      <p className="text-4xl font-bold text-primary">{value}</p>
      <p className="mt-2 text-muted-foreground">{label}</p>
    </div>
  )
  )
}

function TeamCard({ name, role, image }: TeamCardProps) {
  return (
    <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-600  p-6 rounded-2xl shadow-2xl flex flex-col items-center text-center space-y-5 ">
      <div className="relative w-35 h-35 rounded-full overflow-hidden shadow-2xl border-2 border-white/30 backdrop-blur-sm   ">
        <Image
          src={image || "placeholder.svg"}
          alt={image}
          width={80}
          height={80}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="space-y-2">
        <h4 className="font-bold text-xl">{name}</h4>
        <p className="text-sm text-muted-foreground">{role}</p>
      </div>
    </div>
  )
  )
}

// =================== Main Page ===================
export default function About() {
  // const [isDarkMode, setIsDarkMode] = useState(false)

  // // Detect system dark mode
  // useEffect(() => {
  //   const dark = window.matchMedia("(prefers-color-scheme: dark)").matches
  //   setIsDarkMode(dark)
  // }, [])

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-black dark:via-slate-900 dark:to-black" />

    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-black dark:via-slate-900 dark:to-black" />

      <Head>
        <title>CodeCompass</title>
        <meta name="description" content="Navigate your coding journey with CodeCompass" />
        <meta name="description" content="Navigate your coding journey with CodeCompass" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Hero Section */}
      <section className="relative z-10 bg-transparent text-gray-900 dark:text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <header className="text-center mb-16 flex flex-col items-center space-y-8 px-4">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <Image src="/codecompass-2.png" alt="CodeCompass Logo" width={40} height={40} className="w-10 h-10" />
              <h3 className="text-3xl font-semibold">CodeCompass</h3>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-center">
              Navigate Your <span className="text-primary">Coding</span> <br />
              <span className="text-primary">Journey</span>
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl text-gray-300 mt-4 text-center">
              Master data structures, algorithms, and system design with our comprehensive coding platform. Practice
              with <strong className="text-primary font-bold">real interview questions</strong> from top tech
              companies.
            </p>
          </header>
      <section className="relative z-10 bg-transparent text-gray-900 dark:text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <header className="text-center mb-16 flex flex-col items-center space-y-8 px-4">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <Image src="/codecompass-2.png" alt="CodeCompass Logo" width={40} height={40} className="w-10 h-10" />
              <h3 className="text-3xl font-semibold">CodeCompass</h3>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-center">
              Navigate Your <span className="text-primary">Coding</span> <br />
              <span className="text-primary">Journey</span>
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl text-gray-300 mt-4 text-center">
              Master data structures, algorithms, and system design with our comprehensive coding platform. Practice
              with <strong className="text-primary font-bold">real interview questions</strong> from top tech
              companies.
            </p>
          </header>

          <div className="flex flex-wrap justify-center gap-6 mb-16 w-full max-w-5xl mx-auto">
            {stats.map((stat, i) => (
              <StatCard key={i} value={stat.value} label={stat.label} />
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-6 mb-16 w-full max-w-5xl mx-auto">
            {stats.map((stat, i) => (
              <StatCard key={i} value={stat.value} label={stat.label} />
            ))}
          </div>
        </div>
      </section>

      {/* Code & Design Section */}
      <section className="relative z-10 bg-transparent text-gray-900 dark:text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-9 py-16 lg:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h3 className="text-4xl md:text-5xl font-bold text-primary mb-6">
                Where Code Meets Design <br />
                <span className="text-white">Excellence</span>
              </h3>
              <p className="mt-10 text-lg text-gray-300 leading-relaxed">
                CodeCompass provides a comprehensive suite of coding challenges, from basic algorithms to advanced
                system design. Our platform mirrors real technical interviews with{" "}
                <span className="font-semibold text-primary">
                  curated problems from FAANG companies and competitive programming contests,
                </span>{" "}
                enhanced with integrated Figma design challenges for full-stack mastery.
              </p>
            </div>
      <section className="relative z-10 bg-transparent text-gray-900 dark:text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-9 py-16 lg:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h3 className="text-4xl md:text-5xl font-bold text-primary mb-6">
                Where Code Meets Design <br />
                <span className="text-white">Excellence</span>
              </h3>
              <p className="mt-10 text-lg text-gray-300 leading-relaxed">
                CodeCompass provides a comprehensive suite of coding challenges, from basic algorithms to advanced
                system design. Our platform mirrors real technical interviews with{" "}
                <span className="font-semibold text-primary">
                  curated problems from FAANG companies and competitive programming contests,
                </span>{" "}
                enhanced with integrated Figma design challenges for full-stack mastery.
              </p>
            </div>

            {/* Code Block */}
             <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-white/20 hover:bg-white/15 transition-all duration-300">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-3 h-3 bg-red-500 rounded-full shadow-lg"></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-full shadow-lg"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full shadow-lg"></div>
            <span className="ml-4 text-white/90 text-sm font-medium">CodeCompass.js</span>
          </div>
          <pre className="text-sm font-mono overflow-auto bg-black/20 backdrop-blur-sm rounded-xl p-4 border border-white/10">
            <code className="text-white/95">
              {`// Two Sum - Classic Algorithm Problem
            {/* Code Block */}
             <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-white/20 hover:bg-white/15 transition-all duration-300">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-3 h-3 bg-red-500 rounded-full shadow-lg"></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-full shadow-lg"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full shadow-lg"></div>
            <span className="ml-4 text-white/90 text-sm font-medium">CodeCompass.js</span>
          </div>
          <pre className="text-sm font-mono overflow-auto bg-black/20 backdrop-blur-sm rounded-xl p-4 border border-white/10">
            <code className="text-white/95">
              {`// Two Sum - Classic Algorithm Problem
function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
}


// Time: O(n), Space: O(n)`}
            </code>
          </pre>
        </div>
            </code>
          </pre>
        </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="relative z-10 bg-transparent text-gray-900 dark:text-white text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <h3 className="text-3xl md:text-5xl font-bold text-primary mb-6">Our Mission</h3>
          <p className="text-base md:text-lg text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Providing world-class algorithmic training and interview preparation through challenging problems,
            competitive programming, and comprehensive system design education.
          </p>
      <section className="relative z-10 bg-transparent text-gray-900 dark:text-white text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <h3 className="text-3xl md:text-5xl font-bold text-primary mb-6">Our Mission</h3>
          <p className="text-base md:text-lg text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Providing world-class algorithmic training and interview preparation through challenging problems,
            competitive programming, and comprehensive system design education.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: "< >",
                title: "Algorithm Mastery",
                desc: "From basic sorting to advanced dynamic programming, master every data structure and algorithm with progressive difficulty levels.",
              },
              {
                icon: "🤖",
                title: "Beginner-Friendly",
                desc: "Step-by-step challenges designed to help beginners gain confidence and grow their coding skills efficiently.",
              },
              {
                icon: "🚀",
                title: "Problem-Solving Skills",
                desc: "Sharpen your problem-solving skills and get ready for real-world technical interviews.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex flex-col items-center p-8 rounded-2xl shadow-2xl border border-white/20  "
              >
                <div className="p-5 bg-slate-700 rounded-full mb-6 text-3xl">{item.icon}</div>
                <h4 className="text-lg md:text-xl font-semibold mb-3">{item.title}</h4>
                <p className="text-sm md:text-base text-gray-300 leading-relaxed">{item.desc}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: "< >",
                title: "Algorithm Mastery",
                desc: "From basic sorting to advanced dynamic programming, master every data structure and algorithm with progressive difficulty levels.",
              },
              {
                icon: "🤖",
                title: "Beginner-Friendly",
                desc: "Step-by-step challenges designed to help beginners gain confidence and grow their coding skills efficiently.",
              },
              {
                icon: "🚀",
                title: "Problem-Solving Skills",
                desc: "Sharpen your problem-solving skills and get ready for real-world technical interviews.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex flex-col items-center p-8 rounded-2xl shadow-2xl border border-white/20  "
              >
                <div className="p-5 bg-slate-700 rounded-full mb-6 text-3xl">{item.icon}</div>
                <h4 className="text-lg md:text-xl font-semibold mb-3">{item.title}</h4>
                <p className="text-sm md:text-base text-gray-300 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative z-10 bg-transparent text-gray-900 dark:text-white ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center mb-10">
            <h3 className="text-5xl font-bold text-primary">Meet Our Team</h3>
            <p className="mt-10 text-gray-300 max-w-2xl mx-auto text-xl">
              The brilliant minds behind CodeCompass – mentors and innovators dedicated to revolutionizing coding
              education.
            </p>
          </div>

          {/* Mentors */}
          <div className="mb-15">
            <h4 className="text-3xl font-semibold mb-10 text-center">Our Mentors</h4>
            <div className="flex flex-wrap justify-center gap-28 ">
              {mentors.map((mentor, idx) => (
                <TeamCard key={idx} {...mentor} />
              ))}
            </div>
          </div>

          {/* Core Team */}
          <div className="mb-12 ">
            <h4 className="text-2xl font-semibold mb-6 text-center">Our Core Team</h4>
            <div className="flex flex-col items-center mb-12">
              <TeamCard {...coreTeam[0]} />
            </div>
            <div className="grid sm:grid-cols-3 lg:gap-10 justify-items-center">
              {coreTeam.slice(1).map((member, idx) => (
                <TeamCard key={idx} {...member} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Creator CTA Section */}
      <section className="relative z-10 bg-transparent text-gray-900 dark:text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="max-w-xl mx-auto bg-slate-800/30 backdrop-blur-sm border border-slate-600 rounded-2xl shadow-lg p-8 text-center">
            <h3 className="text-3xl sm:text-4xl font-bold mb-4">Wanna Become Our Creator?</h3>
            <p className="text-base sm:text-lg font-medium mb-6 text-gray-300">
              Join our community of problem setters and help create challenging coding problems. Share your expertise
              and inspire thousands of developers worldwide.
            </p>
            <Link
              href="/join-as-creator"
              className="inline-block py-3 px-6 rounded-full text-black font-semibold text-lg bg-primary transition-transform transform hover:scale-105 duration-300 ease-in-out shadow-[0_0_20px_0_rgba(180,255,0,0.5)] hover:shadow-[0_0_30px_0_rgba(180,255,0,0.8)]"
            >
              Join as Creator
            </Link>
          </div>
      <section className="relative z-10 bg-transparent text-gray-900 dark:text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="max-w-xl mx-auto bg-slate-800/30 backdrop-blur-sm border border-slate-600 rounded-2xl shadow-lg p-8 text-center">
            <h3 className="text-3xl sm:text-4xl font-bold mb-4">Wanna Become Our Creator?</h3>
            <p className="text-base sm:text-lg font-medium mb-6 text-gray-300">
              Join our community of problem setters and help create challenging coding problems. Share your expertise
              and inspire thousands of developers worldwide.
            </p>
            <Link
              href="/join-as-creator"
              className="inline-block py-3 px-6 rounded-full text-black font-semibold text-lg bg-primary transition-transform transform hover:scale-105 duration-300 ease-in-out shadow-[0_0_20px_0_rgba(180,255,0,0.5)] hover:shadow-[0_0_30px_0_rgba(180,255,0,0.8)]"
            >
              Join as Creator
            </Link>
          </div>
        </div>
      </section>

      {/* Circle frame CSS */}
      <style jsx>{`
        .circle-frame {
          position: relative;
          border-radius: 50%;
          background: #111;
          border: 2px solid #333;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .circle-frame:hover {
          transform: scale(1.05);
          box-shadow: 0 0 25px rgba(204, 243, 1, 0.7),
            0 0 45px rgba(204, 243, 1, 0.4);
        }
        .circle-frame::before {
          content: "";
          position: absolute;
          inset: -3px;
          border-radius: 50%;
          background: radial-gradient(
              circle at 50% 10%,
              #ccf301 3px,
              transparent 3px
            ),
            radial-gradient(circle at 90% 50%, #ccf301 3px, transparent 3px),
            radial-gradient(circle at 50% 90%, #ccf301 3px, transparent 3px),
            radial-gradient(circle at 10% 50%, #ccf301 3px, transparent 3px),
            radial-gradient(circle at 75% 25%, #ccf301 2px, transparent 2px),
            radial-gradient(circle at 75% 75%, #ccf301 2px, transparent 2px),
            radial-gradient(circle at 25% 75%, #ccf301 2px, transparent 2px),
            radial-gradient(circle at 25% 25%, #ccf301 2px, transparent 2px);
          animation: compass-pulse 2s ease-in-out infinite;
        }
        @keyframes compass-pulse {
          0%,
          100% {
            opacity: 0.7;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
        }
        .circle-content {
          background: #1a1a1a;
        }
      `}</style>
    </div>
  )
  )
}
