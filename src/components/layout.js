import React from "react" 
import Navigation from './Navigation'
import styled, { ThemeProvider, createGlobalStyle  } from "styled-components"
import { FaInstagram, FaLinkedin, FaYoutube, FaTwitter } from 'react-icons/fa'
import theme from "../../config/theme"

const Wrapper = styled.header`
  align-items: center;
  display: flex; 
  position: relative;
  z-index: 1000;
  a {
    color: black
    text-decoration: none;
    transition: all 0.3s ease-in-out;
    z-index: 100; 
  }
  @media (max-width: ${props => props.theme.breakpoints.s}) {
    padding: 1rem 0 1rem 0;
    flex-wrap: wrap;
  }
  margin: 3rem 4rem 0rem; 
`

const Nav = styled.nav`
  display: flex;
  flex: 1;
  justify-content: flex-start; 
  a:not(:first-child) {
    margin-left: 1rem;
  }
  a {
    color: black
    text-decoration: none;
    transition: all 0.3s ease-in-out;
    z-index: 100; 
  }
  @media (max-width: ${props => props.theme.breakpoints.s}) {
    padding: 0 1rem;
  }
  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    order: 2;
  }
` 

const Footer = styled.footer`
  margin: 8rem 0rem 4rem; 
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
const SocialMedia = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  padding: 0; 
  margin: 0rem 0rem 0rem; 
  a {
    font-size: 1.25rem;
    line-height: 20px;
    color: #999;
  }
  a:not(:first-child) {
    margin-left: 1rem;
  }
  @media (max-width: ${props => props.theme.breakpoints.s}) {
    padding: 0 1rem;
  }
  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    order: 3;
  }
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
            <Wrapper data-testid="navigation">
              <Nav>  
                  Copyright © DIALOG { new Date().getFullYear()}  
              </Nav>             
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
