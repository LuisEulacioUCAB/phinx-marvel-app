import React from 'react';
import { PropTypes } from 'prop-types';
import styled from '@emotion/styled';

const TooltipStyled = styled('span')`
  width: 120px;
  background-color: rgba(50, 50, 50, 0.7);
  color: white;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1500000;
  bottom: 25px;
  font-weight: bold;
  margin-left: -165px;
  transition: opacity 0.3s;
  visibility: ${(props) => props.visibility};
`;

const Tooltip = ({ text, visibility }) => {
  const visibilityValue = visibility ? 'visible' : 'hidden';
  return <TooltipStyled visibility={visibilityValue}>{text}</TooltipStyled>;
};

Tooltip.propTypes = {
  text: PropTypes.string.isRequired,
  visibility: PropTypes.bool.isRequired,
};

export { Tooltip };
