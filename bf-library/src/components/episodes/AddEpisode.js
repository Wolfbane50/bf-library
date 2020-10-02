import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

class AddEpisode extends Component {
  state = {
    Number: "",
    Title: "",
    Series: "",
    Doctor: "",
    Featuring: "",
    Released: new Date().toString(),
    Image: "",
    bfUrl: "",
    SPath: "",
    Fname: "", // ToDo: Add Chapters
  };

  onSubmit = (e) => {
    e.preventDefault();

    const newEpisode = this.state;

    const { firestore, history } = this.props;

    firestore
      .add({ collection: "bfEpisodes" }, newEpisode)
      .then(() => history.push("/"));
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <Link to="/" className="btn btn-link">
              <i className="fas fa-arrow-circle-left" /> Back To Dashboard
            </Link>
          </div>
        </div>

        <div className="card">
          <div className="card-header">Add Episode</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="Number">Number</label>
                <input
                  type="text"
                  className="form-control"
                  name="Number"
                  minLength="1"
                  required
                  onChange={this.onChange}
                  value={this.state.Number}
                />
              </div>

              <div className="form-group">
                <label htmlFor="Title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  name="Title"
                  minLength="2"
                  required
                  onChange={this.onChange}
                  value={this.state.Title}
                />
              </div>

              <div className="form-group">
                <label htmlFor="Series">Series</label>
                <input
                  type="text"
                  className="form-control"
                  name="Series"
                  onChange={this.onChange}
                  value={this.state.Series}
                />
              </div>

              <div className="form-group">
                <label htmlFor="Doctor">Doctor(s) or Lead</label>
                <input
                  type="text"
                  className="form-control"
                  name="Doctor"
                  minLength="3"
                  required
                  onChange={this.onChange}
                  value={this.state.Doctor}
                />
              </div>

              <div className="form-group">
                <label htmlFor="Featuring">
                  Companions and Enemies (comma delimited)
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="Featuring"
                  onChange={this.onChange}
                  value={this.state.Featuring}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Released">Release Date:</label>
                <input
                  type="text"
                  className="form-control"
                  name="Released"
                  onChange={this.onChange}
                  value={this.state.Released}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Image">Episode Image URL</label>
                <input
                  type="text"
                  className="form-control"
                  name="Image"
                  onChange={this.onChange}
                  value={this.state.Image}
                />
              </div>
              <span>Sample Image here !</span>
              <div className="form-group">
                <label htmlFor="bfUrl">Big Finish Link</label>
                <input
                  type="text"
                  className="form-control"
                  name="bfUrl"
                  onChange={this.onChange}
                  value={this.state.bfUrl}
                />
              </div>
              <div className="form-group">
                <label htmlFor="SPath">Path on Server</label>
                <input
                  type="text"
                  className="form-control"
                  name="SPath"
                  onChange={this.onChange}
                  value={this.state.SPath}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Fname">Audio File</label>
                <input
                  type="text"
                  className="form-control"
                  name="Fname"
                  onChange={this.onChange}
                  value={this.state.Fname}
                />
              </div>
              <input
                type="submit"
                value="Submit"
                className="btn btn-primary btn-block"
              />
            </form>
          </div>
        </div>
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
