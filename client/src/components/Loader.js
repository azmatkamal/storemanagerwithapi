import React from "react";

const LoadingGIF = require("../assets/img/loadingGif.gif");

export default function Loader({ size }) {
  return (
    <div
      style={{
        textAlign: "center",
      }}
    >
      <img
        src={LoadingGIF}
        style={{
          maxWidth: size && size > 0 ? `${size}px` : "20px",
          margin: "0 auto",
        }}
        alt="Loading..."
      />
    </div>
  );
}
