import React, { useState } from 'react';
import { IoStar } from 'react-icons/io5';
import { IoMdArrowDropright } from 'react-icons/io';
import Button from '@/components/atoms/Button';
import Chip from '@/components/atoms/Chip';
import Divider from '@/components/protons/Divider';
import CommentModal from './CommentModal';
import { ModalStateEnum } from '@/interfaces/global.enum';

type CommentStateType = { data: null; mode: null | ModalStateEnum };

const Comments = () => {
  const [comment, setComment] = useState<CommentStateType>({ data: null, mode: null });

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div>
          <p className="font-bold text-2xl">Calificación general</p>
          <p className="text-base text-gray-500">
            <span className="mr-3">4.6 / 5</span>
            <span className="pl-3 border-l border-gray-500">356 comentarios</span>
          </p>
        </div>
        <Button
          size="large"
          variant="white"
          className="!border-2 !border-gray-900"
          onClick={() => setComment({ data: null, mode: ModalStateEnum.BOX })}
        >
          Escribir comentario
        </Button>
      </div>
      <div className="flex flex-wrap gap-3 mt-2">
        <Chip iconLeft={<Star value={5} />} label="261" className="w-full sm:w-auto" />
        <Chip iconLeft={<Star value={4} />} label="59" className="w-full sm:w-auto" />
        <Chip iconLeft={<Star value={3} />} label="25" className="w-full sm:w-auto" />
        <Chip iconLeft={<Star value={2} />} label="6" className="w-full sm:w-auto" />
        <Chip iconLeft={<Star value={1} />} label="5" className="w-full sm:w-auto" />
      </div>

      {Array.from(Array(5).keys()).map((item) => (
        <React.Fragment key={item}>
          <Divider className="my-5" />
          <div>
            <div className="flex flex-col md:flex-row justify-between">
              <div>
                <p className="text-gray-700 font-bold">Excelente producto</p>
                <div className="flex flex-col md:flex-row gap-1">
                  <p className="text-gray-600 text-sm font-semibold">Por Sebastaian Molina</p>
                  <Star value={5} showArrow={false} />
                </div>
              </div>
              <p className="text-gray-600 text-sm">22 nov. 2023</p>
            </div>
            <p className="text-gray-500 text-sm text-justify">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, numquam consectetur. Laborum, vitae nisi sit doloremque ex sed, eum
              laudantium pariatur dolores quasi magnam optio reiciendis velit numquam, repellat in!
            </p>
          </div>
        </React.Fragment>
      ))}

      {comment.mode === ModalStateEnum.BOX && <CommentModal handleClose={() => setComment({ data: null, mode: null })} />}
    </div>
  );
};

export default Comments;

const Star = ({ value, showArrow = true }: { value: number; showArrow?: boolean }) => (
  <p className="flex flex-row gap-1 items-center">
    {Array.from(Array(value).keys()).map((item) => (
      <IoStar color="#ffc000" size={20} key={item} />
    ))}
    {showArrow ? <IoMdArrowDropright className="ml-2" /> : null}
  </p>
);
