"use client";

import { useEffect, useState } from "react";

/**
 * Tiny global flag so sections can wait for the preloader to finish
 * before playing their intro animations.
 */
const EVENT = "intro:done";
let done = false;

export function markIntroDone() {
  done = true;
  window.dispatchEvent(new Event(EVENT));
}

export function useIntroDone() {
  const [isDone, setDone] = useState(done);
  useEffect(() => {
    if (done) {
      setDone(true);
      return;
    }
    const on = () => setDone(true);
    window.addEventListener(EVENT, on);
    return () => window.removeEventListener(EVENT, on);
  }, []);
  return isDone;
}
