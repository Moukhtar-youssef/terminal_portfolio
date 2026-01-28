"use client";

import Terminal from "@/_components/Terminal";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    window.addEventListener(
      "keydown",
      (e) => {
        ["ArrowUp", "ArrowDown"].indexOf(e.code) > -1 && e.preventDefault();
      },
      false,
    );
  }, []);
  return (
    <>
      <h1 className="sr-only" aria-label="Terminal Portfolio">
        Terminal Portfolio
      </h1>
      <Terminal />
    </>
  );
}
