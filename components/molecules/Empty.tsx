interface EmptyProps {
  title: string;
}

const Empty = ({ title }: EmptyProps) => (
  <div className="flex flex-col justify-center items-center gap-2">
    <img src="/images/empty.png" alt="Empty image" width="184px" height="152px" />
    <p className="text-sm text-center text-gray-500">{title}</p>
  </div>
);

Empty.defaultProps = {
  title: 'No hay datos',
};

export default Empty;
