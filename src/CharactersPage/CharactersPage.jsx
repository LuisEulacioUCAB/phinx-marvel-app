import React from "react";
import {marvelActions} from "../_actions/marvel.actions";
import {connect} from "react-redux";
import {CharacterContainer} from "./components/CharacterContainer";
import "./CharactersPage.css";
import {Loader} from "../_components/Loader";
import {CharacterInfoDialog} from "./components/dialog/CharacterInfoDialog";
import * as R from 'ramda';
import {SearchInput} from "../_components/SearchInput";
import {Header} from "../_components/Header";

class CharactersPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            charactersList: [],
            loading: true,
            isOpenCharacterInfoDialog: false,
            filter: {
                nameStartsWith:'',
            },
            offset: 0,
            limit: 20,
            characterData: {
                name:'',
                comicsList : []
            },
        };

        this.onChangeSearchInput = this.onChangeSearchInput.bind(this);


    }

    componentDidMount = () => {
        const { filter , offset, limit} = this.state;
        this.props.dispatch(marvelActions.getAllCharacters(filter, offset, limit));
    };
    componentWillReceiveProps = (nextProps) =>{
        if(nextProps.getallcharacters){
            const {charactersList, loading} = nextProps.getallcharacters;
            setTimeout( () =>this.setState({charactersList, loading}), 3000)
        }

        if(nextProps.getcomics){
            const characterData = R.clone(this.state.characterData);
            const {comicsList} = nextProps.getcomics;
            characterData.comicsList = comicsList;
            setTimeout( () => this.setState({characterData}), 3000);

        }
    };

    onOpenCharacterInfoDialog = (character) => {
        const isOpenCharacterInfoDialog = true;
        const {id} = character;
        const {characterData} = this.state;
        characterData.name = character ? character.name : '';
        this.props.dispatch(marvelActions.getComics(id));
        this.setState({isOpenCharacterInfoDialog, characterData})

    };

    onCloseCharacterInfoDialog = (event) => {
        const id = event.target.id;
        if( id === 'close-modal'|| id === 'modal-container'){
            const isOpenCharacterInfoDialog = false;
            const characterData = R.clone(this.state.characterData);
            characterData.name = '';
            characterData.comicsList = [];
            this.setState({isOpenCharacterInfoDialog, characterData})
        }

    };

    onChangeSearchInput = (event) => {
        const {filter} = this.state;
        filter[event.target.name] = event.target.value;
        this.setState({filter})
    };

    onClickSearchInput = () => {
        const {offset, limit,filter} =this.state;
        const loading = true;
        this.setState({loading});
        this.props.dispatch(marvelActions.getAllCharacters(filter, offset, limit));

    };

    render() {

        const {
            loading,
            charactersList,
            isOpenCharacterInfoDialog,
            characterData,
            filter
        } = this.state;
        let content = <Loader/>;

       if(!loading && charactersList.length){
            content = (
                <>
                    <Header
                        children={
                            <SearchInput onClick={this.onClickSearchInput} onChange={this.onChangeSearchInput} value={filter.nameStartsWith}/>
                        }
                    />
                    <div style={{paddingTop:"110px"}}>
                        {
                            charactersList.map((character,key) => {
                                return <CharacterContainer key={key} character={character} onClick={this.onOpenCharacterInfoDialog}/>})
                        }
                    </div>

                    <CharacterInfoDialog
                        onClose={this.onCloseCharacterInfoDialog}
                        isOpen={isOpenCharacterInfoDialog}
                        character={characterData}
                    />
                </>)
        }
        return(
            <>
            <div className={'ch-container-list'}>
                {content}
            </div>
            </>
        )
    }
}

function mapStateToProps(state) {
    const { getallcharacters, getcomics } = state;
    return {
        getallcharacters,
        getcomics
    };
}
const connectedApp = connect(mapStateToProps)(CharactersPage);
export { connectedApp as CharactersPage };