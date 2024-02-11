import React, { useEffect, useState } from 'react';
import { IoStar } from 'react-icons/io5';
import { IoMdArrowDropright } from 'react-icons/io';
import Button from '@/components/atoms/Button';
import Chip from '@/components/atoms/Chip';
import Divider from '@/components/protons/Divider';
import CommentModal from './CommentModal';
import { ModalStateEnum, RequestStatusEnum } from '@/interfaces/global.enum';
import { useAppDispatch, useAppSelector } from '@/hooks/useStore';
import { getComments } from '@/store/comment/comment.slice';
import Skeleton from '@/components/atoms/Skeleton';
import moment from 'moment-timezone';
import ModalLogin from '../ModalLogin';
import { useAppContext } from '@/context';
import Empty from '@/components/molecules/Empty';

interface CommentsProps {
  vehicleSimpleData: {
    name: string;
    description: string;
    id: string;
  };
}

type CommentModalsStateType = { data: null; mode: null | ModalStateEnum };

const Comments = ({ vehicleSimpleData }: CommentsProps) => {
  const { user } = useAppContext();
  const dispatch = useAppDispatch();
  const { comments } = useAppSelector((state) => state.comments);
  const [modal, setModal] = useState<CommentModalsStateType>({ data: null, mode: null });
  const loading = comments.status === RequestStatusEnum.PENDING;

  useEffect(() => {
    onLoadComponent();
  }, []);

  const onLoadComponent = () => dispatch(getComments({ limit: 100, vehicle: vehicleSimpleData.id }));

  const starsSum = comments.docs
    .map((item) => item.stars)
    .reduce(
      (prev, current) => {
        prev.stars[current - 1] += 1;
        prev.sum += current;
        return prev;
      },
      { stars: [0, 0, 0, 0, 0], sum: 0 }
    );

  const avgAux = starsSum.sum / (comments.docs.length || 1);
  const avg = String(avgAux).length === 1 ? avgAux : avgAux.toFixed(1);

  return (
    <div id="comments">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div>
          <p className="font-bold text-2xl">Calificación general</p>
          <p className="text-base text-gray-500">
            <span className="mr-3">{avg} / 5</span>
            <span className="pl-3 border-l border-gray-500">{`${comments.docs.length} comentario${comments.docs.length === 1 ? '' : 's'}`}</span>
          </p>
        </div>
        <Button
          size="large"
          variant="white"
          className="!border-2 !border-gray-900"
          onClick={() => setModal({ data: null, mode: user ? ModalStateEnum.BOX : ModalStateEnum.DISABLE })}
          disabled={loading}
        >
          Escribir comentario
        </Button>
      </div>
      <div className="flex flex-wrap gap-3 mt-2">
        {starsSum.stars.map((sum, star) => (
          <Chip key={star} iconRight={<Star value={star + 1} />} label={String(sum)} className="w-full sm:w-auto" />
        ))}
      </div>

      {loading
        ? Array.from(Array(3).keys()).map((item) => (
            <React.Fragment key={item}>
              <Divider className="my-5" />
              <Skeleton
                items={[
                  { type: 'title', qty: 1 },
                  { type: 'subtitle', qty: 1 },
                  { type: 'paragraph', qty: 2 },
                ]}
              />
            </React.Fragment>
          ))
        : null}

      {comments.docs.length ? (
        comments.docs.map((item) => (
          <React.Fragment key={item._id}>
            <Divider className="my-5" />
            <div>
              <div className="flex flex-col md:flex-row justify-between">
                <div>
                  <p className="text-gray-700 font-bold">{item.title}</p>
                  <div className="flex flex-col md:flex-row gap-1">
                    <p className="text-gray-600 text-sm font-semibold">{item.user.f_name}</p>
                    <Star value={item.stars} showArrow={false} />
                  </div>
                </div>
                <p className="text-gray-600 text-sm">{moment(item.updatedAt).format('DD MMM YYYY')}</p>
              </div>
              <p className="text-gray-500 text-sm text-justify">{item.description}</p>
            </div>
          </React.Fragment>
        ))
      ) : (
        <div className="py-20">
          <Empty title="Aún no hay comentarios. Sé el primero en dar tu opinión sobre este vehículo." />
        </div>
      )}

      {modal.mode === ModalStateEnum.BOX && (
        <CommentModal vehicleSimpleData={vehicleSimpleData} handleClose={() => setModal({ data: null, mode: null })} handleReload={onLoadComponent} />
      )}

      {modal.mode === ModalStateEnum.DISABLE && <ModalLogin handleClose={() => setModal({ data: null, mode: null })} />}
    </div>
  );
};

export default Comments;

const Star = ({ value, showArrow = true }: { value: number; showArrow?: boolean }) => (
  <p className="flex flex-row gap-1 items-center">
    {showArrow ? <IoMdArrowDropright /> : null}
    {Array.from(Array(value).keys()).map((item) => (
      <IoStar color="#ffc000" size={20} key={item} />
    ))}
  </p>
);
