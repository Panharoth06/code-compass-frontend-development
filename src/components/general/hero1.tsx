import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

interface Hero1Props {
  badge?: string;
  heading: string;
  description: string;
  buttons?: {
    primary?: {
      text: string;
      url: string;
    };
    secondary?: {
      text: string;
      url: string;
    };
  };
  image: {
    src: string;
    alt: string;
  };
}

const Hero1 = ({
  heading = "Welcome To CodeCompass",
  description = "Master algorithms, ace interviews, and level up your programming skills with our cutting-edge coding platform designed for the next generation of developers.",
  buttons = {
    primary: {
      text: "Explore Problems",
      url: "#",
    },
    secondary: {
      text: "View Leaderboard",
      url: "#",
    },
  },
  image = {
    src: "/images/hero.png",
    alt: "Hero section demo image showing interface components",
  },
}: Hero1Props) => {
  return (
    <section className="py-32">
      <div className="container">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <h2 className="my-6 text-pretty text-4xl font-bold lg:text-8xl">
              {heading}
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl lg:text-xl">
              {description}
            </p>
            <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
              {buttons.primary && (
                <Button asChild className="w-full sm:w-auto">
                  <Link href={buttons.primary.url}>{buttons.primary.text}</Link>
                </Button>
              )}
              {buttons.secondary && (
                <Button asChild variant="outline" className="w-full sm:w-auto">
                  <Link href={buttons.secondary.url}>
                    {buttons.secondary.text}
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              )}
            </div>
          </div>
          <Image
            src={image.src}
            alt={image.alt}
            width="1500"
            height="1500"
            className="max-h-96 w-full rounded-md object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export { Hero1 };
