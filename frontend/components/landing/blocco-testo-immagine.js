import { Container, Row, Col } from "react-bootstrap";

import { uri } from "../../apollo/api";

export default function BloccoTestoImmagine({ data }) {
  const invertedLayout = data.layoutInvertito;
  return (
    <section
      key={data.id}
      style={{ backgroundColor: `#${data.backgroundColor}` }}
      className="wrapper wrapper-block-testoimmagine py-45 py-md-75 py-lg-90"
    >
      <Container>
        <Row>
          <Col
            md={5}
            className={
              invertedLayout
                ? "order-1 offset-md-1 mt-3 mt-md-0"
                : "order-0 mb-3 mb-md-0"
            }
          >
            <h2 className="text-secondary">{data.titolo}</h2>
            <h5>{data.testo}</h5>
          </Col>

          <Col md={6} className={invertedLayout ? "order-0" : "order-1"}>
            <div className="embed-responsive embed-responsive-4by3">
              <div className="embed-responsive-item">
                <img
                  src={`${uri}${data.immagine.data.attributes.url}`}
                  className="img-fit"
                  alt="Frizzify"
                />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
