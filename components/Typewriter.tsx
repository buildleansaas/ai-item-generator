// @/components/Home/TypeWriter.js
import React, { useState, useEffect } from "react";

export default function TypeWriter({ phrases }: { phrases: string[] }) {
  // State of current phrase index
  const [currentPhrase, setCurrentPhrase] = useState(0);
  // State to toggle word collapse effect
  const [collapseClass, setCollapseClass] = useState(" w-0");

  useEffect(() => {
    setTimeout(() => setCollapseClass(" w-full"), 100);

    const id = setInterval(async () => {
      // Set the width to 0 - transition duration is 1000ms
      setCollapseClass(" w-0");
      setTimeout(() => {
        /**
         * After 1100ms, change the displayed text while the div
         * is collapsed by incrementing the index
         */
        setCurrentPhrase((oldVal) => {
          let phraseIndex;
          if (oldVal >= phrases.length - 1) {
            phraseIndex = 0;
          } else {
            phraseIndex = oldVal + 1;
          }

          return phraseIndex;
        });
      }, 1100);
      // After 1000ms, set width to 100% - transition duration is 1000ms
      setTimeout(() => setCollapseClass(" w-full"), 1000);
    }, 4000);
    return () => clearInterval(id);
  }, []); //  eslint-disable-line react-hooks/exhaustive-deps

  return (
    <span className="text-5xl/snug sm:text-6xl/snug md:text-7xl/snug">
      <div
        className={`${
          "font-bold border-b-2 border-b-blue-400 border-r-2 pr-1" +
          "animate-cursor overflow-hidden whitespace-nowrap transition-[width] ease-in-out duration-1000 mr-auto"
        }${collapseClass}`}
      >
        {phrases[currentPhrase]}
      </div>
    </span>
  );
}
