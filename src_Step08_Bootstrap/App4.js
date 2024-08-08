import { Button, Card, Col, Container, Row } from "react-bootstrap";
import 'holderjs'
import 'bootstrap/dist/css/bootstrap.css'
function App4() {
    return (
        <div>
            <Container>
            <Row>
                <Col md={6} lg={3}>
                <MyCard/>
                </Col>
            </Row>
            </Container>
        </div>
    );
}

function MyCard() {
    return (
      <Card>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    );
  }
export default App4;