import React from "react" 
import Navigation from './Navigation'
import styled, { ThemeProvider, createGlobalStyle  } from "styled-components"
import { FaInstagram, FaLinkedin, FaYoutube, FaTwitter } from 'react-icons/fa'
import theme from "../../config/theme"
import Wrapper from './wrapper.js'
import NavigationNode from './navigationnode.js'
import SocialMedia from './socialmedia.js'
 
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

const Footer = styled.footer`
  margin: 8rem 0rem 4rem; 
  padding: 1rem ${props => props.theme.spacer.horizontal}; 
  color: ${props => props.theme.colors.grey};
  a {
    text-decoration: none;
    color:#999
  }
  position: relative;
  right: 0;
  bottom: 0;
  left: 0;
` 

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
            <Wrapper data-testid="navigation">
              <NavigationNode>  
                  Copyright © DIALOG { new Date().getFullYear()}  
              </NavigationNode>             
              <SocialMedia> 
                <a href="http://www.linkedin.com/company/1233090" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <FaLinkedin />
                </a> 
                <a href="https://www.twitter.com/dialog" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <FaTwitter />
                </a> 
                <a href="https://www.instagram.com/dialogdesign" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <FaInstagram />
                </a> 
                <a href="https://www.youtube.com/user/StartDIALOG" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <FaYoutube />
                </a> 
            </SocialMedia>
            </Wrapper>
          </Footer>
          </>
      </ThemeProvider> 
    )
  }
}

export default Layout
