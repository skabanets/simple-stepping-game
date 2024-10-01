import { useState } from 'react';

import { DiceArea, GameArea, SettingsArea } from '../components';
import { useLocalStorage } from '../hooks';

export const App = () => {
  const [image, setImage] = useLocalStorage<string | null>('game-area', null);

  const [playersQuantity, setPlayersQuantity] = useState<number | null>(null);

  const handleSetPlayers = (value: number) => {
    setPlayersQuantity(value);
  };

  return (
    <div className="flex gap-4 p-5 h-screen">
      <GameArea image={image} playersQuantity={playersQuantity} />
      <div className="flex flex-col gap-4 w-1/4">
        <SettingsArea setImage={setImage} handleSetPlayers={handleSetPlayers} />
        <DiceArea />
      </div>
    </div>
  );
};
