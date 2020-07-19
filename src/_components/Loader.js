import React from 'react';
import styled from '@emotion/styled';

const ContainerLoaderStyled = styled('div')`
  width: 100%;
  height: 100%;
  display: flex;
`;

const ImageLoaderStyled = styled('img')`
  width: 100px;
  height: 95px;
  border-radius: 50%;
  margin: auto;
`;

const Loader = () => {
  return (
    <ContainerLoaderStyled>
      <ImageLoaderStyled
        src={
          'https://raw.githubusercontent.com/smasoumi/FAB-Loading/master/images/marvel_loader.gif'
        }
        alt=""
      />
    </ContainerLoaderStyled>
  );
};

export { Loader };
