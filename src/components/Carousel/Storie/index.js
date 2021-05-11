import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  width: 400px;
  min-height: 500px;
  background-image: ${({ url }) => `url(${url})`};
  background-position: center;
  text-decoration: none;
  background-size: cover;
  overflow: hidden;
  color: white;
  display: flex;
  align-items: flex-end;
  transition: width 0.3s;
  border-radius: 5px;

  @media (max-width: 800px) {
    width: 100vw;
    border-radius: 0px;
  }
`;

Card.Title = styled.span`
    display: ${(props) => (props.children[0]) === '' ? 'none' : 'block'};
    width: 100%;
    height: fit-content;
    max-height: 40%;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 10px;
    padding-left: 3%;
    font-weight: bold;
    font-size: 16px;
    color: white;
`;

Card.Text = styled.span`
    font-weight: normal;
    font-size: 14px;
    color: white;
    overflow: hidden;
`;

const StorieContainer = styled.div`
  width: 400px;
  height: 530px;
  margin: 15px;
  align-content: center;

  @media (max-width: 815px) {
    width: 100%;
    margin: 0%;
  }
`;


function Storie({ title, text, imagePath }) {

  return (
    <StorieContainer>
      <Card
        url={imagePath}
        target="_blank"
        style={{ borderColor: 'var(--primary)' }}
        title={title}
        text={text}
      >
        <Card.Title> 
          {title}
          <br/>
          <Card.Text>{text.length > 180 ? text = text.match(/.{1,180}/g)[0] + '[...]' : text}</Card.Text>
        </Card.Title>
      </Card>
    </StorieContainer>
  );
}

export { Storie };
