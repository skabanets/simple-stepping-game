import { FC, useEffect, useState } from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';

interface GameAreaProps {
  image: string | null;
}

interface Piece {
  id: string;
  x: number;
  y: number;
  content: string;
}

export const GameArea: FC<GameAreaProps> = ({ image }) => {
  const [pieces, setPieces] = useState<Piece[]>([
    { id: '1', x: 0, y: 0, content: '1' },
    { id: '2', x: 0, y: 30, content: '2' },
    { id: '3', x: 0, y: 60, content: '3' },
  ]);

  useEffect(() => {
    const savedPieces = localStorage.getItem('pieces');
    if (savedPieces) {
      setPieces(JSON.parse(savedPieces));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('pieces', JSON.stringify(pieces));
  }, [pieces]);

  const handleDrag = (_e: DraggableEvent, data: DraggableData, id: string) => {
    setPieces(prev =>
      prev.map(piece => (piece.id === id ? { ...piece, x: data.x, y: data.y } : piece))
    );
  };

  return (
    <div className="relative border border-black rounded-md flex justify-center items-center w-3/4">
      <div className="h-full">
        {image && <img src={image} alt="game-area" className="h-full" />}
      </div>
      <div className={`absolute top-0 left-0 w-[200px]`}>
        {pieces.map(piece => (
          <Draggable
            key={piece.id}
            position={{ x: piece.x, y: piece.y }}
            onStop={(e, data) => handleDrag(e, data, piece.id)}
          >
            <div className="size-10 bg-blue-400 rounded-lg flex items-center justify-center cursor-pointer text-white font-semibold">
              {piece.content}
            </div>
          </Draggable>
        ))}
      </div>
    </div>
  );
};
