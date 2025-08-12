// src/components/footer2.tsx
"use client";

import { Logo, LogoImage, LogoText } from "@/components/general/logo";

interface MenuItem {
  title: string;
  links: {
    text: string;
    url: string;
  }[];
}

interface Footer2Props {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  tagline?: string;
  menuItems?: MenuItem[];
  copyright?: string;
  bottomLinks?: {
    text: string;
    url: string;
  }[];
}

const Footer2 = ({
  logo = {
    src: "/images/logo.png", // Assuming your logo is in the public folder
    alt: "logo",
    title: "Square up",
    url: "#",
  },
  menuItems = [
    {
      title: "Home",
      links: [
        { text: "Overview", url: "#" },
        { text: "Pricing", url: "#" },
        { text: "Marketplace", url: "#" },
        { text: "Features", url: "#" },
        { text: "Integrations", url: "#" },
        { text: "Pricing", url: "#" },
      ],
    },
    {
      title: "Services",
      links: [
        { text: "About", url: "#" },
        { text: "Team", url: "#" },
        { text: "Blog", url: "#" },
        { text: "Careers", url: "#" },
        { text: "Contact", url: "#" },
        { text: "Privacy", url: "#" },
      ],
    },
    {
      title: "Work",
      links: [
        { text: "Help", url: "#" },
        { text: "Sales", url: "#" },
        { text: "Advertise", url: "#" },
      ],
    },
    {
      title: "Process",
      links: [
        { text: "Twitter", url: "#" },
        { text: "Instagram", url: "#" },
        { text: "LinkedIn", url: "#" },
      ],
    },
    {
      title: "About",
      links: [
        { text: "Twitter", url: "#" },
        { text: "Instagram", url: "#" },
        { text: "LinkedIn", url: "#" },
      ],
    },
    {
      title: "Careers",
      links: [
        { text: "Twitter", url: "#" },
        { text: "Instagram", url: "#" },
        { text: "LinkedIn", url: "#" },
      ],
    },
    {
      title: "Contact",
      links: [
        { text: "Twitter", url: "#" },
        { text: "Instagram", url: "#" },
        { text: "LinkedIn", url: "#" },
      ],
    },
  ],
  copyright = "© 2023 CodeCompass. All rights reserved.",
  bottomLinks = [
    { text: "Terms and Conditions", url: "#" },
    { text: "Privacy Policy", url: "#" },
  ],
}: Footer2Props) => {
  return (
    <section className="py-32">
      <div className="container mx-auto px-6">
        <footer>
          <div className="grid grid-cols-2 lg:grid-cols-6 items-center">
            <div className="col-span-2 mb-8 lg:mb-0">
              <div className="flex items-center gap-2 lg:justify-start">
                <Logo url={logo.url}>
                  <LogoImage
                    src={logo.src}
                    alt={logo.alt}
                    title={logo.title}
                    className="h-10"
                  />
                  <LogoText className="text-xl">{logo.title}</LogoText>
                </Logo>
              </div>
            </div>

            {/* Menu Titles */}
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 col-span-4">
              <div className="grid grid-cols-2 lg:flex lg:flex-row lg:gap-8 col-span-4">
                {menuItems.map((section, sectionIdx) => (
                  <div key={sectionIdx} className="mb-4 lg:mb-0">
                    <h5 className="font-bold whitespace-nowrap">
                      {section.title}
                    </h5>
                    {/* You can add the links below if needed */}
                    {/* <ul>
                      {section.links.map((link, idx) => (
                        <li key={idx}>
                          <a href={link.url}>{link.text}</a>
                        </li>
                      ))}
                    </ul> */}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="text-muted-foreground mt-24 flex flex-col justify-between gap-4 border-t pt-8 text-sm font-medium md:flex-row md:items-center">
            <ul className="flex gap-4">
              {bottomLinks.map((link, linkIdx) => (
                <li key={linkIdx} className="hover:text-primary underline">
                  <a href={link.url}>{link.text}</a>
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
