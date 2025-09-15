import { Image } from "@imagekit/react"

type ImageDefaultProps = {
  src: string;
  className?: string;
  alt?: string;
  w?: number;
  h?: number;
};

const ImageDefault = ({ src, className, alt, w, h }: ImageDefaultProps) => {
  return (
    <Image 
        src={src}
        className={className}
        alt= {alt}
        loading="lazy"
        lqip={{active: true, quality: 20}}
        urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
        width={w}
        height={h}
        transformation={[
          {
            width:w,
            height:h
          }
        ]}
    />
  )
}

export default ImageDefault