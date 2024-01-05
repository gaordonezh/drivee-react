import { Dispatch, SetStateAction } from 'react';
import Fab from '@/components/atoms/Fab';
import Loader from '@/components/atoms/Loader';
import Empty from '@/components/molecules/Empty';
import { useAppSelector } from '@/hooks/useStore';
import { ModalStateEnum, RequestStatusEnum } from '@/interfaces/global.enum';
import { FILE_STATUS_TAGS } from '@/pages/dashboard/documents';
import { ReviewSelectStateType } from '@/pages/dashboard/review';
import { DOCUMENT_TYPES_TRANSLATE, USER_TDOC_TRANSLATE } from '@/utils/translate';
import Image from 'next/image';
import { BiCheck } from 'react-icons/bi';
import { BsEye } from 'react-icons/bs';
import { IoClose } from 'react-icons/io5';
import { MdDelete } from 'react-icons/md';

interface TableReviewProps {
  setSelected: Dispatch<SetStateAction<ReviewSelectStateType>>;
}

const TableReview = ({ setSelected }: TableReviewProps) => {
  const {
    documents: { docs, status },
  } = useAppSelector((state) => state.documents);
  const isLoading = [status].includes(RequestStatusEnum.PENDING);

  return (
    <>
      <p className="text-xl font-bold px-7 py-3">Revisión de documentos</p>
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          <div className="overflow-hidden">
            <table className="min-w-full text-center text-sm font-light">
              <thead className="font-medium">
                <tr>
                  <th></th>
                  <th scope="col" className="px-6 py-4 whitespace-nowrap">
                    Usuario
                  </th>
                  <th scope="col" className="px-6 py-4 whitespace-nowrap">
                    Tipo documento
                  </th>
                  <th scope="col" className="px-6 py-4 whitespace-nowrap">
                    Estado
                  </th>
                  <th scope="col" className="px-6 py-4 whitespace-nowrap">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {docs.length && !isLoading ? (
                  docs.map((item) => (
                    <tr key={item._id}>
                      <td>
                        <Image src={item.user?.photo ?? '/images/profile.png'} alt="User picture" width={50} height={50} className="rounded-md" />
                      </td>
                      <td className="whitespace-nowrap px-6 py-4" align="left">
                        {`${item.user?.f_name} ${item.user?.l_name}`}
                        <br />
                        {USER_TDOC_TRANSLATE[item.user?.t_doc!]}: {item.user?.n_doc}
                        <br />
                        {item.user?.phone}
                        <br />
                        {item.user?.email}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">{DOCUMENT_TYPES_TRANSLATE[item.type]}</td>
                      <td className="whitespace-nowrap px-6 py-4">{FILE_STATUS_TAGS[item.status].value}</td>
                      <td className="whitespace-nowrap px-6 py-2">
                        <div className="flex flex-row gap-1 justify-center">
                          <Fab
                            onClick={() => setSelected({ mode: ModalStateEnum.DETAIL, data: item })}
                            icon={<BsEye size={20} className="text-blue-500" />}
                            size="medium"
                            title="Ver detalles"
                          />
                          {/* {[DocumentStatusEnum.REVIEW].includes(item.status) && ( */}
                            <>
                              <Fab
                                onClick={() => setSelected({ mode: ModalStateEnum.APPROVE, data: item })}
                                icon={<BiCheck size={20} className="text-green-500" />}
                                size="medium"
                                title="Aprobar documento"
                              />
                              <Fab
                                onClick={() => setSelected({ mode: ModalStateEnum.REJECTED, data: item })}
                                icon={<IoClose size={20} className="text-red-500" />}
                                size="medium"
                                title="Rechazar documento"
                              />
                            </>
                          {/* )} */}
                          <Fab
                            onClick={() => setSelected({ mode: ModalStateEnum.DELETE, data: item })}
                            icon={<MdDelete size={20} className="text-red-500" />}
                            size="medium"
                            title="Eliminar documento"
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="py-10" colSpan={5}>
                      {isLoading ? <Loader /> : <Empty />}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default TableReview;
