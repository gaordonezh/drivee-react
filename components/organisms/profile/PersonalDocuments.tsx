import Alert from '@/components/atoms/Alert';
import List from '@/components/molecules/List';
import { MdOutlineClose, MdOutlineCheck, MdInfoOutline } from 'react-icons/md';

const PersonalDocuments = () => {
  return (
    <div className="mt-5">
      <List
        title="Documentos personales"
        subtitle="Adjunte los documentos que se mencionan a continuación."
        data={[
          {
            title: 'Documento de identidad (frontal)',
            value: <span className="text-green-500 font-medium text-sm">APROBADO</span>,
            iconNode: <MdOutlineCheck size={20} className="text-green-500" />,
          },
          {
            title: 'Documento de identidad (reverso)',
            value: <span className="text-red-500 font-medium text-sm">RECHAZADO</span>,
            iconNode: <MdOutlineClose size={20} className="text-red-500" />,
          },
          {
            title: 'Licencia de conducir',
            value: <span className="text-yellow-500 font-medium text-sm">PENDIENTE</span>,
            iconNode: <MdInfoOutline size={20} className="text-yellow-500" />,
          },
        ]}
      />
      <Alert
        className="mt-5"
        variant="info"
        title="¡Recuerde!"
        description="Después de adjuntar los documentos mencionados, estos ingresarán a revisión."
      />
    </div>
  );
};

export default PersonalDocuments;
