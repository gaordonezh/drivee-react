import { useEffect, useState } from 'react';
import Alert from '@/components/atoms/Alert';
import Button from '@/components/atoms/Button';
import List, { ListItemProps } from '@/components/molecules/List';
import Spinner from '@/components/molecules/Spinner';
import CustomDropZone from '@/components/organisms/DropZone';
import Layout from '@/components/templates';
import { useAppContext } from '@/context';
import LayoutEnum from '@/enums/layout.enum';
import { useAppDispatch, useAppSelector } from '@/hooks/useStore';
import { RequestStatusEnum } from '@/interfaces/global.enum';
import { CombinedDocumentEnum, DocumentStatusEnum, DocumentTypesEnum } from '@/store/documents/documents.enum';
import { createDocument, getDocuments, updateDocument } from '@/store/documents/documents.slice';
import { uploadFile } from '@/store/files/files.slice';
import { UserRolesEnum } from '@/store/user/user.enum';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { MdOutlineClose, MdOutlineCheck, MdInfoOutline } from 'react-icons/md';
import { USER_TDOC_TRANSLATE } from '@/utils/translate';

type DocumentFieldsType = {
  IDENTIFICATION_CARD: Array<File>;
  SOAT: Array<File>;
  DRIVER_LICENSE: Array<File>;
  OWNERSHIP_CARD: Array<File>;
  POLARIZED_GLASS: Array<File>;
  TECHNICAL_INSPECTION: Array<File>;
};

export const FILE_STATUS_TAGS = {
  [DocumentStatusEnum.APPROVED]: {
    value: <span className="text-green-500 font-medium text-sm">APROBADO</span>,
    iconNode: <MdOutlineCheck size={20} className="text-green-500" />,
  },
  [DocumentStatusEnum.REJECTED]: {
    value: <span className="text-red-500 font-medium text-sm">RECHAZADO</span>,
    iconNode: <MdOutlineClose size={20} className="text-red-500" />,
  },
  [DocumentStatusEnum.PENDING]: {
    value: <span className="text-yellow-500 font-medium text-sm">PENDIENTE</span>,
    iconNode: <MdInfoOutline size={20} className="text-yellow-500" />,
  },
  [DocumentStatusEnum.REVIEW]: {
    value: <span className="text-blue-500 font-medium text-sm">EN REVISIÓN</span>,
    iconNode: <MdInfoOutline size={20} className="text-blue-500" />,
  },
};

const Documents = () => {
  const { user } = useAppContext();
  const dispatch = useAppDispatch();
  const [edit, setEdit] = useState(false);
  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    reset,
  } = useForm<DocumentFieldsType>({ mode: 'onChange', defaultValues: { IDENTIFICATION_CARD: [] } });
  const { uploadFileState } = useAppSelector((state) => state.files);
  const { createDocumentStatus, documents, auxDocuments } = useAppSelector((state) => state.documents);
  const states = [uploadFileState, createDocumentStatus, documents.status];
  const isLoading = states.includes(RequestStatusEnum.PENDING);
  const disabledForm = states.includes(RequestStatusEnum.ERROR);
  const docId = auxDocuments.find((item) => item.type === 'IDENTIFICATION_CARD')?._id;

  useEffect(() => {
    obtainDocuments();
  }, []);

  const obtainDocuments = () => dispatch(getDocuments({ user: user?._id, kind: 'user' }));

  const onSubmit: SubmitHandler<DocumentFieldsType> = async (data) => {
    const result = await dispatch(uploadFile(data.IDENTIFICATION_CARD[0]));
    if (!result.payload.url) return;

    const userFields = { username: user?.f_name!, email: user?.email! };

    let res = null;
    if (docId) {
      const body = { url: result.payload.url, status: DocumentStatusEnum.REVIEW, ...userFields };
      res = await dispatch(updateDocument({ docId, data: body }));
    } else {
      const body = { type: CombinedDocumentEnum.IDENTIFICATION_CARD, url: result.payload.url, user: user?._id, ...userFields };
      res = await dispatch(createDocument(body));
    }
    // @ts-ignore
    if (res?.error) return;
    obtainDocuments();
    reset();
    setEdit(false);
  };

  const formController = (type: DocumentTypesEnum) => (
    <Controller
      name={type}
      control={control}
      rules={{ required: { value: true, message: 'El archivo requerido' } }}
      render={({ field }) => (
        <>
          <CustomDropZone
            files={field.value || []}
            setFiles={(newFiles) => setValue(type, newFiles)}
            accept={{ 'image/*': ['.jpeg', '.png', 'jpg'], 'application/pdf': ['.pdf'] }}
            max={1}
          />
          {errors[type] && <p className="text-sm text-red-500 leading-3 mt-1">{errors[type]?.message}</p>}
        </>
      )}
    />
  );

  const listData: Array<ListItemProps> = auxDocuments.map((item) => ({
    title: `${item.title} - ${user?.t_doc ? USER_TDOC_TRANSLATE[user.t_doc] : ''}`,
    ...(edit
      ? { value: formController(item.type) }
      : {
          value: (
            <>
              {FILE_STATUS_TAGS[item.status].value}
              {item.comment && <p className="text-xs">{item.comment}</p>}
            </>
          ),
          iconNode: FILE_STATUS_TAGS[item.status].iconNode,
        }),
  }));

  return (
    <Layout layout={LayoutEnum.DASHBOARD} authRoles={[UserRolesEnum.USER, UserRolesEnum.OWNER, UserRolesEnum.ADMIN]}>
      <Spinner loading={isLoading}>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <Alert variant="info" title="¡Recuerda!" description="Después de adjuntar tus documentos, estos ingresarán a revisión." />

          {!user?.t_doc && (
            <Alert
              variant="warning"
              title="¡Recuerda!"
              description="Primero debes completar tus datos personales en "
              link={{ path: '/dashboard/profile', text: 'datos personales' }}
            />
          )}

          <List title="Documentos personales" subtitle="Adjunte los documentos que se mencionan a continuación." data={listData} />

          <div className="flex flex-col-reverse justify-end sm:flex-row gap-5">
            {edit ? (
              <>
                <Button size="large" type="button" variant="white" className="!border-black" onClick={() => setEdit(false)}>
                  Cancelar
                </Button>
                <Button size="large" type="submit" disabled={disabledForm}>
                  {`${docId ? 'Guardar' : ''} cambios`}
                </Button>
              </>
            ) : (
              <Button size="large" type="button" variant="white" className="!border-black" onClick={() => setEdit(true)} disabled={!user?.t_doc}>
                {`${docId ? 'Actualizar' : 'Adjuntar'} documentos`}
              </Button>
            )}
          </div>
        </form>
      </Spinner>
    </Layout>
  );
};

export default Documents;
