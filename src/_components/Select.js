import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';


const SelectStyled = styled('select')`
  border: 1px solid #aaaaaa;
  color: #aaaaaa;
  padding-left: 10px;
  text-transform: uppercase;
  cursor: ${(props) => (props.disabled ? 'no-drop' : 'text')};
  &:focus {
    outline: none;
  }
  
  &:hover{
    border: 1px solid #aaaaaa;
  }
`;


const Select = ({onChange,name, value, options , disabled})=>{

  const selectedValue = options.find( (option) => { return option.value === value;} );
  return (
    <SelectStyled name={name} onChange={onChange} value={selectedValue.value} disabled={disabled}>
      {
        options.map((option, key) =>{
          return <option key={key} value={option.value}>{option.label}</option>;
        })
      }
    </SelectStyled>
  );
};

Select.defaultProps = {
  disabled:false,
};

Select.propTypes ={
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  value: PropTypes.string.isRequired,
  disabled: PropTypes.bool
};

export {Select}