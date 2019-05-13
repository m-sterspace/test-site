const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`) 
 
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions 
  const component = path.resolve(`./src/templates/projectanalysis.js`)  

  return graphql(
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
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create blog posts pages.
    const projects = result.data.allMarkdownRemark.edges 
    
    projects.forEach((project, index) => {
      const previous = index === projects.length - 1 ? null : projects[index + 1].node
      const next = index === 0 ? null : projects[index - 1].node
  
      createPage({
        path: project.node.fields.slug,
        component: component,
        context: {
          slug: project.node.fields.slug,
          previous,
          next,
        },
      })
    })

    return null
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
     
  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }

  if (node.internal.type === `IndexCsv`) {
    const value = createFilePath({ node, getNode }).replace("index/", "") 
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}


exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /react-data-grid/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}