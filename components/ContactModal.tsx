"use client";

import { useFormState, useFormStatus } from "react-dom";
import { motion } from "framer-motion";
import { EventHandler, FormEvent, useRef } from "react";
import { useContactModal } from "@/lib/context";
import { Phone, TimesIcon } from "@/components/icons";

export default function Modal() {
  const { setState } = useContactModal();
  const ref = useRef<HTMLDivElement | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const data: { [key: string]: string } = {}
    for(let [key, value] of formData.entries()){
      data[key] = value as string;
      // console.log(data)
    }
  }

  return (
    <motion.section
      id="ModalContact-us"
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed h-full w-full top-0 bg-black/50 z-50 content-center p-4"
      ref={ref}
      onClick={(e) => {
        if (e.target === ref.current) {
          setState(false);
        }
      }}
    >
      <motion.div
        className="max-w-screen-sm mx-auto bg-white flex flex-col lg:flex-row relative text-black rounded-md h-full max-h-[560px] overflow-x-hidden overflow-scroll"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        transition={{ duration: 0.75 }}
      >
        <button
          onClick={() => setState(false)}
          className="absolute right-2 top-2 mix-blend-difference"
        >
          <TimesIcon fill={"#fff"} />
        </button>
        <div className="bg-center md:bg-center bg-cover w-full min-h-36 lg:w-96 rounded-t-md lg:rounded-tr-none lg:rounded-tl-md lg:rounded-bl-md lg:sticky top-0 modal-bg"></div>
        <div className="p-4 flex">
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-4">
              <h1 className="spectral sc font-medium text-4xl">Contact Us</h1>
              <p className="text-sm ">
                Have any inquiries? Please feel free to send us an email at{" "}
                <a
                  href="mailto:info@anoverlaw.org"
                  className="text-gray-600 underline"
                >
                  info@anoverlaw.org
                </a>
                .
              </p>
              <p className="text-sm">
                You may also reach us with the following hotlines
              </p>
            </div>
            <div className="flex gap-3">
              <div className="flex gap-2">
                <Phone fill={"#000"} />
                <ul className="inline-flex flex-col gap-0 w-full">
                  <li className="inline-flex">
                    <a
                      href="tel:(+632)86591179"
                      className="hover:underline hover:inline-block text-[#535965] text-sm"
                    >
                      (+632) 8846 - 6842
                    </a>
                  </li>
                  <li className="inline-flex">
                    <a
                      href="tel:(+632)86591179"
                      className="hover:underline hover:inline-block text-[#535965] text-sm"
                    >
                      (+632) 8659 - 1179
                    </a>
                  </li>
                  <li className="inline-flex">
                    <a
                      href="tel:(+632)8822-2635"
                      className="hover:underline hover:inline-block text-[#535965] text-sm"
                    >
                      (+632) 8822 - 2635
                    </a>
                  </li>
                  <li className="inline-flex">
                    <a
                      href="tel:(+632)88369816"
                      className="hover:underline hover:inline-block text-[#535965] text-sm"
                    >
                      (+632) 8836 - 9816
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <form className="py-4 flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
              <fieldset className="flex flex-col gap-2">
                <label htmlFor="name">
                  Name <span className="text-red-400 text-xs">*required</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="bg-slate-600/10 p-3"
                  placeholder={"Juan Dela Cruz"}
                  required={true}
                />
              </fieldset>
              <fieldset className="flex flex-col gap-2">
                <label htmlFor="email">
                  Email Address{" "}
                  <span className="text-red-400 text-xs">*required</span>
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  className="bg-slate-600/10 p-3"
                  placeholder={"juan.delacruz@example.com"}
                />
              </fieldset>
              <fieldset className="flex flex-col gap-2">
                <label htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="bg-slate-600/10 p-3"
                  placeholder={"(+63) 912 345 6789"}
                />
              </fieldset>
              <fieldset className="flex flex-col gap-2">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  className="bg-slate-600/10 p-3 h-32 resize-none block w-full"
                  placeholder="I'd like to talk about..."
                />
              </fieldset>
              <button
                type="submit"
                className="w-full rounded-lg text-white bg-[#1B387D] py-4"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}
