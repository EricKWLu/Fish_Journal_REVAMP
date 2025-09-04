import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import ImageDefault from "./ImageDefault";
import type { Settings } from "react-slick";


const ImageCarousel = ({ imagePaths, height }: { imagePaths: string[], height:number }) => {
  const settings: Settings = { 
    dots: true,
    lazyLoad: "ondemand",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 2
  };

  return (
    <Slider {...settings}>
      {imagePaths.map((path, index) => (
        <div key={index} className="mt-4">
          <ImageDefault src={path} h={height} className={"object-contain mx-auto"} />
        </div>
      ))}
    </Slider>
  )
}

export default ImageCarousel