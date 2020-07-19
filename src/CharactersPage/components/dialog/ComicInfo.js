import React from 'react';
import styled from '@emotion/styled';
import { PropTypes } from 'prop-types';
import { ReduceTextWithViewMoreLink } from '../../../_components/ReduceTextWithViewMoreLink';

const TitleStyled = styled('div')`
    font-weight:bold;
    font-size: 18px;
    
    @media screen and (max-width: 1024px) {
    &{
        padding-top:10px;
    }
`;
const DescriptionStyled = styled('div')`
  font-size: 16px;
`;

const ContainerImageStyled = styled('div')`
  width: 35%;

  @media screen and (max-width: 1024px) {
    & {
      width: 100% !important;
    }
  }
`;

const ContainerInfoStyled = styled('div')`
    width: 65%;
    padding-left: 10px;
    padding-right: 10px;
    @media screen and (max-width: 1024px) {
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
        @media screen and (max-width: 1024px) {
    &{
        display: block;
 
    }
   
`;

const ComicImageStyled = styled('img')`
  width: 100%;
`;

const ComicInfo = ({ comic }) => {
  const urlImage =
    comic.images && comic.images.length
      ? `${comic.images[0].path}.${comic.images[0].extension}`
      : 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
  const title = comic.title ? comic.title : 'Not Available';

  const description = comic.description ? (
    <ReduceTextWithViewMoreLink
      amountWords={30}
      text={comic.description}
      link={`/comic/${comic.id}`}
      linkText={'View More...'}
    />
  ) : (
    'Not Available'
  );
  return (
    <>
      <ContainerComicStyled>
        <ContainerImageStyled>
          <ComicImageStyled src={urlImage} alt={title} />
        </ContainerImageStyled>
        <ContainerInfoStyled>
          <TitleStyled>{title}</TitleStyled>
          <DescriptionStyled>{description}</DescriptionStyled>
        </ContainerInfoStyled>
      </ContainerComicStyled>
    </>
  );
};

ComicInfo.propTypes = {
  comic: PropTypes.object.isRequired,
};

export { ComicInfo };
