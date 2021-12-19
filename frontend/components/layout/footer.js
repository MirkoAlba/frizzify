import { Container, Row, Col } from "react-bootstrap";

export default function Footer() {
  return (
    <footer className="bg-black py-75">
      <Container>
        <Row>
          <Col md={1}>
            <h3 className="text-white">Logo</h3>
          </Col>

          <Col md={3}>
            <p className="text-white">Logo</p>
          </Col>

          <Col md={3}>
            <p className="text-white">Logo</p>
          </Col>

          <Col md={3}>
            <p className="text-white">Logo</p>
          </Col>

          <Col md={2}>
            <p className="text-white">informazioni</p>
          </Col>
        </Row>

        <Row>
          <h5 className="text-white">
            informazioni legal | privacy | cookie | geolaclizzazione
          </h5>
        </Row>
      </Container>
    </footer>
  );
}
