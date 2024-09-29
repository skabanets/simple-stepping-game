import { FC, useCallback } from 'react';

interface InputFileProps {
  title: string;
  setImage: (image: string | null) => void;
}

export const InputFile: FC<InputFileProps> = ({ title, setImage }) => {
  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];

      if (!file) return;

      const reader = new FileReader();

      reader.onload = () => {
        const result = reader.result as string | null;
        if (result) {
          setImage(result);
          localStorage.setItem('game-area', result);
        }
      };

      reader.readAsDataURL(file);
    },
    [setImage]
  );

  return (
    <div className="flex flex-col gap-2">
      <label className="font-semibold">{title}</label>
      <input type="file" accept=".jpg, .jpeg, .png" onChange={handleFileChange} />
    </div>
  );
};
