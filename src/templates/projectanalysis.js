import React from "react"
import { Link, graphql } from "gatsby"  
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"      
import { csvParse } from 'd3-dsv'; 
import Chart from "../components/chart"; 
import Container from "../components/container"   
import Grid from '@material-ui/core/Grid';

class ProjectAnalysis extends React.Component { 
    
  render() {
    const post = this.props.data.markdownRemark 
    const siteTitle = this.props.data.site.siteMetadata.title 
    const { previous, next } = this.props.pageContext  
    const csv  = require('../../content/projects' + this.props.data.markdownRemark.fields.slug + 'index.csv');    
    const chart =  csvParse(csv.default, (item) => {  
      return item;
    })  
    
    return (
      <Layout location={this.props.location} title={siteTitle}> 
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        
        <Container> 
          <h1 
            style={{
                marginTop:rhythm(-1)
                }}>
            {post.frontmatter.title}
          </h1>  
          <p
            style={{
              color: "#999",
              display: `block`,
              marginBottom: rhythm(.5),
              marginTop: rhythm(-1),
            }} >
            {post.frontmatter.description}
          </p> 
          <p>
            {post.frontmatter.date}
          </p>
 
          <Grid container spacing={24}> 
            <Grid item xs={12}>            
              <Chart data={chart} />   
            </Grid> 
          </Grid> 

          <div dangerouslySetInnerHTML={{ __html: post.html }} />
    
          <hr style={{ marginBottom: rhythm(1), }} />  

          <ul
            style={{
              display: `flex`,
              flexWrap: `wrap`,
              justifyContent: `space-between`,
              listStyle: `none`,
              padding: 0,
            }}
          >
            <li>
              {previous && (
                <Link to={previous.fields.slug} rel="prev">
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={next.fields.slug} rel="next">
                  {next.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>
        </Container>
      </Layout>
    )
  }
}

export default ProjectAnalysis

export const pageQuery = graphql`
  query ProjectTypeABySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }  
  }
`
