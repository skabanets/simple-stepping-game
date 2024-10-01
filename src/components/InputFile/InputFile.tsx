import { FC, useCallback, useRef } from 'react';
import { toast } from 'react-toastify';
import { Button } from '..';

interface InputFileProps {
  title: string;
  setImage: (image: string | null) => void;
}

export const InputFile: FC<InputFileProps> = ({ title, setImage }) => {
  const fileRef = useRef<HTMLInputElement>(null);

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

      reader.onerror = () => {
        toast.error('Failed to read the file');
      };

      reader.readAsDataURL(file);
    },
    [setImage]
  );

  const handleFileInputClick = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  const handleClearFile = () => {
    if (fileRef.current) {
      fileRef.current.value = '';
      setImage(null);
      localStorage.removeItem('game-area');
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="font-semibold">{title}</label>
      <input
        type="file"
        accept=".jpg, .jpeg, .png"
        className="hidden"
        ref={fileRef}
        onChange={handleFileChange}
      />
      <div className="flex gap-4">
        <Button
          type="button"
          className="w-1/3 players-btn bg-green-500 hover:bg-green-600"
          onClick={handleFileInputClick}
        >
          Load
        </Button>
        <Button
          type="button"
          className="w-1/3 players-btn bg-red-400  hover:bg-red-500"
          onClick={handleClearFile}
        >
          Clear
        </Button>
      </div>
    </div>
  );
};
