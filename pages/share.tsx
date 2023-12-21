import Layout from '@/components/templates';
import LayoutEnum from '@/enums/layout.enum';
import GeneralInformation from '@/components/organisms/GeneralInformation';
import { FaFlag } from 'react-icons/fa';
import { MdOutlineFormatAlignRight } from 'react-icons/md';
import { LuFileStack } from 'react-icons/lu';
import { IoCarSportSharp } from 'react-icons/io5';

const steps = [
  {
    title: 'Proceso de registro',
    detail: 'Inicia el proceso de registro. Todo comienza rellenando los datos requeridos que aparecen en el formulario del lado.',
    icon: FaFlag,
  },
  {
    title: 'Datos personales',
    detail: 'Completa el registros de todos tus datos personales después de iniciar sesión en la aplicación.',
    icon: MdOutlineFormatAlignRight,
  },
  {
    title: 'Documentos personales',
    detail: 'Carga tus documentos personales para identificarte y corroborar que todo este en orden.',
    icon: LuFileStack,
  },
  {
    title: 'Registra tus vehículos',
    detail: 'Registra los vehículos que quieras mostrar en alquiler con los datos que te solicitamos.',
    icon: IoCarSportSharp,
  },
  {
    title: 'Documentos de tus vehículos',
    detail: 'Adjunta los documentos de cada uno de los vehículos que hayas registrado para corroborar que todo este en orden.',
    icon: LuFileStack,
  },
];

const Share = () => {
  return (
    <Layout layout={LayoutEnum.PUBLIC}>
      <GeneralInformation
        steps={steps}
        title="Convierte tu vehículo en dinero extra"
        description="Cuando pones en alquiler tu vehículo, estas ganando dinero mientras ayudas a otras personas explorar tu ciudad. Es ganar-ganar y tu siguiente gran oportunidad."
        extraTitle="Comienza a ganar"
        extraDescription="Tan pronto como finalices todos los registros necesarios y tus documentos sean aprobados, los interesados podrán comenzar a hacer viajes en tu automóvil y tú podrás comenzar a ganar dinero."
      />
    </Layout>
  );
};

export default Share;
