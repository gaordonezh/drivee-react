import { ReactNode } from 'react';

export interface DrawerProps {
  children: ReactNode;
  onClose: VoidFunction;
}

const Drawer = ({ children, onClose }: DrawerProps) => (
  <section className="drawer__container">
    <div className="drawer__item--left">{children}</div>
    <div className="drawer__item--right" onClick={onClose} />
  </section>
);

export default Drawer;
