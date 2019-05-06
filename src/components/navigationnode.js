import styled from "styled-components"  

const NavigationNode = styled.nav`
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

export default NavigationNode