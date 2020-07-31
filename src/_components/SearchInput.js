import React from 'react';
import {  PropTypes } from 'prop-types';
import styled from '@emotion/styled';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Select} from './Select';

const ContainerSearchInputStyled = styled('div')`
  display: flex;
  width: 100%;
`;

const InputSearchStyled = styled('input')`
  width: 75%;
  border: 1px solid #aaaaaa;
  padding-left: 10px;
  cursor: ${(props) => (props.disabled ? 'no-drop' : 'text')};
  &:focus {
    outline: none;
  }
`;

const ButtonSearchStyled = styled('button')`
  width: 50px;
  height: 40px;
  border: 1px solid #aaaaaa;
  background-color: white;
  cursor: ${(props) => (props.disabled ? 'no-drop' : 'pointer')};
  color: #aaaaaa;
  font-size: 20px;
  &:focus {
    outline: none;
  }
  
  &:hover{
    background-color:#aaaaaa;
    color:white;
  }

  @media (min-width: 481px) and (max-width: 768px) {
    & {
    }
  }
`;

const SearchInput = ({ onClick, value, onChange, disabled , options, selectValue , onChangeSelect}) => {
  return (
    <ContainerSearchInputStyled>
      <InputSearchStyled
        type={'text'}
        value={value}
        onChange={onChange}
        name={'searchFilter'}
        placeholder={'Search'}
        disabled={disabled}
      />
      <Select options={options} onChange={onChangeSelect} name={'searchType'} value={selectValue} disabled={disabled}/>
      <ButtonSearchStyled onClick={onClick} disabled={disabled}>
        <FontAwesomeIcon icon={faSearch} />
      </ButtonSearchStyled>
    </ContainerSearchInputStyled>
  );
};

SearchInput.defaultProps = {
  disabled: false,
};

SearchInput.propTypes = {
  onClick: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onChangeSelect: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  selectValue: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
};

export { SearchInput };
