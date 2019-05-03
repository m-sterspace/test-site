import React from "react"
import { Link, graphql } from "gatsby" 
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import Container from "../components/container"
import styled from 'styled-components'

class Index extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges

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
              return (
                <ListItem key={node.fields.slug}>
                  <h3
                    style={{
                      marginBottom: rhythm(1 / 4),
                    }}
                  >
                    <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                      {title}
                    </Link>
                  </h3>
                  <p style={{
                     color: "#999", marginBottom: "5px"
                  }}>{node.frontmatter.date}</p>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: node.frontmatter.description || node.excerpt,
                    }}
                  />
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
  }
`
