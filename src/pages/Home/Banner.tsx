import { Carousel } from "antd";
import img1 from "../../assets/images/img1.jpeg";
import img2 from "../../assets/images/img2.jpeg";
import img3 from "../../assets/images/img3.jpeg";
import img4 from "../../assets/images/img4.jpeg";
import img5 from "../../assets/images/img5.jpeg";
import img6 from "../../assets/images/img6.jpeg";
import img7 from "../../assets/images/img7.jpeg";
import img8 from "../../assets/images/img8.jpeg";

export default function Banner() {
  const contentStyle: React.CSSProperties = {
    height: '600px',
    width: '100%',
    objectFit: 'cover'
  };

  const images = [img1, img2, img3, img4, img5, img6, img7, img8];

  return (
    <div>
      <Carousel autoplay arrows>
        {images.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`bicycle-${index + 1}`} style={contentStyle} />
          </div>
        ))}
      </Carousel>
    </div>
  );
}
