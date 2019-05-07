import React from "react"
import { Link } from "gatsby"    
import NavigationNode from './navigationnode.js'
import SocialMedia from './socialmedia.js' 
import logo from '../images/Dialog-logo_Orange.png'
import Avatar from '@material-ui/core/Avatar';
import deepOrange from '@material-ui/core/colors/deepOrange';
import styled from "styled-components"  

class Navigation extends React.Component {
   
  render() {     

    const Wrapper = styled.header` 
      margin: 2rem 2rem; 
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
        flex-wrap: wrap;
      } 
    ` 

    return (  
      <Wrapper data-testid="navigation">
        <NavigationNode> 
            <Link to="/" activeClassName="nav-active">
              <img src={logo} alt="Logo" />
            </Link> 
        </NavigationNode>   
        <SocialMedia> 
            <Link to="/" activeClassName="nav-active" style={{
              fontSize: "16px", color: "#999", marginRight: "25px", marginTop: '5px'
            }}>
              Projects
            </Link>  
            <Avatar style={{  
              marginTop: '-5px',
              color: '#fff',
              backgroundColor: deepOrange[500]
            }}>N</Avatar> 
        </SocialMedia>
    </Wrapper>
    )
  }
}

export default Navigation
