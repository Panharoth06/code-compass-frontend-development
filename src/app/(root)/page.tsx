'use client';

import Homepage from "@/components/homePage/HomePage";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";


export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // If redirected from Keycloak, remove code/session_state from URL
    if (searchParams.has('code') || searchParams.has('session_state')) {
      router.replace('/'); // removes query params
    }
  }, [router, searchParams]);
  return (
    <div>
      <Homepage />
    </div>
  );
}