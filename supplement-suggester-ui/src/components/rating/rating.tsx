import { Badge, Rating as FlowbiteRating } from 'flowbite-react';

type TRatingProps = {
  rating: number;
};

const RatingStars = ({ rating }: TRatingProps) => {
  if (rating <= 3) {
    return (
      <>
        <FlowbiteRating.Star />
        <FlowbiteRating.Star />
        <FlowbiteRating.Star />
      </>
    );
  }

  if (rating <= 4) {
    return (
      <>
        <FlowbiteRating.Star />
        <FlowbiteRating.Star />
        <FlowbiteRating.Star />
        <FlowbiteRating.Star />
      </>
    );
  }

  return (
    <>
      <FlowbiteRating.Star />
      <FlowbiteRating.Star />
      <FlowbiteRating.Star />
      <FlowbiteRating.Star />
      <FlowbiteRating.Star />
    </>
  );
};

const Rating = ({ rating }: TRatingProps) => {
  if (rating <= 2) return null;

  return (
    <div className="mb-5 mt-2.5 flex items-center gap-x-3">
      <FlowbiteRating>
        <RatingStars rating={rating} />
      </FlowbiteRating>

      <Badge>{rating} stars</Badge>
    </div>
  );
};

export { Rating };
