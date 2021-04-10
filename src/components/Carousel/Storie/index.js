import React from 'react';
import styled from 'styled-components';

export const StorieContainer = styled.div`
  width: 800px;
  height: 800px;
  background-image: ${({ url }) => `url(${url})`};
  background-size: cover;
  background-position: center;
  text-decoration: none;
  overflow: hidden;
  color: white;
  display: flex;
  align-items: flex-end;
  transition: width 0.3s;
  
  & > span {
    width: 100%;
    height: fit-content;
    max-height: 40%;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 20px;
    font-weight: bold;
    font-size: 16px;
    color: white;

    & > p {
      font-weight: normal;
      font-size: 14px;
      color: white;
      overflow: hidden;
    }
  }

  @media (max-width: 800px) {
    width: 100vw;
    height: 100vw;
  }
`;

function Storie({ title, text, imagePath }) {
  return (
    <StorieContainer
      url={imagePath}
      target="_blank"
      style={{ borderColor: 'var(--primary)' }}
      title={title}
      text={text}
    >
      <span> 
        {title} 
        <p>{text.length > 250 ? text = text.match(/.{1,250}/g)[0] + '[...]' : text}</p>
      </span>
    </StorieContainer>
  );
}

export { Storie };
