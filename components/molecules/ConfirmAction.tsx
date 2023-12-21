import { ReactNode, useId, useState } from 'react';
import { AxiosRequestConfig, Method } from 'axios';
import PortalCreator from './PortalCreator';
import Modal from './Modal';
import Button from '../atoms/Button';
import { MdCheck, MdClose } from 'react-icons/md';
import server from '@/server';
import { objectCleaner } from '@/utils/functions';

interface ConfirmActionProps {
  handleClose: VoidFunction;
  method: Method;
  endpoint: string;
  handleResponse: ({ success, response }: { success: boolean; response?: any }) => void;
  body?: Record<string, any>;
  params?: Record<string, any>;
  title: string;
  subtitle?: string;
  content?: ReactNode;
}

const ConfirmAction = ({ handleClose, method, endpoint, handleResponse, body, params, title, subtitle, content }: ConfirmActionProps) => {
  const uniqueGlobalId = useId();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);

      const serverOptions = objectCleaner({
        url: endpoint,
        method,
        data: body,
        params,
      } as AxiosRequestConfig);

      const response = await server(serverOptions);
      handleResponse({ success: true, response });
      handleClose();
    } catch (error) {
      handleResponse({ success: false });
    } finally {
      setLoading(false);
    }
  };

  return (
    <PortalCreator
      uniqueGlobalId={uniqueGlobalId}
      component={
        <Modal onClose={() => !loading && handleClose()}>
          <div className="w-[400px] flex flex-col gap-2">
            <h2 className="font-semibold text-xl">{title}</h2>
            {subtitle && <p className="text-gray-700">{subtitle}</p>}
            {content}
            <div className="flex flex-row gap-5 justify-end mt-5">
              <Button variant="white" onClick={handleClose} disabled={loading} className="!border-black">
                CANCELAR <MdClose size={20} />
              </Button>
              <Button onClick={handleDelete} disabled={loading}>
                CONFIRMAR <MdCheck size={20} />
              </Button>
            </div>
          </div>
        </Modal>
      }
    />
  );
};

ConfirmAction.defaultProps = {
  title: 'Confirmación',
};

export default ConfirmAction;
