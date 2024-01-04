import { useEffect, useState } from 'react';
import Alert from '@/components/atoms/Alert';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Select from '@/components/atoms/Select';
import List, { ListItemProps } from '@/components/molecules/List';
import Spinner from '@/components/molecules/Spinner';
import CustomDropZone from '@/components/organisms/DropZone';
import Layout from '@/components/templates';
import { useAppContext } from '@/context';
import LayoutEnum from '@/enums/layout.enum';
import { useAppDispatch, useAppSelector } from '@/hooks/useStore';
import useUserDataValidations from '@/hooks/useUserDataValidations';
import { RequestStatusEnum } from '@/interfaces/global.enum';
import { CombinedDocumentEnum, DocumentStatusEnum, DocumentTypesEnum } from '@/store/documents/documents.enum';
import { createDocument, getDocuments, updateDocument } from '@/store/documents/documents.slice';
import { uploadFile } from '@/store/files/files.slice';
import { UserRolesEnum, UserTypeDocumentEnum } from '@/store/user/user.enum';
import { resetUpdateUserState, updateUser } from '@/store/user/user.slice';
import { N_DOC_PATTERN } from '@/utils/constants';
import { objectCleaner } from '@/utils/functions';
import { USER_TDOC_TRANSLATE } from '@/utils/translate';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { MdOutlineClose, MdOutlineCheck, MdInfoOutline } from 'react-icons/md';

type DocumentFieldsType = {
  t_doc: UserTypeDocumentEnum;
  n_doc: string;
  IDENTIFICATION_CARD: Array<File>;
  SOAT: Array<File>;
};

const fileStatus = {
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
  const validateUserFields = useUserDataValidations();
  const dispatch = useAppDispatch();
  const [edit, setEdit] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    resetField,
  } = useForm<DocumentFieldsType>({ mode: 'onChange', defaultValues: { t_doc: user?.t_doc, n_doc: user?.n_doc } });
  const { validateUserState, updateUserState } = useAppSelector((state) => state.user);
  const { uploadFileState } = useAppSelector((state) => state.files);
  const { createDocumentStatus, documents, auxDocuments } = useAppSelector((state) => state.documents);
  const states = [validateUserState, updateUserState, uploadFileState, createDocumentStatus, documents.status];
  const isLoading = states.includes(RequestStatusEnum.PENDING);
  const disabledForm = states.includes(RequestStatusEnum.ERROR);
  const docId = auxDocuments.find((item) => item.type === 'IDENTIFICATION_CARD')?._id;

  useEffect(() => {
    obtainDocuments();
  }, []);

  const obtainDocuments = () => dispatch(getDocuments({ idUser: user?._id, kind: 'personal' }));

  const onSubmit: SubmitHandler<DocumentFieldsType> = async (data) => {
    if (data.IDENTIFICATION_CARD.length) {
      const result = await dispatch(uploadFile(data.IDENTIFICATION_CARD[0]));
      if (!result.payload.url) return;

      let res = null;
      if (docId) res = await dispatch(updateDocument({ docId, data: { url: result.payload.url, status: DocumentStatusEnum.REVIEW } }));
      else res = await dispatch(createDocument({ type: CombinedDocumentEnum.IDENTIFICATION_CARD, url: result.payload.url, idUser: user?._id }));
      // @ts-ignore
      if (res.error) return;
    }
    const res = await dispatch(updateUser({ body: objectCleaner({ t_doc: data.t_doc, n_doc: data.n_doc }), user_id: user?._id! }));
    // @ts-ignore
    if (res.error) return;
    obtainDocuments();
    resetField('IDENTIFICATION_CARD');
    setEdit(false);
    setTimeout(() => {
      dispatch(resetUpdateUserState());
    }, 7000);
  };

  const formController = (type: DocumentTypesEnum) => (
    <Controller
      name={type}
      control={control}
      render={({ field }) => (
        <CustomDropZone
          files={field.value || []}
          setFiles={(newFiles) => setValue(type, newFiles)}
          accept={{ 'image/jpeg': ['.jpeg', '.png', 'jpg', '.webp'], 'application/pdf': ['.pdf'] }}
          max={1}
        />
      )}
    />
  );

  const listData: Array<ListItemProps> = auxDocuments.map((item) => ({
    title: item.title,
    ...(edit ? { value: formController(item.type) } : fileStatus[item.status]),
  }));

  return (
    <Layout layout={LayoutEnum.DASHBOARD} authRoles={[UserRolesEnum.USER, UserRolesEnum.OWNER, UserRolesEnum.ADMIN]}>
      <Spinner loading={isLoading}>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <Alert variant="info" title="¡Recuerda!" description="Después de adjuntar tus documentos, estos ingresarán a revisión." />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Controller
              name="t_doc"
              rules={{ required: { value: true, message: 'El tipo de documento es requerido' } }}
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  label="Tipo Documento"
                  setValue={(newValue) => setValue('t_doc', newValue as UserTypeDocumentEnum, { shouldValidate: true })}
                  data={Object.values(UserTypeDocumentEnum).map((item) => ({ _id: item, name: USER_TDOC_TRANSLATE[item] }))}
                  error={Boolean(errors.t_doc)}
                  errorMessage={errors.t_doc?.message ?? ''}
                  disabled={!edit}
                />
              )}
            />

            <Input
              label="Nro Documento"
              placeholder="Ingresa tu nro documento"
              type="tel"
              disabled={!edit}
              error={Boolean(errors.n_doc)}
              errorMessage={errors.n_doc?.message ?? ''}
              {...register('n_doc', {
                required: { value: true, message: 'El número de documento es requerido' },
                pattern: { value: N_DOC_PATTERN, message: 'Ingrese un número de documento válido' },
                validate: {
                  phoneExist: async (value) => {
                    if (!N_DOC_PATTERN.test(value)) return;
                    const res = await validateUserFields({ n_doc: value, user: user?._id });
                    if (res.n_doc) return 'No se encuentra disponible';
                  },
                },
              })}
            />
          </div>

          <List title="Documentos personales (opcional)" subtitle="Adjunte los documentos que se mencionan a continuación." data={listData} />

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
              <Button size="large" type="button" variant="white" className="!border-black" onClick={() => setEdit(true)}>
                {`${docId ? 'Actualizar' : 'Guardar'} documentos`}
              </Button>
            )}
          </div>
        </form>
      </Spinner>
    </Layout>
  );
};

export default Documents;
