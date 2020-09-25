import React, { Component } from "react";
import PropTypes from "prop-types";

class Episode extends Component {
  state = {
    editMode: false,
  };

  onEditModeChange = () => {
    const newMode = !this.state.editMode;
    this.setState({ editMode: newMode });
    console.log("Changed edit mode to " + this.state.editMode);
  };

  render() {
    const { editMode } = this.state;
    return (
      <div>
        <div>
          <label>
            <input type="checkbox" onClick={this.onEditModeChange} />
            Edit Mode
          </label>
        </div>

        <div>
          <div>
            {editMode ? (
              <span>
                Episode: <input type="text" placeholder="Title" />
              </span>
            ) : (
              <h2>{this.props.ep.Title}</h2>
            )}
          </div>
          <div>
            <a href={this.props.ep.bfUrl} target="_blank">
              <img src={this.props.ep.Image} alt="episode" />
            </a>
          </div>
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
          {editMode ? (
            <div>
              <label htmlFor="inputdefault">
                Featuring (companions and enemies):
              </label>
              <input className="form-control" id="inputdefault" type="text" />
            </div>
          ) : (
            <p>Featuring: {this.props.ep.Featuring}</p>
          )}
        </div>
      </div>
    );
  }
}

Episode.propTypes = {
  ep: PropTypes.object.isRequired,
};

export default Episode;
