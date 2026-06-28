import { Card } from '@/components/card/card';
import { CardSkeleton } from '@/components/card/card-skeleton';

import type { TSupplement } from '@/types';

type TSupplementProps = {
  data: TSupplement;
  isLoading?: boolean;
};

const Supplement = ({ data, isLoading }: TSupplementProps) => {
  if (isLoading) {
    return <CardSkeleton />;
  }

  return (
    <Card
      definition={data.Definition}
      imageAlt="Supplement"
      imageSrc={data.ImageUrl}
      linkUrl={data.LinkUrl}
      name={data.Name}
    />
  );
};

export { Supplement };
