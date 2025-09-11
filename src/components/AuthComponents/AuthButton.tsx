'use client'

import { useSession, signIn } from "next-auth/react"
import { motion } from "framer-motion"
import { User, LogIn } from "lucide-react"
import Link from "next/link"

export default function AuthButtons() {
  const { data: session } = useSession()

  return (
    <div className="flex gap-2">
      {session?.access_token ? (
        <motion.button
          className="flex items-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-[#CCF301] hover:bg-[#CCF301]/10 rounded-xl transition-all duration-200 font-medium relative group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <User className="h-4 w-4" />
          <span>{session.user?.name}</span>
          <div className="absolute inset-0 bg-[#CCF301]/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 -z-10"></div>
        </motion.button>
      ) : (
        <motion.button
          className="flex items-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-[#CCF301] hover:bg-[#CCF301]/10 rounded-xl transition-all duration-200 font-medium relative group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => signIn("keycloak")}
        >
          <LogIn className="h-4 w-4" />
          <span>Login</span>
          <div className="absolute inset-0 bg-[#CCF301]/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 -z-10"></div>
        </motion.button>
      )}

      <motion.button
        className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-[#CCF301] to-[#CCF301]/80 text-gray-900 hover:from-[#CCF301]/90 hover:to-[#CCF301]/70 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:shadow-[#CCF301]/25 relative overflow-hidden"
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
      >
        <User className="h-4 w-4" />
        <Link href="/signup">
          <span>Sign Up</span>
        </Link>

        {/* Animated background shimmer */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 0.6 }}
        />
      </motion.button>
    </div>
  )
}
