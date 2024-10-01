import { FC, useState } from 'react';

import { Button } from '../../components';

import { players } from '../../constants';

interface PlayersFieldProps {
  handleSetPlayers: (value: number) => void;
}
export const PlayersField: FC<PlayersFieldProps> = ({ handleSetPlayers }) => {
  const [playersQuantity, setPlayersQuantity] = useState(localStorage.getItem('players') || '2');

  const handlePlayersChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPlayers = event.target.value;
    setPlayersQuantity(selectedPlayers);
    localStorage.setItem('players', selectedPlayers);
  };

  const handleApply = () => {
    handleSetPlayers(Number(playersQuantity));
  };

  const handleClear = () => {
    setPlayersQuantity('2');
    localStorage.setItem('players', '2');
    handleSetPlayers(0);
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="font-semibold">Chose number of players and press Apply</label>
      <div className="flex gap-4">
        <select
          name="players"
          value={playersQuantity}
          onChange={handlePlayersChange}
          className="w-1/6 border border-black rounded-md p-2"
        >
          {players.map(player => (
            <option key={player} value={player}>
              {player}
            </option>
          ))}
        </select>
        <Button
          type="button"
          className="w-1/3 players-btn bg-green-500 hover:bg-green-600"
          onClick={handleApply}
        >
          Apply
        </Button>
        <Button
          type="button"
          className="w-1/3 players-btn bg-red-400  hover:bg-red-500"
          onClick={handleClear}
        >
          Сlear
        </Button>
      </div>
    </div>
  );
};
