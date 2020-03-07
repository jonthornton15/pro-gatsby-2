/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require("path")

// exports.createPages = ({ graphql, actions }) => {
//   const { createPage } = actions
//   return new Promise((resolve, reject) => {
//     graphql(`
//       {
//         allMarkdownRemark(filter: { frontmatter: { slug: { ne: null } } }) {
//           edges {
//             node {
//               frontmatter {
//                 slug
//               }
//             }
//           }
//         }
//       }
//     `).then(results => {
//       results.data.allMarkdownRemark.edges.forEach(({ node }) => {
//         createPage({
//           path: `/posts${node.frontmatter.slug}`,
//           component: path.resolve("./src/components/postLayout.js"),
//           context: {
//             slug: node.frontmatter.slug,
//           },
//         })
//       })
//     })
//     resolve()
//   })
// }

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions
  const blogPostTemplate = path.resolve(`src/components/teamNetlifyLayout.js`)
  const result = await graphql(`
    {
      allMarkdownRemark(filter: { frontmatter: { bio: { ne: null } } }) {
        edges {
          node {
            frontmatter {
              title
            }
          }
        }
      }
    }
  `)
  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: `/company/team/${node.frontmatter.title}`,
      component: blogPostTemplate,
      context: {
        title: node.frontmatter.title,
      }, // additional data can be passed via context
    })
  })

  const resultBlogs = await graphql(`
    {
      allMarkdownRemark(filter: { frontmatter: { slug: { ne: null } } }) {
        edges {
          node {
            frontmatter {
              slug
            }
          }
        }
      }
    }
  `)
  // Handle errors
  if (resultBlogs.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }
  resultBlogs.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: `/posts${node.frontmatter.slug}`,
      component: path.resolve("./src/components/postLayout.js"),
      context: {
        slug: node.frontmatter.slug,
      },
    })
  })
}
