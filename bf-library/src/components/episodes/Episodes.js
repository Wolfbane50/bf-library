import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import Spinner from "../layout/Spinner";

class Episodes extends Component {
  render() {
    // return <div>Episodes go here!</div>;
    const { episodes } = this.props;

    if (episodes) {
      let sortedEps = episodes
        .slice()
        .sort((a, b) => a.Title.localeCompare(b.Title));
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
              <h5 className="text-right text-secondary">Total Owed</h5>
            </div>
          </div>

          <table className="table table-striped">
            <thead className="thead-inverse">
              <tr>
                <th>#</th>
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
