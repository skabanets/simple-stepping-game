import { FC, useRef } from 'react';
import ReactDice, { ReactDiceRef } from 'react-dice-complete';
import { Button } from '../../components';

interface DiceProps {
  faceColor: string;
  dotColor: string;
  setDiceValue: (value: number) => void;
}
export const Dice: FC<DiceProps> = ({ faceColor, dotColor, setDiceValue }) => {
  const reactDice = useRef<ReactDiceRef>(null);

  const rollDone = (totalValue: number) => {
    setDiceValue(totalValue);
  };

  const handleRollClick = () => {
    reactDice.current?.rollAll();
  };

  return (
    <div className="flex flex-col gap-8 items-center">
      <div className="cursor-pointer">
        <ReactDice
          defaultRoll={3}
          numDice={1}
          ref={reactDice}
          rollDone={rollDone}
          rollTime={2}
          faceColor={faceColor}
          dotColor={dotColor}
          margin={0}
        />
      </div>
      <Button className="roll-btn" type="button" onClick={handleRollClick}>
        Roll dice
      </Button>
    </div>
  );
};
