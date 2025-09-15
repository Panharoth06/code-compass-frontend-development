"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
// import { FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";

// =================== Data ===================
const stats = [
  { value: "100+", label: "Algorithm Challenges" },
  { value: "150K+", label: "Developer Community" },
  { value: "95%", label: "Interview Success" },
  { value: "FAANG", label: "Placement Rate" },
];

interface TeamCardProps {
  name: string;
  role: string;
  image: string;
  bio: string;
  size?: string;
  index?: number;
}

interface StatCardProps {
  value: string;
  label: string;
}

// Custom SVG Icons to replace react-icons
const FacebookIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const GitHubIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

// Data
const mentors = [
  {
    name: "Mr. kay Kao",
    role: "Instructor",
    bio: "Former Google Senior Engineer with 15+ years experience in algorithms and machine learning. PhD in Computer Science from Stanford.",
    image: "/img/mentor-1.png",
  },
  {
    name: "Mr. Sreng Chipor",
    role: "Instructor", // Fixed typo: "Intructor" -> "Instructor"
    bio: "Former Google Senior Engineer with 15+ years experience in algorithms and machine learning. PhD in Computer Science from Stanford.",
    image: "/img/mentor-2.jpg",
  },
];

const coreTeam = [
  {
    name: "Mr. Panharoth",
    role: "Full-Stack Developer",
    bio: "Former Google Senior Engineer with 15+ years experience in algorithms and machine learning. PhD in Computer Science from Stanford.",
    image: "/img/team-leader.jpg",
  },
  {
    name: "Mr. Rotha",
    role: "Full-Stack Developer",
    bio: "Former Google Senior Engineer with 15+ years experience in algorithms and machine learning. PhD in Computer Science from Stanford.",
    image: "/img/rotha.jpg",
  },
  {
    name: "Ms. Bunvarn",
    role: "Full-Stack Developer",
    bio: "Former Google Senior Engineer with 15+ years experience in algorithms and machine learning. PhD in Computer Science from Stanford.",
    image: "/img/bunvarn.jpg",
  },
  {
    name: "Mr. Devit",
    role: "Full-Stack Developer",
    bio: "Former Google Senior Engineer with 15+ years experience in algorithms and machine learning. PhD in Computer Science from Stanford.",
    image: "/img/devit.jpg",
  },
  {
    name: "Mr. Kimsang",
    role: "Full-Stack Developer", // Fixed: "Full-Stack" -> "Full-Stack Developer"
    bio: "Former Google Senior Engineer with 15+ years experience in algorithms and machine learning. PhD in Computer Science from Stanford.",
    image: "/img/kimsang.jpg",
  },
  {
    name: "Ms. Raksmey",
    role: "Full-Stack Developer",
    bio: "Former Google Senior Engineer with 15+ years experience in algorithms and machine learning. PhD in Computer Science from Stanford.",
    image: "/img/raksmey.jpg",
  },
  {
    name: "Mr. Narong",
    role: "Full-Stack Developer",
    bio: "Former Google Senior Engineer with 15+ years experience in algorithms and machine learning. PhD in Computer Science from Stanford.",
    image: "/img/narong.jpg",
  },
];

// =================== Components ===================

// Reusable Stat Card
function StatCard({ value, label }: StatCardProps) {
  return (
    <div className="bg-gray-100 dark:bg-[#1a1a1a] p-6 rounded-lg text-center shadow-lg transition hover:shadow-[0_0_30px_0_rgba(180,255,0,0.8)]">
      <p className="text-4xl font-bold text-[#b4ff00]">{value}</p>
      <p className="mt-2 text-gray-600 dark:text-gray-400">{label}</p>
    </div>
  );
}

