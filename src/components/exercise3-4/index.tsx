import React, { useState } from "react";
import { Container, Form, ListGroup } from "react-bootstrap";
import { Validator } from "./validator";
import check from "../../assets/check.png"
import cancel from "../../assets/cancel.png"
import Image from 'react-bootstrap/Image';

const ValidatorScreen = () => {
  const [password, setPassword] = useState("");
  const [validationResults, setValidationResults] = useState<Array<[string, boolean]>>([]);
    const validator = new Validator();

  const validatePassword = (password: string) => {
    const validations: Array<[string, boolean]> = [
      ["At least 16 characters", validator.atLeast16Characters(password)],
      ["Lower and Upper case letters", validator.lowerAndUpperCase(password)],
      ["No consecutive letters", validator.noConsecutiveLetters(password)],
      ["At least 4 numbers", validator.atLeast4Numbers(password)],
      ["No consecutive numbers", validator.noConsecutiveNumbers(password)],
      ["At least 2 special characters", validator.atLeast2SpecialCharacters(password)],
      ["No repeating special characters", validator.noRepeatSpChar(password)],
      ["No number 0", validator.noNumber0(password)],
      ["No spaces", validator.noSpaces(password)],
    ];

    setValidationResults(validations);
  };


  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);
  };

  return (
    <Container style={{ paddingTop:20, paddingBottom:20 }}>
      <Form.Group controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={handlePasswordChange}
        />
      </Form.Group>

      <ListGroup style={{marginTop:10}}>
        {validationResults.map(([message, isValid], index) => (
          <ListGroup.Item key={index} className={isValid ? "text-success" : "text-danger"}>
                        {isValid ? (
              <Image src={check} style={{ marginRight: 10, height: 20}} />
            ) : (
              <Image src={cancel} style={{ marginRight: 10, height: 20}} />
            )}
            {message}
          </ListGroup.Item>
        ))}
      </ListGroup>
      </Container>
  );
}

export default ValidatorScreen;
