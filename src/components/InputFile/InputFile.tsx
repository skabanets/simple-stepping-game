import { FC } from 'react';

interface InputFileProps {
  title: string;
  setImage: (image: string | null) => void;
}

export const InputFile: FC<InputFileProps> = ({ title, setImage }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setImage(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="font-semibold">{title}</label>
      <input type="file" accept=".jpg, .jpeg, .png" onChange={handleFileChange} />
    </div>
  );
};
