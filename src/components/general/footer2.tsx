// src/components/general/footer2.tsx
"use client";
import Link from "next/link";
import Image from "next/image"; // Added Next.js Image import
import { Logo, LogoImage, LogoText } from "@/components/general/logo";

interface MenuItem {
  title: string;
  links: { text: string; url: string }[];
}

interface Footer2Props {
  logo?: { url: string; src: string; alt: string; title: string };
  menuItems?: MenuItem[];
  copyright?: string;
  bottomLinks?: { text: string; url: string }[];
}

// Client-only Social Icons
const SocialIcons = () => {
  const icons = [
    { src: "/images/contactIcon/Icon.svg", alt: "Facebook" },
    { src: "/images/contactIcon/Icon-1.svg", alt: "Twitter" },
    { src: "/images/contactIcon/Icon-2.svg", alt: "LinkedIn" },
  ];

  return (
    <div className="flex gap-4">
      {icons.map((icon, idx) => (
        <Link key={idx} href="#">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 transition">
            <Image
              src={icon.src || "/placeholder.svg"}
              alt={icon.alt}
              width={20}
              height={20}
              className="w-5 h-5"
            />
          </div>
        </Link>
      ))}
    </div>
  );
};

const Footer2 = ({
  logo = {
    src: "/images/Logo.svg",
    alt: "logo",
    title: "Square up",
    url: "#",
  },
  menuItems = [
    { title: "Home", links: [{ text: "Overview", url: "#" }] },
    { title: "Services", links: [{ text: "About", url: "#" }] },
    { title: "Work", links: [{ text: "Help", url: "#" }] },
    { title: "Process", links: [{ text: "Twitter", url: "#" }] },
    { title: "About", links: [{ text: "Instagram", url: "#" }] },
    { title: "Careers", links: [{ text: "LinkedIn", url: "#" }] },
    { title: "Contact", links: [{ text: "Contact", url: "#" }] },
  ],
  copyright = "© 2025 CodeCompass. All rights reserved.",
  bottomLinks = [
    { text: "Terms and Conditions", url: "#" },
    { text: "Privacy Policy", url: "#" },
  ],
}: Footer2Props) => {
  return (
    <section className="py-16 bg-neutral-900 text-white">
      {/* reduced from py-32 to py-16 */}
      <div className="container mx-auto px-6">
        <footer>
          <div className="grid grid-cols-2 lg:grid-cols-12 justify-between items-center gap-8">
            {/* Logo */}
            <div className="col-span-2 mb-4 lg:mb-0">
              {/* reduced mb */}
              <div className="flex items-center gap-2 lg:justify-start">
                <Logo url={logo.url}>
                  <LogoImage
                    src={logo.src}
                    alt={logo.alt}
                    title={logo.title}
                    className="block w-10 h-10"
                  />
                  <LogoText className="text-xl">{logo.title}</LogoText>
                </Logo>
              </div>
            </div>

            {/* Menu Titles */}
            <div className="col-span-6 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-8 gap-4">
              {menuItems.map((section, sectionIdx) => (
                <div key={sectionIdx} className="mb-2 lg:mb-0">
                  {/* reduced mb */}
                  <p className="font-bold whitespace-nowrap">{section.title}</p>
                </div>
              ))}
            </div>

            {/* Social Icons */}
            <div className="col-span-4 flex flex-col lg:flex-row lg:justify-end items-start lg:items-center gap-4">
              <p className="font-bold">Stay Connected</p>
              <SocialIcons />
            </div>
          </div>

          {/* Bottom Links */}
          <div className="text-muted-foreground mt-12 flex flex-col justify-between gap-2 border-t pt-4 text-sm font-medium md:flex-row md:items-center">
            {/* mt-24 -> mt-12, pt-8 -> pt-4 */}
            <ul className="flex gap-4">
              {bottomLinks.map((link, linkIdx) => (
                <li key={linkIdx} className="hover:text-primary underline">
                  <Link href={link.url}>{link.text}</Link>
                </li>
              ))}
            </ul>
            <p>{copyright}</p>
          </div>
        </footer>
      </div>
    </section>
  );
};

export { Footer2 };
