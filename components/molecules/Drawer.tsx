import { combineClassnames } from '@/utils/functions';
import { ReactNode } from 'react';

export interface DrawerProps {
  children: ReactNode;
  onClose: VoidFunction;
  position: 'left' | 'right';
}

const Drawer = ({ children, onClose, position }: DrawerProps) => (
  <section className={combineClassnames('drawer__container', position)}>
    <div className="drawer__item--left">{children}</div>
    <div className="drawer__item--right" onClick={onClose} />
  </section>
);

Drawer.defaultProps = {
  position: 'left',
};

export default Drawer;
