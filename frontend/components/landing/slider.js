import { Container, Row, Col } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";

import SwiperCore, { EffectCards } from "swiper";
import "swiper/css";
import "swiper/css/effect-cards";

import { uri } from "../../apollo/api";

SwiperCore.use([EffectCards]);

export default function Slider({ data }) {
  console.log(data);
  return (
    <section className="wrapper wrapper-block-slider">
      <Container fluid className="py-45 py-md-75 py-lg-90 overflow-x-hidden">
        <Row>
          <Col xs={12} md={8} className="offset-md-2">
            <Swiper
              effect={"cards"}
              grabCursor={true}
              // onSlideChange={() => console.log("slide change")}
              // onSwiper={(swiper) => console.log(swiper)}
            >
              {data.map((slide) => {
                return (
                  <SwiperSlide key={slide.id}>
                    <div className="embed-responsive embed-responsive-16by9">
                      <div className="embed-responsive-item">
                        <img
                          className="img-fit"
                          src={`${uri}${slide.slide.data.attributes.url}`}
                          alt="Frizzify"
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
