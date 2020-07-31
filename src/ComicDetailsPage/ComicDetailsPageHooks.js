import React,{useEffect, useState } from 'react';
import { marvelActions } from '../_actions/marvel.actions';
import { useDispatch , useSelector} from 'react-redux';
import { Loader } from '../_components/Loader';
import { Header } from '../_components/Header';
import { ComicDetailsView } from './components/ComicDetailsView';
import { ContainerPrincipal } from '../_components/ContainerPrincipal';
import  PropTypes  from 'prop-types';
import { BackButton } from '../_components/BackButton'
import { withRouter } from 'react-router-dom';

const _ComicDetailsPageHooks = (props)=>{
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(marvelActions.getComicDetails(props.match.params.id));
    setTimeout(()=>{setLoading(false);},3000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const comic = useSelector((store) =>store.getComicDetails.comic);
  let content = <Loader />;
  if(!loading && comic.length){
    const comicDetails = comic.length ? comic[comic.length - 1] : null;
    content = <ComicDetailsView data={comicDetails} />;
  }

  return (
    <>
      <Header childrenRight={<BackButton history={props.history} />} />
      <ContainerPrincipal>{content}</ContainerPrincipal>
    </>
  );
};


_ComicDetailsPageHooks.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

const ComicDetailsPageHooks = withRouter(_ComicDetailsPageHooks);

export {ComicDetailsPageHooks};


