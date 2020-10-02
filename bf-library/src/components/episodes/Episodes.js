import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import Spinner from "../layout/Spinner";

class Episodes extends Component {
  onDeleteClick = (id) => {
    const { firestore, history } = this.props;
    if (window.confirm("Are you sure you want to delete this episode?")) {
      console.log("Deleting " + id);
      firestore
        .delete({ collection: "bfEpisodes", doc: id })
        .then(history.push("/"));
    }
  };

  render() {
    // return <div>Episodes go here!</div>;
    const { episodes } = this.props;

    if (episodes) {
      //        .sort((a, b) => a.Title.localeCompare(b.Title));
      // let sortedEps = episodes.slice().sort((a, b) => a.Number - b.

      let sortedEps = episodes
        .slice()
        .sort((a, b) => new Date(a.Released) - new Date(b.Released));

      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <h2>
                {" "}
                <i className="fas fa-file-audio" /> Episodes{" "}
              </h2>
            </div>
            <div className="col-md-6">
              <h5 className="text-right text-secondary">
                Total Episodes: {sortedEps.length}{" "}
              </h5>
            </div>
          </div>

          <table className="table table-striped">
            <thead className="thead-inverse">
              <tr>
                <th>#</th>
                <th>Released</th>
                <th>Episode</th>
                <th>Series</th>
                <th>Doctor</th>
                <th />
                <th />
              </tr>
            </thead>
            <tbody>
              {sortedEps.map((episode) => (
                <tr key={episode.id}>
                  <td>{episode.Number}</td>
                  <td>{new Date(episode.Released).toDateString().substr(4)}</td>
                  <td>{episode.Title}</td>
                  <td>{episode.Series}</td>
                  <td>{episode.Doctor}</td>
                  <td>
                    <Link
                      to={`/episode/${episode.id}`}
                      className="btn btn-secondary btn-sm"
                    >
                      <i className="fas fa-arrow-circle-right" /> Details
                    </Link>
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => {
                        this.onDeleteClick(episode.id);
                      }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

Episodes.propTypes = {
  firestore: PropTypes.object.isRequired,
  episodes: PropTypes.array,
};

export default compose(
  firestoreConnect([{ collection: "bfEpisodes" }]),
  connect((state, props) => ({
    episodes: state.firestore.ordered.bfEpisodes,
  }))
)(Episodes);
