import { Card } from '@/components/card/card';
import { CardSkeleton } from '@/components/card/card-skeleton';

import type { TProduct } from '@/types';

type TProductProps = {
  data: TProduct;
  isLoading?: boolean;
};

const Product = ({ data, isLoading }: TProductProps) => {
  if (isLoading) {
    return <CardSkeleton />;
  }

  return (
    <Card
      definition={data.Description}
      imageAlt="Supplement"
      imageSrc={data.ImageUrl}
      linkUrl={data.LinkUrl}
      name={data.Name}
    />
  );
};

export { Product };
