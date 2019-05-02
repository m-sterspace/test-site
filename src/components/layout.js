import React from "react"
import { Link } from "gatsby" 
import { rhythm, scale } from "../utils/typography"

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    header = (
      <div className="chrome">
        <div className="header">
          <Link
          style={{
            boxShadow: `none`,
            textDecoration: `none`,
            color: `inherit`,
            display: `collapsed`,
          }}
          to={`/`}
        >
          <img 
            src="\header_image.png" 
            />
            </Link>
            <div className="seperator"  >
              energy analysis explorer
            </div>
        </div>
  </div> 

    )
    return (
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        <header>{header}</header>
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()},  
          {` `}
          <a href="http://www.dialogdesign.ca/">DIALOG</a>
        </footer>
      </div>
    )
  }
}

export default Layout
