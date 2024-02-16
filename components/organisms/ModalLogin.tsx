import { useId } from 'react';
import Button from '../atoms/Button';
import PortalCreator from '../molecules/PortalCreator';
import Modal from '../molecules/Modal';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface ModalLoginProps {
  handleClose: VoidFunction;
}

const ModalLogin = ({ handleClose }: ModalLoginProps) => {
  const uniqueGlobalId = useId();
  const router = useRouter();

  return (
    <PortalCreator
      uniqueGlobalId={uniqueGlobalId}
      component={
        <Modal onClose={handleClose}>
          <div className="w-[300px] flex flex-col gap-2">
            <h2 className="font-semibold text-lg">Tienes que iniciar sesión para continuar</h2>
            <p className="text-gray-700">Inicia sesión o registrate</p>
            <Link href={{ pathname: '/auth/signin', query: { page: router.asPath } }} className="mt-10">
              <Button fullWidth>Iniciar sesión</Button>
            </Link>
            <Link href="/auth/signup">
              <Button fullWidth variant="white" className="!border-black">
                Registrarme
              </Button>
            </Link>
            <Button variant="white" onClick={handleClose} className="!border-black">
              Cancelar
            </Button>
          </div>
        </Modal>
      }
    />
  );
};

export default ModalLogin;
