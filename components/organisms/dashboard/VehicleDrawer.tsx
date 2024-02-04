import React, { useId, useRef, useState } from 'react';
import PortalCreator from '@/components/molecules/PortalCreator';
import Drawer from '@/components/molecules/Drawer';
import Input from '@/components/atoms/Input';
import CustomDropZone from '../DropZone';
import List from '@/components/molecules/List';
import { MdClose, MdDelete } from 'react-icons/md';
import Button from '@/components/atoms/Button';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { AddressProps } from '@/store/user/user';
import { CreateVehicleBodyProps, VehicleDetailsProps, VehicleProps } from '@/store/vehicle/vehicle';
import Textarea from '@/components/atoms/Textarea';
import SearchLocationWithMaps from '@/components/molecules/SearchLocationWithMaps';
import { useAppContext } from '@/context';
import Divider from '@/components/protons/Divider';
import { formatMoney } from '@/utils/functions';
import { useAppDispatch, useAppSelector } from '@/hooks/useStore';
import { uploadFile } from '@/store/files/files.slice';
import { RequestStatusEnum } from '@/interfaces/global.enum';
import Alert from '@/components/atoms/Alert';
import Spinner from '@/components/molecules/Spinner';
import { createVehicle, resetVehicleStatus, updateVehicle } from '@/store/vehicle/vehicle.slice';
import Chip from '@/components/atoms/Chip';
import Fab from '@/components/atoms/Fab';
import { useRouter } from 'next/router';
import Link from 'next/link';
import RadioButton from '@/components/atoms/RadioButton';
import { VehicleTypeEnum } from '@/store/vehicle/vehicle.enum';
import { VEHICLE_TYPES_TRANSLATE } from '@/utils/translate';

interface VehicleDrawerProps {
  handleClose: VoidFunction;
  handleReload: VoidFunction;
  data: null | VehicleProps;
}

type VehicleInputs = {
  name: string;
  description: string;
  pricexhour: string;
  files: Array<File>;
  details: Array<VehicleDetailsProps>;
  address: null | AddressProps;
  type: VehicleTypeEnum;
};

