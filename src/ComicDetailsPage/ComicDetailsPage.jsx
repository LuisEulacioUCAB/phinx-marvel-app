import React from 'react';
import { marvelActions } from '../_actions/marvel.actions';
import { connect } from 'react-redux';
import { Loader } from '../_components/Loader';
import { Header } from '../_components/Header';
import { ComicDetailsView } from './components/ComicDetailsView';
import { ContainerPrincipal } from '../_components/ContainerPrincipal';
import { PropTypes } from 'prop-types';

class ComicDetailsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comic: null,
      loading: false,
    };
  }

  componentDidMount() {
    const { match } = this.props;
    this.props.dispatch(marvelActions.getComicDetails(match.params.id));
  }

  UNSAFE_componentWillReceiveProps = (nextProps) => {
    if (nextProps.getcomicdetails) {
      const { comic, loading } = nextProps.getcomicdetails;

      const comicDetails = comic.length ? comic[comic.length - 1] : null;
      setTimeout(() => this.setState({ comic: comicDetails, loading }), 3000);
    }
  };

  render() {
    const { loading, comic } = this.state;

    let content = <Loader />;

    if (!loading && comic) {
      content = <ComicDetailsView data={comic} />;
    }

    return (
      <>
        <Header />
        <ContainerPrincipal>{content}</ContainerPrincipal>
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
  const { getcomicdetails } = state;
  return {
    getcomicdetails,
  };
}

const connectedApp = connect(mapStateToProps)(ComicDetailsPage);

ComicDetailsPage.propTypes = {
  match: PropTypes.object.isRequired,
  getcomicdetails: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export { connectedApp as ComicDetailsPage };
