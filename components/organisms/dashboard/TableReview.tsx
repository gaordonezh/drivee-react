import Card from '@/components/atoms/Card';
import Fab from '@/components/atoms/Fab';
import { BiCheck } from 'react-icons/bi';
import { BsEye } from 'react-icons/bs';
import { IoClose } from 'react-icons/io5';

const TableReview = () => {
  return (
    <Card>
      <p className="text-xl font-bold px-7 py-3">Revisión de documentos</p>
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          <div className="overflow-hidden">
            <table className="min-w-full text-center text-sm font-light">
              <thead className="font-medium">
                <tr>
                  <th scope="col" className="px-6 py-4 whitespace-nowrap">
                    Documento
                  </th>
                  <th scope="col" className="px-6 py-4 whitespace-nowrap">
                    Nombre completo
                  </th>
                  <th scope="col" className="px-6 py-4 whitespace-nowrap">
                    Tipo documento
                  </th>
                  <th scope="col" className="px-6 py-4 whitespace-nowrap">
                    Documentos
                  </th>
                  <th scope="col" className="px-6 py-4 whitespace-nowrap">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {Array.from(Array(15).keys()).map((item) => (
                  <tr key={item}>
                    <td className="whitespace-nowrap px-6 py-4">DNI: 71546119</td>
                    <td className="whitespace-nowrap px-6 py-4">German Ordoñez</td>
                    <td className="whitespace-nowrap px-6 py-4">{item % 2 ? 'Documentos personales' : 'Documentos de vehículo'}</td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <p className="text-blue-800 underline">documento nro 1.jpg</p>
                      <p className="text-blue-800 underline">documento nro 2.jpg</p>
                      <p className="text-blue-800 underline">documento nro 3.jpg</p>
                    </td>
                    <td className="whitespace-nowrap px-6 py-2">
                      <div className="flex flex-row gap-1">
                        <Fab icon={<BsEye size={20} className="text-blue-500" />} size="medium" title="Ver detalles" />
                        <Fab icon={<BiCheck size={20} className="text-green-500" />} size="medium" title="Aprobar documento" />
                        <Fab icon={<IoClose size={20} className="text-red-500" />} size="medium" title="Rechazar documento" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TableReview;
