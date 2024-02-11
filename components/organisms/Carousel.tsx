import useWindowDimensions from '@/hooks/useWindowDimensions';
import React, { useState } from 'react';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';

const cities = [
  { name: 'Lima', src: 'https://elviajerofeliz.com/wp-content/uploads/2019/11/Qu%C3%A9-ver-en-Lima.Plaza-San-Mart%C3%ADn.jpg' },
  { name: 'Huancayo', src: 'https://elviajerofeliz.com/wp-content/uploads/2020/10/ciudades-de-peru-3-1.jpg' },
  { name: 'Cusco', src: 'https://elviajerofeliz.com/wp-content/uploads/2018/10/Cuzco.jpg' },
  { name: 'Arequipa', src: 'https://elviajerofeliz.com/wp-content/uploads/2020/10/ciudades-de-peru-6.jpg' },
  { name: 'Trujillo', src: 'https://elviajerofeliz.com/wp-content/uploads/2019/11/Qu%C3%A9-ver-en-Trujillo-Centro-Hist%C3%B3rico-de-Trujillo.jpg' },
  { name: 'Iquitos', src: 'https://elviajerofeliz.com/wp-content/uploads/2020/10/ciudades-de-peru-4-1.jpg' },
  { name: 'Chiclayo', src: 'https://elviajerofeliz.com/wp-content/uploads/2020/10/ciudades-de-peru-1-1.jpg' },
  { name: 'Piura', src: 'https://elviajerofeliz.com/wp-content/uploads/2020/10/ciudades-de-peru-5-1.jpg' },
  { name: 'Chimbote', src: 'https://elviajerofeliz.com/wp-content/uploads/2020/10/ciudades-de-peru-2-1.jpg' },
  { name: 'Puno', src: 'https://elviajerofeliz.com/wp-content/uploads/2018/10/Lago-Titicaca.jpg' },
];

const Carousel = () => {
  const { width } = useWindowDimensions();
  const [startIndex, setStartIndex] = useState(0);

  const getQuantity = () => {
    if (width > 1366) return 5;
    if (width > 1024) return 4;
    if (width > 768) return 3;
    if (width > 500) return 2;
    return 1;
  };
  const qty = getQuantity();

  const handlePrev = () => setStartIndex((prevIndex) => (prevIndex === 0 ? cities.length - qty : prevIndex - 1));
  const handleNext = () => setStartIndex((prevIndex) => (prevIndex === cities.length - qty ? 0 : prevIndex + 1));

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-between items-center w-full m-auto gap-5">
        {cities.length > qty ? (
          <MdArrowBackIos size={30} color="#aaa" onClick={handlePrev} className="cursor-pointer hover:scale-125 transition-all" />
        ) : null}

        {cities.slice(startIndex, startIndex + qty).map((city, index) => (
          <div key={index} className="flex flex-col items-center gap-3">
            <div
              className="h-[150px] w-[150px] rounded-full shadow-md border-4 border-gray-300 shadow-gray-500 bg-no-repeat bg-cover bg-center"
              style={{ backgroundImage: `url(${city.src})` }}
            />
            <p className="font-semibold text-base">{city.name}</p>
          </div>
        ))}

        {cities.length > qty ? (
          <MdArrowForwardIos size={30} color="#aaa" onClick={handleNext} className="cursor-pointer hover:scale-125 transition-all" />
        ) : null}
      </div>
    </div>
  );
};

export default Carousel;
