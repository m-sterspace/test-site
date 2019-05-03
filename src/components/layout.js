import React from "react" 
import Navigation from './Navigation'
import styled, { ThemeProvider, createGlobalStyle  } from "styled-components"
import theme from "../../config/theme"

const Footer = styled.footer`
  margin: 8rem 2rem 2rem; 
  padding: 1rem ${props => props.theme.spacer.horizontal}; 
  color: ${props => props.theme.colors.grey};
  a {
    text-decoration: none;
    color: ${props => props.theme.brand.primary};
  }
  position: relative;
  right: 0;
  bottom: 0;
  left: 0;
`

const GlobalStyle = createGlobalStyle` 
  html {
    font-family: 'Roboto', sans-serif;
  }
  body {
    font-family: 'Roboto', sans-serif; 
    font-size: 16px; 
  }
  h1, h2, h3, h4, h5, h6 { 
    font-family: "Clanbold", Arial, Helvetica, Sans-serif; 
  } 
  a {
    box-shadow: none
  }
`; 

class Layout extends React.Component {
  render() {
    const { children } = this.props  
    return ( 
      <ThemeProvider theme={theme}>
          <>
          <GlobalStyle />
          <Navigation />  
          {children} 
          <Footer>
            Copyright © DIALOG { new Date().getFullYear()}  
          </Footer>
          </>
      </ThemeProvider> 
    )
  }
}

export default Layout
