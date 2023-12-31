import Button from '@/components/atoms/Button';
import Divider from '@/components/protons/Divider';
import Layout from '@/components/templates';
import LayoutEnum from '@/enums/layout.enum';
import { useRouter } from 'next/router';

const AuthError = () => {
  const router = useRouter();

  return (
    <Layout layout={LayoutEnum.AUTH}>
      <div className="flex flex-col gap-5">
        <h1 className="font-bold text-3xl whitespace-nowrap">
          Acceso no autorizado
          <br />
          <span className="text-sm font-normal">No se obtuvo el permiso para continuar...</span>
        </h1>

        <Divider />
        <Button fullWidth size="large" type="submit" className="mt-4" onClick={() => router.push('/auth/signin')}>
          Volver a intentar
        </Button>
        <Button fullWidth size="large" type="button" variant="white" className="!border-black" onClick={() => router.push('/')}>
          Cancelar
        </Button>
      </div>
    </Layout>
  );
};

export default AuthError;
