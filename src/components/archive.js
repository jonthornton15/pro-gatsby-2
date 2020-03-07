import React from "react"
import styled from "styled-components"
// import PropTypes from "prop-types"
import { useStaticQuery, graphql, Link } from "gatsby"

const POST_ARCHIVE_QUERY = graphql`
  query ArchiveQuery {
    allMarkdownRemark(
      limit: 5
      sort: { order: [DESC], fields: [frontmatter___date] }
      filter: { frontmatter: { slug: { ne: null } } }
    ) {
      totalCount
      edges {
        node {
          excerpt
          frontmatter {
            title
            slug
          }
        }
      }
    }
  }
`

const ArchiveList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;

  a {
    font-size: 0.8rem;
    text-decoration: underline;
    color: #524763;
  }
`

const Archive = () => {
  const data = useStaticQuery(POST_ARCHIVE_QUERY)

  return (
    <>
      <aside>
        <h3>Archive</h3>
        <ArchiveList>
          {data.allMarkdownRemark.edges.map((edge, key) => (
            <li key={key}>
              <Link to={`/posts${edge.node.frontmatter.slug}`}>
                {edge.node.frontmatter.title}
              </Link>
            </li>
          ))}
        </ArchiveList>
      </aside>
    </>
  )
}

// Archive.propTypes = {
//   children: PropTypes.node.isRequired,
// }

export default Archive
