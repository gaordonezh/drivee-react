import Image from 'next/image';

interface EmptyProps {
  title: string;
}

const Empty = ({ title }: EmptyProps) => (
  <div className="flex flex-col justify-center items-center gap-2">
    <Image src="/images/empty.png" width={184} height={152} alt="Empty" />
    <p className="text-sm text-center text-gray-500">{title}</p>
  </div>
);

Empty.defaultProps = {
  title: 'No hay datos',
};

export default Empty;
