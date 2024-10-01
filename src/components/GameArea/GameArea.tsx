import { FC, useEffect } from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';

import type { Piece } from '../../types';
import { shuffleArray } from '../../helpers';
import { pieceImages } from '../../constants/pieceImages';
import { useLocalStorage } from '../../hooks';

interface GameAreaProps {
  image: string | null;
  playersQuantity: number | null;
}

export const GameArea: FC<GameAreaProps> = ({ image, playersQuantity }) => {
  const [pieces, setPieces] = useLocalStorage<Piece[] | null>('pieces', null);

  useEffect(() => {
    if (playersQuantity !== null) {
      const shuffledImages = shuffleArray(pieceImages).slice(0, playersQuantity);

      const initialPieces = Array.from({ length: playersQuantity }, (_, i) => ({
        id: String(i + 1),
        x: 0,
        y: (i + 1) * 40,
        content: shuffledImages[i]?.src || '',
      }));
      setPieces(initialPieces);
    }
  }, [playersQuantity, setPieces]);

  const handleDrag = (_e: DraggableEvent, data: DraggableData, id: string) => {
    setPieces(prev => {
      if (!prev) return null;
      return prev.map(piece => (piece.id === id ? { ...piece, x: data.x, y: data.y } : piece));
    });
  };

  return (
    <div className="relative border border-black rounded-md flex justify-center items-center w-3/4">
      <div className="h-full">
        {image ? (
          <img src={image} alt="game-area" className="h-full opacity-80" />
        ) : (
          <div className="flex justify-center items-center h-full">
            <h1 className="w-3/5 text-2xl text-center text-slate-600">
              To start the game, please upload the game area and select the number of participants.
            </h1>
          </div>
        )}
      </div>
      {pieces && (
        <div className={`absolute inset-0`}>
          {pieces.map(piece => (
            <Draggable
              key={piece.id}
              position={{ x: piece.x, y: piece.y }}
              onStop={(e, data) => handleDrag(e, data, piece.id)}
              bounds="parent"
            >
              <div
                className="size-20 flex items-center justify-center cursor-pointer text-white font-semibold"
                style={{
                  backgroundImage: `url(${piece.content})`,
                  backgroundSize: 'contain',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
              >
                <p className="absolute text-white font-semibold text-sm -top-8 p-1 bg-blue-400 shadow-sm rounded-md opacity-80">
                  Player {piece.id}
                </p>
              </div>
            </Draggable>
          ))}
        </div>
      )}
    </div>
  );
};
