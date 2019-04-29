# Introduction 
TODO: Give a short introduction of your project. Let this section explain the objectives or the motivation behind this project. 

# Getting Started
 
`npm install`

`gatsby develop` 

# First GraphQL Query

`
{
   allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        } 
      
      
  site {
      siteMetadata {
        title
        author
      }
     
    }
  allIndexCsv (filter:{ fields: { slug: { eq: "/first-site/"} }})  { 
      edges  { 
        node { 
          fields {
                slug
              }
          HPFrac
        WWR
        WallRVal
        WinUVal
        WinSHGC
        EUIkWhm2
        TEDIkWhm2
        GHGIkgCO2m2
        }
      }
    }
} 
` 