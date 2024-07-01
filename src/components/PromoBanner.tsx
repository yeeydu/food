import Image, { ImageProps } from "next/image";


const PromoBanner = (props: ImageProps) => {
  return (
    // eslint-disable-next-line jsx-a11y/alt-text
    <Image
     {...props}
      width={0}
      height={0}
      className="w-full h-auto object-contain md:w-[100%] md:h-[300px]"
      sizes="100vw"
      quality={100}
    />
  );
};

export default PromoBanner;
