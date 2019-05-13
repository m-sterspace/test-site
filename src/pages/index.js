import React from "react"
import { Link, graphql } from "gatsby" 
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import Container from "../components/container"
import styled from 'styled-components'
import Image from "gatsby-image"  
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent'; 
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'; 

class Index extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges 
    const images = data.allFile.edges
    
    const ListWrapper = styled.div` 
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 0fr));
      width: 90%;
    `
    const ListItem = styled.div`  
      padding: 1em;
    ` 

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="Projects"
          keywords={[`gatsby`, `javascript`, `react`]}
        /> 
        <Container>
          <ListWrapper>
          
            {posts.map(({ node }) => {
              const title = node.frontmatter.title || node.fields.slug
              const slug = node.fields.slug.split('/').join('') 
              const image = images.find((v, i) => {        
                return v.node.relativeDirectory === slug
              }) 
              
              return (
                <ListItem key={node.fields.slug}>
                    <Card >
                      <CardActionArea> 
                        <Image
                          fixed={image.node.childImageSharp.fixed}                    
                          style={{
                            marginRight: rhythm(1 / 2),
                            marginBottom: 0,
                            minWidth: 50, 
                          }}
                          imgStyle={{ 
                          }}
                        /> 
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="h5" style={{ fontSize: '1.2rem'}}>
                            {title}
                          </Typography>
                          <Typography component="p">
                          <span 
                            dangerouslySetInnerHTML={{
                              __html:  node.excerpt,
                            }}
                          />                       
                          </Typography>
                          <Typography component="p" style={{  
                            marginTop: "1.5rem" 
                          }}> 
                          <span style={{ 
                            color: "#999" 
                          }}>{node.frontmatter.date}</span>
                          
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      <CardActions>
                        <Button size="small" color="primary" to={node.fields.slug}>
                        <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                          View
                        </Link>
                        </Button>  
                      </CardActions>
                    </Card> 
                </ListItem>
              )
            })}
          </ListWrapper>
        </Container>
      </Layout>
    )
  }
}

export default Index

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
    allFile (filter: {   
      ext: { regex: "/(jpg)|(jpeg)|(png)|(JPG)|(JPEG)|(PNG)/" }
        }){
      edges {
        node { 
          relativeDirectory
          childImageSharp {
            fixed(width: 250, height: 250) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }  
  }
`
