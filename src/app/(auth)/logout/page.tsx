'use client'
import { Button } from '@/components/ui/button'
import { calcGeneratorDuration } from 'framer-motion'
import { signOut } from 'next-auth/react'
import React from 'react'

const Logout = () => {

  return (
    <div>
      <Button onClick={() => {
        signOut({ callbackUrl: "http://localhost:3000"})
        }}>
        Logout
      </Button>
    </div>
  )
}

export default Logout
