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
import PropTypes  from 'prop-types';
import {PaginationComponent} from '../_components/PaginationComponent';
import {marvelConstants} from '../shared/marvel.constants';
import {faStar} from '@fortawesome/free-solid-svg-icons';
import {ActionButton} from '../_components/ActionButton';


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
      currentPage : 1,
      total:0,
      favorite :{
        comic: [],
        character: []
      }
    };

    this.onChangeSearchInput = this.onChangeSearchInput.bind(this);
  }

  componentDidMount = () => {
    const { filter, limit } = this.state;
    const currentPage = localStorage.getItem('currentPage') ?
      JSON.parse(localStorage.getItem('currentPage')) :
      R.clone(this.state.currentPage);

    const favorite = localStorage.getItem('favorite') ?
      JSON.parse(localStorage.getItem('favorite')) :
      R.clone(this.state.favorite);

    const offset = currentPage ? ( currentPage - 1) * limit : R.clone(this.state.offset);

    this.setState({currentPage, favorite});

    this.props.dispatch(marvelActions.getAllCharacters(filter, offset, limit));
  };

  UNSAFE_componentWillReceiveProps = (nextProps) => {
    if (nextProps.getallcharacters) {
      const { data, loading } = nextProps.getallcharacters;
      const {characterList, total} = data;
      setTimeout(() => this.setState({ characterList, loading ,total }), 3000);
    }

    if (nextProps.getcomics) {
      const characterData = R.clone(this.state.characterData);
      const { comicsList } = nextProps.getcomics;
      characterData.comicsList = comicsList;
      setTimeout(() => this.setState({ characterData }), 3000);
    }
  };

  onOpenCharacterInfoDialog = (event,character) => {

    if(event.target.id === marvelConstants.CONTAINER_CHARACTER_ID){
      const isOpenCharacterInfoDialog = true;
      const { id } = character;
      const { characterData } = this.state;
      characterData.name = character ? character.name : '';
      this.props.dispatch(marvelActions.getComics(id));
      this.setState({ isOpenCharacterInfoDialog, characterData });
    }
  };

  onCloseCharacterInfoDialog = (event) => {
    const id = event.target.id;
    if (id === marvelConstants.CLOSE_MODAL_ID || id === marvelConstants.CONTAINER_MODAL_ID) {
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

  onPageChange = (currentPage)=>{

    const {filter, limit} = this.state;
    const offset = (currentPage - 1) * limit;
    const loading = true;
    this.setState({currentPage, loading}, ()=>this.props.dispatch(marvelActions.getAllCharacters(filter, offset, limit)));

    // Save current page
    localStorage.setItem('currentPage', currentPage);
  };


  onFavoriteClick = (data, type) => {
    const favorite = localStorage.getItem('favorite') ?
      JSON.parse(localStorage.getItem('favorite')) :
      R.clone(this.state.favorite);

    const findObj = favorite[type].find((fav) => fav.id === data.id);// For dont repeat favorite

    if(!findObj){
      favorite[type].push(data);

    }else{
      const pos = favorite[type].findIndex((fav) => fav.id === data.id);
      favorite[type] = favorite[type].slice(0,pos);

    }

    localStorage.setItem('favorite', JSON.stringify(favorite));
    this.setState({favorite});
  };

  render() {
    const {
      loading,
      characterList,
      isOpenCharacterInfoDialog,
      characterData,
      filter,
      total,
      currentPage,
      limit,
      favorite
    } = this.state;
    let content = <Loader/>;
    const disabledSearch = !characterList.length;
    if (!loading && characterList.length) {
      content = (
        <>
          <CharacterListView
            onClick={this.onOpenCharacterInfoDialog}
            characterList={characterList}
            onFavoriteClick={this.onFavoriteClick}
            favorite={favorite}
          />

        </>
      );
    }

    return (
      <>
        <Header
          childrenRight={<ActionButton text={'Favorite'} link={'/favorite'} fontIcon={faStar}/>}
        >
          <SearchInput
            onClick={this.onClickSearchInput}
            onChange={this.onChangeSearchInput}
            value={filter.nameStartsWith}
            disabled={disabledSearch}
          />
        </Header>
        <ContainerPrincipal>
          {content}
          <PaginationComponent
            onChange={this.onPageChange}
            currentPage	={currentPage}
            total={total}
            pageSize={limit}
          />
        </ContainerPrincipal>
        <CharacterInfoDialog
          onClose={this.onCloseCharacterInfoDialog}
          isOpen={isOpenCharacterInfoDialog}
          character={characterData}
          onFavoriteClick={this.onFavoriteClick}
          favorite={favorite}
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
