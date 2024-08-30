import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function FullJsonSwitch({
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
          'relative flex h-12 w-80 cursor-pointer items-center justify-start rounded bg-slate-100 p-2 ' +
          (isOn ? 'justify-end' : 'justify-start')
        }
        onClick={toggleSwitch}
      >
        <span className="absolute left-12 z-20">Segmented</span>
        <motion.div className="h-8 w-40 rounded bg-white" layout transition={spring} />
        <span className="absolute right-12 z-20">Combined</span>
      </button>
    </>
  );
}

const spring = {
  type: 'spring',
  stiffness: 500,
  damping: 30,
};
