import React from 'react'
import { render } from 'react-testing-library' 
import Layout from '../layout'
import 'jest-dom/extend-expect'

describe(`Layout`, () => {
  it(`renders a header`, () => {
    const { container } = render(
      <Layout>
        <main>
          <h1>hello</h1>
        </main>
      </Layout>
    )

    expect(container.querySelector(`header`)).toBeInTheDocument()
  }) 
})