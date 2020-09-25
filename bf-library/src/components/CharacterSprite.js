import React, { Component } from "react";

export default class CharacterSprite extends Component {
  render() {
    return (
      // Could add name
      <div
        style={{
          "background-image": props.urlStr,
          "background-position": props.peep.position,
          width: props.width,
          height: props.height,
          float: props.float,
        }}
      ></div>
    );
  }
}
