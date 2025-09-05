"use client";
import React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import Image from "next/image";
import codeEditorImage from "../../../public/image/image.png"

export function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden min-h-screen transition-all duration-500 font-['Barlow',sans-serif] ">
      <ContainerScroll
        titleComponent={
          <>
            <h2 className="text-4xl font-semibold text-black dark:text-white">
              Interactive Code Editor <br />
            </h2>
          </>
        }
      >
        <div
          className="mx-auto rounded-2xl h-full w-full flex items-center justify-center text-white text-2xl font-bold shadow-2xl"
          style={{ height: '100%', width: '100%' }}
        >
          <div className="text-center">
            <div className="text-lg font-normal mt-2 opacity-80">
              <Image 
              src={codeEditorImage}
              height={800}
              width={1300}
              alt="Code Editor Illustration"
              />
            </div>
          </div>
        </div>
      </ContainerScroll>
    </div>
  );
}