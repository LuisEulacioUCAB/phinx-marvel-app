import React from 'react';
import styled from '@emotion/styled';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import { reduceText } from '../shared/utils';
import parse from 'html-react-parser';

const LinkStyled = styled(Link)`
  color: #3eb7f9 !important;
  text-decoration: none;

  &:hover {
    color: #3eb7f9 !important;
  }
`;

const PStyled = styled('p')`
  margin: 10px 0;
`;

const ReduceTextWithViewMoreLink = ({ text, link, amountWords, linkText }) => {
  const newText = parse(reduceText(text, amountWords));

  return (
    <PStyled>
      {newText}

      {text.split(' ').length > amountWords ? <LinkStyled to={link}> {linkText}</LinkStyled> : null}
    </PStyled>
  );
};

ReduceTextWithViewMoreLink.propTypes = {
  text: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired,
  amountWords: PropTypes.number.isRequired,
};

export { ReduceTextWithViewMoreLink };
