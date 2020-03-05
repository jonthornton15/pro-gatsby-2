import React from "react"
import { graphql } from "gatsby"
import Layout from "./layout"

// Static Query
// Can be used anywhere, doesn't accept variables, can't use context from gatsby-node.js

// Page Query
// This must be used on pages because it can use context from gatsby-node.js

class postLayout extends React.Component {
  render() {
    const { markdownRemark } = this.props.data
    const { location } = this.props

    return (
      <Layout location={location}>
        <h1>{markdownRemark.frontmatter.title}</h1>
        <div
          dangerouslySetInnerHTML={{
            __html: markdownRemark.html,
          }}
        />
      </Layout>
    )
  }
}

// $slug variable taken from context in gasby-node, as long as it is the same name e.g. slug
// eq is equivalent to equals

export const query = graphql`
  query PostQuery($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date
        slug
      }
    }
  }
`

export default postLayout
