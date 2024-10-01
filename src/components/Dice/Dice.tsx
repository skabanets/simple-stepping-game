import { FC, useRef } from 'react';
import ReactDice, { ReactDiceRef } from 'react-dice-complete';

import { Button } from '../../components';
import { useLocalStorage } from '../../hooks';
import { defaulutDice } from '../../constants';

interface DiceProps {
  faceColor: string;
  dotColor: string;
}
export const Dice: FC<DiceProps> = ({ faceColor, dotColor }) => {
  const [dice, setDice] = useLocalStorage('dice', defaulutDice);

  const reactDice = useRef<ReactDiceRef>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const rollDone = (totalValue: number) => {
    setDice(prev => ({ ...prev, value: totalValue }));
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const handleRollClick = () => {
    reactDice.current?.rollAll();
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value);
    setDice(prev => ({ ...prev, volume: newVolume }));

    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const { value, volume } = dice;
  return (
    <>
      <ReactDice
        disableIndividual
        defaultRoll={value}
        numDice={1}
        ref={reactDice}
        rollDone={rollDone}
        rollTime={1}
        faceColor={faceColor}
        dotColor={dotColor}
        margin={0}
      />

      <Button className="roll-btn" type="button" onClick={handleRollClick}>
        Roll dice
      </Button>

      <label className="absolute left-5 top-8 flex flex-col items-start gap-2">
        Volume
        <input
          id="volume-control"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
        />
      </label>

      <audio ref={audioRef} src="/dice.mp3" preload="auto" />
    </>
  );
};
