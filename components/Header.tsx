"use client";
import { Phone, Search, ChevronWide } from "@/components/icons";
import { usePathname } from "next/navigation";
import { useContactModal } from "@/lib/context";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Header() {
  const { state, setState } = useContactModal();
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  interface NavTypes {
    name: string;
    href: string;
    children?: Array<SubNav>;
  }

  interface SubNav {
    name: string;
    href: string;
  }

  const nav: NavTypes[] = [
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Careers", href: "/careers" },
    {
      name: "Team",
      href: "/team",
      children: [
        { name: "Partners", href: "/team/partners" },
        { name: "Associates", href: "/team/associates" },
        {
          name: "Senior Counsel & Consultants",
          href: "/team/senior-counsel-and-consultants",
        },
      ],
    },
    {
      name: "Publications",
      href: "/blog",
      children: [
        {
          name: "Community Projects",
          href: "/blog/community-projects",
        },
        { name: "Legal Updates", href: "/blog/legal-updates" },
      ],
    },
  ];

  const pathname = usePathname();
  const isActive = (path: string) => path === pathname;

  return (
    <>
      <div className="bg-[#0e1114]">
        <div className="flex justify-end w-full max-w-screen-2xl mx-auto text-black">
          <div className="p-2 flex gap-4">
            <div className="flex gap-2">
              <button
                className="p-2 py-0 bg-white/90 hover:bg-white border border-[#e7e3df1a] transition duration-100 hover:bg-white/75 rounded-xl  flex items-center gap-2 text-[#000] text-xs w-full font-semibold"
                onClick={() => setState(!state)}
              >
                <Phone fill={"#000"} />
                Contact Us
              </button>
            </div>
            <div>
              <button
                className="p-2 bg-[rgba(29, 33, 38, 0.4)] border border-[#e7e3df1a] transition duration-75 hover:bg-white/5 rounded-xl flex items-center gap-2 text-[#B6BEC9] text-xs font-light"
                style={{
                  borderWidth: "0.1px",
                  boxShadow:
                    "hsla(210, 14%, 22%, 0.1) 0 2px 0 inset,var(--muidocs-palette-common-black) 0 -2px 0 inset,var(--muidocs-palette-common-black) 0 1px 2px 0",
                }}
              >
                <Search fill={"#fff"} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <header id="main-header" className="sticky top-0 bg-[#0c0E11]/75 z-10 backdrop-blur-[4px]">
        <div className="max-w-screen-2xl mx-auto p-2 flex justify-between items-center">
          <div id="logo" className="flex items-center gap-4">
            <a
              href="/"
              className="hover:bg-gray-500/10 duration-75 flex items-center gap-4 p-2 rounded-sm"
            >
              <img
                src="/images/AASP-logo-white.svg"
                alt="Anover Anover San Diego Primavera Law Offices"
                className="h-14 select-none"
              />
            </a>
          </div>
          <nav>
            <ul className="hidden lg:flex items-center justify-center h-full text-sm gap-2 text-white">
              {nav.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.href}
                    className={`px-4 py-2 hover:bg-black duration-75 rounded-sm flex justify-between gap-4 ${
                      isActive(item.href) ? "bg-black" : ""
                    }`}
                  >
                    {item.name}
                    {item.children && (
                      <ChevronWide fill={"#fff"} className={"h-4"} />
                    )}
                  </a>
                  {item.children && (
                    <ul className="bg-white text-black rounded-b-md absolute">
                      {item.children.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <a
                            href={subItem.href}
                            className="px-4 py-2 hover:bg-black duration-75 rounded-sm w-full block text-black hover:text-white"
                          >
                            {subItem.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <button
            id="hamburger"
            className="lg:hidden flex h-8 w-8 flex-col justify-evenly"
            onClick={() => {
              setActive(!active);
            }}
          >
            <span
              className="w-full h-1 bg-white duration-75"
              style={{
                transform: active ? "rotate(45deg) translate(4px, 5px)" : "",
              }}
            ></span>
            <span
              className="w-full h-1 bg-white duration-75"
              style={{
                transform: active ? "rotate(-45deg) translate(4px, -4px)" : "",
              }}
            ></span>
          </button>
        </div>
      </header>
      <AnimatePresence>
        {active && (
          <motion.section
            className="h-full fixed w-full bg-black/50 z-10 top-0 p-6 flex items-center justify-center"
            onClick={(e) => {
              if (e.target === ref.current) {
                setActive(false);
              }
            }}
            ref={ref}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <motion.nav
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white w-full max-w-96 flex flex-col opensans"
            >
              <ul>
                <li className="relative border-y">
                  <a
                    href="/"
                    className={`px-4 py-2 hover:bg-gray-500 duration-75 rounded-sm flex justify-between gap-4 text-black ${
                      isActive("/") ? "bg-gray-500 text-white" : ""
                    }`}
                  >
                    HOME
                  </a>
                </li>
                {nav.map((item, index) => (
                  <li key={index} className="relative border-y">
                    <a
                      href={item.href}
                      className={`px-4 py-2 hover:bg-gray-500 duration-75 rounded-sm flex justify-between gap-4 text-black ${
                        isActive(item.href) ? "bg-gray-500 text-white" : ""
                      }`}
                    >
                      {item.name}
                      {/* {item.children && (
                        <ChevronWide fill={"#000"} className={"h-4"} />
                      )} */}
                    </a>
                    {item.children && (
                      <ul className="text-black ml-4">
                        {item.children.map((subItem, subIndex) => (
                          <li key={subIndex} className="flex items-center">
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 1000 1000"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d=" M 667 352C 667 352 667 352 667 352C 667 338 678 327 692 327C 692 327 742 327 742 327C 756 327 767 338 767 352C 767 352 767 502 767 502C 767 557 717 602 662 602C 662 602 417 602 417 602C 417 602 392 602 392 602C 392 602 392 652 392 652C 392 672 367 680 352 667C 352 667 242 572 242 572C 230 562 230 544 242 534C 242 534 351 433 351 433C 367 419 392 429 392 452C 392 452 392 502 392 502C 392 502 642 502 642 502C 654 502 667 489 667 477C 667 477 667 352 667 352"
                                transform="translate(1000,0) scale(-1,1)"
                              />
                            </svg>
                            <a
                              href={subItem.href}
                              className={`px-4 py-2 hover:bg-gray-500 duration-75 rounded-sm flex justify-between gap-4 text-black w-full ${
                                isActive(item.href)
                                  ? "bg-gray-500 text-white"
                                  : ""
                              }`}
                            >
                              {subItem.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </motion.nav>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
}
