import Image from 'next/image';

type TCardProps = {
  definition: string;
  imageAlt: string;
  imageSrc: string;
  linkUrl: string;
  name: string;
};

const Card = ({ definition, imageAlt, imageSrc, linkUrl, name }: TCardProps) => {
  return (
    // <a
    //   className="flex flex-col w-[275.75px] bg-white cursor-pointer rounded-xl shadow-md hover:shadow-lg hover:scale-[1.01] transition-all duration-200"
    //   href={linkUrl}
    //   target="_blank">
    //   <div className="w-full h-[146.25px] relative rounded-t-lg shadow-sm bg-white">
    //     <Image alt={imageAlt} className="object-contain rounded-lg" fill src={imageSrc} />
    //   </div>

    //   <div className="p-5 flex-1">
    //     <h3 className="font-bold">{name}</h3>
    //     <p className="text-sm mt-3 line-clamp-5">{definition}</p>
    //   </div>

    //   <div className="grid items-center px-5 border-t border-t-[#f4f4f4] h-[42px] font-bold text-[11px]">
    //     <span>LEARN MORE</span>
    //   </div>
    // </a>

    <a
      className="flex flex-col w-[300px] lg:w-[350px] bg-white cursor-pointer rounded-xl shadow-md hover:shadow-lg hover:scale-[1.01] transition-all duration-200"
      href={linkUrl}
      target="_blank">
      <div className="w-full h-[250px] lg:h-[280px] relative rounded-t-lg shadow-sm bg-white">
        <Image alt={imageAlt} className="object-contain rounded-lg" fill src={imageSrc} />
      </div>

      <div className="p-5 flex-1">
        <h3 className="font-bold">{name}</h3>
        <p className="text-sm mt-3 line-clamp-5">{definition}</p>
      </div>

      <div className="grid items-center px-5 border-t border-t-[#f4f4f4] h-[46px] font-bold text-[11px]">
        <span>LEARN MORE</span>
      </div>
    </a>
  );
};

export { Card };
