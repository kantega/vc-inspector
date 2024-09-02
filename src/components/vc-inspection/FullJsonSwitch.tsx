import { BaseAnimatedToggle } from './InnerJsonSwitch';

export default function FullJsonSwitch({
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
      classNameMotionDiv="h-8 w-40 rounded bg-white"
      classNameText1="absolute left-12 z-20"
      classNameText2="absolute right-12 z-20"
      classNameButton="p-2 relative flex h-12 w-80 cursor-pointer items-center justify-start rounded bg-slate-100"
    />
  );
}
