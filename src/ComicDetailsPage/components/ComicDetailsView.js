import React from 'react';
import { PropTypes } from 'prop-types';
import styled from '@emotion/styled';
import { creatorRoles } from '../../shared/role.constants';
import { getCreatorRole, getDate, formatDate } from '../../shared/utils';
import { marvelConstants } from '../../shared/marvel.constants';

const ContainerComicDetailsStyled = styled('div')`
  display: flex;
  width: 100%;
  height: 100vh;
  padding-top: 150px;
  
    @media screen and (max-width: 480px) {
    & {
        display: block;
        
    }
  }
  
    @media (min-width: 481px) and (max-width: 768px) {
    & {
         display: block;

    }
`;

const ContainerImageStyled = styled('div')`
  width: 45%;
  padding-left: 5%;
  
  @media screen and (max-width: 480px) {
    & {
        width: 90%;
        padding: 0 5%;
    }
  }
  
    @media (min-width: 481px) and (max-width: 768px) {
    & {
      width: 90%;
        padding:5%;
    }
`;

const ContainerDetailsStyled = styled('div')`
  width: 45%;
  padding-right: 5%;
  padding-left: 30px;
    @media screen and (max-width: 480px) {
    & {
        width: 90%;
        padding:5%;
    }
  }

  @media (min-width: 481px) and (max-width: 768px) {
    & {
      width: 90%;
        padding:5%;
    }

`;

const ImageStyled = styled('img')`
  width: 100%;
  
  @media screen and (max-width: 480px) {
    & {
        width: 100%;
    }
  }
  
  @media (min-width: 481px) and (max-width: 768px) {
    & {
      width: 100%;
    }
`;

const TextStyled = styled('div')`
  font-size: ${(props) => (props.fontSize ? props.fontSize : '18px')};
  font-weight: ${(props) => props.fontWeight};
  margin-top: ${(props) => props.marginTop};
  margin-left: ${(props) => props.marginLeft};
  margin-right: ${(props) => props.marginRight};
  margin-bottom: ${(props) => props.marginBottom};
  color: #3e3e3e;
`;
const ComicDetailsView = ({ data }) => {
  const ImageUrl = data.thumbnail
    ? `${data.thumbnail.path}.${data.thumbnail.extension}`
    : marvelConstants.IMAGE_NOT_FOUND;

  const writter = data.creators ? getCreatorRole(data.creators.items, creatorRoles.WRITER) : null;
  const penciler = data.creators
    ? getCreatorRole(data.creators.items, creatorRoles.PENCILER_COVER)
    : null;
  const coverArtist = data.creators
    ? getCreatorRole(data.creators.items, creatorRoles.PENCILER_COVER)
    : null;
  const description = data.description ? data.description : marvelConstants.NOT_AVAILABLE;
  const title = data.title ? data.title : marvelConstants.NOT_AVAILABLE;
  const published = data.dates ? getDate(data.dates, marvelConstants.COMIC_PUBLISHED) : null;

  return data ? (
    <>
      <ContainerComicDetailsStyled>
        <ContainerImageStyled>
          <ImageStyled src={ImageUrl} />
        </ContainerImageStyled>
        <ContainerDetailsStyled>
          <TextStyled fontWeight={'bold'} fontSize={'25px'} marginBottom={'1.5em'}>
            {title}
          </TextStyled>

          <TextStyled fontWeight={'bold'} fontSize={'18px'}>
            {`Published: ${
              published ? formatDate(published.date, 'll') : marvelConstants.NOT_AVAILABLE
            }`}
          </TextStyled>

          <TextStyled fontWeight={'bold'} fontSize={'18px'}>
            {`Writter: ${writter ? writter.name : marvelConstants.NOT_AVAILABLE}`}
          </TextStyled>
          <TextStyled fontWeight={'bold'} fontSize={'18px'}>
            {`Penciler: ${penciler ? penciler.name : marvelConstants.NOT_AVAILABLE}`}
          </TextStyled>
          <TextStyled fontWeight={'bold'} fontSize={'18px'}>
            {`Cover Artist: ${coverArtist ? coverArtist.name : marvelConstants.NOT_AVAILABLE}`}
          </TextStyled>
          <TextStyled fontSize={'18px'} marginTop={'2.5em'}>
            {description}
          </TextStyled>
        </ContainerDetailsStyled>
      </ContainerComicDetailsStyled>
    </>
  ) : null;
};

ComicDetailsView.propTypes = {
  data: PropTypes.object.isRequired,
};

export { ComicDetailsView };
