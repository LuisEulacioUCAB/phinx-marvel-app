import React from 'react';
import { PropTypes } from 'prop-types';
import styled from '@emotion/styled';
import {ComicInfo} from '../dialog/ComicInfo';

const ContainerListStyled = styled('div')`
  padding-top: 150px;
  padding-left: 5%;
  padding-right: 5%;
`;

const ComicListView = ({ comicList, isShowFavorite}) => {
  return (
    <ContainerListStyled>
      {comicList.map((comic, key) => {
        return <ComicInfo
          comic={comic}
          key={key}
          isShowFavorite={isShowFavorite}
        />;
      })}
    </ContainerListStyled>
  );
};

ComicListView.defaultProps = {
  isShowFavorite:true,
};

ComicListView.propTypes = {
  comicList:PropTypes.array.isRequired,
  isShowFavorite:PropTypes.bool,
};

export { ComicListView };