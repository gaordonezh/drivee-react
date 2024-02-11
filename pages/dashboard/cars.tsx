import React, { useEffect, useState } from 'react';
import Layout from '@/components/templates';
import LayoutEnum from '@/enums/layout.enum';
import { ModalStateEnum, RequestStatusEnum } from '@/interfaces/global.enum';
import { UserRolesEnum } from '@/store/user/user.enum';
import VehicleDrawer from '@/components/organisms/dashboard/VehicleDrawer';
import VehicleDocumentsModal from '@/components/organisms/dashboard/VehicleDocumentsModal';
import { VehicleProps } from '@/store/vehicle/vehicle';
import { useAppDispatch, useAppSelector } from '@/hooks/useStore';
import { getVehicles } from '@/store/vehicle/vehicle.slice';
import Alert from '@/components/atoms/Alert';
import VehicleList from '@/components/organisms/dashboard/VehicleList';
import { useAppContext } from '@/context';
import { verifyDocuments } from '@/store/documents/documents.slice';

export type CarsModalStateType = { mode: null | ModalStateEnum; data: null | VehicleProps };

const Cars = () => {
  const { user } = useAppContext();
  const [modal, setModal] = useState<CarsModalStateType>({ mode: null, data: null });
  const [verifyDocs, setVerifyDocs] = useState(false);
  const dispatch = useAppDispatch();
  const { createVehicleState, updateVehicleState } = useAppSelector((state) => state.vehicles);

  const handleClose = () => setModal({ mode: null, data: null });

  useEffect(() => {
    obtainVehicles();
    handleVerifyDocuments();
  }, []);

  const handleVerifyDocuments = async () => {
    if (!user) return;
    const verify = await dispatch(verifyDocuments({ user: user._id }));
    setVerifyDocs(verify.payload.user);
  };

  const obtainVehicles = () => dispatch(getVehicles({ user: user?._id! }));

  return (
    <Layout layout={LayoutEnum.DASHBOARD} authRoles={[UserRolesEnum.OWNER, UserRolesEnum.ADMIN]}>
      {[createVehicleState, updateVehicleState].includes(RequestStatusEnum.SUCCESS) && (
        <Alert
          variant="success"
          title={`El vehículo se ${createVehicleState === RequestStatusEnum.SUCCESS ? 'agregó' : 'actualizó'} correctamente`}
          description={createVehicleState === RequestStatusEnum.SUCCESS ? 'El siguiente paso es subir los documentos vehiculares.' : ''}
          className="mb-5"
        />
      )}

      {verifyDocs && (
        <Alert
          variant="warning"
          title="Documentos personales pendientes"
          description="Tus documentos aún no fueron adjuntados y/o aprobados. Puedes verificar en tu perfíl y subirlo en la sección de "
          link={{ path: '/dashboard/documents', text: 'mis documentos' }}
          className="mb-5"
        />
      )}

      <VehicleList disabled={verifyDocs} setModal={setModal} />

      {modal.mode === ModalStateEnum.BOX && <VehicleDrawer handleClose={handleClose} handleReload={obtainVehicles} data={modal.data} />}
      {modal.mode === ModalStateEnum.DOCUMENTS && modal.data && (
        <VehicleDocumentsModal handleClose={handleClose} handleReload={obtainVehicles} vehicle={modal.data} />
      )}
    </Layout>
  );
};

export default Cars;
