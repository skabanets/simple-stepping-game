import { FC } from 'react';

import { Dice } from '../../components';
import { useLocalStorage } from '../../hooks';

interface DiceAreaProps {
  setDiceValue: (value: number) => void;
}

export const DiceArea: FC<DiceAreaProps> = ({ setDiceValue }) => {
  const [faceColor, setFaceColor] = useLocalStorage<string>('faceColor', '#eb1818');
  const [dotColor, setDotColor] = useLocalStorage<string>('dotColor', '#ffffff');

  const handleFaceColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFaceColor(event.target.value);
  };

  const handleDotColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDotColor(event.target.value);
  };

  return (
    <div className="relative border border-black rounded-md flex flex-col items-center justify-between h-1/2 py-8 px-5 font-semibold">
      <div className="flex flex-col gap-1 items-end w-full">
        <label className="flex justify-between w-[140px] ">
          Face color{' '}
          <input
            className="border-2 border-slate-300 rounded-md"
            type="color"
            onChange={handleFaceColorChange}
            value={faceColor}
          />
        </label>
        <label className="flex justify-between w-[140px]">
          Dot color{' '}
          <input
            className="border-2 border-slate-300 rounded-md"
            type="color"
            onChange={handleDotColorChange}
            value={dotColor}
          />
        </label>
      </div>
      <Dice setDiceValue={setDiceValue} faceColor={faceColor} dotColor={dotColor} />
    </div>
  );
};
