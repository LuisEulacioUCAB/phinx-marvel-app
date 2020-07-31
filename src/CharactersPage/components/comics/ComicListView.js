import React from 'react';
import { PropTypes } from 'prop-types';
import styled from '@emotion/styled';
import {ContainerComic} from './ContainerComic';

const ContainerComicListStyled = styled('div')`
  padding-top: 150px;
  padding-left: 5%;
  padding-right: 5%;
`;

const ComicListView = ({ comicsList, isShowFavorite , favorite, onFavoriteClick}) => {
  return (
    <ContainerComicListStyled>
      {comicsList.map((comic, key) => {
        return (
          <ContainerComic
            key={key}
            comic={comic}
            onFavoriteClick={onFavoriteClick}
            favorite={favorite}
            isShowFavorite={isShowFavorite} />);
      })}
    </ContainerComicListStyled>
  );
};

ComicListView.defaultProps = {
  onFavoriteClick : null,
  favorite : {},
  isShowFavorite: true
};

ComicListView.propTypes = {
  comicsList: PropTypes.array.isRequired,
  onFavoriteClick:PropTypes.func,
  favorite:PropTypes.object,
  isShowFavorite:PropTypes.bool,
};
export { ComicListView };