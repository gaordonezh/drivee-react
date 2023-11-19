import React, { useId } from 'react';
import Drawer, { DrawerProps } from '../molecules/Drawer';
import PortalCreator from '../molecules/PortalCreator';

interface FiltersDrawerProps extends DrawerProps {}

const FiltersDrawer = ({ onClose, children }: FiltersDrawerProps) => {
  const uniqueGlobalId = useId();
  return <PortalCreator uniqueGlobalId={uniqueGlobalId} component={<Drawer onClose={onClose}>{children}</Drawer>} />;
};

export default FiltersDrawer;
