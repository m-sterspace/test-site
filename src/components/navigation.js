import React from "react"
import { Link } from "gatsby"  
import styled from "styled-components"  
import { FaInstagram, FaLinkedin, FaYoutube, FaTwitter } from 'react-icons/fa'
import logo from '../images/Dialog-logo_Orange.png'

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

const SocialMedia = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  padding: 0;
  margin: 0rem 1rem 2rem; 
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
 
class Navigation extends React.Component {
  render() { 
    return (  
      <Wrapper data-testid="navigation">
      <Nav> 
          <Link to="/" activeClassName="nav-active">
            <img src={logo} alt="Logo" />
          </Link> 
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
    )
  }
}

export default Navigation
