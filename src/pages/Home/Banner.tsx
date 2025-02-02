import { Carousel, ConfigProvider } from "antd";
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
    display: "block",
    margin: "0 auto",
  };

  const images = [img1, img2, img3, img4, img5, img6, img7, img8];

  return (
    <div>
      <ConfigProvider
  theme={{
    components: {
      Carousel: {
        arrowSize: 40,
        colorBgContainer: "black", // Background color of arrows
        colorText: "black", // Color of the arrow icons
      },
    },
  }}
>
      <div className="mx-auto">
        <Carousel autoplay arrows draggable>
          {images.map((image, index) => (
            <div key={index} className="flex justify-center items-center">
              <img
                src={image}
                alt={`bicycle-${index + 1}`}
                style={contentStyle}
                className=" w-[96%] h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] object-cover"
              />
            </div>
          ))}
        </Carousel>
      </div>
    </ConfigProvider>
    </div>
  );
}
