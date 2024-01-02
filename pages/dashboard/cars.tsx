import React, { useState, FormEvent } from 'react';
import Card from '@/components/atoms/Card';
import Layout from '@/components/templates';
import LayoutEnum from '@/enums/layout.enum';
import { IMAGE_LIST } from '@/utils/constants';
import { IoMdAdd } from 'react-icons/io';
import Chip from '@/components/atoms/Chip';
import Fab from '@/components/atoms/Fab';
import { MdCarCrash, MdEdit, MdDelete } from 'react-icons/md';
import Drawer from '@/components/molecules/Drawer';
import CustomDropZone from '@/components/organisms/DropZone';
import { ModalStateEnum } from '@/interfaces/global.enum';
import Input from '@/components/atoms/Input';
import List from '@/components/molecules/List';
import Button from '@/components/atoms/Button';
import { IoDocumentTextSharp } from 'react-icons/io5';
import Modal from '@/components/molecules/Modal';
import Spinner from '@/components/molecules/Spinner';
import { UserRolesEnum } from '@/store/user/user.enum';

const Cars = () => {
  const [modal, setModal] = useState<{ mode: null | ModalStateEnum; data: null }>({ mode: null, data: null });
  const [files, setFiles] = useState<Array<File>>([]);
  const [details, setDetails] = useState<Array<{ title: string; value: string }>>([]);
  const [values, setValues] = useState<{ title: string; value: string }>({ title: '', value: '' });

  const handleClose = () => setModal({ mode: null, data: null });
  const handleClear = () => setValues({ title: '', value: '' });

  const handleDelete = (index: number) => {
    details.splice(index, 1);
    setDetails([...details]);
  };

  const handleAdd = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    details.push(values);
    setDetails([...details]);
    handleClear();
  };

  return (
    <Layout layout={LayoutEnum.DASHBOARD} authRoles={[UserRolesEnum.OWNER, UserRolesEnum.ADMIN]}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-4 gap-3 lg:gap-10">
        {Array.from(Array(5).keys()).map((item) => (
          <Card key={item}>
            <div className="flex flex-col gap-5">
              <figure
                className="h-[200px] w-full rounded-md bg-no-repeat bg-cover bg-center"
                style={{ backgroundImage: `url(${IMAGE_LIST[item % 2 ? 1 : 2]})` }}
              />

              <Chip label="DISPONIBLE" size="small" className="!bg-green-500" />
              <div className="flex flex-wrap gap-1 justify-between">
                <h2 className="font-semibold">TOYOTA</h2>
                <p className="text-base text-gray-600">
                  <span className="font-bold">S/ 23.40</span> por hora
                </p>
              </div>
              <div className="flex flex-wrap gap-1 justify-between">
                <Fab
                  icon={<MdEdit size={20} />}
                  size="large"
                  title="Actualizar información"
                  onClick={() => setModal({ mode: ModalStateEnum.BOX, data: null })}
                />
                <Fab icon={<MdCarCrash size={20} />} size="large" title="Desactivar vehículo" />
                <Fab
                  icon={<IoDocumentTextSharp size={20} />}
                  size="large"
                  title="Documentos"
                  onClick={() => setModal({ mode: ModalStateEnum.DETAIL, data: null })}
                />
              </div>
            </div>
          </Card>
        ))}
        <Card
          className="cursor-pointer flex items-center justify-center hover:opacity-75 hover:shadow-lg min-h-[150px]"
          onClick={() => setModal({ mode: ModalStateEnum.BOX, data: null })}
        >
          <IoMdAdd size={50} className="hover:scale-105 hover:transition-all" />
        </Card>
      </div>

      {modal.mode === ModalStateEnum.BOX && (
        <Drawer position="right">
          <div className="flex flex-col gap-5">
            <div>
              <h1 className="font-bold text-xl">AGREGAR VEHÍCULO</h1>
              <p className="text-gray-500 text-sm">Todos los campos son requeridos (*)</p>
            </div>
            <Input label="Nombre del vehículo (*)" placeholder="Ej.: BMW M2 2020" />
            <Input label="Precio por horas S/ (*)" type="number" placeholder="Ej.: 12.50" />
            <Input label="Ubicación" placeholder="Ej.: Av. Los heroes 434" />
            <div className="border" style={{ height: '300px', width: '100%', borderRadius: '10px', overflow: 'hidden' }}></div>
            <div>
              <p className="font-semibold">Adjunte imágenes de tu coche (*)</p>
              <p className="text-gray-500 text-sm">Tiene que adjuntar 4 imágenes como mínimo.</p>
              <CustomDropZone files={files} setFiles={setFiles} max={10} />
            </div>
            <div className="">
              <List
                title="Detalles"
                subtitle="Especifique todos los detalles del vehículo para ofrecer una una mayor información al usuario."
                data={details.map((item, index) => ({
                  ...item,
                  iconNode: <MdDelete size={18} onClick={() => handleDelete(index)} className="cursor-pointer text-red-500" />,
                }))}
              />

              <Card className="mt-5">
                <form onSubmit={handleAdd}>
                  <Input
                    label="Título"
                    placeholder="Ej.: Asientos"
                    value={values.title}
                    onChange={(event) => setValues({ ...values, title: event.target.value })}
                    required
                  />
                  <Input
                    label="Valor"
                    placeholder="Ej.: 4"
                    value={values.value}
                    onChange={(event) => setValues({ ...values, value: event.target.value })}
                    required
                  />
                  <Button type="submit" className="!border-black mt-5" fullWidth variant="white" disabled={!values.title || !values.value}>
                    AGREGAR
                  </Button>
                </form>
              </Card>
            </div>
            <div className="flex flex-row gap-5 justify-end mt-5">
              <Button size="large" variant="white" onClick={handleClose}>
                Cancelar
              </Button>
              <Button size="large">Guardar</Button>
            </div>
          </div>
        </Drawer>
      )}

      {modal.mode === ModalStateEnum.DETAIL && (
        <Modal>
          <Spinner loading={false} text="..:: CARGANDO ::..">
            <div className="max-w-2xl bg-gray-200 p-5 flex flex-col gap-5 text-left">
              <h1 className="font-bold text-lg">Adjuntar documentos de vehículo</h1>
              {['Documento de circulación', 'SOAT', 'Permiso de conducir', 'Certificado de propiedad'].map((item) => (
                <div className="bg-white p-5" key={item}>
                  <p className="text-sm font-semibold text-gray-600 mb-1">{item}</p>
                  <CustomDropZone files={files} setFiles={setFiles} max={1} />
                </div>
              ))}
              <div className="flex flex-row gap-5 justify-end">
                <Button size="large" variant="white" onClick={handleClose}>
                  Cancelar
                </Button>
                <Button size="large">Guardar</Button>
              </div>
            </div>
          </Spinner>
        </Modal>
      )}
    </Layout>
  );
};

export default Cars;
