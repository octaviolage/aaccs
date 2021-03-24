import React from 'react';
import styled from 'styled-components';

const Background = styled.div`
    display: block;
    width: 100%;
    height: 100px;
    margin-top: 60px;
    background: var(--primary);
    box-shadow: inset 0px -50px 150px rgba(0, 0, 0, 0.33);
    max-width: 800px;

    @media (max-width: 800px) {
        margin-top: 50px;
        height: 120px;
    }
`;

const Title = styled.h1`
    font-weight: bold;
    font-size: 24px;
    padding-top: 2%;
    text-align: center;
    text-shadow: -2px 2px 4px rgba(0, 0, 0, 0.41);
    color: var(--white);

    @media (max-width: 800px) {
        padding-top: 2%;
    }
`;

const Slogan = styled.h1`
    font-size: 14px;
    font-weight: normal;
    font-style: italic;
    align-items: center;
    text-align: center;
    padding-top: 1%;
    color: var(--white);
    text-shadow: -2px 2px 4px rgba(0, 0, 0, 0.41);
    

    @media (max-width: 800px) {
        padding-top: 2%;
    }
`;

const BannerWrapper = styled.div`
    justify-content: center;
    align-items: center;
    &:after,
    &:before {
        content: "";
        display: block;
        position: absolute;
        left: 0;
        right: 0;
        margin: auto;
        height: 20%;
    }
`;

function Banner() {
  return (
      <BannerWrapper>
        <Background>
            <Title>
                ASSOCIAÇÃO ARTE PARA CULTURA CONQUISTAR SONHOS
            </Title>
            <Slogan>
                “Juntos formamos uma corrente para o bem”
            </Slogan>
        </Background>
      </BannerWrapper>
  );
}

export { Banner }
