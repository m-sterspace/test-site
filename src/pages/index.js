import React from "react"
import { Link, graphql } from "gatsby" 
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import Container from "../components/container"
import styled from 'styled-components'
import Image from "gatsby-image" 

class Index extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges 
    const images = data.allFile.edges
    
    const ListWrapper = styled.div` 
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
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
                <Image
                    fixed={image.node.childImageSharp.fixed}                    
                    style={{
                      marginRight: rhythm(1 / 2),
                      marginBottom: 0,
                      minWidth: 50,
                      borderRadius: `0%`,
                    }}
                    imgStyle={{
                      borderRadius: `5%`,
                    }}
                  />
                  <strong
                    style={{
                      marginBottom: rhythm(1 / 4) 
                    }}
                  >
                    <Link style={{ boxShadow: `none`, color: '#999' }} to={node.fields.slug}>
                      {title}
                    </Link>
                  </strong>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: node.frontmatter.description || node.excerpt,
                    }}
                  />
                  <p style={{
                     color: "#999", marginBottom: "5px"
                  }}>{node.frontmatter.date}</p>
  
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
            fixed(width: 100, height: 100) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }  
  }
`
