"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronWide } from "./icons";

interface DataAttributes {
  attributes: {
    practice_areas: Array<PracticeAreaAttributes>;
  };
}

interface PracticeAreaAttributes {
  data: {
    attributes: {
      name: string;
      slug: string;
    };
  };
}

export default function PracticeArea({ data }: { data: DataAttributes }) {
  const [active, setActive] = useState(false);
  const sideVariants = {
    closed: {
      transition: {
        staggerChildren: 0.2,
        staggerDirection: -1,
      },
    },
    open: {
      transition: {
        staggerChildren: 0.2,
        staggerDirection: 1,
      },
    },
  };
  const itemVariants = {
    closed: {
      opacity: 0,
    },
    open: { opacity: 1 },
  };

  return (
    <div>
      <button
        onClick={() => setActive(!active)}
        className="w-full flex justify-between border-b border-black "
      >
        <h4 className="spectral sc text-left text-xl pb-2 w-full">
          {active ? "Hide" : "Show"} Practice Areas
        </h4>
        <ChevronWide
          className={`duration-150 ${active ? "rotate-0" : "-rotate-180"}`}
        />
      </button>
      <AnimatePresence>
        {active && (
          <motion.ul
            className="list-disc pl-5 p-5"
            variants={sideVariants}
            initial="closed"
            animate="open"
            transition={{ duration: 0.5 }}
          >
            {/* @ts-ignore */}
            {data.attributes.practice_areas.data.map(
              (practiceArea: any, index: number) => (
                <motion.li key={index} variants={itemVariants}>
                  <a
                    href={`/services/${practiceArea.attributes.slug}`}
                    className="hover:underline"
                  >
                    {practiceArea.attributes.name}
                  </a>
                </motion.li>
              )
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
