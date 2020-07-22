import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as R from 'ramda';
import {Loader} from '../_components/Loader';
import { Header } from '../_components/Header';
import { ContainerPrincipal } from '../_components/ContainerPrincipal';
import { CharacterInfoDialog } from '../CharactersPage/components/dialog/CharacterInfoDialog';
import { BackButton } from '../_components/BackButton';
import { CharacterListView } from '../CharactersPage/components/characters/CharacterListView';
import { ComicListView} from '../CharactersPage/components/comics/ComicListView';
import { marvelActions } from '../_actions/marvel.actions';
import { marvelConstants } from '../shared/marvel.constants';

class MarvelFavoritePage extends React.Component{
  constructor(props) {
    super(props);
    this.state ={
      characterList: [],
      loading: false,
      isOpenCharacterInfoDialog: false,
      favorite :{
        comic: [],
        character: []
      },
      characterData: {
        name: '',
        comicsList: [],
      },
    };
  }

  componentDidMount = () =>{
    const favorite = localStorage.getItem('favorite') ?
      JSON.parse(localStorage.getItem('favorite')) :
      R.clone(this.state.favorite);
    this.setState({favorite});
  };

  onOpenCharacterInfoDialog = (event,character) => {
    const isOpenCharacterInfoDialog = true;
    const { id } = character;
    const { characterData } = this.state;
    characterData.name = character ? character.name : '';
    this.props.dispatch(marvelActions.getComics(id));
    this.setState({ isOpenCharacterInfoDialog, characterData });

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


  UNSAFE_componentWillReceiveProps = (nextProps) => {

    if (nextProps.getcomics) {
      const characterData = R.clone(this.state.characterData);
      const { comicsList } = nextProps.getcomics;
      characterData.comicsList = comicsList;
      setTimeout(() => this.setState({ characterData }), 3000);
    }
  };
  render(){

    const {favorite, loading , isOpenCharacterInfoDialog, characterData} = this.state;
    const {character:characterList, comic:comicList} = favorite;
    let content = <Loader/>;

    if (!loading && characterList.length) {
      content = (
        <>
          <CharacterListView
            onClick={this.onOpenCharacterInfoDialog}
            characterList={characterList}
            isShowFavorite={false}
          />
          <ComicListView
            comicList={comicList}
            isShowFavorite={false}
          />
        </>
      );
    }

    return (
      <>
        <Header childrenRight={<BackButton history={this.props.history} />} />

        <ContainerPrincipal>
          {content}
        </ContainerPrincipal>
        <CharacterInfoDialog
          onClose={this.onCloseCharacterInfoDialog}
          isOpen={isOpenCharacterInfoDialog}
          character={characterData}
          favorite={favorite}
          onFavoriteClick={this.onFavoriteClick}
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
  const { getcomics } = state;
  return {
    getcomics,
  };
}

MarvelFavoritePage.propTypes = {
  getcomics: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  history:PropTypes.object.isRequired
};

const connectedApp = connect(mapStateToProps)(MarvelFavoritePage);
export { connectedApp as MarvelFavoritePage };