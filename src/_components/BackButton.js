import React from 'react';
import styled from '@emotion/styled';
import { PropTypes } from 'prop-types';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tooltip } from './Tooltip';

const ButtonBackStyled = styled('button')`
  width: 40px;
  height: 40px;
  margin-left: 15px;
  border: 1px solid #aaaaaa;
  background-color: white;
  color: #aaaaaa;
  font-size: 20px;
  border-radius: 4px;
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;

const ContainerButtonStyled = styled('div')`
  position: relative;
`;

class BackButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openTooltip: false,
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

  render() {
    const { openTooltip } = this.state;
    return (
      <>
        <ContainerButtonStyled>
          <ButtonBackStyled
            onClick={() => this.props.history.goBack()}
            onMouseEnter={this.onMouseEnterButton}
            onMouseLeave={this.onMouseLeaveButton}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </ButtonBackStyled>
          <Tooltip visibility={openTooltip} text={'Back'} />
        </ContainerButtonStyled>
      </>
    );
  }
}

BackButton.propTypes = {
  history: PropTypes.object.isRequired,
};

export { BackButton };
