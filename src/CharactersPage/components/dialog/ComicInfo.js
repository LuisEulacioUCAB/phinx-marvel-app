import React from 'react';
import styled from '@emotion/styled';
import { PropTypes } from 'prop-types';
import { ReduceTextWithViewMoreLink } from '../../../_components/ReduceTextWithViewMoreLink';
import { marvelConstants } from '../../../shared/marvel.constants';
import { Link } from 'react-router-dom';
import {Favorite} from '../../../_components/Favorite';

const TitleStyled = styled(Link)`
  font-weight: bold;
  font-size: 18px;
  text-decoration: none;
  color: black;

  @media screen and (max-width: 768px) {
    & {
      padding-top: 10px;
    }
  }
  &:visit {
    color: black;
  }

  @media screen and (max-width: 480px) {
    & {
      width: 85px;
      height: 40px;
      position: relative;
      top: 2px;
    }
  }

  &:hover {
    color: #3eb7f9 !important;
  }
`;
const DescriptionStyled = styled('div')`
  font-size: 16px;
`;

const ContainerImageStyled = styled('div')`
  width: 35%;
  position:relative;
  @media screen and (max-width: 768px) {
    & {
      width: 100% !important;
    }
  }
`;

const ContainerInfoStyled = styled('div')`
    width: 65%;
    padding-left: 10px;
    padding-right: 10px;
    @media screen and (max-width: 768px) {
    &{
        width: 100%!important;
       
       padding:0;
    }
`;

const ContainerComicStyled = styled('div')`
  display: flex;
  padding-left: 15px;
  padding-right: 15px;
  margin-bottom: 2rem;
  position:relative;
  @media screen and (max-width: 768px) {
    & {
      display: block;
    }
  }
`;

const ComicImageStyled = styled('img')`
  width: 100%;
`;

const ComicInfo = ({ comic , favorite , onFavoriteClick, isShowFavorite}) => {
  const urlImage = comic.thumbnail
    ? `${comic.thumbnail.path}.${comic.thumbnail.extension}`
    : marvelConstants.IMAGE_NOT_FOUND;
  const title = comic.title ? comic.title : marvelConstants.NOT_AVAILABLE;

  const description = comic.description ? (
    <ReduceTextWithViewMoreLink
      amountWords={30}
      text={comic.description}
      link={`/comic/${comic.id}`}
      linkText={'View More...'}
    />
  ) : (
    marvelConstants.NOT_AVAILABLE
  );
  return (
    <>
      <ContainerComicStyled>
        <ContainerImageStyled>
          <ComicImageStyled src={urlImage} alt={title} />
          {isShowFavorite ? (
            <Favorite
                onFavoriteClick={onFavoriteClick}
                data={comic}
                favorite={favorite}
                type={marvelConstants.COMIC_TYPE}
              /> 
            ):null
          }
          
        </ContainerImageStyled>
        <ContainerInfoStyled>
          <TitleStyled to={`/comic/${comic.id}`}>{title}</TitleStyled>
          <DescriptionStyled>{description}</DescriptionStyled>
        </ContainerInfoStyled>

      </ContainerComicStyled>
    </>
  );
};

ComicInfo.defaultProps = {
  favorite: {},
  onFavoriteClick: null,
  isShowFavorite: true,
};

ComicInfo.propTypes = {
  comic: PropTypes.object.isRequired,
  favorite: PropTypes.object,
  onFavoriteClick: PropTypes.func,
  isShowFavorite: PropTypes.bool
};

export { ComicInfo };
