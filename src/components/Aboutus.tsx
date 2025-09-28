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

interface TeamCardProps {
  name: string
  role: string
  image: string
  size?: string
  index?: boolean // Changed from number to boolean
}

interface StatCardProps {
  value: string
  label: string
}

// Custom SVG Icons to replace react-icons
//

// Data
const mentors = [
  {
    name: "Mr. Kay Kao",
    role: "Instructor",
    image: "/image/teacherkeo.jpg",
  },
  {
    name: "Mr. Sreng Chipor",
    role: "Instructor",
    image: "/image/mentor-2.jpg",
  },
];


const coreTeam = [
  {
    name: "Chheng Panharoth",
    role: "Full-Stack Developer",
    image: "/image/team-leader.jpg",
  },
  {
    name: "Chheng Devith",
    role: "Full-Stack Developer",
    image: "/image/devit.jpg",
  },
  {
    name: "Rin Bunvarn",
    role: "Full-Stack Developer",
    image: "/image/bunvarn.jpg",
  },
  {
    name: "Hor Rotha",
    role: "Full-Stack Developer",
    image: "/image/rotha.jpg",
  },
  {
    name: "Seu Narong",
    role: "Full-Stack Developer",
    image: "/image/narong.jpg",
  },
  {
    name: "Mom Raksmey",
    role: "Full-Stack Developer",
    image: "/image/raksmey.jpg",
  },
  {
    name: "Thang Kimsang",
    role: "Full-Stack Developer",
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
    </div>
  )
}

function TeamCard({ name, role, image, size, index = false }: TeamCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={`group relative ${index ? "w-80" : "w-72"} transition-all duration-500 hover:scale-105`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glassmorphism Card */}
      <div
        className={`
        relative bg-slate-800/20 backdrop-blur-xl 
        ${index ? "p-8 rounded-3xl" : "p-6 rounded-2xl"} 
        shadow-2xl
      `}
      >
        {/* Gradient Glow Effect */}
        <div className="absolute inset-0 rounded-2xl " />

        {/* Profile Image */}
        <div className="relative z-10 flex justify-center mb-6">
          <div
            className={`
            relative ${index ? "w-32 h-32" : "w-24 h-24"} 
            rounded-full overflow-hidden border-4 border-white/30 
            shadow-xl group-hover:border-primary/50 transition-all duration-500
          `}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes={index ? "128px" : "96px"}
            />
            {/* Overlay glow */}
            <div className="absolute inset-0 " />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center">
          <h3
            className={`
            font-bold text-white mb-2 transition-colors duration-300
            ${index ? "text-2xl" : "text-xl"}
            group-hover:text-primary
          `}
          >
            {name}
          </h3>

          <p
            className={`
            text-primary font-semibold mb-4 uppercase tracking-wide
            ${index ? "text-sm" : "text-xs"}
          `}
          >
            {role}
          </p>

          {size && (
            <p
              className={`
              text-white/80 leading-relaxed transition-all duration-500
              ${index ? "text-sm" : "text-xs"}
              ${isHovered ? "opacity-100" : "opacity-70"}
            `}
            >
              {size}
            </p>
          )}
        </div>

       

      </div>
    </div>
  )
}

// =================== Main Page ===================
export default function About() {
  const [, setIsDarkMode] = useState(false) // Fixed unused variable warning

  // Detect system dark mode
  useEffect(() => {
    const dark = window.matchMedia("(prefers-color-scheme: dark)").matches
    setIsDarkMode(dark)
  }, [setIsDarkMode])

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-black dark:via-slate-900 dark:to-black" />

      <Head>
        <title>CodeCompass</title>
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
        </div>
      </section>

      {/* Team Section */}
     <section className="team-gradient-bg min-h-screen py-20 relative">
      {/* Flowing Lines Background */}
      <div className="flowing-lines" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-6xl md:text-7xl font-black text-white mb-6 tracking-tight">
            MEET OUR <span className="text-primary drop-shadow-lg">TEAM</span>
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            The brilliant minds behind our success – mentors and innovators dedicated to revolutionizing the future of
            technology and development.
          </p>
        </div>

        {/* Mentors Section */}
        <div className="mb-20">
          <h3 className="text-4xl font-bold text-center text-white mb-12">
            Our <span className="text-primary">Mentors</span>
          </h3>
          <div className="flex flex-wrap justify-center gap-12">
            {mentors.map((mentor, idx) => (
              <TeamCard key={idx} {...mentor} index={true} />
            ))}
          </div>
        </div>

        {/* Core Team Section */}
        <div>
          <h3 className="text-4xl font-bold text-center text-white mb-12">
            Our <span className="text-primary">Core Team</span>
          </h3>
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
}