import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import Spinner from "../layout/Spinner";
import classnames from "classnames";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

class EpisodeDetails extends Component {
  state = {
    editMode: false,
  };

  constructor(props) {
    super(props);

    // Refs for all controls
    this.NumberInput = React.createRef();
    this.TitleInput = React.createRef();
    this.SeriesInput = React.createRef();
    this.DoctorInput = React.createRef();
    this.FeaturingInput = React.createRef();
    this.ReleasedInput = React.createRef();
    this.ImageInput = React.createRef();
    this.bfUrlInput = React.createRef();
    this.SPathInput = React.createRef();
    this.FnameInput = React.createRef();
    //Chapters
  }

  // Delete episode
  onDeleteClick = () => {
    const { episode, firestore, history } = this.props;

    firestore
      .delete({ collection: "clients", doc: episode.id })
      .then(history.push("/"));
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { episode, firestore, history } = this.props;

    // Updated Episode
    const updEpisode = {
      Number: this.NumberInput.current.value,
      Title: this.TitleInput.current.value,
      Series: this.SeriesInput.current.value,
      Doctor: this.DoctorInput.current.value,
      Featuring: this.FeaturingInput.current.value,
      Released: this.ReleasedInput.current.value,
      Image: this.ImageInput.current.value,
      bfUrl: this.bfUrlInput.current.value,
      SPath: this.SPathInput.current.value,
      Fname: this.FnameInput.current.value,
    };
    // Update episode in firestore
    firestore
      .update({ collection: "bfEpisodes", doc: episode.id }, updEpisode)
      .then(history.push("/"));
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onEditModeChange = () => {
    const newMode = !this.state.editMode;
    this.setState({ editMode: newMode });
    console.log("Changed edit mode to " + this.state.editMode);
  };

  render() {
    const { editMode } = this.state;
    const { episode } = this.props;

    if (episode) {
      return (
        <div>
          <div>
            <label>
              <input type="checkbox" onClick={this.onEditModeChange} />
              Edit Mode
            </label>
          </div>

          <div>
            <form onSubmit={this.onSubmit}></form>
            <div>
              {editMode ? (
                <span>
                  Episode:{" "}
                  <input
                    type="text"
                    className="form-control"
                    name="Title"
                    minLength="2"
                    required
                    ref={this.TitleInput}
                    defaultValue={episode.Title}
                  />
                </span>
              ) : (
                <h2>{episode.Title}</h2>
              )}
            </div>
            <div>
              {editMode ? (
                <div>
                  <div className="form-group">
                    <label htmlFor="Image">Image URL</label>
                    <input
                      type="text"
                      className="form-control"
                      name="Image"
                      minLength="2"
                      ref={this.ImageInput}
                      defaultValue={episode.Image}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="bfUrl">Big Finish URL</label>
                    <input
                      type="text"
                      className="form-control"
                      name="bfUrl"
                      minLength="2"
                      ref={this.bfUrlInput}
                      defaultValue={episode.bfUrl}
                    />
                  </div>
                </div>
              ) : (
                <br />
              )}
              <a href={episode.bfUrl}>
                <img src={episode.Image} alt="episode" />
              </a>
            </div>
            <div>
              {editMode ? (
                <div>
                  <label htmlFor="sel1">Doctor:</label>

                  <select id="sel1">
                    <option value="1st">1st W. Hartnell</option>
                    <option value="2nd">2nd P. Troughton</option>
                    <option value="3rd">3rd J. Pertwee</option>
                    <option value="4th">4th T. Baker</option>
                    <option value="5th">5th P. Davisson</option>
                    <option value="6th">6th C. Baker</option>
                    <option value="7th">7th S. McCoy</option>
                    <option value="8th">8th P. McGann</option>
                    <option value="9th">9th C. Eccleston</option>
                    <option value="10th">10th D. Tennant</option>
                    <option value="11th">11th M. Smith</option>
                    <option value="12th">12th P. Capaldi</option>
                    <option value="War">War J. Hurt</option>
                    <option value="Other">Other</option>
                    <option value="None">None</option>
                  </select>
                </div>
              ) : (
                <h3>Doctor: {episode.Doctor}</h3>
              )}
            </div>
            <div>
              {editMode ? (
                <div>
                  <label htmlFor="inputdefault">
                    Featuring (companions and enemies):
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    defaultValue={episode.Featuring}
                  />
                </div>
              ) : (
                <p>Featuring: {episode.Featuring}</p>
              )}
            </div>
            <div>
              {editMode ? (
                <div className="form-group">
                  <label htmlFor="Series">Series</label>
                  <input
                    type="text"
                    className="form-control"
                    name="Series"
                    minLength="2"
                    ref={this.SeriesInput}
                    defaultValue={episode.Series}
                  />
                  <label htmlFor="Number">Number</label>
                  <input
                    type="text"
                    className="form-control"
                    name="Number"
                    minLength="2"
                    ref={this.NumberInput}
                    defaultValue={episode.Number}
                  />
                  <label htmlFor="Released">Release Date</label>
                  <input
                    type="text"
                    className="form-control"
                    name="Released"
                    minLength="2"
                    ref={this.ReleasedInput}
                    defaultValue={episode.Released}
                  />
                </div>
              ) : (
                <Container>
                  <Row>
                    <Col>Series: {episode.Series}</Col>
                    <Col> Number: {episode.Number}</Col>
                    <Col>
                      Released:{" "}
                      {new Date(episode.Released).toDateString().substr(4)}
                    </Col>
                  </Row>
                </Container>
              )}
            </div>
            <Container>
              {editMode ? (
                <Row>
                  <Col>
                    <label htmlFor="SPath">Server Path</label>
                    <input
                      type="text"
                      className="form-control"
                      name="SPath"
                      minLength="2"
                      ref={this.SPathInput}
                      defaultValue={episode.SPath}
                    />
                  </Col>
                  <Col>
                    <label htmlFor="Fname">File Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="Fname"
                      minLength="2"
                      ref={this.FnameInput}
                      defaultValue={episode.Fname}
                    />
                  </Col>
                </Row>
              ) : (
                <Row>
                  <Col>
                    {episode.Fname ? (
                      <a
                        href={`http://192.168.1.151/${episode.SPath}/${episode.Fname}`}
                      >
                        Audio File
                      </a>
                    ) : (
                      <h4>No Audio File</h4>
                    )}
                  </Col>
                </Row>
              )}
            </Container>
          </div>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

EpisodeDetails.propTypes = {
  firestore: PropTypes.object.isRequired,
};

export default compose(
  firestoreConnect((props) => [
    {
      collection: "bfEpisodes",
      storeAs: "episode",
      doc: props.match.params.id,
    },
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    episode: ordered.episode && ordered.episode[0],
  }))
)(EpisodeDetails);
