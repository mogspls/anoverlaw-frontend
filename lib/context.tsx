"use client"
import { createContext, useContext, ReactNode, useState } from "react";

const ContactContext = createContext<any>(false);

export function ContactModal({ children }: { children: ReactNode }) {
  const [state, setState] = useState(false);
  return (
    <ContactContext.Provider value={{ state, setState }}>
      {children}
    </ContactContext.Provider>
  );
}

export function useContactModal() {
  return useContext(ContactContext);
}
