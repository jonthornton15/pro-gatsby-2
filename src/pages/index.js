import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Listing from "../components/listing"

const IndexPage = ({ location }) => (
  <Layout location={location}>
    <SEO title="Homepage" />
    <Listing />
  </Layout>
)

export default IndexPage
