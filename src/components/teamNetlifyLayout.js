import React from "react"
import { graphql } from "gatsby"
import Layout from "./layout"

// Static Query
// Can be used anywhere, doesn't accept variables, can't use context from gatsby-node.js

// Page Query
// This must be used on pages because it can use context from gatsby-node.js

class teamNetlifyLayout extends React.Component {
  render() {
    const { markdownRemark } = this.props.data
    const { location } = this.props

    return (
      <Layout location={location}>
        <h1>{markdownRemark.frontmatter.title}</h1>
        <div
          dangerouslySetInnerHTML={{
            __html: markdownRemark.bio,
          }}
        />
      </Layout>
    )
  }
}

// $slug variable taken from context in gasby-node, as long as it is the same name e.g. slug
// eq is equivalent to equals

export const queryNetlify = graphql`
  query PostQueryNetlify($title: String!) {
    markdownRemark(frontmatter: { title: { eq: $title } }) {
      frontmatter {
        title
        bio
      }
    }
  }
`

export default teamNetlifyLayout
