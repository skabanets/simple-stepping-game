import { DiceArea, GameArea, SettingsArea } from '../components';

export const App = () => {
  return (
    <div className="flex gap-4 p-5 h-screen">
      <GameArea />
      <div className="flex flex-col gap-4 w-1/4">
        <SettingsArea />
        <DiceArea />
      </div>
    </div>
  );
};
