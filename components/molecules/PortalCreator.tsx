import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

interface PortalCreatorProps {
  component: JSX.Element;
  uniqueGlobalId: string;
}

const PortalCreator = ({ component, uniqueGlobalId }: PortalCreatorProps) => {
  const [container, setContainer] = useState<HTMLDivElement>();

  useEffect(() => {
    const div = document.createElement('div');
    div.setAttribute('id', uniqueGlobalId);
    document.body.appendChild(div);
    setContainer(div);

    return () => {
      document.body.removeChild(div);
    };
  }, []);

  if (!container || !component) return null;

  return ReactDOM.createPortal(component as any, container);
};

export default PortalCreator;
