import Layout from '@/components/templates';
import LayoutEnum from '@/enums/layout.enum';
import GeneralInformation from '@/components/organisms/GeneralInformation';
import { FaFlag } from 'react-icons/fa';
import { MdOutlineFormatAlignRight } from 'react-icons/md';
import { LuFileStack } from 'react-icons/lu';

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
    detail: 'Carga tus documentos personales para identificarte y corroborar que todo esta en orden.',
    icon: LuFileStack,
  },
];

const Rent = () => {
  return (
    <Layout layout={LayoutEnum.PUBLIC}>
      <GeneralInformation
        steps={steps}
        title="Alquila el vehículo de tus sueños"
        description="Únete a nosotros y alquila el vehículos de tus sueños mientras realices la actividad que gustes mientras ayudas a otras personas a percibir ingresos."
        extraTitle="Recuerda"
        extraDescription="Tan pronto como finalices todos los registros necesarios y tus documentos sean aprobados, podrás buscar vehículos y alquilarlos."
      />
    </Layout>
  );
};

export default Rent;