// Reusable Team Member Card
function TeamCard({
  name,
  role,
  image,
  bio,
  size = "w-48 h-48",
}: TeamCardProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div
        className={`circle-frame relative ${size} rounded-full overflow-hidden group`}
      >
        <div className="circle-content absolute inset-4 rounded-full flex items-center justify-center overflow-hidden">
          <Image
            src={image}
            alt={name}
            width={160}
            height={160}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 text-center">
          <p className="text-white font-semibold text-sm text-center mb-1">
            {name}
          </p>
          <p className="text-primary text-xs mb-2 line-clamp-2 text-center">
            {role}
          </p>
          <p className="text-white text-xs mb-3 line-clamp-4 px-2 text-center leading-relaxed">
            {bio}
          </p>
          <div className="flex gap-2 justify-center">
            <a className="w-6 h-6 rounded-full border border-primary flex items-center justify-center hover:bg-primary hover:text-black transition">
              <FacebookIcon />
            </a>
            <a className="w-6 h-6 rounded-full border border-primary flex items-center justify-center hover:bg-primary hover:text-black transition">
              <LinkedInIcon />
            </a>
            <a className="w-6 h-6 rounded-full border border-primary flex items-center justify-center hover:bg-primary hover:text-black transition">
              <GitHubIcon />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// =================== Main Page ===================
export default function About() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Detect system dark mode
  useEffect(() => {
    const dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDarkMode(dark);
  }, []);


  return (
    <div>
      <Head>
        <title>CodeCompass</title>
        <meta
          name="description"
          content="Navigate your coding journey with CodeCompass"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Hero Section */}
      <section className="bg-gray-50 text-black dark:bg-gray-900 dark:text-white py-16 mb-16 ">
        <header className="text-center mb-16 flex flex-col items-center">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <Image
              src="/compass.png"
              alt="CodeCompass Logo"
              width={40}
              height={40}
              className="w-10 h-10"
            />
            <h3 className="text-3xl font-semibold">CodeCompass</h3>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-center">
            Navigate Your <span className="text-[#b4ff00]">Coding</span> <br />
            <span className="text-[#b4ff00]">Journey</span>
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl text-gray-700 dark:text-gray-300 mt-4 text-center">
            Master data structures, algorithms, and system design with our
            comprehensive coding platform. Practice with{" "}
            <strong className="text-[#b4ff00] font-bold">
              real interview questions
            </strong>{" "}
            from top tech companies.
          </p>
        </header>

        <div className="flex flex-wrap justify-center gap-6 mb-16 w-full max-w-5xl mx-auto px-4">
          {stats.map((stat, i) => (
            <StatCard key={i} value={stat.value} label={stat.label} />
          ))}
        </div>
      </section>

      {/* Code & Design Section */}
      <section className="bg-gray-50 text-black dark:bg-gray-900 dark:text-white py-16 mb-16">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h3 className="text-4xl md:text-5xl font-bold text-[#D7FC4A]">
              Where Code Meets Design <br />
              <span className="text-black dark:text-white">Excellence</span>
            </h3>
            <p className="mt-6 text-lg text-gray-700 dark:text-gray-400 leading-relaxed">
              CodeCompass provides a comprehensive suite of coding challenges,
              from basic algorithms to advanced system design. Our platform
              mirrors real technical interviews with{" "}
              <span className="font-semibold text-[#D7FC4A]">
                curated problems from FAANG companies and competitive
                programming contests,
              </span>{" "}
              enhanced with integrated Figma design challenges for full-stack
              mastery.
            </p>
          </div>

          {/* Code Block */}
          <div className="bg-gray-200 dark:bg-gray-800 p-6 rounded-lg shadow-xl">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="ml-4 text-gray-600 dark:text-gray-400 text-sm">
                CodeCompass.js
              </span>
            </div>
            <pre className="text-sm font-mono overflow-auto">
              <code className="text-gray-800 dark:text-gray-200">
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
      </section>

      {/* Mission Section */}
      <section className="bg-gray-50 text-black dark:bg-gray-900 dark:text-white py-16 mb-16 text-center px-6">
        <h3 className="text-3xl md:text-5xl font-bold text-[#D7FC4A] mb-6">
          Our Mission
        </h3>
        <p className="text-base md:text-lg text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
          Providing world-class algorithmic training and interview preparation
          through challenging problems, competitive programming, and
          comprehensive system design education.
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
              className="flex flex-col items-center p-8 rounded-lg border border-gray-700 transition-all duration-300 hover:shadow-[0_0_30px_0_rgba(180,255,0,0.8)]"
            >
              <div className="p-5 bg-gray-800 rounded-full mb-6 text-3xl">
                {item.icon}
              </div>
              <h4 className="text-lg md:text-xl font-semibold mb-3">
                {item.title}
              </h4>
              <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-gray-50 text-black dark:bg-gray-900 dark:text-white py-16 mb-16">
        <div className="text-center mb-10">
          <h3 className="text-3xl font-bold text-primary">Meet Our Team</h3>
          <p className="mt-2 text-gray-300 max-w-2xl mx-auto">
            The brilliant minds behind CodeCompass – mentors and innovators
            dedicated to revolutionizing coding education.
          </p>
        </div>

        {/* Mentors */}
        <div className="mb-12">
          <h4 className="text-2xl font-semibold mb-6 text-center">
            Our Mentors
          </h4>
          <div className="flex flex-wrap justify-center gap-10">
            {mentors.map((mentor, idx) => (
              <TeamCard key={idx} {...mentor} />
            ))}
          </div>
        </div>

        {/* Core Team */}
        <div className="mb-12">
          <h4 className="text-2xl font-semibold mb-6 text-center">
            Our Core Team
          </h4>
          <div className="flex flex-col items-center mb-12">
            <TeamCard {...coreTeam[0]} />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-10">
            {coreTeam.slice(1).map((member, idx) => (
              <TeamCard key={idx} {...member} />
            ))}
          </div>
        </div>
      </section>

      {/* Creator CTA Section */}
      <section className="bg-gray-50 text-black dark:bg-gray-900 dark:text-white py-16 ">
        <div className="max-w-xl mx-auto bg-white dark:bg-[#161b22] rounded-2xl shadow-lg p-8 text-center">
          <h3 className="text-3xl sm:text-4xl font-bold mb-4">
            Wanna Become Our Creator?
          </h3>
          <p className="text-base sm:text-lg font-medium mb-6 text-gray-700 dark:text-gray-300">
            Join our community of problem setters and help create challenging
            coding problems. Share your expertise and inspire thousands of
            developers worldwide.
          </p>
          <Link
            href="/join-as-creator"
            className="inline-block py-3 px-6 rounded-full text-black font-semibold text-lg bg-[#b4ff00] transition-transform transform hover:scale-105 duration-300 ease-in-out shadow-[0_0_20px_0_rgba(180,255,0,0.5)] hover:shadow-[0_0_30px_0_rgba(180,255,0,0.8)]"
          >
            Join as Creator
          </Link>
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
  );
}
