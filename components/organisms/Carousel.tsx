// src/components/Carousel.js
import useWindowDimensions from '@/hooks/useWindowDimensions';
import React, { useState } from 'react';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';

const images = [
  '/images/person1.jpg',
  '/images/person2.jpg',
  '/images/person3.jpg',
  '/images/person4.jpg',
  '/images/person1.jpg',
  '/images/person2.jpg',
  '/images/person3.jpg',
  '/images/person4.jpg',
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

  const handlePrev = () => setStartIndex((prevIndex) => (prevIndex === 0 ? images.length - qty : prevIndex - 1));
  const handleNext = () => setStartIndex((prevIndex) => (prevIndex === images.length - qty ? 0 : prevIndex + 1));

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-between items-center w-full m-auto gap-5">
        {images.length > qty ? (
          <MdArrowBackIos size={30} color="#aaa" onClick={handlePrev} className="cursor-pointer hover:scale-125 transition-all" />
        ) : null}

        {images.slice(startIndex, startIndex + qty).map((image, index) => (
          <div key={index} className="flex flex-col items-center gap-3">
            <div
              className="h-[150px] w-[150px] rounded-full shadow-md border-4 border-gray-300 shadow-gray-500 bg-no-repeat bg-cover bg-center"
              style={{ backgroundImage: `url(${image})` }}
            />
            <p className="font-semibold text-base">Some place name</p>
          </div>
        ))}

        {images.length > qty ? (
          <MdArrowForwardIos size={30} color="#aaa" onClick={handleNext} className="cursor-pointer hover:scale-125 transition-all" />
        ) : null}
      </div>
    </div>
  );
};

export default Carousel;
