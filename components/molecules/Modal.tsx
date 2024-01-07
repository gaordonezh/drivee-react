import { combineClassnames } from '@/utils/functions';
import { ReactNode, useEffect } from 'react';

interface ModalProps {
  children: ReactNode;
  onClose?: VoidFunction;
  className?: string;
}

const Modal = ({ children, onClose, className }: ModalProps) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'visible';
    };
  }, []);

  return (
    <section className="fixed inset-0 z-50 overflow-y-auto bg-people-say">
      <div className="flex min-h-full justify-center bg-body-1/50 text-center sm:p-0 items-center p-5">
        <div onClick={onClose} className="absolute top-0 left-0 h-full w-full" />
        <div
          className={combineClassnames('relative flex-col items-center overflow-hidden bg-white shadow-xl m-auto sm:m-5 p-5 rounded-lg', className)}
        >
          {children}
        </div>
      </div>
    </section>
  );
};

export default Modal;
