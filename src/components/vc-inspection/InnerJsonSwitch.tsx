import { motion } from 'framer-motion';

export default function InnerJsonSwitch({
  isOn,
  setIsOn,
}: {
  isOn: boolean;
  setIsOn: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <BaseAnimatedToggle
      isOn={isOn}
      setIsOn={setIsOn}
      classNameMotionDiv="h-8 w-20 rounded bg-slate-100"
      classNameText1="absolute left-6 z-20 text-xs font-normal"
      classNameText2="absolute right-4 z-20 text-xs font-normal"
      classNameButton="p-x2 relative flex h-8 w-44 cursor-pointer items-center justify-start rounded "
    />
  );
}

export function BaseAnimatedToggle({
  isOn,
  setIsOn,
  classNameMotionDiv,
  classNameText1,
  classNameText2,
  classNameButton,
}: {
  isOn: boolean;
  setIsOn: React.Dispatch<React.SetStateAction<boolean>>;
  classNameMotionDiv: string;
  classNameText1: string;
  classNameText2: string;
  classNameButton: string;
}) {
  const toggleSwitch = () => setIsOn(!isOn);
  return (
    <>
      <button className={classNameButton + (!isOn ? ' justify-end' : ' justify-start')} onClick={toggleSwitch}>
        <span className={classNameText1}>JSON</span>
        <motion.div className={classNameMotionDiv} layout transition={spring} />
        <span className={classNameText2}>PARSED</span>
      </button>
    </>
  );
}

const spring = {
  type: 'spring',
  stiffness: 500,
  damping: 30,
};
