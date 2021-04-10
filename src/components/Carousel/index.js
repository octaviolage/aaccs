import React from 'react';
import SlickSlider from 'react-slick';
import styled from 'styled-components';

const Container = styled.ul`
  padding: 0;
  margin: 0;
  .slick-prev,
  .slick-next {
    z-index: 50;
    top: 0;
    bottom: 0;
    margin: auto;
    transform: initial;
    &:before {
      display: ${({ arrows }) => `${arrows}`};
      font-size: 30px;
      color: var(--white);
      border-color: black;
    }
  }
  
  .slick-prev {
    left: 10px;
  }
  .slick-next {
    right: 10px;
  }
`;

const Slider = ({ children, speed, autoplay, dots }) => (
  <Container arrows={dots ? "None" : "flex"}>
    <SlickSlider {...{
      dots: dots,
      infinite: true,
      speed: speed,
      centerMode: true,
      variableWidth: true,
      adaptiveHeight: true,
      autoplay: autoplay,
      autoplaySpeed: 5000,
    }}
    >
      {children}
    </SlickSlider>
  </Container>
);

export { Slider };
