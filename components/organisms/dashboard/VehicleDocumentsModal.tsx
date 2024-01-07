import React, { useEffect, useId, useState } from 'react';
import PortalCreator from '@/components/molecules/PortalCreator';
import Modal from '@/components/molecules/Modal';
import Spinner from '@/components/molecules/Spinner';
import CustomDropZone from '../DropZone';
import Button from '@/components/atoms/Button';
import { useAppContext } from '@/context';
import { useAppDispatch, useAppSelector } from '@/hooks/useStore';
import { RequestStatusEnum } from '@/interfaces/global.enum';
import { createDocument, getDocuments, updateDocument } from '@/store/documents/documents.slice';
import { DocumentStatusEnum, DocumentTypesEnum, VehicleDocumentTypesEnum } from '@/store/documents/documents.enum';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { FILE_STATUS_TAGS } from '@/pages/dashboard/documents';
import { CreateDocumentProps } from '@/store/documents/documents';
import { VehicleProps } from '@/store/vehicle/vehicle';
import Link from 'next/link';
import Switch from '@/components/atoms/Switch';
import Alert from '@/components/atoms/Alert';
import { uploadFile } from '@/store/files/files.slice';
import { resetVehicleStatus, updateVehicle } from '@/store/vehicle/vehicle.slice';

interface VehicleDocumentsModalProps {
  handleClose: VoidFunction;
  handleReload: VoidFunction;
  vehicle: VehicleProps;
}

type DocumentFieldsType = {
  IDENTIFICATION_CARD: Array<File>;
  SOAT: Array<File>;
  DRIVER_LICENSE: Array<File>;
  OWNERSHIP_CARD: Array<File>;
  POLARIZED_GLASS: Array<File>;
  TECHNICAL_INSPECTION: Array<File>;
};

