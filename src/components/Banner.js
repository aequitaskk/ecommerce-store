import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function Banner() {
  return (
    <Carousel showThumbs={false} infiniteLoop={true} autoPlay={true}>
      <div>
        <img src="/images/image3.jpg" />
      </div>
      <div>
        <img src="/images/image2.jpg" />
      </div>
      <div>
        <img src="/images/image1.jpg" />
      </div>
    </Carousel>
  );
}

export default Banner;
