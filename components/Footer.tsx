"use client";
import { AnimatePresence } from "framer-motion";

import { Map, Phone } from "@/components/icons";
import Modal from "./ContactModal";
import { useContactModal } from "@/lib/context";

export default function Footer() {
  const { state, setState } = useContactModal();
  const date = new Date();

  return (
    <>
      <footer id="main-footer" className="before:content-[''] before:block before:h-3 before:bg-[#2D3036] before:w-full bg-[#0c0E11]">
        <div className="max-w-screen-2xl mx-auto w-full">
          <section className="before:content-[''] before:flex before:w-full before:h-[1px] before:bg-[#9BA3B7] after:content-[''] after:flex after:w-full after:h-[1px] after:bg-[#9BA3B7] flex items-center justify-center w-full px-4 py-4">
            <img
              src="/images/AASP.svg"
              alt="AASP Seal"
              className="py-0 px-6 select-none"
            />
          </section>
          <section className="after:block after:content-[''] after:h-[1px] after:bg-[#9BA3B7]">
            <div className="flex gap-16 lg:gap-1 pt-6 pb-36 flex-col md:flex-row px-4">
              <div className="flex flex-col gap-12 px-1 flex-1">
                <img
                  src="/images/AASP-logotype.svg"
                  alt="AASP Logotype"
                  className="w-full lg:w-80 select-none"
                />
                <div className="flex flex-col gap-12">
                  <div className="flex gap-3">
                    <div>
                      <Map fill={"#fff"} className={"mt-[4px]"} />
                    </div>
                    <div>
                      <a
                        href="https://maps.app.goo.gl/A7RGE4UBRakpePbH9"
                        target="_blank"
                        className="inline-block w-full text-[#6c7075] font-light text-sm hover:underline"
                      >
                        Suites 401, 1001, 1003, & 1005,{" "}
                        <br className="hidden md:inline" />
                        Park Trade Center, 1716 Investment Drive,{" "}
                        <br className="hidden md:inline" />
                        Ayala Alabang, Muntinlupa City, 1780 Metro Manila
                      </a>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    {/* <div className="flex flex-col gap-12"> */}
                    <button
                      className="p-2 bg-white/90 hover:bg-white border border-[#e7e3df1a] transition duration-100 rounded-xl flex items-center gap-2 text-[#000] text-xs pr-4 w-full max-w-[125px] text-center hover:bg-white/75 font-medium"
                      style={{
                        borderWidth: "0.1px",
                        boxShadow:
                          "hsla(210, 14%, 22%, 0.1) 0 2px 0 inset,var(--muidocs-palette-common-black) 0 -2px 0 inset,var(--muidocs-palette-common-black) 0 1px 2px 0",
                      }}
                      onClick={() => {
                        setState(!state);
                      }}
                    >
                      <Phone fill={"#000"} />
                      Contact Us
                    </button>
                  </div>
                </div>
              </div>
              <nav className="flex flex-col gap-8" style={{ flex: "0.3" }}>
                <h4>GENERAL</h4>
                <ul className="flex flex-col gap-3">
                  <li>
                    <a href="/">Home</a>
                  </li>
                  <li>
                    <a href="/about">About Us</a>
                  </li>
                  <li>
                    <a href="/services">Services</a>
                  </li>
                  <li>
                    <a href="/careers">Careers</a>
                  </li>
                </ul>
              </nav>
              <nav className="flex flex-col gap-8" style={{ flex: "0.3" }}>
                <h4>THE FIRM</h4>
                <ul className="flex flex-col gap-3">
                  <li>
                    <a href="/team/founders">Founders</a>
                  </li>
                  <li>
                    <a href="/team/partners">Partners</a>
                  </li>
                  <li>
                    <a href="/team/associates">Associates</a>
                  </li>
                  <li>
                    <a href="/team/senior-counsel-and-consultants">
                      Senior Counsel and Consultants
                    </a>
                  </li>
                </ul>
              </nav>
              <nav className="flex flex-col gap-8" style={{ flex: "0.3" }}>
                <h4>PUBLICATIONS</h4>
                <ul className="flex flex-col gap-3">
                  <li>
                    <a href="/blog/news-and-updates">News and Updates</a>
                  </li>
                  <li>
                    <a href="/blog/community-projects">Community Projects</a>
                  </li>
                </ul>
              </nav>
            </div>
          </section>
          <div className="text-[#A1A7AF] text-xs py-4 px-2">
            <p>
              Copyright &copy; {date.getFullYear()}. Añover Añover San Diego
              &amp; Primavera Law Offices. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
      <AnimatePresence>{state && <Modal />}</AnimatePresence>
    </>
  );
}
