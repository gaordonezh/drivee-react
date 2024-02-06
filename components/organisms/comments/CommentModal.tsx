import React, { useId } from 'react';
import Modal from '@/components/molecules/Modal';
import PortalCreator from '@/components/molecules/PortalCreator';
import { IoStar } from 'react-icons/io5';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';
import Textarea from '@/components/atoms/Textarea';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useAppContext } from '@/context';
import { useAppDispatch, useAppSelector } from '@/hooks/useStore';
import { createComment } from '@/store/comment/comment.slice';
import Alert from '@/components/atoms/Alert';
import { RequestStatusEnum } from '@/interfaces/global.enum';
import Spinner from '@/components/molecules/Spinner';

interface CommentModalProps {
  handleClose: VoidFunction;
  handleReload: VoidFunction;
  vehicleSimpleData: {
    name: string;
    description: string;
    id: string;
  };
}

type CommentFields = {
  stars: number;
  title: string;
  description: string;
};

const CommentModal = ({ handleClose, vehicleSimpleData, handleReload }: CommentModalProps) => {
  const uniqueGlobalId = useId();
  const { user } = useAppContext();
  const dispatch = useAppDispatch();
  const { createCommentState } = useAppSelector((state) => state.comments);
  const { register, handleSubmit, formState, control, setValue, reset } = useForm<CommentFields>({ mode: 'onChange', defaultValues: { stars: 0 } });

  const onSubmit: SubmitHandler<CommentFields> = async (data) => {
    const body = {
      ...data,
      user: { f_name: user?.f_name!, l_name: user?.l_name!, email: user?.email!, phone: user?.phone!, id: user?._id! },
      vehicle: vehicleSimpleData,
    };
    const res = await dispatch(createComment(body));
    // @ts-ignore
    if (res.error) return;
    reset();
    handleClose();
    handleReload();
  };

  return (
    <PortalCreator
      uniqueGlobalId={uniqueGlobalId}
      component={
        <Modal onClose={handleClose}>
          <div className="text-left">
            <Spinner loading={createCommentState === RequestStatusEnum.PENDING}>
              <h1 className="text-center text-lg font-semibold">Tu opinión nos importa</h1>
              <p className="text-center text-sm text-gray-500">¡Evalúa a este vehículo!</p>
              {createCommentState === RequestStatusEnum.ERROR && <Alert title="No se logró crear la evaluación" variant="error" className="mt-5" />}
              <form className="flex flex-col gap-5 mt-5" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                <div>
                  <p className="font-semibold">¿Cuántas estrellas?</p>
                  <Controller
                    name="stars"
                    rules={{
                      validate: {
                        valueZero: (value) => {
                          if (!value) return 'Las estrellas son requeridas';
                        },
                      },
                    }}
                    control={control}
                    render={({ field }) => (
                      <>
                        <Star value={field.value} onChange={(stars) => setValue('stars', stars)} />
                        {formState.errors.stars && <p className="text-sm text-red-500 leading-3 mt-1">{formState.errors.stars.message}</p>}
                      </>
                    )}
                  />
                </div>
                <Input
                  label="Tu opinión en un título"
                  error={Boolean(formState.errors.title)}
                  errorMessage={formState.errors.title?.message ?? ''}
                  {...register('title', {
                    validate: {
                      required: (value) => {
                        if (!value.trim()) return 'El nombre es requerido';
                      },
                    },
                    pattern: { message: 'Solo se aceptan caracteres alfanuméricos', value: /^[0-9a-z áéíóúñ,.]+$/i },
                    minLength: { value: 3, message: 'Son 3 caracteres alfanuméricos como mínimo' },
                    maxLength: { value: 50, message: 'Son 50 caracteres alfanuméricos como máximo' },
                  })}
                />
                <Textarea
                  label="Cuéntamos más del vehículo"
                  error={Boolean(formState.errors.description)}
                  errorMessage={formState.errors.description?.message ?? ''}
                  {...register('description', {
                    validate: {
                      required: (value) => {
                        if (!value.trim()) return 'La descripción es requerida';
                      },
                    },
                    pattern: { message: 'Solo se aceptan caracteres alfanuméricos', value: /^[0-9a-z áéíóúñ,.]+$/i },
                    minLength: { value: 10, message: 'Son 10 caracteres alfanuméricos como mínimo' },
                    maxLength: { value: 150, message: 'Son 150 caracteres alfanuméricos como máximo' },
                  })}
                />

                <div className="flex gap-5 justify-end">
                  <Button size="large" variant="white" className="!border-2 !border-black" onClick={handleClose} type="button">
                    Cancelar
                  </Button>
                  <Button size="large" type="submit">
                    Publicar evaluación
                  </Button>
                </div>
              </form>
            </Spinner>
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
