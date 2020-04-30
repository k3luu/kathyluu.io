import React, { useState } from 'react';
import styled from 'styled-components';
// import breakpoint from 'styled-components-breakpoint';

import './App.css';
import ScrollBasedBezier from './components/ScrollBasedBezier';

const Form = styled.form`
  width: 100%;
  margin: 20px 0;
`;

const TextSection = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 0 -10px;
`;

const TextBox = styled.div`
  color: ${(props) => (props.active ? '#3208ff' : '#000')};
  flex-grow: 1;
  margin: 10px;
  position: relative;
  height: 70px;
`;

const TextLabel = styled.label`
  font-size: ${(props) => (props.active ? '10px' : '12px')};
  font-weight: 500;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  position: absolute;
  width: 100%;
  bottom: ${(props) => (props.active ? '75px' : '43px')};
  left: ${(props) => (props.active ? '0' : '10px')};
  text-align: left;
  cursor: text;
  transition: 0.2s;
`;

const TextField = styled.input`
  border: ${(props) => (props.error ? '2px solid red' : '2px solid #9c9c9e')};
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
  padding: 10px;
  width: 100%;
  outline: 0;

  &:focus {
    border: 2px solid #3208ff;
  }
`;

const MessageBox = styled.div`
  margin: 20px -10px;
  display: flex;

  > div {
    margin: 0 10px;
    flex-grow: 1;
  }
`;

const Button = styled.button`
  color: ${(props) => (props.disabled ? 'rgba(0, 0, 0, 0.26)' : '#fff')};
  background: ${(props) =>
    props.disabled ? 'rgba(0, 0, 0, 0.12)' : '#032b2f'};
  border: 0;
  border-radius: 2px;
  margin-top: 50px;
  padding: 10px 20px;
  font-weight: bold;
  text-transform: uppercase;
  transition: 0.2s ease;
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
`;

const validateEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function validationObj() {
  this.dirty = false;
  this.valid = true;
  this.focus = false;
  this.value = null;
}

function App() {
  let tempErr = {
    name: new validationObj(),
    email: new validationObj(),
    message: new validationObj(),
  };

  const [submitValidation, setSubmitValidation] = useState(false);
  const [nameVal, setNameVal] = useState(new validationObj());
  const [emailVal, setEmailVal] = useState(new validationObj());
  const [msgVal, setMsgVal] = useState(new validationObj());
  const [error, setError] = useState(tempErr);

  function onFocus(e) {
    const name = e.target.name;
    const validationObj = Object.assign({}, error);

    validationObj[name].focus = true;

    setError(validationObj);
  }

  function onBlur(e) {
    const name = e.target.name;
    const validationObj = Object.assign({}, error);

    validationObj[name].focus = false;

    setError(validationObj);
  }

  function checkValidation(validation) {
    let valid = true;

    for (let key in validation) {
      if (error[key].dirty) valid = error[key].valid ? valid : false;
      else valid = false;
    }

    return valid;
  }

  function handleValidation(e) {
    const name = e.target.name;
    const value = e.target.value;
    const validationObj = Object.assign({}, error);

    validationObj[name].dirty = true;
    validationObj[name].value = value === '' ? null : value;

    if (name === 'email') validationObj[name].valid = validateEmail.test(value);
    else validationObj[name].valid = value !== '';

    setError(validationObj);
    setSubmitValidation(checkValidation(validationObj));
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>oh hello</h1>
        <ScrollBasedBezier
          fill="#d02b6e"
          startInterpolateY={100}
          firstControlPointX={500}
          firstInterpolateY={-200}
          secondControlPointX={600}
          secondInterpolateY={500}
          endpointX={1300}
        />
        <ScrollBasedBezier />
      </header>

      <div className="main__content">
        <h1>i'm kathy.</h1>
        <br />
        <br />
        <br />
        <h2>
          i'm a software engineer based in san jose, california. i enjoy working
          with react on the front end. oh, and i have a dog; her name is pim.
        </h2>

        <h3>experience</h3>
        <div>
          <div>Intuit</div>
          <div>2020 – present</div>
        </div>
        <br />
        <div>
          <div>Doctor.com</div>
          <div>2017 – 2020</div>
        </div>

        <h3>other work</h3>
        <div>Two Half-Hitches</div>
        <div>Murakami Wedding</div>

        <h3>get in touch</h3>
        <Form
          name="contact"
          method="POST"
          action="/success"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
        >
          <input type="hidden" name="form-name" value="contact" />
          <TextSection>
            <TextBox active={error.name.focus}>
              <TextLabel
                htmlFor="name"
                active={error.name.focus || !!error.name.value}
              >
                Name
              </TextLabel>
              <TextField
                id="name"
                name="name"
                type="text"
                onChange={handleValidation}
                error={!error.name.valid}
                onFocus={onFocus}
                onBlur={onBlur}
              />
            </TextBox>
            <TextBox active={error.email.focus}>
              <TextLabel
                htmlFor="email"
                active={error.email.focus || !!error.email.value}
              >
                Email
              </TextLabel>
              <TextField
                id="email"
                name="email"
                type="email"
                onChange={handleValidation}
                error={!error.email.valid}
                onFocus={onFocus}
                onBlur={onBlur}
              />
            </TextBox>
          </TextSection>

          <label style={{ visibility: 'hidden' }}>
            Don’t fill this out if you're human: <input name="bot-field" />
          </label>

          <MessageBox>
            <TextBox active={error.message.focus}>
              <TextLabel
                htmlFor="message"
                active={error.message.focus || !!error.message.value}
              >
                Message
              </TextLabel>
              <TextField
                id="message"
                name="message"
                label="Message"
                error={!error.message.valid}
                onChange={handleValidation}
                onFocus={onFocus}
                onBlur={onBlur}
              />
            </TextBox>
          </MessageBox>

          <Button type="submit" disabled={!submitValidation}>
            Send
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default App;
