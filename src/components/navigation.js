import React from "react"
import { Link } from "gatsby"   
import Wrapper from './wrapper.js'
import NavigationNode from './navigationnode.js'
import SocialMedia from './socialmedia.js'
import { FaUser } from 'react-icons/fa'
import logo from '../images/Dialog-logo_Orange.png'
   
class Navigation extends React.Component {
  render() { 
    return (  
      <Wrapper data-testid="navigation">
      <NavigationNode> 
          <Link to="/" activeClassName="nav-active">
            <img src={logo} alt="Logo" />
          </Link> 
      </NavigationNode> 
      <SocialMedia> 
          <a href="http://www.linkedin.com/company/1233090" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FaUser />
          </a>   
      </SocialMedia>
    </Wrapper>
    )
  }
}

export default Navigation
