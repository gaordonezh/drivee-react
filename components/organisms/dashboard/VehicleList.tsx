import Alert from '@/components/atoms/Alert';
import Card from '@/components/atoms/Card';
import Fab from '@/components/atoms/Fab';
import Empty from '@/components/molecules/Empty';
import Spinner from '@/components/molecules/Spinner';
import { useAppSelector } from '@/hooks/useStore';
import { ModalStateEnum, RequestStatusEnum } from '@/interfaces/global.enum';
import { CarsModalStateType } from '@/pages/dashboard/cars';
import { VehicleStatusEnum } from '@/store/vehicle/vehicle.enum';
import { formatMoney } from '@/utils/functions';
import React, { Dispatch, SetStateAction } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { IoDocumentTextSharp } from 'react-icons/io5';
import { MdCarCrash, MdEdit } from 'react-icons/md';

interface VehicleListProps {
  setModal: Dispatch<SetStateAction<CarsModalStateType>>;
}

const VehicleList = ({ setModal }: VehicleListProps) => {
  const { vehicles } = useAppSelector((state) => state.vehicles);

  const statusNode = {
    [VehicleStatusEnum.PENDING]: <Alert title="PENDIENTE" className="!py-2" variant="warning" />,
    [VehicleStatusEnum.AVAILABLE]: <Alert title="DISPONIBLE" className="!py-2" variant="success" />,
    [VehicleStatusEnum.NOT_AVAILABLE]: <Alert title="NO DISPONIBLE" className="!py-2" variant="info" />,
  };

  return (
    <Spinner loading={vehicles.status === RequestStatusEnum.PENDING}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-4 gap-3 lg:gap-10">
        <Card
          className="cursor-pointer flex flex-col items-center justify-center hover:opacity-75 hover:shadow-lg min-h-[150px]"
          onClick={() => setModal({ mode: ModalStateEnum.BOX, data: null })}
        >
          <IoMdAdd size={50} className="hover:scale-105 hover:transition-all" />
          <p className="font-semibold text-sm">Agregar vehículo</p>
        </Card>
        {vehicles.docs.length ? (
          vehicles.docs.map((item) => (
            <Card key={item._id}>
              <div className="flex flex-col gap-5">
                <figure
                  className="h-[150px] w-full rounded-md bg-no-repeat bg-cover bg-center"
                  style={{ backgroundImage: `url(${item.images[0]})` }}
                />

                {statusNode[item.status]}

                <div className="flex flex-wrap gap-1 justify-between">
                  <h2 className="font-semibold">{item.name}</h2>
                  <p className="text-base text-gray-600">
                    <span className="font-bold">S/ {formatMoney(item.pricexhour)}</span> por hora
                  </p>
                </div>
                <div className="flex flex-wrap gap-1 justify-between">
                  <Fab
                    icon={<MdEdit size={20} />}
                    size="large"
                    title="Actualizar información"
                    onClick={() => setModal({ mode: ModalStateEnum.BOX, data: item })}
                  />
                  <Fab icon={<MdCarCrash size={20} />} size="large" title="Desactivar vehículo" />
                  <Fab
                    icon={<IoDocumentTextSharp size={20} />}
                    size="large"
                    title="Documentos"
                    onClick={() => setModal({ mode: ModalStateEnum.DOCUMENTS, data: item })}
                  />
                </div>
              </div>
            </Card>
          ))
        ) : (
          <Empty />
        )}
      </div>
    </Spinner>
  );
};

export default VehicleList;
