import { Shield, FileText, Lock, Eye, Users, Database, Settings, Globe } from "lucide-react"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Gradient Background */}
      <section className="relative overflow-hidden bg-gradient-to-br from-lime-300 via-emerald-400 to-teal-500 px-6 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="flex flex-col justify-center">
              <h1 className="text-5xl font-black tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
                Privacy & Policy
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-gray-800 lg:text-xl max-w-lg">
                Your Privacy, Our Priority. We respect your privacy regarding any information we may collect from you
                across our coding platform and services.
              </p>
            </div>

            {/* Right Illustration */}
            <div className="relative flex items-center justify-center">
              {/* Isometric base platform */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-80 h-4 bg-white/30 rounded-full transform rotate-3 skew-x-12"></div>

              {/* Privacy Policy Document - more prominent and 3D */}
              <div className="absolute left-1/2 top-16 -translate-x-1/2 transform rotate-6">
                <div className="relative">
                  {/* Document shadow */}
                  <div className="absolute top-2 left-2 h-56 w-40 rounded-lg bg-black/20"></div>
                  {/* Main document */}
                  <div className="relative h-56 w-40 rounded-lg bg-white shadow-2xl border">
                    <div className="p-4">
                      <div className="mb-3 flex items-center gap-2">
                        <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                          <FileText className="h-3 w-3 text-white" />
                        </div>
                        <span className="text-xs font-bold text-gray-800">PRIVACY POLICY</span>
                      </div>
                      <div className="space-y-2">
                        <div className="h-2 w-full rounded bg-gray-300"></div>
                        <div className="h-2 w-4/5 rounded bg-gray-200"></div>
                        <div className="h-2 w-full rounded bg-gray-300"></div>
                        <div className="h-2 w-3/4 rounded bg-gray-200"></div>
                        <div className="h-2 w-full rounded bg-gray-300"></div>
                        <div className="h-2 w-2/3 rounded bg-gray-200"></div>
                        <div className="h-2 w-5/6 rounded bg-gray-300"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3D Person Figure - more detailed */}
              <div className="absolute bottom-12 right-20 transform">
                {/* Person body */}
                <div className="relative">
                  {/* Legs */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
                    <div className="w-3 h-12 bg-blue-800 rounded-b"></div>
                    <div className="w-3 h-12 bg-blue-700 rounded-b ml-1"></div>
                  </div>
                  {/* Torso */}
                  <div className="w-8 h-16 bg-white rounded-t-lg relative bottom-12 shadow-lg"></div>
                  {/* Head */}
                  <div className="w-6 h-6 bg-orange-400 rounded-full mx-auto relative bottom-14 shadow-md"></div>
                  {/* Arms */}
                  <div className="absolute top-2 -left-2 w-3 h-8 bg-orange-300 rounded transform -rotate-12"></div>
                  <div className="absolute top-2 -right-2 w-3 h-8 bg-orange-300 rounded transform rotate-12"></div>
                </div>
              </div>

              {/* Security Shield - larger and more prominent */}
              <div className="absolute left-16 top-24 transform -rotate-12">
                <div className="relative">
                  <div className="absolute top-1 left-1 w-20 h-24 bg-black/20 rounded-t-full"></div>
                  <div className="w-20 h-24 bg-gradient-to-b from-purple-500 to-purple-700 rounded-t-full shadow-xl flex items-center justify-center">
                    <Shield className="h-10 w-10 text-white" />
                  </div>
                </div>
              </div>

              {/* Floating Security Icons */}
              <div className="absolute right-12 top-32 transform rotate-12">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg shadow-lg flex items-center justify-center">
                  <Lock className="h-6 w-6 text-white" />
                </div>
              </div>

              <div className="absolute left-20 bottom-20 transform -rotate-6">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-700 rounded-full shadow-lg flex items-center justify-center">
                  <Eye className="h-5 w-5 text-white" />
                </div>
              </div>

              {/* Decorative plant */}
              <div className="absolute bottom-16 left-12 transform">
                <div className="relative">
                  <div className="w-4 h-3 bg-orange-600 rounded-t"></div>
                  <div className="w-6 h-8 bg-green-600 rounded-t-full mx-auto -mt-1"></div>
                  <div className="w-2 h-2 bg-green-700 rounded-full mx-auto -mt-1"></div>
                </div>
              </div>

              {/* Additional floating elements */}
              <div className="absolute top-20 right-24 w-3 h-3 bg-yellow-400 rounded-full shadow"></div>
              <div className="absolute top-40 left-8 w-2 h-2 bg-pink-400 rounded-full shadow"></div>
              <div className="absolute bottom-32 right-8 w-4 h-4 bg-indigo-400 rounded shadow"></div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg className="relative block w-full h-20" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              fill="#1f2937"
            ></path>
          </svg>
        </div>
      </section>

      {/* Dark Content Section */}
      <section className="bg-gray-900 px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-4xl">
          <div className="bg-gray-800 p-8 rounded-2xl shadow-lg">
            <h3 className="mr-2 text-2xl">Our Commitment to Your Privacy</h3>
            <p className="text-lg leading-relaxed text-gray-300 mb-8">
              At <span className="text-[#b4ff00]">CodeCompass</span> , we are committed to protecting your privacy and ensuring the security of your personal
              information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information
              when you visit our coding education platform, use our services, or engage with our content.
            </p>
            <p className="text-lg leading-relaxed text-gray-300 mb-8">
              By accessing or using our platform, you acknowledge that you have read, understood, and agree to be bound
              by this Privacy Policy. If you do not agree with our policies and practices, please do not use our
              services.
            </p>
          
            <h3 className="text-2xl font-bold mb-4 flex items-center ">
              <Database className="mr-3 h-6 w-6 text-[#b4ff00]" />
              What information do we collect?
            </h3>

            {/* Personal Information Section */}
            <div className="mb-8">
              <h4 className="text-xl font-bold mt-6 mb-2 text-white">Personal Information</h4>
              <p className="text-gray-300 mb-4 leading-relaxed">
                We collect personal information that you provide directly to us when you create an account, subscribe to
                our services, or communicate with us.
              </p>
              <ul className="list-disc list-inside text-gray-300 mb-6 ml-4 space-y-2">
                <li>Account registration details (name, email, username)</li>
                <li>Profile information and preferences</li>
                <li>Communication and correspondence records</li>
                <li>Payment information (processed securely by third-party providers)</li>
              </ul>
            </div>

            {/* Usage and Activity Data Section */}
            <div className="mb-8">
              <h4 className="text-xl font-bold mt-6 mb-2 text-white">Usage and Activity Data</h4>
              <p className="text-gray-300 mb-4 leading-relaxed">
                We automatically collect certain information about your device and usage of our platform.
              </p>
              <ul className="list-disc list-inside text-gray-300 mb-6 ml-4 space-y-2">
                <li>Code submissions, projects, and programming exercises</li>
                <li>Learning progress, course completion, and achievements</li>
                <li>Platform navigation patterns and feature usage</li>
                <li>Session duration and interaction timestamps</li>
              </ul>
            </div>

            {/* Technical Information Section */}
            <div className="mb-8">
              <h4 className="text-xl font-bold mt-6 mb-2 text-white">Technical Information</h4>
              <p className="text-gray-300 mb-4 leading-relaxed">
                We collect technical data to ensure platform security, optimize performance, and provide technical
                support when needed.
              </p>
              <ul className="list-disc list-inside text-gray-300 mb-6 ml-4 space-y-2">
                <li>IP address and geographic location (general)</li>
                <li>Browser type, version, and operating system</li>
                <li>Device information and screen resolution</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </div>

            {/* Use of Data Section */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4 flex items-center ">
                <Settings className="mr-3 h-6 w-6 text-[#b4ff00]"  />
                Use of Data
              </h3>
              <p className="text-gray-300 mb-4 leading-relaxed">We use the information we collect to:</p>
              <ul className="list-disc list-inside text-gray-300 mb-8 ml-4 space-y-2">
                <li>Provide, maintain, and improve our educational services</li>
                <li>Process enrollments and track course progress</li>
                <li>Send you important updates about your courses and account</li>
                <li>Respond to your comments, questions, and support requests</li>
                <li>Analyze usage patterns to enhance user experience</li>
                <li>Comply with legal obligations and protect our rights</li>
              </ul>
            </div>

            {/* Cookies and Tracking Section */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4 flex items-center ">
                <Globe className="mr-3 h-6 w-6 text-[#b4ff00]" />
                Cookies and Tracking
              </h3>
              <p className="text-gray-300 mb-4 leading-relaxed">
                We use cookies and similar tracking technologies to enhance your experience on our platform. Cookies
                help us remember your preferences and provide personalized content.
              </p>
              <p className="text-gray-300 mb-4 leading-relaxed">Types of cookies we use:</p>
              <ul className="list-disc list-inside text-gray-300 mb-8 ml-4 space-y-2">
                <li>Essential Cookies: Required for basic platform functionality</li>
                <li>Performance Cookies: Help us understand how you use our platform</li>
                <li>Preference Cookies: Remember your settings and preferences</li>
                <li>Marketing Cookies: Used to deliver relevant educational content</li>
              </ul>
            </div>

            {/* Third-party Services Section */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4 flex items-center ">
                <Shield className="mr-3 h-6 w-6 text-[#b4ff00]" />
                Third-party Services
              </h3>
              <p className="text-gray-300 mb-4 leading-relaxed">
                We may use third-party services to enhance our educational platform. These services have their own
                privacy policies and may collect information about you.
              </p>
              <p className="text-gray-300 mb-4 leading-relaxed">Third-party services we use include:</p>
              <ul className="list-disc list-inside text-gray-300 mb-8 ml-4 space-y-2">
                <li>Analytics services to understand platform usage</li>
                <li>Payment processors for course enrollments</li>
                <li>Email services for communications</li>
                <li>Cloud storage providers for content delivery</li>
                <li>Video hosting platforms for educational content</li>
              </ul>
            </div>

            {/* Your Rights Section */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4 flex items-center ">
                <Users className="mr-3 h-6 w-6 text-[#b4ff00]" />
                Your Rights
              </h3>
              <p className="text-gray-300 mb-4 leading-relaxed">
                You have several rights regarding your personal information:
              </p>
              <ul className="list-disc list-inside text-gray-300 mb-6 ml-4 space-y-2">
                <li>Access: Request a copy of the personal information we hold about you</li>
                <li>Correction: Ask us to correct any inaccurate or incomplete information</li>
                <li>Deletion: Request deletion of your personal information</li>
                <li>Portability: Request a copy of your data in a structured format</li>
                <li>Restriction: Ask us to limit how we use your information</li>
                <li>Objection: Object to certain uses of your personal information</li>
              </ul>
              <p className="text-gray-300 leading-relaxed">
                To exercise any of these rights, please contact us using the information provided in the Contact Us
                section below.
              </p>
            </div>
          </div>

          
        </div>
      </section>
    </div>
  )
}
