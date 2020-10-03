import React, { Component } from "react";
import PropTypes from "prop-types";

class Sprites extends Component {
  offsetFromSpriteName = (feat) => {
    const { offsets, aliases } = this.props;
    if (offsets[feat]) {
      return offsets[feat];
    }
    if (aliases[feat]) {
      return offsets[aliases[feat]];
    }
    return offsets["Unknown"];
  };

  render() {
    const { spriteNames, spriteFile, width, height, spriteFloat } = this.props;

    let featChars = ["Unknown"];
    if (spriteNames) {
      featChars = spriteNames.split(",");
    }

    const featSprites = featChars.map((feat, index) => {
      const featStyle = {
        backgroundImage: "url(" + spriteFile + ")",
        backgroundPosition: this.offsetFromSpriteName(feat),
        width: width,
        height: height,
        float: spriteFloat ? spriteFloat : "right",
      };
      return <span style={featStyle} key={index} />;
    });

    return <React.Fragment>{featSprites}</React.Fragment>;
  }
}

Sprites.propTypes = {
  spriteNames: PropTypes.string.isRequired,
  spriteFile: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  offsets: PropTypes.object.isRequired,
  aliases: PropTypes.object,
  spriteFloat: PropTypes.string,
};

export default Sprites;
