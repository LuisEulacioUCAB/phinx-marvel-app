import React from 'react';
import { marvelActions } from '../_actions/marvel.actions';
import { connect } from 'react-redux';
import { Loader } from '../_components/Loader';
import { CharacterInfoDialog } from './components/dialog/CharacterInfoDialog';
import * as R from 'ramda';
import { SearchInput } from '../_components/SearchInput';
import { Header } from '../_components/Header';
import { CharacterListView } from './components/characters/CharacterListView';
import { ContainerPrincipal } from '../_components/ContainerPrincipal';
import { PropTypes } from 'prop-types';
class CharactersPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      characterList: [],
      loading: true,
      isOpenCharacterInfoDialog: false,
      filter: {
        nameStartsWith: '',
      },
      offset: 0,
      limit: 20,
      characterData: {
        name: '',
        comicsList: [],
      },
    };

    this.onChangeSearchInput = this.onChangeSearchInput.bind(this);
  }

  componentDidMount = () => {
    const { filter, offset, limit } = this.state;
    this.props.dispatch(marvelActions.getAllCharacters(filter, offset, limit));
  };

  UNSAFE_componentWillReceiveProps = (nextProps) => {
    if (nextProps.getallcharacters) {
      const { characterList, loading } = nextProps.getallcharacters;
      setTimeout(() => this.setState({ characterList, loading }), 3000);
    }

    if (nextProps.getcomics) {
      const characterData = R.clone(this.state.characterData);
      const { comicsList } = nextProps.getcomics;
      characterData.comicsList = comicsList;
      setTimeout(() => this.setState({ characterData }), 3000);
    }
  };

  onOpenCharacterInfoDialog = (character) => {
    const isOpenCharacterInfoDialog = true;
    const { id } = character;
    const { characterData } = this.state;
    characterData.name = character ? character.name : '';
    this.props.dispatch(marvelActions.getComics(id));
    this.setState({ isOpenCharacterInfoDialog, characterData });
  };

  onCloseCharacterInfoDialog = (event) => {
    const id = event.target.id;
    if (id === 'close-modal' || id === 'modal-container') {
      const isOpenCharacterInfoDialog = false;
      const characterData = R.clone(this.state.characterData);
      characterData.name = '';
      characterData.comicsList = [];
      this.setState({ isOpenCharacterInfoDialog, characterData });
    }
  };

  onChangeSearchInput = (event) => {
    const { filter } = this.state;
    filter[event.target.name] = event.target.value;
    this.setState({ filter });
  };

  onClickSearchInput = () => {
    const { offset, limit, filter } = this.state;
    const loading = true;
    const characterList = []; // Prevent resend search

    if (filter.nameStartsWith && filter.nameStartsWith.length) {
      this.setState({ loading, characterList });
      this.props.dispatch(marvelActions.getAllCharacters(filter, offset, limit));
    }
  };

  render() {
    const { loading, characterList, isOpenCharacterInfoDialog, characterData, filter } = this.state;
    let content = <Loader />;
    const disabledSearch = !characterList.length;
    if (!loading && characterList.length) {
      content = (
        <CharacterListView onClick={this.onOpenCharacterInfoDialog} characterList={characterList} />
      );
    }

    return (
      <>
        <Header>
          <SearchInput
            onClick={this.onClickSearchInput}
            onChange={this.onChangeSearchInput}
            value={filter.nameStartsWith}
            disabled={disabledSearch}
          />
        </Header>
        <ContainerPrincipal>{content}</ContainerPrincipal>
        <CharacterInfoDialog
          onClose={this.onCloseCharacterInfoDialog}
          isOpen={isOpenCharacterInfoDialog}
          character={characterData}
        />
      </>
    );
  }
}

/**
 * Map state To Props.
 *
 * @param {object}state - State.
 * @returns {{getallcharacters: *, getcomics: *}} Reducers Object.
 */
function mapStateToProps(state) {
  const { getallcharacters, getcomics } = state;
  return {
    getallcharacters,
    getcomics,
  };
}

CharactersPage.propTypes = {
  getcomics: PropTypes.object.isRequired,
  getallcharacters: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const connectedApp = connect(mapStateToProps)(CharactersPage);
export { connectedApp as CharactersPage };
