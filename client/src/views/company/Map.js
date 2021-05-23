import React, { Component } from "react";
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  Marker,
} from "react-google-maps";
import Autocomplete from "react-google-autocomplete";

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map_lat: 31.963158,
      map_lng: 35.930359,
      marker_lat: 31.963158,
      marker_lng: 35.930359,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.map_lat !== nextProps.map_lat) {
      this.setState({
        map_lat: nextProps.map_lat ? parseFloat(nextProps.map_lat) : 31.963158,
        map_lng: nextProps.map_lng ? parseFloat(nextProps.map_lng) : 35.930359,
        marker_lat: nextProps.marker_lat
          ? parseFloat(nextProps.marker_lat)
          : 31.963158,
        marker_lng: nextProps.marker_lng
          ? parseFloat(nextProps.marker_lng)
          : 35.930359,
      });
      return true;
    }
    return false;
  }
  render() {
    const AsyncMap = withScriptjs(
      withGoogleMap((props) => (
        <GoogleMap
          google={this.props.google}
          defaultZoom={15}
          defaultCenter={{
            lat: this.state.map_lat ? this.state.map_lat : 31.963158,
            lng: this.state.map_lng ? this.state.map_lng : 35.930359,
          }}
        >
          {/* For Auto complete Search Box */}
          <Autocomplete
            style={{
              width: "100%",
              height: "40px",
              paddingLeft: "16px",
              marginTop: "2px",
              marginBottom: "100px",
            }}
            onPlaceSelected={this.props.onPlaceSelected}
            types={[]}
          />
          {/*Marker*/}
          <Marker
            google={this.props.google}
            name={"Dolores park"}
            draggable={true}
            onDragEnd={this.props.onMarkerDragEnd}
            position={{
              lat: this.state.marker_lat ? this.state.marker_lat : 31.963158,
              lng: this.state.marker_lng ? this.state.marker_lng : 35.930359,
            }}
          />
          <Marker />
        </GoogleMap>
      ))
    );

    return (
      <div>
        <AsyncMap
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBF03sTiafhKlqgZLQq0_YIP5bgOcdxTW4&libraries=places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: "300px" }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
}
