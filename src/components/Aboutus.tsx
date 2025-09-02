import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function Page() {
  const mentors = [
    { name: "Mentor 1", role: "Mentor", image: "/mentor-1.jpg" },
    { name: "Mentor 2", role: "Mentor", image: "/mentor-2.jpg" },
  ];

  const coreTeam = [
    { name: "Team Leader", role: "Team Leader", image: "/team-leader.jpg" },
    { name: "Member 1", role: "Frontend Developer", image: "/team-member-1.jpg" },
    { name: "Member 2", role: "UI/UX Designer", image: "/team-member-2.jpg" },
    { name: "Member 3", role: "Backend Developer", image: "/team-member-3.jpg" },
    { name: "Member 4", role: "QA Tester", image: "/team-member-4.jpg" },
    { name: "Member 5", role: "Project Manager", image: "/team-member-5.jpg" },
    { name: "Member 6", role: "Support Engineer", image: "/team-member-6.jpg" },
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col items-center py-12">
        <header className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center space-x-4 mb-4">
            <Image
              src="/compass.png"
              alt="CodeCompass Logo"
              width={40}
              height={40}
              className="w-10 h-10"
            />
            <h3 className="text-3xl font-semibold">CodeCompass</h3>
          </div>
          <h3 className="text-5xl md:text-6xl font-extrabold">
            Navigate Your <span className="text-[#b4ff00]">Coding </span>
            <br /> <span className="text-[#b4ff00]">Journey</span>
          </h3> <br />
          <p className="text-xl md:text-2xl max-w-3xl text-gray-700 dark:text-gray-300">
            Master data structures, algorithms, and system design with our
            comprehensive coding platform. Practice with{" "}
            <strong className="text-[#b4ff00] font-bold">
              real interview questions
            </strong>{" "}
            from top tech companies.
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16 w-full max-w-5xl">
          {[
            { value: "100+", label: "Algorithm Challenges" },
            { value: "150K+", label: "Developer Community" },
            { value: "95%", label: "Interview Success" },
            { value: "FAANG", label: "Placement Rate" },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-gray-100 dark:bg-[#1a1a1a] p-6 rounded-lg text-center shadow-lg transition hover:shadow-[0_0_30px_0_rgba(180,255,0,0.8)]"
            >
              <p className="text-4xl font-bold text-[#b4ff00]">{stat.value}</p>
              <p className="mt-2 text-gray-600 dark:text-gray-400">{stat.label}</p>
            </div>
          ))}
        </section>
      </div>

      {/* Code & Design Section */}
      <section className="bg-gray-50 text-black dark:bg-gray-900 dark:text-white py-12 px-4 md:px-20">
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
                curated problems from FAANG companies and competitive programming
                contests,
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
       <section className="bg-gray-900 text-white py-12 px-4 md:px-20 text-center">
      <h3 className="text-4xl md:text-5xl font-bold text-[#D7FC4A] mb-4">Our Mission</h3>
      <p className="text-lg text-gray-400 mb-10 max-w-3xl mx-auto">
        Providing world-class algorithmic training and interview preparation through challenging problems, competitive programming, and comprehensive system design education.
      </p>

      <div className="flex flex-col md:flex-row justify-center items-center md:items-stretch space-y-8 md:space-y-0 md:space-x-8">
        {/* Box 1: Algorithm Mastery */}
        <div className="flex flex-col items-center p-8 rounded-lg border border-gray-700 w-full md:w-1/3 transition-all duration-300 hover:shadow-[0_0_30px_0_rgba(180,255,0,0.8)]">
          <div className="p-4 bg-gray-800 rounded-full mb-4">
            {/* Replace with an icon component or SVG */}
            <span className="text-2xl">{"< >"}</span>
          </div>
          <h4 className="text-xl font-semibold mb-2">Algorithm Mastery</h4>
          <p className="text-sm text-gray-400">
            From basic sorting to advanced dynamic programming, master every data structure and algorithm with progressive difficulty levels.
          </p>
        </div>

        {/* Box 2: Beginner-Friendly */}
        <div className="flex flex-col items-center p-8 rounded-lg border border-gray-700 w-full md:w-1/3 transition-all duration-300 hover:shadow-[0_0_30px_0_rgba(180,255,0,0.8)]">
          <div className="p-4 bg-gray-800 rounded-full mb-4">
            {/* Replace with an icon component or SVG */}
            <span className="text-2xl">🤖</span>
          </div>
          <h4 className="text-xl font-semibold mb-2">Beginner-Friendly</h4>
          <p className="text-sm text-gray-400">
            From basic sorting to advanced dynamic programming, master every data structure and algorithm with progressive difficulty levels.
          </p>
        </div>

        {/* Box 3: Problem-Solving Skills */}
        <div className="flex flex-col items-center p-8 rounded-lg border border-gray-700 w-full md:w-1/3 transition-all duration-300 hover:shadow-[0_0_30px_0_rgba(180,255,0,0.8)]">
          <div className="p-4 bg-gray-800 rounded-full mb-4">
            {/* Replace with an icon component or SVG */}
            <span className="text-2xl">🚀</span>
          </div>
          <h4 className="text-xl font-semibold mb-2">Problem-Solving Skills</h4>
          <p className="text-sm text-gray-400">
            From basic sorting to advanced dynamic programming, master every data structure and algorithm with progressive difficulty levels.
          </p>
        </div>
      </div>
    </section>

      {/* Team Section */}
  <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col items-center py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <h3 className="text-3xl font-bold text-[#D7FC4A]">Meet Our Team</h3>
        <p className="mt-2 text-gray-300 max-w-2xl">
          The brilliant minds behind CodeCompass – mentors and innovators dedicated 
          to revolutionizing coding education.
        </p>
      </div>

      {/* Mentors */}
      <div className="mb-12">
        <h4 className="text-2xl font-semibold mb-6 text-center">Our Mentors</h4>
        <div className="flex flex-wrap justify-center gap-8">
          {mentors.map((mentor, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full border-4 text-[#D7FC4A] overflow-hidden shadow-lg">
                <Image
                  src={mentor.image}
                  alt={mentor.name}
                  width={128}
                  height={128}
                  className="object-cover w-full h-full"
                />
              </div>
              <p className="mt-3 font-medium">{mentor.name}</p>
              <p className="text-sm text-gray-400">{mentor.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Core Team */}
      <div>
        <h4 className="text-2xl font-semibold mb-6 text-center">Our Core Team</h4>
        {/* Team Leader */}
        <div className="flex flex-col items-center mb-12">
          <div className="w-36 h-36 rounded-full border-4 text-[#D7FC4A] overflow-hidden shadow-xl">
            <Image
              src={coreTeam[0].image}
              alt={coreTeam[0].name}
              width={144}
              height={144}
              className="object-cover w-full h-full"
            />
          </div>
          <p className="mt-3 font-medium">{coreTeam[0].name}</p>
          <p className="text-sm text-[#D7FC4A]">{coreTeam[0].role}</p>
        </div>

        {/* Other Members */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
          {coreTeam.slice(1).map((member, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full border-4 text-[#D7FC4A] overflow-hidden shadow-lg">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={128}
                  height={128}
                  className="object-cover w-full h-full"
                />
              </div>
              <p className="mt-3 font-medium">{member.name}</p>
              <p className="text-sm text-gray-400">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>

      {/* Creator CTA */}
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-[#0d1117] text-black dark:text-white">
        <Head>
          <title>Become a Creator</title>
          <meta
            name="description"
            content="Join our community of problem setters."
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="text-center p-8">
          <h3 className="text-4xl sm:text-5xl font-bold mb-4">
            Wanna Become Our Creator?
          </h3>

          <p className="text-lg sm:text-xl font-medium mb-8 max-w-2xl mx-auto text-gray-700 dark:text-gray-300">
            Join our community of problem setters and help create challenging
            coding problems. Share your expertise and inspire thousands of
            developers worldwide.
          </p>

          <Link
            href="/join-as-creator"
            className="inline-block py-4 px-8 rounded-full text-black font-bold text-lg bg-[#b4ff00] 
              transition-transform transform hover:scale-105 duration-300 ease-in-out 
              shadow-[0_0_20px_0_rgba(180,255,0,0.5)] 
              hover:shadow-[0_0_30px_0_rgba(180,255,0,0.8)]"
          >
            Join as Creator
          </Link>
        </main>
      </div>
    </div>
  );
}
