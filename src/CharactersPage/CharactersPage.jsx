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
import {searchOptions} from '../shared/marvel.constants';
import queryString from 'query-string';
import {ComicListView} from './components/comics/ComicListView';
import {getObjectFromLocalStorage , setObjectToLocalStorage} from '../shared/utils';
import {DialogFavorite} from '../_components/dialog-favorite/DialogFavorite';
import { errors, success } from '../_components/toast';

class CharactersPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      characterList: [],
      loading: true,
      disabledSearch: true,
      isOpenCharacterInfoDialog: false,
      isOpenFavoriteDialog: false,
      searchFilter: '',
      offset: 0,
      limit: 20,
      characterData: {
        name: '',
        comicsList: [],
      },

      comicsList: [],

      searchType:marvelConstants.CHARACTER_TYPE,
      currentPageCharacters : 1,
      currentPageComics : 1,
      total:0,
      favorite :{
        comic: [],
        character: [],
        search: []
      }
    };

    this.onChangeSearchInput = this.onChangeSearchInput.bind(this);
  }

  componentDidMount = () => {

    const searchParams = queryString.parse(this.props.location.search);
    const { limit } = this.state;
    const currentPageCharacters = !searchParams.currentPageCharacters ?
      getObjectFromLocalStorage('currentPageCharacters', R.clone(this.state.currentPageCharacters)) :
      parseInt(searchParams.currentPageCharacters);
    const currentPageComics = !searchParams.currentPageComics ?
      getObjectFromLocalStorage('currentPageComics', R.clone(this.state.currentPageComics)) :
      parseInt(searchParams.currentPageComics);
    const favorite = getObjectFromLocalStorage('favorite', R.clone(this.state.favorite));
    const searchType = !searchParams.searchType ? getObjectFromLocalStorage('searchType', R.clone(this.state.searchType)) :searchParams.searchType;
    const searchFilter = !searchParams.searchFilter ? getObjectFromLocalStorage('searchFilter', R.clone(this.state.searchFilter)) : searchParams.searchFilter;
    const currentPage = searchType === marvelConstants.CHARACTER_TYPE ? currentPageCharacters : currentPageComics;
    const offset = currentPage ? ( currentPage - 1) * limit : R.clone(this.state.offset);

    this.setState({currentPageCharacters, favorite, currentPageComics, searchType, searchFilter },()=>{
      if(searchType === marvelConstants.CHARACTER_TYPE){
        const nameStartsWith = R.clone(searchFilter);
        this.props.dispatch(marvelActions.getAllCharacters({nameStartsWith}, offset, limit));
      }

      if(searchType === marvelConstants.COMIC_TYPE){
        const titleStartsWith = R.clone(searchFilter);
        this.props.dispatch(marvelActions.getAllComics({titleStartsWith}, offset, limit));
      }
    });


  };

  UNSAFE_componentWillReceiveProps = (nextProps) => {

    const { searchType } = this.state;

    if (nextProps.getAllCharacters && searchType === marvelConstants.CHARACTER_TYPE) {
      const { data, loading ,disabledSearch} = nextProps.getAllCharacters;
      const {characterList, total} = data;
      setTimeout(() => this.setState({ characterList, loading ,total ,disabledSearch}), 3000);
    }

    if (nextProps.getComics) {
      const characterData = R.clone(this.state.characterData);
      const { comicsList} = nextProps.getComics;
      characterData.comicsList = comicsList;
      setTimeout(() => this.setState({ characterData }), 3000);
    }

    if(nextProps.getAllComics && searchType === marvelConstants.COMIC_TYPE){
      const { data, loading , disabledSearch} = nextProps.getAllComics;
      const {comicsList, total} = data;
      setTimeout(() => this.setState({ comicsList, loading ,total , disabledSearch}), 3000);
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
    const searchFilter = event.target.value;
    this.setState({ searchFilter });
    setObjectToLocalStorage('searchFilter', JSON.stringify(searchFilter));
  };

  onChangeSearchSelect = (event) =>{
    const searchType = event.target.value;
    this.setState({ searchType });
    setObjectToLocalStorage('searchType', JSON.stringify(searchType));
  };

  onClickSearchInput = () => {
    const { offset, limit , searchType , searchFilter} = this.state;
    const loading = true;
    const characterList = []; // Prevent resend search
    const comicsList = []; // Prevent resend search

    if (searchType === marvelConstants.CHARACTER_TYPE) {

      const _searchFilter = getObjectFromLocalStorage('searchType', R.clone(searchType)) === searchFilter;
      const currentPageCharacters = _searchFilter ? this.state.currentPageCharacters : 1; // Reset currect page by new search
      const nameStartsWith = R.clone(searchFilter);
      this.setState({ loading, characterList , comicsList , currentPageCharacters});
      this.props.dispatch(marvelActions.getAllCharacters({nameStartsWith}, offset, limit));
    }


    if (searchType === marvelConstants.COMIC_TYPE) {
      const _searchFilter = getObjectFromLocalStorage('searchType', R.clone(searchType)) === searchFilter;
      const currentPageComics = _searchFilter ? this.state.currentPageComics : 1; // Reset currect page by new search
      const titleStartsWith = R.clone(searchFilter);
      this.setState({ loading, characterList ,comicsList , currentPageComics});
      this.props.dispatch(marvelActions.getAllComics({titleStartsWith}, offset, limit));
    }
  };

  onPageChange = (currentPage)=>{

    const {searchFilter, limit , searchType} = this.state;

    const offset = (currentPage - 1) * limit;
    const loading = true;

    if(searchType === marvelConstants.CHARACTER_TYPE){
      const nameStartsWith = R.clone(searchFilter);
      const currentPageCharacters = currentPage;
      this.setState({currentPageCharacters, loading}, ()=>this.props.dispatch(marvelActions.getAllCharacters({nameStartsWith}, offset, limit)));
      setObjectToLocalStorage('currentPageCharacters', currentPageCharacters);
    }

    if(searchType === marvelConstants.COMIC_TYPE){
      const titleStartsWith = R.clone(searchFilter);
      const currentPageComics = currentPage;
      this.setState({currentPageComics, loading}, ()=>this.props.dispatch(marvelActions.getAllComics({titleStartsWith}, offset, limit)));
      setObjectToLocalStorage('currentPageComics', currentPageComics);
    }
  };


  onFavoriteClick = (data, type) => {
    const favorite = getObjectFromLocalStorage('favorite', R.clone(this.state.favorite));
    const {searchType} = this.state;
    const findObj = favorite[type].find((fav) => fav.id === data.id);// For dont repeat favorite

    if(!findObj){
      favorite[type].push(data);

      const toastSuccessText = searchType === marvelConstants.COMIC_TYPE ? `
        The Comic: ${data.title} is added to favorites
      `: `The ${data.name ? 'Character: ': 'Comic: '}${data.name ? data.name : data.title} is added to favorites`;
      success(toastSuccessText);
    }else{
      const pos = favorite[type].findIndex((fav) => fav.id === data.id);
      favorite[type] = favorite[type].slice(0,pos);
      const toastErrorText = searchType === marvelConstants.COMIC_TYPE ? `
        The Comic: ${data.title} is removed to favorites
      `: `The ${data.name ? 'Character: ': 'Comic: '}${data.name ? data.name : data.title} is removed to favorites`;
      errors(toastErrorText);
    }

    setObjectToLocalStorage('favorite', JSON.stringify(favorite));
    this.setState({favorite});
  };

  onClickFavoriteDialog = () =>{
    const {isOpenFavoriteDialog} = this.state;
    this.setState({isOpenFavoriteDialog:!isOpenFavoriteDialog});
  };

  onClickAddFavoriteSearch = () =>{
    const {searchFilter, searchType , isOpenFavoriteDialog} = this.state;
    const favorite = getObjectFromLocalStorage('favorite', R.clone(this.state.favorite));

    const findObject = favorite['search'].find((search) => search.searchFilter === searchFilter && search.searchType);
    if(!findObject){

      if(searchType === marvelConstants.COMIC_TYPE){
        const {currentPageComics } = this.state;
        favorite['search'].push({searchFilter, searchType, currentPageComics});
      }else{
        const {currentPageCharacters } = this.state;
        favorite['search'].push({searchFilter, searchType, currentPageCharacters});
      }

      success(`Add filter search to favorites`);
    }else{
      errors('This search its already in favorites');
    }
    setObjectToLocalStorage('favorite', JSON.stringify(favorite));
    this.setState({favorite, isOpenFavoriteDialog:!isOpenFavoriteDialog});
  };


  render() {
    const {
      loading,
      characterList,
      isOpenCharacterInfoDialog,
      characterData,
      searchFilter,
      total,
      limit,
      favorite,
      searchType,
      comicsList,
      currentPageCharacters,
      currentPageComics,
      disabledSearch,
      isOpenFavoriteDialog
    } = this.state;
    const currentPage = searchType === marvelConstants.CHARACTER_TYPE ? currentPageCharacters : currentPageComics;

    let content = <Loader/>;

    if (!loading && characterList.length) {
      content = (
        <>
          <div style={{paddingTop: '150px'}}>
            <CharacterListView
              onClick={this.onOpenCharacterInfoDialog}
              characterList={characterList}
              onFavoriteClick={this.onFavoriteClick}
              favorite={favorite}
            />
          </div>
        </>
      );
    }

    if(!loading && comicsList.length){
      content = (
        <>
          <ComicListView comicsList={comicsList} onFavoriteClick={this.onFavoriteClick} favorite={favorite} />
        </>
      );
    }

    if(!loading && !characterList.length && !comicsList.length){
      content = (
        <>
          <div>Tes</div>
        </>
      );
    }


    return (
      <>
        <Header
          childrenRight={
            <DialogFavorite
              fontIcon={faStar}
              isOpen={isOpenFavoriteDialog}
              onClick={this.onClickFavoriteDialog}
              onClickAddFavoriteSearch={this.onClickAddFavoriteSearch}
            />
          }
        >
          <SearchInput
            options={searchOptions}
            onClick={this.onClickSearchInput}
            onChange={this.onChangeSearchInput}
            value={searchFilter}
            disabled={disabledSearch}
            selectValue={searchType}
            onChangeSelect={this.onChangeSearchSelect}
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
  const { getAllCharacters, getComics , getAllComics} = state;
  return {
    getAllCharacters,
    getComics,
    getAllComics
  };
}

CharactersPage.propTypes = {
  getComics: PropTypes.object.isRequired,
  getAllCharacters: PropTypes.object.isRequired,
  getAllComics: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired
};

const connectedApp = connect(mapStateToProps)(CharactersPage);
export { connectedApp as CharactersPage };
