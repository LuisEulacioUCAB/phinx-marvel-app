import { PropTypes } from 'prop-types';
import React from 'react';
import styled from '@emotion/styled';
import { CharacterName } from './CharacterName';

const CharacterInfoContainer = styled('div')`
  background-image: ${(props) => (props.bgImg ? `url(${props.bgImg})` : '')};
  background-size: 100%;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  position: relative;
  background-size: cover;
`;

const CharacterInfo = ({ name, thumbnail }) => {
  const backgroundImage = thumbnail ? `${thumbnail.path}.${thumbnail.extension}` : '';
  return (
    <CharacterInfoContainer bgImg={backgroundImage}>
          <CharacterName name={name} />
    </CharacterInfoContainer>
  );
};

CharacterInfo.propTypes = {
  name: PropTypes.string.isRequired,
  thumbnail: PropTypes.object.isRequired,
};

export { CharacterInfo };
