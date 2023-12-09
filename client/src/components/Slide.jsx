import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.css';
function Slide() {
  return (
    <div style={{ display: 'block', width: "100vw", padding: "5vw" }}>
      <Carousel>
        <Carousel.Item interval={1500}>
          <img
            className="d-block w-100"
             src="images/1.png"
            alt="One"
          />
        </Carousel.Item>
        <Carousel.Item interval={1500}>
          <img
            className="d-block w-100"
src="images/2.png"
            alt="Two"
          />
        </Carousel.Item>
        <Carousel.Item interval={1500}>
          <img
            className="d-block w-100"
src="images/3.png"
            alt="Three"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default Slide;