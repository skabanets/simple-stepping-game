import { FC } from 'react';

interface GameAreaProps {
  image: string | null;
}

export const GameArea: FC<GameAreaProps> = ({ image }) => {
  return (
    <div className="border border-black rounded-md flex justify-center items-center w-3/4">
      {image && <img src={image} alt="game-area" className="h-full" />}
    </div>
  );
};
