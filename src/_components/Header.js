import React from 'react';
import { PropTypes } from 'prop-types';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const ContainerLeftStyled = styled('div')`
  width: 25%;
  margin: auto;
  text-align: center;

  @media screen and (max-width: 480px) {
    & {
      width: 25% !important;
    }
  }

  @media (min-width: 481px) and (max-width: 768px) {
    & {
      width: 25%;
    }
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    & {
      width: 25%;
    }
  }
  @media (min-width: 1025px) and (max-width: 1200px) {
    & {
      width: 25%;
    }
  }
`;

const HeaderStyled = styled('div')`
    display:flex;
    height 90px;
    border-bottom: 1px solid #aaaaaa;
    position:fixed;
    width: 100%;
    z-index: 10;
    background-color: white;
`;

const ContainerCenterStyled = styled('div')`
  width: 55%;
  margin: auto;
  text-align: center;

  @media screen and (max-width: 480px) {
    & {
      width: 55% !important;
    }
  }

  @media (min-width: 481px) and (max-width: 768px) {
    & {
      width: 55%;
    }
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    & {
      width: 55%;
    }
  }
  @media (min-width: 1025px) and (max-width: 1200px) {
    & {
      width: 55%;
    }
  }
`;

const ContainerRightStyled = styled('div')`
  width: 20%;
  margin: auto;
  text-align: center;
`;

const BrandStyled = styled('img')`
  width: 165px;
  height: 40px;
  position: relative;
  top: 2px;

  @media screen and (max-width: 480px) {
    & {
      width: 55px;
    }
  }

  @media (min-width: 481px) and (max-width: 768px) {
    & {
      width: 90px;
    }
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    & {
      width: 125px;
    }
  }
  @media (min-width: 1025px) and (max-width: 1200px) {
    & {
      width: 130px;
    }
  }
`;

const Header = ({ children, childrenRight }) => {
  return (
    <HeaderStyled>
      <ContainerLeftStyled>
        <Link to={'/'}>
          <BrandStyled
            src="data:image/png;base64,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"
            alt=""
          />
        </Link>
      </ContainerLeftStyled>
      <ContainerCenterStyled>{children}</ContainerCenterStyled>
      <ContainerRightStyled>{childrenRight}</ContainerRightStyled>
    </HeaderStyled>
  );
};

Header.defaultProps = {
  children: <div></div>,
  childrenRight: <div></div>,
};

Header.propTypes = {
  children: PropTypes.element,
  childrenRight: PropTypes.element,
};

export { Header };
