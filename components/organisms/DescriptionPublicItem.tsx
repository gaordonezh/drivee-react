import React, { ReactNode } from 'react';
import Button from '../atoms/Button';
import Chip from '../atoms/Chip';
import { combineClassnames } from '@/utils/functions';
import { useRouter } from 'next/router';
import Image from 'next/image';

interface DescriptionPublicItemProps {
  className: string;
  reverse: boolean;
  title: string;
  tags: Array<string>;
  description: string;
  buttonProps: {
    label: ReactNode;
    link: string;
  };
  imageProps: {
    src: string;
    alt: string;
  };
}

const DescriptionPublicItem = ({ className, reverse, title, tags, description, buttonProps, imageProps }: DescriptionPublicItemProps) => {
  const classList = combineClassnames('flex-col', reverse ? 'lg:flex-row-reverse' : 'lg:flex-row');

  const router = useRouter();

  return (
    <div className={combineClassnames('flex gap-5 lg:gap-20', classList, className)}>
      <div className="flex-1">
        <Image src={imageProps.src} width={650} height={100} alt={imageProps.alt} className="w-full" loading="lazy" />
      </div>
      <div className="flex-1 flex flex-col gap-5 items-start justify-center">
        <h2 className="text-3xl font-semibold capitalize">{title}</h2>
        {tags.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {tags.map((item) => (
              <Chip label={item} key={item} />
            ))}
          </div>
        ) : null}
        <p className="text-gray-500 text-md">{description}</p>
        <Button size="large" onClick={() => router.push(buttonProps.link)}>
          {buttonProps.label}
        </Button>
      </div>
    </div>
  );
};

DescriptionPublicItem.defaultProps = {
  className: '',
  reverse: false,
  tags: [],
};

export default DescriptionPublicItem;
