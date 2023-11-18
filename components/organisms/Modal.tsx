import { ReactNode } from 'react';

interface ModalProps {
  children: ReactNode;
  onClose: VoidFunction;
}

const Modal = ({ children, onClose }: ModalProps) => (
  <section className="fixed inset-0 z-50 overflow-y-auto bg-people-say">
    <div className="flex min-h-full justify-center bg-body-1/50 text-center sm:p-0 items-center p-5">
      <div onClick={onClose} className="absolute top-0 left-0 h-full w-full" />
      <div className="relative flex-col items-center overflow-hidden bg-white shadow-xl p-5 rounded-lg">{children}</div>
    </div>
  </section>
);

export default Modal;
