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

export function GnederOption() {
  const {control} = useFormContext()


  return (
     <Controller
      name="gender"
      control={control}
      render={({ field }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full">
              {field.value || "Select gender"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full" align="start">
            <DropdownMenuLabel>Gender</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={field.value}
              onValueChange={field.onChange} // 👈 connect to form
              className="w-full"
            >
              <DropdownMenuRadioItem value="MALE">Male</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="FEMALE">Female</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="OTHER">Other</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    />
  );
}
