import { FC } from 'react';

import { InputFile, PlayersField } from '../../components';

interface SettingsAreaProps {
  setImage: (image: string | null) => void;
}

export const SettingsArea: FC<SettingsAreaProps> = ({ setImage }) => {
  return (
    <div className="border border-black rounded-md flex justify-start items-start h-1/2 p-5 pl-8">
      <ol className="list-decimal flex flex-col gap-4">
        <li>
          <InputFile title="Background image" setImage={setImage} />
        </li>
        <li>
          <PlayersField />
        </li>
      </ol>
    </div>
  );
};
