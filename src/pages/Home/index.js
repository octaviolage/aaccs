import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Banner } from '../../components/Banner';
import { PageDefault } from '../../components/PageDefault';
import { Slider } from '../../components/Carousel';
import { Storie } from '../../components/Carousel/Storie';
import { Button } from '../../components/Button';
import { Parceiros } from '../../components/Parceiros';
import ProjectModal from '../../components/modal/ProjectModal';

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
    font-size: 16px;
    color: var(--grayDark);
`;

Topic.Column = styled.p`
    min-width: 220px;
    display: inline-block;
    text-align: left;
    font-weight: normal;
    color: var(--grayDark);
    align-self: center;

    @media(max-width: 800px) {
      display: block;
      justify-content: center;
      margin: auto;
    }
`;

Topic.Container = styled.div`
    display: flex;
    justify-content: center;

    @media(max-width: 800px) {
      display: block;
    }
`;

function Home() {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <PageDefault>
      <Banner />
      <Slider speed={1500} autoplay={true} dots={true}>
        {stories.map((storie, key) => {
          return (
            <Storie
              title={storie.title}
              text={storie.text}
              imagePath={storie.url}
              key={key}
            />
          )
        })}
      </Slider>
      <Topic>
        <Topic.Title>A Organiza????o</Topic.Title>
        <Topic.Paragraph>
          A AACCS busca oferecer, por meio de atividades e informa????es,
          oportunidades para que a comunidade possa de desenvolver e assim
          colaborar para o desenvolvimento local. Veja nossos projetos:
        </Topic.Paragraph>
        <Slider speed={500}>
          <ProjectModal
            title="Arte e Cultura"
            imagePath={arteImg}
          />
          <ProjectModal
            title="Agricultura familiar"
            imagePath={agriculturaImg}
          />
          <ProjectModal
            title="Esporte e Lazer"
            imagePath={esporteImg}
          />
          <ProjectModal
            title="Caravana Encantada"
            imagePath={caravanaImg}
          />
          <ProjectModal
            title="Educa????o Ambiental"
            imagePath={sustentabilidadeImg}
          />
          <ProjectModal
            title="Conquistar Sonhos"
            imagePath={sonhosImg}
          />
        </Slider>
      </Topic>
      <Topic>
        <Topic.Title>Quero fazer uma doa????o</Topic.Title>
        <Topic.Paragraph>
          Nos da AACCS aceitamos quase todo tipo de doa????o. Para colaborar
          voc?? pode estar fazendo a entrega no nosso endere??o ou preencher
          nosso formul??rio para agendarmos a busca dessa doa????o.
        </Topic.Paragraph>
        <Topic.Container>
          <Topic.Paragraph>
            <b>Nosso endere??o:</b>
            <br />
            <Topic.Column>
              Rua Santa Cruz, n?? 58, Centro, Nova Lima - MG
              <br />
              CEP: 34.000-126
              <br />
              Telefone: (31) 9 7300-2390
              <br />
              Email: aaccsconquistarsonhos@gmail.com
            </Topic.Column>
          </Topic.Paragraph>
          <Topic.Column/>
          <Topic.Column>
            <Link to="/cadastro/doacao">
              <Button>FAZER UMA DOA????O</Button>
            </Link>
          </Topic.Column>
        </Topic.Container>
      </Topic>
      <Topic>
        <Topic.Title>Quero participar</Topic.Title>
        <Topic.Paragraph>
          Caso voc?? e/ou sua fam??lia precisem de ajuda e queiram participar
          dos programas e doa????es, basta preencher o fomul??rio abaixo para
          que possamos entrar em contato e avaliar suas necessidades.
        </Topic.Paragraph>
        <Link to="/cadastro/familia">
          <Button>PARTICIPAR</Button>
        </Link>
      </Topic>
      <Topic>
        <Topic.Title>Melhor Oferta!</Topic.Title>
        <Topic.Paragraph>
          Conhe??a nossa ferramenta ???Melhor Oferta!??? para saber onde comprar
          os itens da cesta b??sica mais em conta perto de voc??.
        </Topic.Paragraph>
        <Link to="/ofertas">
          <Button>MELHOR OFERTA!</Button>
        </Link>
      </Topic>
      <Topic>
        <Topic.Title>Nossos parceiros</Topic.Title>
        <Parceiros />
      </Topic>
    </PageDefault>
  );
}

export { Home };
