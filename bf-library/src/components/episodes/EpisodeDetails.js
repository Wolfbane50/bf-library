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
import { Combobox, DateTimePicker } from "react-widgets";
import featureSpriteFile from "../sprites/featuring_2020xcf.png";

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

  offsetFromFeature = (feat) => {
    const featureOffsets = {
      Cybermen: "-0px -0px",
      Daleks: "-91px -0px",
      Sontarans: "-182px -0px",
      "Weeping Angels": "-273px -0px",
      "Ice Warriors": "-364px -0px",
      "6th Doctor": "-455px -0px",
      Rani: "-546px -0px",
      Autons: "-637px -0px",
      Davros: "-728px -0px",
      "10th Doctor": "-819px -0px",
      "11th Doctor": "-910px -0px",
      "Jago and Litefoot": "-1001px -0px",
      "12th Doctor": "-1092px -0px",
      Susan: "-0px -91px",
      Sally: "-91px -91px",
      UNIT: "-182px -91px",
      "Magnus Greel": "-273px -91px",
      "dupe Adric": "-364px -91px",
      Fenric: "-455px -91px",
      Mel: "-546px -91px",
      "Grace Holloway": "-637px -91px",
      Rose: "-728px -91px",
      "The Eminence": "-819px -91px",
      "Amy Pond": "-910px -91px",
      Kraals: "-1001px -91px",
      Ruth: "-1092px -91px",
      Barbara: "-0px -182px",
      Wirrn: "-91px -182px",
      "Liz Shaw": "-182px -182px",
      Haemovores: "-273px -182px",
      "dupe Nyssa": "-364px -182px",
      "Master I": "-455px -182px",
      Ace: "-546px -182px",
      Missy: "-637px -182px",
      "Counter-Measures": "-728px -182px",
      Mickey: "-819px -182px",
      "Dupe River": "-910px -182px",
      "The Valyard": "-1001px -182px",
      "8th Doctor": "-1092px -182px",
      Ian: "-0px -273px",
      Jamie: "-91px -273px",
      "Jo Grant": "-182px -273px",
      "Harry Sullivan": "-273px -273px",
      "dupe Teegan": "-364px -273px",
      "Master 6": "-455px -273px",
      "Master 3": "-546px -273px",
      "Master 5": "-637px -273px",
      "Captain Jack": "-728px -273px",
      dupeDonna: "-819px -273px",
      Rory: "-910px -273px",
      "Brigadier Bambera": "-1001px -273px",
      "War Doctor": "-1092px -273px",
      Vicki: "-0px -364px",
      Victoria: "-91px -364px",
      "Sarah Jane": "-182px -364px",
      Leela: "-273px -364px",
      Turlough: "-364px -364px",
      "Master 2": "-455px -364px",
      "Master 4": "-546px -364px",
      "Chang Lee": "-637px -364px",
      Unknown: "-728px -364px",
      "Martha Jones": "-819px -364px",
      "Craig Owens": "-910px -364px",
      Tractators: "-1001px -364px",
      "1st Doctor": "-1092px -364px",
      "Steven Taylor": "-0px -455px",
      Zoe: "-91px -455px",
      Omega: "-182px -455px",
      K9: "-273px -455px",
      Kamelion: "-364px -455px",
      Slitheen: "-455px -455px",
      "Rutans ": "-546px -455px",
      Astrid: "-637px -455px",
      "Celestial Toymaker": "-728px -455px",
      Eldrad: "-819px -455px",
      Canton: "-910px -455px",
      "The Monk": "-1001px -455px",
      "Blank 5-12": "-1092px -455px",
      "Katarina ": "-0px -546px",
      Will: "-91px -546px",
      "Iris Wildthyme": "-182px -546px",
      "Romana I": "-273px -546px",
      Peri: "-364px -546px",
      Yeti: "-455px -546px",
      Thals: "-546px -546px",
      Nimon: "-637px -546px",
      Fitz: "-728px -546px",
      Donna: "-819px -546px",
      Clara: "-910px -546px",
      "The Swarm": "-1001px -546px",
      "Blank 6-12": "-1092px -546px",
      Dodo: "-0px -637px",
      Evelyn: "-91px -637px",
      Mechonoids: "-182px -637px",
      "Romana II": "-273px -637px",
      Brigadier: "-364px -637px",
      Zygons: "-455px -637px",
      Rassilon: "-546px -637px",
      "Lucie Miller": "-637px -637px",
      Izzy: "-728px -637px",
      "River Song": "-819px -637px",
      Vyrans: "-910px -637px",
      "Sil ": "-1001px -637px",
      "Blank 7-12": "-1092px -637px",
      Polly: "-0px -728px",
      "Thomas Brewster": "-91px -728px",
      Osiran: "-182px -728px",
      Adric: "-273px -728px",
      Zara: "-364px -728px",
      "Black Guardian": "-455px -728px",
      Yates: "-546px -728px",
      "C'rizz": "-637px -728px",
      "Mary Shelly": "-728px -728px",
      "Wilfred Mott": "-819px -728px",
      Draconians: "-910px -728px",
      "The Headhunter": "-1001px -728px",
      "Blank 8-12": "-1092px -728px",
      Ben: "-0px -819px",
      Frobisher: "-91px -819px",
      "DI Menzies": "-182px -819px",
      Nyssa: "-273px -819px",
      Amy: "-364px -819px",
      "White Guardian": "-455px -819px",
      Benton: "-546px -819px",
      Hex: "-637px -819px",
      "Maxwell Edison": "-728px -819px",
      "Rachel Cooper": "-819px -819px",
      Mara: "-910px -819px",
      Morbius: "-1001px -819px",
      "Blank 9-12": "-1092px -819px",
      "Charlotte Pollard": "-0px -910px",
      Nimrod: "-91px -910px",
      Erimem: "-182px -910px",
      Tegan: "-273px -910px",
      "Elizabeth Klein": "-364px -910px",
      Flip: "-455px -910px",
      Constance: "-546px -910px",
      "Raine Creevy": "-637px -910px",
      Aristedes: "-728px -910px",
      Axos: "-819px -910px",
      "Voc Robots": "-910px -910px",
      Krynoid: "-1001px -910px",
      "Blank 10-12": "-1092px -910px",
      "The Eight Legs": "-0px -1001px",
      "Tamsin Drew": "-91px -1001px",
      "Alex Campbell": "-182px -1001px",
      "Molly O'Sullivan": "-273px -1001px",
      "Liv Chenka": "-364px -1001px",
      "King Peladon": "-455px -1001px",
      "Alph Centauri": "-546px -1001px",
      Garundel: "-637px -1001px",
      "Bernice Summerfield": "-728px -1001px",
      "Beep the Meep": "-819px -1001px",
      Shayde: "-910px -1001px",
      Krotons: "-1001px -1001px",
      "Blank 11-12": "-1092px -1001px",
      Menoptera: "-0px -1092px",
      Zarbi: "-91px -1092px",
      Kalendorf: "-182px -1092px",
      "Susan Mendes": "-273px -1092px",
      Ogrons: "-364px -1092px",
      "Quadrigger Stoyn": "-455px -1092px",
      "Raston Warrior": "-546px -1092px",
      Jason: "-637px -1092px",
      Crystal: "-728px -1092px",
      Vardans: "-819px -1092px",
      "Mavic Chen": "-910px -1092px",
      "Oliver Harper": "-1001px -1092px",
      "Blank 12-12": "-1092px -1092px",
      Silence: "-0px -1183px",
      Bill: "-91px -1183px",
      Nardole: "-182px -1183px",
      Churchill: "-273px -1183px",
      "Kate Stewart": "-364px -1183px",
      Osgood: "-455px -1183px",
      Ashildr: "-546px -1183px",
      "2nd Doctor": "-637px -1183px",
      "3rd Doctor": "-728px -1183px",
      "4th Doctor": "-819px -1183px",
      "5th Doctor": "-910px -1183px",
      "7th Doctor": "-1001px -1183px",
      "Blank 13-12": "-1092px -1183px",
      Silurians: "-0px -1274px",
      "The Inquisitor": "-91px -1274px",
      "The Eleven": "-182px -1274px",
      "Sylvia Noble": "-273px -1274px",
      "Sherlock Holmes": "-364px -1274px",
      "Sara Kingdom": "-455px -1274px",
      Ood: "-546px -1274px",
      "Mrs Wibbsey": "-637px -1274px",
      Mila: "-728px -1274px",
      "Matthew Sharpe": "-819px -1274px",
      "Kazran Sardick": "-910px -1274px",
      "Jackie Tyler": "-1001px -1274px",
      "Blank 14-12": "-1092px -1274px",
      "Helen Sinclair": "-0px -1365px",
      "Dorium Maldovar": "-91px -1365px",
      "Daniel Hopkins": "-182px -1365px",
      "Christina de Souza": "-273px -1365px",
      "Charlie Sato": "-364px -1365px",
      "Adam Mitchell": "-455px -1365px",
      Yasmin: "-546px -1365px",
      Graham: "-637px -1365px",
      Ryan: "-728px -1365px",
      "13th Doctor": "-819px -1365px",
      "9th Doctor": "-910px -1365px",
      "Master 8": "-1001px -1365px",
      "Blank 15-12": "-1092px -1365px",
    };
    const aliases = {
      Master: "Master I",
      "The Master": "Master I",
      "The Brigadier": "Brigadier",
      Sara: "Sara Kingdom",
      Matthew: "Matthew Sharpe",
      Martha: "Martha Jones",
      Raine: "Raine Creevy",
      Viyrans: "Vyrans",
      Benny: "Bernice Summerfield",
      Lucie: "Lucie Miller",
    };
    if (featureOffsets[feat]) {
      return featureOffsets[feat];
    }
    if (aliases[feat]) {
      return featureOffsets[aliases[feat]];
    }
    return featureOffsets["Unknown"];
  };

  render() {
    const { editMode } = this.state;
    const { episode } = this.props;

    const doctors = [
      {
        val: "1st",
        name: "1st W. Hartnell",
      },
      {
        val: "2nd",
        name: "2nd P. Troughton",
      },
      {
        val: "3rd",
        name: "3rd J. Pertwee",
      },
      {
        val: "4th",
        name: "4th T. Baker",
      },
      {
        val: "5th",
        name: "5th P. Davisson",
      },
      {
        val: "6th",
        name: "6th C. Baker",
      },
      {
        val: "7th",
        name: "7th S. McCoy",
      },
      {
        val: "8th",
        name: "",
      },
      {
        val: "9th",
        name: "",
      },
      {
        val: "10th",
        name: "",
      },
      {
        val: "11th",
        name: "",
      },
      {
        val: "12th",
        name: "12th P. Capaldi",
      },
      {
        val: "13th",
        name: "13th J. Whittaker",
      },
      {
        val: "War",
        name: "War J. Hurt",
      },
      {
        val: "Other",
        name: "Other",
      },
      {
        val: "None",
        name: "None",
      },
    ];

    if (episode) {
      const myDoctors = episode.Doctor.split(",");
      let featChars = ["Unknown"];
      if (episode.Featuring) {
        featChars = episode.Featuring.split(",");
      }

      const featSprites = featChars.map((feat) => {
        const featStyle = {
          backgroundImage: "url(" + featureSpriteFile + ")",
          backgroundPosition: this.offsetFromFeature(feat),
          width: "91px",
          height: "91px",
          float: "right",
        };
        return <span style={featStyle} />;
      });

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
                  <label htmlFor="Doctor">Doctor:</label>
                  <Combobox
                    data={doctors}
                    valueField="val"
                    textField="name"
                    ref={this.DoctorInput}
                    defaultValue={episode.Doctor}
                  />
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
                <div>
                  <p>Featuring: {episode.Featuring}</p>
                  {featSprites}
                </div>
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
                  <DateTimePicker
                    ref={this.ReleasedInput}
                    defaultValue={new Date(episode.Released)}
                    time={false}
                  />
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
