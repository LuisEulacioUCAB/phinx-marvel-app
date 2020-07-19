import React from 'react';
import { PropTypes } from 'prop-types';
import { CharacterInfo } from './CharacterInfo';
import './style.css';

const CharacterContainer = ({ character, onClick }) => {
  return (
    <div className={'ch-container'} onClick={() => onClick(character)}>
      <CharacterInfo name={character.name} thumbnail={character.thumbnail} />
    </div>
  );
};

CharacterContainer.propTypes = {
  character: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export { CharacterContainer };
