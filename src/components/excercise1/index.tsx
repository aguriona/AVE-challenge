import React, { useState } from 'react';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import Calculator from './calculator';

const CalculatorScreen: React.FC = () => {
  const [num1, setNum1] = useState("0");
  const [num2, setNum2] = useState("0");
  const [result, setResult] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleMultiply = () => {
    if (isNaN(Number(num1)) || isNaN(Number(num2))) {
        setErrorMessage('Por favor, ingrese números');
        setResult(null);
      } else {
        setErrorMessage(null);
        const res = Calculator(Number(num1), Number(num2));
        setResult(res);
      }
  };

  return (
    <Container>
      <Row className="mt-6">
        <Col md={{ span: 4, offset: 4 }}>
          <Form>
            <Form.Group controlId="num1">
              <Form.Label style={{fontStyle:"italic", fontWeight:"bold"}}>Multiplicador</Form.Label>
              <Form.Control
                value={num1}
                onChange={(e) => setNum1(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="num2">
              <Form.Label style={{fontWeight:"bold"}}>X</Form.Label>
              <Form.Control
                value={num2}
                onChange={(e) => setNum2(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" style={{marginTop: 10}} onClick={handleMultiply}>
              Multiplicar
            </Button>
          </Form>
          {errorMessage && <Alert variant="danger" className="mt-3">{errorMessage}</Alert>}
        </Col>
      </Row>

      {result !== null && (
        <Row className="mt-4">
          <Col md={{ span: 4, offset: 4 }}>
            <div>
              <h3>Resultado:</h3>
              <p>{result}</p>
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default CalculatorScreen;
