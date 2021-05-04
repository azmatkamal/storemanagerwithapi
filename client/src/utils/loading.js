import LoadingGIF from "../assets/loading.gif";
import React, { Component } from "react";

export default class Loading extends Component {
  render() {
    return (
      <div className="row" style={{ width: "100%" }}>
        <img
          src={LoadingGIF}
          style={{ width: "200px", margin: "auto", display: "block" }}
          alt="Loading..."
        />
      </div>
    );
  }
}