const VehicleDocumentsModal = ({ handleClose, handleReload, vehicle }: VehicleDocumentsModalProps) => {
  const { user } = useAppContext();
  const uniqueGlobalId = useId();
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm<DocumentFieldsType>({
    mode: 'onChange',
    defaultValues: { SOAT: [], DRIVER_LICENSE: [], OWNERSHIP_CARD: [], POLARIZED_GLASS: [], TECHNICAL_INSPECTION: [] },
  });
  const isFirstTime = !vehicle.documents.length;
  const { createDocumentStatus, documents, auxDocuments } = useAppSelector((state) => state.documents);
  const { uploadFileState } = useAppSelector((state) => state.files);
  const states = [uploadFileState, createDocumentStatus, documents.status];
  const isLoading = states.includes(RequestStatusEnum.PENDING);
  const [edit, setEdit] = useState(false);
  const [requiredFields, setRequiredFields] = useState<Array<DocumentTypesEnum>>(
    vehicle.documents.length ? vehicle.documents : Object.values(VehicleDocumentTypesEnum)
  );

  useEffect(() => {
    obtainDocuments();
  }, []);

  const obtainDocuments = () => dispatch(getDocuments({ vehicle: vehicle._id, kind: 'vehicle' }));

  const onSubmit: SubmitHandler<DocumentFieldsType> = async (data) => {
    const withFiles = Object.entries(data).filter(([_, files]) => files.length);
    if (!withFiles.length) return handleClose();

    const documents = withFiles.map(([type]) => type as DocumentTypesEnum);
    documents.push(...vehicle.documents);
    const clearDocuments = documents.filter((value, index, self) => self.indexOf(value) === index);

    let index = 1;
    for (const [type, files] of withFiles) {
      const result = await dispatch(uploadFile(files[0]));
      if (!result.payload.url) continue;

      const docId = auxDocuments.find((item) => item.type === type)?._id;
      let res = null;
      if (docId) {
        const body = {
          url: result.payload.url,
          status: DocumentStatusEnum.REVIEW,
          email: user?.email!,
          username: user?.f_name!,
        };
        res = await dispatch(updateDocument({ docId, data: body }));
      } else {
        const body: CreateDocumentProps = {
          vehicle: vehicle._id,
          type: type as DocumentTypesEnum,
          url: result.payload.url,
          email: user?.email!,
          username: user?.f_name!,
          skip: true,
        };
        if (index === withFiles.length) {
          body.documents = clearDocuments;
          body.skip = false;
        }
        res = await dispatch(createDocument(body));
      }
      // @ts-ignore
      if (res.error) return;
      index++;
    }

    await dispatch(updateVehicle({ id: vehicle._id, body: { documents: clearDocuments as Array<VehicleDocumentTypesEnum> } }));

    handleReload();
    handleClose();
    setTimeout(() => {
      dispatch(resetVehicleStatus());
    }, 5000);
  };

  return (
    <PortalCreator
      uniqueGlobalId={uniqueGlobalId}
      component={
        <Modal className="w-[300px] sm:w-[400px] md:w-[600px] lg:w-[700px] xl:w-[800px]">
          <Spinner loading={isLoading} text="..:: Tus documentos estan cargando ::..">
            <div className="flex flex-col gap-3 text-left">
              <div className="sm:flex sm:flex-row sm:justify-between sm:items-center sm:gap-5">
                <div className="mb-2 sm:mb-0">
                  <h3 className="text-base font-semibold text-gray-900">Documentos del vehículo</h3>
                  <p className="text-sm text-gray-500">Adjunte los documentos que se mencionan a continuación.</p>
                </div>
                <Button type="button" onClick={() => setEdit(!edit)} variant={edit ? 'white' : 'dark'} className={edit ? '!border-black' : ''}>
                  {edit ? 'Cancelar' : 'Adjuntar archivos'}
                </Button>
              </div>
              {isFirstTime && (
                <Alert title="¡Recuerda!" variant="info" description={`Desactiva los documentos que no correspoden a este vehículo.`} />
              )}
              {[uploadFileState, createDocumentStatus].includes(RequestStatusEnum.ERROR) && (
                <Alert variant="error" description="Ocurrió un error al subir los archivos." />
              )}

              <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                <dl className={'divide-y divide-gray-200'}>
                  {auxDocuments.map((item, index) => {
                    const isActive = requiredFields.includes(item.type);
                    const status = (
                      <div>
                        {isActive || isFirstTime ? FILE_STATUS_TAGS[item.status].value : <span className="text-gray-400 text-sm">No aplica</span>}
                      </div>
                    );

                    return (
                      <div className="py-2 sm:flex sm:flex-row sm:gap-2 sm:items-center" key={index}>
                        <dt className="text-sm text-gray-800 font-medium flex-dos">
                          {edit ? (
                            <>
                              <Switch
                                label={item.title}
                                active={isActive}
                                onChange={(checked) => {
                                  if (checked) {
                                    const newFields = [...requiredFields, item.type];
                                    setRequiredFields([...newFields]);
                                  } else {
                                    const index = requiredFields.findIndex((key) => key === item.type);
                                    requiredFields.splice(index, 1);
                                    setRequiredFields([...requiredFields]);
                                    setValue(item.type, [], { shouldValidate: true });
                                  }
                                }}
                              />
                              {status}
                            </>
                          ) : (
                            item.title
                          )}
                        </dt>
                        <dd className="flex-tres">
                          {edit ? (
                            <>
                              {isActive ? (
                                <Controller
                                  name={item.type}
                                  control={control}
                                  rules={{
                                    required: {
                                      value: isActive && !item._id,
                                      message: `Adjunta <b>${item.title}</b> o <b>desactivala</b> si no corresponde.`,
                                    },
                                    validate: {
                                      onlyOne: (arrFiles) => {
                                        if (isActive && !item._id && arrFiles.length !== 1) return 'Solo debes adjuntar un archivo.';
                                      },
                                    },
                                  }}
                                  render={({ field }) => (
                                    <>
                                      <CustomDropZone
                                        files={field.value || []}
                                        setFiles={(newFiles) => setValue(item.type, newFiles, { shouldValidate: true })}
                                        accept={{ 'image/*': ['.jpeg', '.png', 'jpg'], 'application/pdf': ['.pdf'] }}
                                        className="h-auto py-3"
                                      />
                                      {errors[item.type] && (
                                        <p
                                          className="text-sm text-red-500 mt-1"
                                          dangerouslySetInnerHTML={{ __html: errors[item.type]?.message ?? '' }}
                                        ></p>
                                      )}
                                    </>
                                  )}
                                />
                              ) : null}
                            </>
                          ) : (
                            <>
                              {status}
                              {item.url && (
                                <Link href={item.url} rel="noopener noreferrer" target="_blank" className="text-blue-700 underline text-sm">
                                  Ver documento
                                </Link>
                              )}
                              {item.comment && <p className="text-xs">{item.comment}</p>}
                            </>
                          )}
                        </dd>
                      </div>
                    );
                  })}
                </dl>
                <div className="flex flex-row gap-5 justify-end">
                  <Button size="large" type="button" variant="white" onClick={handleClose} className="!border-black">
                    Cerrar
                  </Button>
                  {edit && (
                    <Button size="large" type="submit">
                      Guardar
                    </Button>
                  )}
                </div>
              </form>
            </div>
          </Spinner>
        </Modal>
      }
    />
  );
};

export default VehicleDocumentsModal;
