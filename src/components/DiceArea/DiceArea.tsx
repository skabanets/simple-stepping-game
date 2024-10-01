import { FC } from 'react';

import { Dice } from '../../components';
import { useLocalStorage } from '../../hooks';
import { defaulutDice } from '../../constants';

export const DiceArea: FC = () => {
  const [dice, setDice] = useLocalStorage('dice', defaulutDice);

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setDice(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const { faceColor, dotColor } = dice;

  return (
    <div className="relative border border-black rounded-md flex flex-col items-center justify-between h-1/2 py-8 px-5 font-semibold">
      <div className="flex flex-col gap-1 items-end w-full">
        <label className="flex justify-between w-[140px] ">
          Face color{' '}
          <input
            name="faceColor"
            className="border-2 border-slate-300 rounded-md"
            type="color"
            onChange={handleColorChange}
            value={faceColor}
          />
        </label>
        <label className="flex justify-between w-[140px]">
          Dot color{' '}
          <input
            name="dotColor"
            className="border-2 border-slate-300 rounded-md"
            type="color"
            onChange={handleColorChange}
            value={dotColor}
          />
        </label>
      </div>
      <Dice faceColor={faceColor} dotColor={dotColor} />
    </div>
  );
};
