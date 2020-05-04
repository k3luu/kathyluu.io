import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedinIn, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

import ScrollBasedBezier from './components/ScrollBasedBezier';

const Header = styled.header`
  height: 70vh;
  min-height: 500px;
  display: flex;
  justify-content: center;
  background: linear-gradient(120deg, #bd4576 0%, #e2bfce 100%);
  color: #fff;
  text-align: center;
  padding-top: 200px;
  box-sizing: border-box;
  position: relative;

  h1 {
    color: #fff;
  }
`;

const Content = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 0 10px 100px;
  text-align: center;
`;

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

  svg {
    display: ${(props) => (props.error && !props.active ? 'block' : 'none')};
    position: absolute;
    right: 10px;
    top: 13px;

    path {
      fill: red;
    }
  }
`;

const TextLabel = styled.label`
  font-size: ${(props) => (props.active ? '10px' : '12px')};
  font-weight: 500;
  text-transform: lowercase;
  letter-spacing: 0.6px;
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

const TextArea = styled.textarea`
  border: ${(props) => (props.error ? '2px solid red' : '2px solid #9c9c9e')};
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
  padding: 10px;
  width: 100%;
  outline: 0;
  height: 100px;
  resize: none;

  &:focus {
    border: 2px solid #3208ff;
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
  transition: 0.2s ease;
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
`;

const ConnectSection = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 5em;

  a:hover {
    div {
      background-color: blue;
    }

    svg#github path {
      fill: blue;
    }
  }

  div {
    background-color: pink;
    border-radius: 100px;
    height: 40px;
    width: 40px;
    margin: 10px;

    svg {
      height: 20px;
      width: 21px !important;
      margin: 10px;

      path {
        fill: #fff;
      }
    }
  }

  svg {
    height: 40px;
    width: 40px !important;
    margin: 10px;

    path {
      fill: pink;
    }
  }
`;

const validateEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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

  // function checkValidation(validation) {
  //   let valid = true;

  //   for (let key in validation) {
  //     if (error[key].dirty) valid = error[key].valid ? valid : false;
  //     else valid = false;
  //   }

  //   return valid;
  // }

  function handleValidation(e) {
    const name = e.target.name;
    const value = e.target.value;
    const validationObj = Object.assign({}, error);

    validationObj[name].dirty = true;
    validationObj[name].value = value === '' ? null : value;

    if (name === 'email') validationObj[name].valid = validateEmail.test(value);
    else validationObj[name].valid = value !== '';

    setError(validationObj);
  }

  return (
    <>
      <Header>
        <h1>
          oh hello{' '}
          <span role="img" aria-label="smile">
            😊
          </span>
        </h1>
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
      </Header>

      <Content>
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
        <div>
          <a
            href="https://twohalfhitches.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Two Half-Hitches
          </a>
        </div>
        <br />
        <div>
          <a
            href="https://murakami-wedding.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Murakami Wedding
          </a>
        </div>

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
            <TextBox active={error.name.focus} error={!error.name.valid}>
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
                required
              />
              <FontAwesomeIcon icon={faExclamationTriangle} />
            </TextBox>
            <TextBox active={error.email.focus} error={!error.email.valid}>
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
                required
              />
              <FontAwesomeIcon icon={faExclamationTriangle} />
            </TextBox>
          </TextSection>

          <label style={{ visibility: 'hidden' }}>
            Don’t fill this out if you're human: <input name="bot-field" />
          </label>

          <MessageBox>
            <TextBox active={error.message.focus} error={!error.message.valid}>
              <TextLabel
                htmlFor="message"
                active={error.message.focus || !!error.message.value}
              >
                Message
              </TextLabel>
              <TextArea
                id="message"
                name="message"
                label="Message"
                error={!error.message.valid}
                onChange={handleValidation}
                onFocus={onFocus}
                onBlur={onBlur}
                required
              />
              <FontAwesomeIcon icon={faExclamationTriangle} />
            </TextBox>
          </MessageBox>

          <Button type="submit">send</Button>
        </Form>

        <ConnectSection>
          <a
            href="https://www.linkedin.com/in/kathy-luu/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div>
              <FontAwesomeIcon icon={faLinkedinIn} />
            </div>
          </a>
          <a
            href="https://github.com/k3luu"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon id="github" icon={faGithub} />
          </a>
        </ConnectSection>
      </Content>
    </>
  );
}

export default App;
