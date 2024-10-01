import { FC, useEffect, useState } from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';

import type { Piece } from '../../types';

interface GameAreaProps {
  image: string | null;
  playersQuantity: number | null;
}

export const GameArea: FC<GameAreaProps> = ({ image, playersQuantity }) => {
  const [pieces, setPieces] = useState<Piece[] | null>(null);

  useEffect(() => {
    const savedPieces = localStorage.getItem('pieces');
    if (savedPieces) {
      setPieces(JSON.parse(savedPieces));
    }
  }, []);

  useEffect(() => {
    if (playersQuantity !== null) {
      const initialPieces = Array.from({ length: playersQuantity }, (_, i) => ({
        id: String(i + 1),
        x: 0,
        y: i * 20,
        content: String(i + 1),
      }));
      setPieces(initialPieces);
    }
  }, [playersQuantity]);

  useEffect(() => {
    if (pieces) {
      localStorage.setItem('pieces', JSON.stringify(pieces));
    }
  }, [pieces]);

  const handleDrag = (_e: DraggableEvent, data: DraggableData, id: string) => {
    setPieces(prev => {
      if (!prev) return null;
      return prev.map(piece => (piece.id === id ? { ...piece, x: data.x, y: data.y } : piece));
    });
  };

  return (
    <div className="relative border border-black rounded-md flex justify-center items-center w-3/4">
      <div className="h-full">
        {image && <img src={image} alt="game-area" className="h-full" />}
      </div>
      {pieces && (
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
      )}
    </div>
  );
};
