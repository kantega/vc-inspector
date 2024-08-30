import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function InnerJsonSwitch({
  isOn,
  setIsOn,
}: {
  isOn: boolean;
  setIsOn: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const toggleSwitch = () => setIsOn(!isOn);
  return (
    <>
      <button
        className={
          'p-x2 relative flex h-8 w-44 cursor-pointer items-center justify-start rounded ' +
          (!isOn ? 'justify-end' : 'justify-start')
        }
        onClick={toggleSwitch}
      >
        <span className="absolute left-6 z-20 text-xs font-normal">JSON</span>
        <motion.div className="h-8 w-20 rounded bg-slate-100" layout transition={spring} />
        <span className="absolute right-4 z-20 text-xs font-normal">PARSED</span>
      </button>
    </>
  );
}

const spring = {
  type: 'spring',
  stiffness: 500,
  damping: 30,
};
