import { FC, useRef } from 'react';
import ReactDice, { ReactDiceRef } from 'react-dice-complete';

interface DiceProps {
  setDiceValue: (value: number) => void;
}
export const Dice: FC<DiceProps> = ({ setDiceValue }) => {
  const reactDice = useRef<ReactDiceRef>(null);

  const rollDone = (totalValue: number) => {
    setDiceValue(totalValue);
  };

  return (
    <div className="cursor-pointer">
      <ReactDice
        defaultRoll={3}
        numDice={1}
        ref={reactDice}
        rollDone={rollDone}
        rollTime={2}
        faceColor="red"
        dotColor="white"
        margin={0}
      />
    </div>
  );
};
