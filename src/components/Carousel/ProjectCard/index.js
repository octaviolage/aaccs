import React from 'react';
import styled from 'styled-components';

export const ProjectCardContainer = styled.button`
  width: 200px;
  height: 140px;
  border-radius: 10px;
  border: 2px solid;
  margin-right: 16px;
  background-image: ${({ url }) => `url(${url})`};
  background-size: cover;
  background-position: center;
  text-decoration: none;
  overflow: hidden;
  color: white;
  cursor: pointer;
  position: relative;
  display: flex;
  flex: 0 0 298px;
  align-items: flex-end;
  transition: width 0.3s;
  padding: 0;
  &:hover,
  &:focus {
    width: calc(200px + 3vw);
    & > span {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  &:not(:first-child) {
    margin-left: 20px;
  }
  & > span {
    width: 100%;
    height: 40%;
    background-color: rgba(0, 0, 0, 0.8);
    padding: 12px;
    font-weight: bold;
    font-size: 16px;
    display: none;
  }

  @media (max-width: 800px) {
    width: 180px;
    height: 120px;
    span {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;

function ProjectCard({ title, imagePath }) {
  return (
      <ProjectCardContainer
        url={imagePath}
        style={{ borderColor: 'var(--primary)' }}
        title={title}
      >
        <span style={{ color: 'white' }}>{title}</span>
    </ProjectCardContainer>
  );
}

export { ProjectCard };
