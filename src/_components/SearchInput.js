import React from 'react';
import { PropTypes } from 'prop-types';
import styled from '@emotion/styled';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ContainerSearchInputStyled = styled('div')`
  display: flex;
  width: 100%;
`;

const InputSearchStyled = styled('input')`
  width: 80%;
  border: 1px solid #aaaaaa;
  padding-left: 10px;

  &:focus {
    outline: none;
  }
`;

const ButtonSearchStyled = styled('button')`
  width: 40px;
  height: 40px;
  margin-left: 15px;
  border: 1px solid #aaaaaa;
  background-color: white;
  cursor: pointer;
  color: #aaaaaa;
  font-size: 20px;
`;

const SearchInput = ({ onClick, value, onChange }) => {
  return (
    <ContainerSearchInputStyled>
      <InputSearchStyled
        type={'text'}
        value={value}
        onChange={onChange}
        name={'nameStartsWith'}
        placeholder={'Search'}
      />
      <ButtonSearchStyled onClick={onClick}>
        <FontAwesomeIcon icon={faSearch} />
      </ButtonSearchStyled>
    </ContainerSearchInputStyled>
  );
};

SearchInput.propTypes = {
  onClick: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export { SearchInput };
