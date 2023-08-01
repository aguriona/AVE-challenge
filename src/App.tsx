import { Container, Nav, Navbar } from "react-bootstrap";
import CalculatorScreen from "./components/exercise1";
import PokemonTypeSelect from "./components/exercise2";
import ValidatorScreen from "./components/exercise3-4";

function App() {
  return (
    <>
      <Navbar
        expand="lg"
        className="bg-body-tertiary"
        style={{ border: 2, borderColor: "red" }}
      >
        <Container>
          <Navbar.Brand>AVE</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#one">Problema 1</Nav.Link>
            <Nav.Link href="#two">Problema 2</Nav.Link>
            <Nav.Link href="#three">Problema 3-4</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <section id="one">
        <CalculatorScreen />
      </section>
      <section id="two" >
        <PokemonTypeSelect />
      </section>
      <section id="three">
        <ValidatorScreen />
      </section>
    </>
  );
}

export default App;
