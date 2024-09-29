import { useState } from 'react';
import { DiceArea, GameArea, SettingsArea } from '../components';

export const App = () => {
  const [image, setImage] = useState<string | null>(null);

  return (
    <div className="flex gap-4 p-5 h-screen">
      <GameArea image={image} />
      <div className="flex flex-col gap-4 w-1/4">
        <SettingsArea setImage={setImage} />
        <DiceArea />
      </div>
    </div>
  );
};
