import { FC, useEffect, useState } from 'react';

import { Dice } from '../../components';

interface DiceAreaProps {
  setDiceValue: (value: number) => void;
}

export const DiceArea: FC<DiceAreaProps> = ({ setDiceValue }) => {
  const [faceColor, setFaceColor] = useState('#eb1818');
  const [dotColor, setDotColor] = useState('#ffffff');

  useEffect(() => {
    const savedFaceColor = localStorage.getItem('faceColor');
    const savedDotColor = localStorage.getItem('dotColor');

    if (savedFaceColor) {
      setFaceColor(savedFaceColor);
    }
    if (savedDotColor) {
      setDotColor(savedDotColor);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('faceColor', faceColor);
  }, [faceColor]);

  useEffect(() => {
    localStorage.setItem('dotColor', dotColor);
  }, [dotColor]);

  const handleFaceColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFaceColor(event.target.value);
  };

  const handleDotColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDotColor(event.target.value);
  };

  return (
    <div className="border border-black rounded-md flex flex-col justify-between items-center gap-8 h-1/2 py-8 px-5">
      <div className="flex gap-4">
        <label className="w-1/2 text-center">
          Face color{' '}
          <input type="color" name="" id="" onChange={handleFaceColorChange} value={faceColor} />
        </label>
        <label className="w-1/2 text-center">
          Dot color{' '}
          <input type="color" name="" id="" onChange={handleDotColorChange} value={dotColor} />
        </label>
      </div>
      <Dice setDiceValue={setDiceValue} faceColor={faceColor} dotColor={dotColor} />
    </div>
  );
};
