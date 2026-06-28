import { Card as FlowbiteCard } from 'flowbite-react';

type TCardProps = {
  children: React.ReactNode;
  isSmall?: boolean;
};

const Card = ({ children, isSmall }: TCardProps) => {
  return (
    <FlowbiteCard
      className={isSmall ? 'w-[250px] h-[250px]' : 'max-w-sm'}
      href={isSmall ? '/blog' : '/quiz'}>
      {children}
    </FlowbiteCard>
  );
};

export { Card };
