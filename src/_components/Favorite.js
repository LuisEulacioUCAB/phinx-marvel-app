import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faStar} from '@fortawesome/free-solid-svg-icons';
import {Tooltip} from './Tooltip';
import {marvelConstants} from '../shared/marvel.constants';

const ContainerFavorite = styled('div')`
  position:absolute;
  right: 0;
  bottom: 0;
  margin-bottom: 5%;
  margin-right: 5%;
  
`;

const FontAwesomeIconStyled = styled(FontAwesomeIcon)`
  font-size: 22px;
  color:${props => props.color};
  cursor:pointer;
`;



class Favorite extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      openTooltip: false
    };
  }

  onMouseEnterButton = () => {
    const openTooltip = true;
    this.setState({ openTooltip });
  };

  onMouseLeaveButton = () => {
    const openTooltip = false;
    this.setState({ openTooltip });
  };


  render(){
    const { openTooltip  } = this.state;
    const {onFavoriteClick , data , type , favorite} = this.props;

    const isFavorite = favorite[type].find((fav) => fav.id === data.id);
    const color = isFavorite ?  marvelConstants.ADD_FAVORITE_COLOR: marvelConstants.REMOVE_FAVORITE_COLOR;
    const text = isFavorite ? `Remove ${type} to Favorite` : `Add ${type} to Favorite`;

    return(
      <ContainerFavorite >
        <FontAwesomeIconStyled
          icon={faStar}
          color={color}
          onMouseEnter={this.onMouseEnterButton}
          onMouseLeave={this.onMouseLeaveButton}
          onClick={()=>onFavoriteClick(data,type)}
        />
        <Tooltip
          visibility={openTooltip}
          text={text}
          style={{fontSize:'14px',marginLeft:'-135px'}}/>
      </ContainerFavorite>
    );
  }
}




Favorite.propTypes = {
  onFavoriteClick:PropTypes.func.isRequired,
  data:PropTypes.object.isRequired,
  favorite:PropTypes.object.isRequired,
  type:PropTypes.string.isRequired,
};

export {Favorite}