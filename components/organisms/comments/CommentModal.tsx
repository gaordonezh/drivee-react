import React, { useState, useId } from 'react';
import Modal from '@/components/molecules/Modal';
import PortalCreator from '@/components/molecules/PortalCreator';
import { IoStar } from 'react-icons/io5';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';
import Textarea from '@/components/atoms/TextArea';

interface CommentModalProps {
  handleClose: VoidFunction;
}

type CommentStateType = {
  stars: number;
  title: string;
  description: string;
};

const CommentModal = ({ handleClose }: CommentModalProps) => {
  const uniqueGlobalId = useId();
  const [fields, setFields] = useState<CommentStateType>({ stars: 0, title: '', description: '' });

  return (
    <PortalCreator
      uniqueGlobalId={uniqueGlobalId}
      component={
        <Modal onClose={handleClose}>
          <div className="text-left flex flex-col gap-5">
            <h1 className="text-center text-lg font-semibold">Tu opinión nos importa ¡Evalúa a este vehículo!</h1>
            <div>
              <p className="font-semibold">¿Cuántas estrellas?</p>
              <Star value={fields.stars} onChange={(stars) => setFields({ ...fields, stars })} />
            </div>
            <Input label="Tu opinión en un título" value={fields.title} onChange={(event) => setFields({ ...fields, title: event.target.value })} />
            <Textarea
              label="Cuéntamos más del vehículo"
              value={fields.description}
              onChange={(event) => setFields({ ...fields, description: event.target.value })}
            />

            <div className="flex gap-5 justify-end">
              <Button size="large" variant="white" className="!border-2 !border-black" onClick={handleClose}>
                Cancelar
              </Button>
              <Button size="large" className="">
                Publicar evaluación
              </Button>
            </div>
          </div>
        </Modal>
      }
    />
  );
};

export default CommentModal;

const Star = ({ value, onChange }: { value: number; onChange: (stars: number) => void }) => {
  const values = [1, 2, 3, 4, 5];

  return (
    <p className="flex flex-row gap-2 items-center">
      {values.map((item) => (
        <IoStar
          color={item > value ? '#aaaaaa' : '#ffc000'}
          size={30}
          key={item}
          className="cursor-pointer hover:scale-110"
          onClick={() => onChange(item)}
        />
      ))}
    </p>
  );
};
