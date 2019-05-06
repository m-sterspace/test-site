import styled from "styled-components"  

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
export default Wrapper
