"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Controller, useFormContext } from "react-hook-form"

export function GenderOption() {
  const { control } = useFormContext();

  return (
    <Controller
      name="gender"
      control={control}
      render={({ field }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="backdrop-blur-[2px] w-full flex items-center justify-between bg-white/5 hover:bg-white/10 hover:text-white text-white border border-white/10 rounded-full transition-colors text-base sm:text-lg"
            >
              {field.value || "Select gender"}
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full text-gray-200 bg-black/70 backdrop:blur-3xl border-gray-600" align="start">
            <DropdownMenuLabel className="text-gray-200 bg-black/50 rounded text-base">Gender</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-black/50 hover:bg-white/10 hover:text-white text-white transition-colors text-sm sm:text-base backdrop:blur-[2px]" />
            <DropdownMenuRadioGroup
              value={field.value}
              onValueChange={field.onChange}
              className="w-full text-white py-3 px-4 bg-black/50 rounded transition-colors text-sm sm:text-base"
            >
              <DropdownMenuRadioItem
                value="MALE"
                className=" text-gray-200 text-base"
              >
                Male
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem
                value="FEMALE"
                className=" text-gray-200 text-base"
              >
                Female
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem
                value="OTHER"
                className=" text-gray-200 text-base"
              >
                Other
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    />
  );
}
