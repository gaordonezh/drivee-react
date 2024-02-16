import React, { useEffect, useState } from 'react';
import Layout from '@/components/templates';
import LayoutEnum from '@/enums/layout.enum';
import TableReview from '@/components/organisms/dashboard/TableReview';
import { UserRolesEnum } from '@/store/user/user.enum';
import { useAppDispatch } from '@/hooks/useStore';
import { getDocuments } from '@/store/documents/documents.slice';
import ConfirmAction from '@/components/molecules/ConfirmAction';
import { ModalStateEnum } from '@/interfaces/global.enum';
import { DocumentProps } from '@/store/documents/documents';
import { DocumentStatusEnum } from '@/store/documents/documents.enum';
import Input from '@/components/atoms/Input';
import Drawer from '@/components/molecules/Drawer';
import { DOCUMENT_TYPES_TRANSLATE } from '@/utils/translate';
import { FILE_STATUS_TAGS } from './documents';
import List from '@/components/molecules/List';
import Button from '@/components/atoms/Button';
import { VehicleStatusEnum } from '@/store/vehicle/vehicle.enum';

export type ReviewSelectStateType = {
  mode: null | ModalStateEnum;
  data: null | DocumentProps;
};

const ReviewDocuments = () => {
  const dispatch = useAppDispatch();
  const [selected, setSelected] = useState<ReviewSelectStateType>({ data: null, mode: null });
  const [comment, setComment] = useState('');

  useEffect(() => {
    obtainDocuments();
  }, []);

  const obtainDocuments = () => dispatch(getDocuments({ populate: ['user', 'vehicle'], sortAscending: false, sortField: 'status' }));

  const handleClose = () => {
    setSelected({ data: null, mode: null });
    setComment('');
  };

  const user = selected.data?.user ?? selected.data?.vehicle?.user;

  return (
    <Layout layout={LayoutEnum.DASHBOARD} authRoles={[UserRolesEnum.ADMIN]}>
      <TableReview setSelected={setSelected} />

      {selected.mode === ModalStateEnum.APPROVE && (
        <ConfirmAction
          title="Aprobar documento"
          subtitle="¿Seguro que desea APROBAR este documento?"
          method="put"
          endpoint={`/documents/${selected.data?._id}`}
          body={{ status: DocumentStatusEnum.APPROVED, comment, username: user?.f_name, email: user?.email }}
          handleClose={handleClose}
          content={
            <Input
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              placeholder="Ingresa un comentario"
              label="Comentario (opcional)"
            />
          }
          handleResponse={(result) => obtainDocuments()}
        />
      )}

      {selected.mode === ModalStateEnum.REJECTED && (
        <ConfirmAction
          title="Rechazar documento"
          subtitle="¿Seguro que desea RECHAZAR este documento?"
          method="put"
          endpoint={`/documents/${selected.data?._id}`}
          body={{ status: DocumentStatusEnum.REJECTED, comment, username: user?.f_name, email: user?.email }}
          handleClose={handleClose}
          content={
            <Input
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              placeholder="Ingresa un comentario"
              label="Comentario (opcional)"
            />
          }
          handleResponse={(result) => obtainDocuments()}
        />
      )}

      {selected.mode === ModalStateEnum.ENABLE && (
        <ConfirmAction
          title="Activar vehículo"
          subtitle="¿Seguro que desea ACTIVAR este vehiculo?"
          method="put"
          endpoint={`/vehicles/${selected.data?.vehicle?._id}`}
          body={{ status: VehicleStatusEnum.AVAILABLE }}
          handleClose={handleClose}
          handleResponse={(result) => console.clear()}
        />
      )}

      {selected.mode === ModalStateEnum.DELETE && (
        <ConfirmAction
          title="Eliminar documento"
          subtitle="¿Seguro que desea ELIMINAR este documento?"
          method="delete"
          endpoint={`/documents/${selected.data?._id}`}
          handleClose={handleClose}
          handleResponse={(result) => obtainDocuments()}
        />
      )}

      {selected.mode === ModalStateEnum.DETAIL && selected.data && (
        <Drawer position="right">
          <List
            title="Detalle del documento"
            data={[
              {
                title: 'Nombre completo',
                value: `${user?.f_name} ${user?.l_name}`,
              },
              {
                title: 'Celular',
                value: user?.phone,
              },
              {
                title: 'Correo',
                value: user?.email,
              },
              {
                title: 'Tipo de documento',
                value: DOCUMENT_TYPES_TRANSLATE[selected.data.type],
              },
              {
                title: 'Estado',
                value: FILE_STATUS_TAGS[selected.data.status].value,
              },
              {
                title: 'Archivo',
                value: (
                  <a href={selected.data.url} target="_blank" className="text-blue-500 underline">
                    Ver documento
                  </a>
                ),
              },
              {
                title: 'Comentario',
                value: selected.data.comment,
              },
            ]}
          />
          <Button onClick={handleClose} className="mt-10 mx-auto">
            Cerrar
          </Button>
        </Drawer>
      )}
    </Layout>
  );
};

export default ReviewDocuments;
