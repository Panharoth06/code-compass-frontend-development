'use client'

import { SignInPage } from "@/components/blocks/sign-in-flow-1";
import { Toaster } from "react-hot-toast";

const RegisterPage = () => {
  return (
    <div className="flex w-full h-screen justify-center items-center">
      <SignInPage />
      <Toaster />
    </div>
  );
};

export default RegisterPage;
