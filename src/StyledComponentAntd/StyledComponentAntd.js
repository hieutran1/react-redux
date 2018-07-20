import React, { Component } from "react";
import styled, { ThemeProvider } from "styled-components";

const Hello = () => {
  // Create a Title component that'll render an <h1> tag with some styles
  const Title = styled.h1`
    font-size: 1.5em;
    text-align: center;
    color: palevioletred;
  `;

  // Create a Wrapper component that'll render a <section> tag with some styles
  const Wrapper = styled.section`
    padding: 4em;
    background: papayawhip;
  `;

  // Use Title and Wrapper like any other React component – except they're styled!
  return (
    <Wrapper>
      <Title>
        Hello World, this is my first styled component!
      </Title>
    </Wrapper>
  );
};

// Define our button, but with the use of props.theme this time
const Button = styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;

  /* Color the border and text with theme.main */
  color: ${props => props.theme.main};
  border: 2px solid ${props => props.theme.main};
`;

// We're passing a default theme for Buttons that aren't wrapped in the ThemeProvider
Button.defaultProps = {
  theme: {
    main: 'palevioletred'
  }
};

// Define what main theme will look like
const theme = {
  main: 'mediumseagreen'
};

const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: palevioletred;
  background: papayawhip;
  border: none;
  border-radius: 3px;
`;


export default class StyledComponentAntd extends Component {
  constructor(props) {
    super(props);
  }

  // Use Title and Wrapper like any other React component – except they're styled!
  render() {
    return (
      <div>
        <Hello />

        <Button theme={{ main: 'royalblue' }}>Ad hoc theme</Button>
        <ThemeProvider theme={theme}>
          <div>
            <Button>Themed</Button>
            <Button theme={{ main: 'darkorange' }}>Overidden</Button>
          </div>
        </ThemeProvider>

        <Input
          placeholder="Hover here..."
          innerRef={x => { this.input = x; }}
          onMouseEnter={() => this.input.focus()}
        />
      </div>
    );
  }
}