import { useCallback, useState } from 'react';
import { DropEvent, DropzoneProps, FileRejection, useDropzone } from 'react-dropzone';
import Button from '../atoms/Button';
import { IoClose } from 'react-icons/io5';
import { combineClassnames } from '@/utils/functions';

export interface CustomDropZoneProps extends DropzoneProps {
  files: Array<File>;
  setFiles: (files: Array<File>) => void;
  max?: number;
  className?: string;
}

const CustomDropZone = ({ files, setFiles, max = 2, className, ...props }: CustomDropZoneProps) => {
  const staticSize = 3;
  const [sizeFiles, setSizeFiles] = useState(3);
  const [message, setMessage] = useState('');

  const onDrop = useCallback(
    (acceptedFiles: Array<File>, _: FileRejection[], __: DropEvent) => {
      if (acceptedFiles.length <= max && files.length < max) {
        setFiles([...files, ...acceptedFiles]);
      } else {
        handleSetMessage(`Se permite ${max} archivo(s) como máximo`);
      }
    },
    // eslint-disable-next-line
    [files]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop, ...props });

  const removeFile = (file: File) => () => {
    const newFiles = [...files];
    newFiles.splice(newFiles.indexOf(file), 1);
    setFiles(newFiles);
  };

  const removeAll = () => setFiles([]);

  const handleSetMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage('');
    }, 7000);
  };

  return (
    <div style={{ position: 'relative' }}>
      <div
        className={combineClassnames('border border-dashed border-gray-300 bg-gray-100 cursor-pointer w-full px-5 h-[50px]', className)}
        {...getRootProps()}
      >
        <div className="flex flex-col items-center justify-center h-full">
          <input {...getInputProps()} />
          <p className="text-xs text-center text-gray-400">Arrastre y suelte archivos aquí, o haga clic para seleccionar tus archivos.</p>
          {message ? <p className="text-red-500 text-xs font-semibold">{message}</p> : null}
        </div>
      </div>
      {files.length ? (
        <Button onClick={removeAll} variant="white" size="small" className="absolute top-[-15px] right-[-8px] !border-none !bg-transparent !text-xs">
          Borrar todo
        </Button>
      ) : null}

      {files.slice(0, sizeFiles).map((file, index) => (
        <div key={index} className="border-b border-gray-300 flex flex-row justify-between items-center">
          <p className="text-[10px]">
            <span className="mr-2 text-gray-600">{file.name}</span>
            <span className="text-gray-600 font-semibold">{`${parseFloat((file.size / 1024 / 1024).toString()).toFixed(3)} MB`}</span>
          </p>
          <IoClose size={20} onClick={removeFile(file)} className="text-red-500 cursor-pointer" />
        </div>
      ))}
      {files.length > staticSize ? (
        <div className="border-b border-gray-300 flex flex-row justify-between items-center">
          <p className="text-gray-600 font-semibold text-[10px]">
            {`${sizeFiles === staticSize ? `+ ${files.length - staticSize}` : files.length} archivos seleccionado(s)`}
          </p>
          <Button
            onClick={() => setSizeFiles(sizeFiles === staticSize ? files.length : staticSize)}
            variant="white"
            size="small"
            className="!border-none !bg-transparent !text-xs"
          >
            {sizeFiles === staticSize ? 'Mostrar todo' : 'Ocultar'}
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default CustomDropZone;
