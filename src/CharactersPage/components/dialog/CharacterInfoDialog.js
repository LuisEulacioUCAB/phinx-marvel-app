import React from 'react';
import { PropTypes } from 'prop-types';
import styled from '@emotion/styled';
import { CloseButtonDialog } from './CloseButtonDialog';
import { ComicInfo } from './ComicInfo';
import { Loader } from '../../../_components/Loader';
import { marvelConstants } from '../../../shared/marvel.constants';

const ContainerStyled = styled('div')`
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
  position: fixed;
  z-index: 10;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
`;
const ModalContainerStyled = styled('div')`
  background-color: white;
  margin: 10% auto;
  border: 1px solid #888;
  width: 50%;
  border-radius: 4px;
  height: 400px;
  box-shadow: 0px 2px 13px #000000;

  @media screen and (max-width: 480px) {
    & {
        width: 85%;
        height: 90%
    }
  }
  
   @media (min-width: 481px) and (max-width: 768px) {
    & {
      width: 85%;
      height: 80%
    }
  }
  
    @media (min-width: 769px) and (max-width: 1024px) {
    & {
      width: 85%;
      height: 70%
    }
`;

const CharacterNameStyled = styled('p')`
  color: black;
  font-size: 28px;
  font-weight: bold;
  margin-left: 15px;
  margin-top: 15px;
`;

const ModalContainerData = styled('div')`
  height: 300px;
  overflow: auto;
  
  @media screen and (max-width: 480px) {
    & {
        height: 90%;
    }
  }
  
  @media (min-width: 481px) and (max-width: 768px) {
    & {
      height: 80%;
    }
  }
  
    @media (min-width: 769px) and (max-width: 1024px) {
    & {
      width: 100%;
      height: 70%
    }
`;
export const CharacterInfoDialog = ({ isOpen, onClose, character }) => {
  const name = character ? character.name : marvelConstants.NOT_AVAILABLE;
  const comicsList = character && character.comicsList ? character.comicsList : [];
  return (
    <ContainerStyled isOpen={isOpen} onClick={onClose} id={'modal-container'}>
      <ModalContainerStyled>
        <CloseButtonDialog onClose={onClose} />
        <CharacterNameStyled>{name}</CharacterNameStyled>
        <ModalContainerData>
          {comicsList.length ? (
            comicsList.map((comic, key) => {
              return <ComicInfo comic={comic} key={key} />;
            })
          ) : (
            <Loader />
          )}
        </ModalContainerData>
      </ModalContainerStyled>
    </ContainerStyled>
  );
};

CharacterInfoDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  character: PropTypes.object.isRequired,
};
