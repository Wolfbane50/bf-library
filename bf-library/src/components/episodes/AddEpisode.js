import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { myEpisodes } from "../../bigFinish";

class AddEpisode extends Component {
  render() {
    //return <pre className="code">{JSON.stringify(myEpisodes, 3)}</pre>;
    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <h2>
              {" "}
              <i className="fas fa-users" /> Episodes{" "}
            </h2>
          </div>
          <div className="col-md-3">
            <button data-toggle="collapse" data-target="#demo">
              Collapsible
            </button>
            <div id="demo" className="collapse">
              Lorem ipsum dolor text....
            </div>
          </div>
        </div>

        <table className="table table-striped">
          <thead className="thead-inverse">
            <tr>
              <th>Episode</th>
              <th>Series</th>
              <th>Doctor</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {myEpisodes.map((episode) => (
              <tr key={episode.id}>
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
  }
}

AddEpisode.propTypes = {
  firestore: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
};

export default compose(
  firestoreConnect(),
  connect((state, props) => ({
    settings: state.settings,
  }))
)(AddEpisode);
