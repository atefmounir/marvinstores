import React from 'react'
import styled from 'styled-components'

import { PageHero } from '../components'
import aboutImg from '../assets/about.jpeg'


const AboutPage = () => {
  return (
    <main>
      <PageHero title="about" />
      <Wrapper className="page section section-center">
        <img src={aboutImg} alt="nice home appliance"/>
        <article>
          <div className="title">
            <h2>Our Story</h2>
            <div className="underline"/>
          </div>
          <p>As an exclusive agent for some of the world’s leading brands in cookware and outdoor equipment,
            MARVINTRACK has introduced the Egyptian market to international renowned names such as Mienta.
            Our products built with the highest quality components,
            most of our products are also CE certified making them ideal for easy export to other countries.
          </p>
        </article>
      </Wrapper>
    </main>
  )
}

const Wrapper = styled.section`
  display: grid;
  gap: 4rem;
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    height: 500px;
    object-fit: cover;
  }
  p {
    line-height: 2;
    max-width: 45em;
    margin: 0 auto;
    margin-top: 2rem;
    color: var(--clr-grey-5);
  }
  .title {
    text-align: left;
  }
  .underline {
    margin-left: 0;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`
export default AboutPage
