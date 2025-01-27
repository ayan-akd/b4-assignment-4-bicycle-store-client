import Banner from "./Banner";
import Events from "./Events";
import Featured from "./Featured";
import Testimonial from "./Testimonial";

export default function Home() {
    return (
        <div>
            <Banner />
            <Featured />
            <Events />
            <Testimonial />
        </div>
    );
}