import React, { Component } from "react";
import { Link } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { myEpisodes } from "../../bigFinish";

class AddEpisode extends Component {
  gotIt = (episode) => {
    return episode.Fname || episode.Chapters;
  };

  onSubmit = async function () {
    //e.preventDefault();

    const { firestore, history } = this.props;
    const newEpisodes = myEpisodes.slice(0, 10);
    const batch = firestore.batch();

    // await newEpisodes.map(async (item) => {
    //   const collectionRef = await firestore.collection("bfEpisodes").doc();
    //   batch.create(collectionRef, item);
    // });

    // batch
    //   .commit()
    //   .then(() => history.push("/"))
    //   .catch((error) => console.error("Error writing document: ", error));
    newEpisodes.forEach((ep) => {
      if (ep.id) {
        delete ep.id;
      }
      firestore
        .add({ collection: "bfEpisodes" }, ep)
        .then(() => history.push("/"))
        .catch((error) => console.error("Error writing document: ", error));
    });
  };

  render() {
    const allSeries = Object.keys(
      myEpisodes.reduce(
        (series, ep) => {
          const { Series } = ep;
          series[Series] = 1;
          return series;
        },
        { blah: 1 }
      )
    );

    const seriesSets = allSeries.map((name) => {
      //console.log("Filtering " + name);
      return myEpisodes.filter((ep) => ep.Series === name);
    });

    //const monthlies = myEpisodes.filter((ep) => ep.Series === "DWMonthly");
    //const shortTrips = myEpisodes.filter((ep) => ep.Series === "ShortTrips");
    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <h2>
              {" "}
              <i className="fas fa-file-audio" /> Episodes{" "}
            </h2>
          </div>
          <div className="col-md-3">
            <Button variant="danger" onClick={this.onSubmit}>
              Add All to Database
            </Button>
          </div>
        </div>
        <hr />
        <Accordion>
          {seriesSets.map((mySet, index) => (
            <Card key={index}>
              <Accordion.Toggle
                as={Card.Header}
                variant="link"
                eventKey={index}
                style={{ cursor: "pointer" }}
              >
                {allSeries[index]}
              </Accordion.Toggle>
              <Accordion.Collapse eventKey={index}>
                <Card.Body>
                  <table className="table table-striped">
                    <thead className="thead-inverse">
                      <tr>
                        <th>#</th>
                        <th>Episode</th>
                        <th>Doctor</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {mySet.map((episode, innerIndex) => (
                        <tr key={(index + 1) * (innerIndex + 1)}>
                          <td>{episode.Number}</td>
                          <td>{episode.Title}</td>
                          <td>{episode.Doctor}</td>
                          <td>
                            {this.gotIt(episode) ? (
                              <i className="fas fa-check-circle" />
                            ) : (
                              <i className="fab fa-circle" />
                            )}
                          </td>
                          <td>
                            <Link
                              to={`/episode/${episode.id}`}
                              className="btn btn-secondary btn-sm"
                            >
                              <i className="fas fa-arrow-circle-right" />{" "}
                              Details
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          ))}
        </Accordion>{" "}
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
