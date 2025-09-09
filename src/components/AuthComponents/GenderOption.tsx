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
              className="w-full justify-between bg-gray-800/50 text-gray-200 border-gray-600 hover:bg-gray-700/50 hover:text-white focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              {field.value || "Select gender"}
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full bg-gray-800 text-gray-200 border-gray-600" align="start">
            <DropdownMenuLabel className="text-gray-200">Gender</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gray-600" />
            <DropdownMenuRadioGroup
              value={field.value}
              onValueChange={field.onChange}
              className="w-full"
            >
              <DropdownMenuRadioItem 
                value="MALE" 
                className="hover:bg-gray-700 focus:bg-gray-700 text-gray-200"
              >
                Male
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem 
                value="FEMALE" 
                className="hover:bg-gray-700 focus:bg-gray-700 text-gray-200"
              >
                Female
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem 
                value="OTHER" 
                className="hover:bg-gray-700 focus:bg-gray-700 text-gray-200"
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