const VehicleDrawer = ({ handleClose, handleReload, data }: VehicleDrawerProps) => {
  const topRef = useRef<HTMLDivElement>(null);
  const { user } = useAppContext();
  const dispatch = useAppDispatch();
  const uniqueGlobalId = useId();
  const { uploadFileState } = useAppSelector((state) => state.files);
  const { createVehicleState, updateVehicleState } = useAppSelector((state) => state.vehicles);
  const [auxImages, setAuxImages] = useState<Array<{ url: string; txt: string }>>([
    ...(data?.images.map((url, i) => ({ url, txt: `Imagen ${i + 1}` })) || []),
  ]);
  const isLoading = [uploadFileState, createVehicleState, updateVehicleState].includes(RequestStatusEnum.PENDING);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    setError,
  } = useForm<VehicleInputs>({
    mode: 'onChange',
    defaultValues: {
      files: [],
      details: data ? data.details : [],
      address: data ? data.address : user?.address || null,
      name: data ? data.name : '',
      description: data ? data.description : '',
      pricexhour: data ? String(data.pricexhour) : '',
      type: data ? data.type : VehicleTypeEnum.CAR,
    },
  });

  const onSubmit: SubmitHandler<VehicleInputs> = async (fields) => {
    if (!fields.address) return;
    if (auxImages.length + fields.files.length < 4) {
      const diff = 4 - (auxImages.length + fields.files.length);
      setError('files', { type: 'min', message: `Tiene que adjuntar ${diff} ${diff === 1 ? 'imagen' : 'imágenes'} como mínimo` });
      return;
    }
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

    const images: Array<string> = [];
    for (const file of fields.files) {
      const result = await dispatch(uploadFile(file));
      if (result.payload.url) images.push(result.payload.url);
    }

    const body = {
      name: fields.name,
      description: fields.description,
      images: [...images, ...auxImages.map((item) => item.url)],
      pricexhour: Number(formatMoney(Number(fields.pricexhour))),
      address: fields.address,
      details: fields.details.filter((item) => item.title && item.value),
      type: fields.type,
    };

    let res = null;
    if (data) {
      res = await dispatch(updateVehicle({ id: data._id, body }));
    } else {
      const createBody: CreateVehicleBodyProps = {
        user: { email: user?.email!, f_name: user?.f_name!, id: user?._id!, l_name: user?.l_name!, phone: user?.phone! },
        ...body,
      };
      res = await dispatch(createVehicle(createBody));
    }
    // @ts-ignore
    if (res.error) return;
    handleReload();
    handleClose();
    setTimeout(() => {
      dispatch(resetVehicleStatus());
    }, 7000);
  };

  return (
    <PortalCreator
      uniqueGlobalId={uniqueGlobalId}
      component={
        <Drawer position="right">
          <Spinner loading={isLoading} text="Cargando información...">
            <div className="flex flex-col gap-5" ref={topRef}>
              <div>
                <h1 className="font-bold text-xl">{data ? 'ACTUALIZAR' : 'AGREGAR'} VEHÍCULO</h1>
                <p className="text-gray-500 text-sm">Todos los campos son requeridos (*)</p>
              </div>

              {uploadFileState === RequestStatusEnum.ERROR && <Alert variant="error" title="No se logró subir las imágenes. Intente otra vez." />}
              {[createVehicleState, updateVehicleState].includes(RequestStatusEnum.ERROR) && (
                <Alert
                  variant="error"
                  title={`No se logró ${createVehicleState === RequestStatusEnum.ERROR ? 'crear' : 'actualizar'} tu vehículo. Intente otra vez.`}
                  description="En caso el problema sea persistente, intente mas tarde o contacte con soporte enviando un correo a drivee.services@gmail.com"
                />
              )}

              <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                <div>
                  <p className="font-semibold">Tipo de vehículo (*)</p>
                  <p className="text-gray-500 text-sm mb-2">Selecciona el tipo de vehículo que vas a registrar.</p>
                  <Controller
                    name="type"
                    control={control}
                    rules={{ required: { value: true, message: 'El tipo es requerido' } }}
                    render={({ field }) => (
                      <RadioButton
                        value={field.value}
                        options={Object.values(VehicleTypeEnum).map((item) => ({ label: VEHICLE_TYPES_TRANSLATE[item], value: item }))}
                        onChange={(value) => setValue('type', value as VehicleTypeEnum, { shouldValidate: true })}
                      />
                    )}
                  />
                </div>

                <Input
                  label="Nombre del vehículo (*)"
                  placeholder="Ej.: BMW M2 2020"
                  error={Boolean(errors.name)}
                  errorMessage={errors.name?.message ?? ''}
                  {...register('name', {
                    validate: {
                      required: (value) => {
                        if (!value.trim()) return 'El nombre es requerido';
                      },
                    },
                    pattern: { message: 'Solo se aceptan caracteres alfanuméricos', value: /^[0-9a-z áéíóúñ]+$/i },
                    minLength: { value: 3, message: 'Son 3 caracteres alfanuméricos como mínimo' },
                    maxLength: { value: 50, message: 'Son 50 caracteres alfanuméricos como máximo' },
                  })}
                />

                <Textarea
                  label="Descripción del vehículo (*)"
                  placeholder="Ingrese la discripción"
                  error={Boolean(errors.description)}
                  errorMessage={errors.description?.message ?? ''}
                  {...register('description', {
                    validate: {
                      required: (value) => {
                        if (!value.trim()) return 'La descripción es requerida';
                      },
                    },
                    pattern: { message: 'Solo se aceptan caracteres alfanuméricos', value: /^[0-9a-z,.:;'"-_ áéíóúñ]+$/i },
                    minLength: { value: 10, message: 'Son 10 caracteres alfanuméricos como mínimo' },
                    maxLength: { value: 250, message: 'Son 250 caracteres alfanuméricos como máximo' },
                  })}
                />

                <Input
                  label="Precio por horas S/ (*)"
                  type="number"
                  placeholder="Ej.: 12.50"
                  step={0.01}
                  error={Boolean(errors.pricexhour)}
                  errorMessage={errors.pricexhour?.message ?? ''}
                  {...register('pricexhour', {
                    validate: {
                      required: (value) => {
                        if (!value.trim()) return 'El precio es requerido';
                      },
                    },
                    pattern: { message: 'Ingrese un precio válido', value: /^[0-9.]+$/i },
                    min: { value: 1, message: 'Ingrese un precio válido' },
                  })}
                />

                <div>
                  <p className="font-semibold">Adjunte imágenes de tu coche (*)</p>
                  <p className="text-gray-500 text-sm mb-2">Tiene que adjuntar 4 imágenes como mínimo.</p>
                  <Controller
                    name="files"
                    control={control}
                    rules={{
                      required: { value: !data, message: 'Las imágenes son requeridas' },
                      validate: {
                        minImages: (value) => {
                          if (value.length < 4 && !data) return 'Tiene que adjuntar 4 imágenes como mínimo';
                        },
                        maxImages: (value) => {
                          if (value.length > 10 && !data) return 'Se admite 10 imágenes como máximo';
                        },
                      },
                    }}
                    render={({ field }) => (
                      <CustomDropZone
                        files={field.value}
                        setFiles={(newFiles) => setValue('files', newFiles, { shouldValidate: true })}
                        accept={{ 'image/*': ['.jpeg', '.jpg', '.png'] }}
                        maxFiles={100}
                        max={100}
                        error={Boolean(errors.files)}
                        errorMessage={errors.files?.message ?? ''}
                      />
                    )}
                  />

                  {auxImages.length ? (
                    <ul className="flex flex-wrap mt-2 gap-2">
                      {auxImages.map((item, index) => (
                        <Chip
                          key={item.txt}
                          label={item.txt}
                          iconLeft={
                            <Link href={item.url} rel="noopener noreferrer" target="_blank">
                              <Fab icon={<img src={item.url} alt={item.txt} />} type="button" size="medium" />
                            </Link>
                          }
                          iconRight={
                            <MdDelete
                              size={20}
                              className="cursor-pointer text-red-500"
                              onClick={() => {
                                auxImages.splice(index, 1);
                                setAuxImages([...auxImages]);
                              }}
                            />
                          }
                          size="small"
                        />
                      ))}
                    </ul>
                  ) : null}
                </div>

                <Controller
                  name="address"
                  control={control}
                  rules={{ required: { value: true, message: 'La dirección del vehículo es requerida.' } }}
                  render={({ field }) => (
                    <div>
                      <p className="font-semibold">Ubicación</p>
                      <SearchLocationWithMaps
                        auxValue={field.value ? { location: field.value.location, text: field.value.address, value: field.value.id } : null}
                        setAuxValue={(newParams) =>
                          setValue('address', newParams ? { location: newParams.location, address: newParams.text, id: newParams.value } : null, {
                            shouldValidate: true,
                          })
                        }
                        className="w-full h-[300px] mt-1"
                        error={Boolean(errors.address)}
                        errorMessage={errors.address?.message ?? ''}
                      />
                    </div>
                  )}
                />

                <Controller
                  name="details"
                  control={control}
                  rules={{ required: { value: true, message: 'Las especificaciones son requeridas' } }}
                  render={({ field }) => {
                    const handleDelete = (index: number) => {
                      field.value.splice(index, 1);
                      setValue('details', [...field.value]);
                    };

                    const listData = field.value.map((item, index) => ({
                      title: (
                        <Input
                          placeholder="Ej.: Asientos"
                          value={item.title}
                          onChange={(event) => {
                            field.value[index].title = event.target.value;
                            setValue('details', [...field.value], { shouldValidate: true });
                          }}
                        />
                      ),
                      value: (
                        <Input
                          placeholder="Ej.: 4"
                          value={item.value}
                          onChange={(event) => {
                            field.value[index].value = event.target.value;
                            setValue('details', [...field.value], { shouldValidate: true });
                          }}
                          iconRight={<MdClose size={22} onClick={() => handleDelete(index)} className="cursor-pointer text-red-500" />}
                        />
                      ),
                    }));

                    return (
                      <div>
                        <List
                          title="Especificaciones"
                          subtitle="Enumere todos los detalles del vehículo para ofrecer una una mayor información al usuario."
                          showDivider={false}
                          data={[
                            {
                              title: <p className="font-semibold">Título</p>,
                              value: (
                                <div className="flex flex-row justify-between">
                                  <p className="font-semibold">Valor</p>
                                  <Button
                                    className="!border-black"
                                    variant="white"
                                    onClick={() => setValue('details', [{ title: '', value: '' }, ...field.value])}
                                    type="button"
                                  >
                                    Agregar
                                  </Button>
                                </div>
                              ),
                            },
                            ...listData,
                          ]}
                        />
                        {errors.details && <p className="text-sm text-red-500 leading-3 mt-1">{errors.details?.message}</p>}
                      </div>
                    );
                  }}
                />

                <Divider />

                <div className="flex flex-row gap-5 justify-end mt-5">
                  <Button size="large" type="button" variant="white" onClick={handleClose}>
                    Cancelar
                  </Button>
                  <Button size="large" type="submit">
                    Guardar
                  </Button>
                </div>
              </form>
            </div>
          </Spinner>
        </Drawer>
      }
    />
  );
};

export default VehicleDrawer;
