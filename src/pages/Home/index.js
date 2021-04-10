import React from 'react';
import styled from 'styled-components';
import { Banner } from '../../components/Banner';
import { PageDefault } from '../../components/PageDefault';
import { Slider } from '../../components/Carousel';
import { ProjectCard } from '../../components/Carousel/ProjectCard';
import { Storie } from '../../components/Carousel/Storie';
import { Button } from '../../components/Button';

import { stories } from '../../content/stories'
import agriculturaImg from '../../assets/img/agricultura.jpg';
import arteImg from '../../assets/img/arte.jpg';
import caravanaImg from '../../assets/img/caravana.jpg';
import esporteImg from '../../assets/img/esporte.jpg';
import sonhosImg from '../../assets/img/sonhos.jpg';
import sustentabilidadeImg from '../../assets/img/sustentabilidade.jpg';

const Topic = styled.div`
    position: relative;
    display: block;
    margin: 3%;
    margin-bottom: 5%;
`;

Topic.Title = styled.h3`
  margin-top: 5%;
  text-align: center;
  font-weight: bold;
  font-size: 18px;
  color: var(--secondary);

  @media(max-width: 800px) {
    display: block;
    justify-content: center;
    margin-top: 10%;
  }
`;

Topic.Paragraph = styled.p`
    text-align: left;
    font-weight: normal;
    font-size: 14px;
    color: var(--grayDark);
`;

Topic.Container = styled.div`
    display: flex;
    justify-content: space-between;
    margin-right: 15%;

    @media(max-width: 800px) {
      display: block;
      justify-content: center;
      margin: auto;
    }
`;

function Home() {
  return (
    <PageDefault>
      <Banner />
      <Slider speed={1500} autoplay={true} dots={true}>
        {stories.map((storie) => {
          return (
            <Storie
              title={storie.title}
              text={storie.text}
              imagePath={storie.url}
            />
          )
        })}
      </Slider>
      <Topic>
        <Topic.Title>A Organização</Topic.Title>
        <Topic.Paragraph>
          A AACCS busca oferecer, por meio de atividades e informações,
          oportunidades para que a comunidade possa de desenvolver e assim
          colaborar para o desenvolvimento local. Veja nossos projetos:
        </Topic.Paragraph>
        <Slider speed={500}>
          <ProjectCard
            title="Arte e Cultura"
            projectURL="/"
            imagePath={arteImg}
          />
          <ProjectCard
            title="Agricultura familiar"
            projectURL="/"
            imagePath={agriculturaImg}
          />
          <ProjectCard
            title="Esporte e Lazer"
            projectURL="/"
            imagePath={esporteImg}
          />
          <ProjectCard
            title="Caravana Encantada"
            projectURL="/"
            imagePath={caravanaImg}
          />
          <ProjectCard
            title="Educação Ambiental"
            projectURL="/"
            imagePath={sustentabilidadeImg}
          />
          <ProjectCard
            title="Conquistar Sonhos"
            projectURL="/"
            imagePath={sonhosImg}
          />
        </Slider>
      </Topic>
      <Topic>
        <Topic.Title>Quero fazer uma doação</Topic.Title>
        <Topic.Paragraph>
          Nos da AACCS aceitamos quase todo tipo de doação. Para colaborar
          você pode estar fazendo a entrega no nosso endereço ou preencher
          nosso formulário para agendarmos a busca dessa doação.
        </Topic.Paragraph>
        <Topic.Container>
          <Topic.Paragraph style={{ fontWeight: 'bold' }}>
            Nosso endereço:
            {' '}
            <br />
            Rua....., nº...
            {' '}
            <br />
            Bairro ....., Nova Lima - MG
            {' '}
            <br />
            CEP: 30.000-000
            {' '}
            <br />
            {' '}
            <br />
            Telefone: (31) 9 9999-9999
          </Topic.Paragraph>
          <div>
            <br />
            <Button>CONTATO</Button>
            {' '}
            <br />
            <Button>FORMULARIO</Button>
          </div>
        </Topic.Container>
      </Topic>
      <Topic>
        <Topic.Title>Quero participar</Topic.Title>
        <Topic.Paragraph>
          Caso você e/ou sua família precisem de ajuda e queiram participar
          dos programas e doações, basta preencher o fomulário abaixo para
          que possamos entrar em contato e avaliar suas necessidades.
        </Topic.Paragraph>
        <Button>FORMULARIO</Button>
      </Topic>
      <Topic>
        <Topic.Title>Melhor Oferta!</Topic.Title>
        <Topic.Paragraph>
          Conheça nossa ferramenta “Melhor Oferta!” para saber onde comprar
          os itens da cesta básica mais em conta perto de você.
        </Topic.Paragraph>
        <Button>MELHOR OFERTA!</Button>
      </Topic>
    </PageDefault>
  );
}

export { Home };
