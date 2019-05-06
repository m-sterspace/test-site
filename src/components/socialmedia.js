import styled from "styled-components"  

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

export default SocialMedia