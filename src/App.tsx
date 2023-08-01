import { Container, Nav, Navbar } from "react-bootstrap";
import CalculatorScreen from "./components/excercise1";
import PokemonTypeSelect from "./components/excercise2";

function App() {

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary" style={{border:2, borderColor:"red"}}>
        <Container>
          <Navbar.Brand>AVE</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <CalculatorScreen/>
      <PokemonTypeSelect/>
    </>
  );
}

export default App;
