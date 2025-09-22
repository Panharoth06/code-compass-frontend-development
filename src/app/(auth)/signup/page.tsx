'use client'

import { SignInPage } from "@/components/AuthComponents/SignInPage";
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
