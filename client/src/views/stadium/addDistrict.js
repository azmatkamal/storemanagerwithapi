import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import LoadingOverlay from "react-loading-overlay";
import {
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  Marker,
} from "react-google-maps";
import Autocomplete from "react-google-autocomplete";
import Geocode from "react-geocode";

import { getStadiums, addorUpdateStadium } from "../../redux/stadium/action";

Geocode.setApiKey("AIzaSyBF03sTiafhKlqgZLQq0_YIP5bgOcdxTW4");
Geocode.enableDebug();

class AddDistrict extends Component {
  constructor(props) {
    super(props);

    this.state = {
      en_name: "",
      ar_name: "",
      country: "",
      city: "",
      district: "",
      icon: null,
      id: null,
      is_modal_loading: false,
      show_modal: false,
      countries: [],
      cities: [],
      districts: [],
      errors: {},

      // MAP
      map_lat: 31.963158,
      map_lng: 35.930359,
      marker_lat: 31.963158,
      marker_lng: 35.930359,
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onChangeLatMap = (e) => {
    this.setState({
      map_lat: e.target.value ? parseFloat(e.target.value) : "",
      marker_lat: e.target.value ? parseFloat(e.target.value) : "",
    });
  };

  onChangeLngMap = (e) => {
    this.setState({
      map_lng: e.target.value ? parseFloat(e.target.value) : "",
      marker_lng: e.target.value ? parseFloat(e.target.value) : "",
    });
  };

  componentDidMount() {
    this.setState({
      en_name: "",
      ar_name: "",
      country: "",
      map_lat: 31.963158,
      map_lng: 35.930359,
      marker_lat: 31.963158,
      marker_lng: 35.930359,
      city: "",
      district: "",
      icon: null,
      id: null,
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ show_modal: nextProps.show_modal });
    this.setState({ is_modal_loading: nextProps.is_modal_loading });

    if (nextProps && nextProps.show_modal !== this.state.show_modal) {
      this.setState({
        en_name: "",
        ar_name: "",
        lat: "",
        lng: "",
        country: "",
        city: "",
        district: "",
        icon: null,
        id: null,
      });
    }
    if (nextProps && nextProps.stadium && nextProps.stadium.en_name) {
      this.setState({
        en_name: nextProps.stadium.en_name,
        ar_name: nextProps.stadium.ar_name,
        map_lat: nextProps.stadium.lat ? parseFloat(nextProps.stadium.lat) : 0,
        map_lng: nextProps.stadium.lng ? parseFloat(nextProps.stadium.lng) : 0,
        marker_lat: nextProps.stadium.lat
          ? parseFloat(nextProps.stadium.lat)
          : 0,
        marker_lng: nextProps.stadium.lng
          ? parseFloat(nextProps.stadium.lng)
          : 0,
        country: nextProps.stadium.country._id,
        city: nextProps.stadium.city._id,
        district: nextProps.stadium.district._id,
        id: nextProps.stadium._id,
      });
    }
    if (nextProps && nextProps.districts) {
      this.setState({
        districts: nextProps.districts.filter((c) => c.is_active === true),
      });
    }
    if (nextProps && nextProps.cities) {
      this.setState({
        cities: nextProps.cities.filter((c) => c.is_active === true),
      });
    }
    if (nextProps && nextProps.countries) {
      this.setState({
        countries: nextProps.countries.filter((c) => c.is_active === true),
      });
    }
    if (nextProps && nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  onFileSelect = (e) => {
    this.setState({ icon: e.target.files[0] });
  };

  onSubmit = () => {
    const formData = new FormData();
    formData.append("id", this.state.id);
    formData.append("ar_name", this.state.ar_name);
    formData.append("en_name", this.state.en_name);
    formData.append("country", this.state.country);
    formData.append("city", this.state.city);
    formData.append("district", this.state.district);
    formData.append("lat", this.state.marker_lat);
    formData.append("lng", this.state.marker_lng);
    formData.append("icon", this.state.icon);

    this.props.addorUpdateStadium(
      formData,
      this.state.id ? false : true,
      this.props.toggleModalLoading,
      this.props.toggleModal,
      this.props.toggleTableLoading
    );
  };

  onPlaceSelected = (place) => {
    try {
      const latValue = place.geometry.location.lat(),
        lngValue = place.geometry.location.lng();
      this.setState({
        map_lat: latValue,
        map_lng: lngValue,
        marker_lat: latValue,
        marker_lng: lngValue,
      });
    } catch (e) {
      return false;
    }
  };
  onMarkerDragEnd = (event) => {
    let latValue = event.latLng.lat(),
      lngValue = event.latLng.lng();
    this.setState({
      map_lat: latValue,
      map_lng: lngValue,
      marker_lat: latValue,
      marker_lng: lngValue,
    });
  };

  render() {
    const {
      ar_name,
      en_name,
      id,
      is_modal_loading,
      errors,
      show_modal,
      countries,
      cities,
      districts,
      country,
      city,
      district,
      map_lat,
      map_lng,
      marker_lat,
      marker_lng,
    } = this.state;

    console.log(map_lat, map_lng, marker_lat, marker_lng);

    const AsyncMap = withScriptjs(
      withGoogleMap((props) => (
        <GoogleMap
          google={this.props.google}
          defaultZoom={15}
          defaultCenter={{
            lat: map_lat ? map_lat : 31.963158,
            lng: map_lng ? map_lng : 35.930359,
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
            onPlaceSelected={this.onPlaceSelected}
            types={[]}
          />
          {/*Marker*/}
          <Marker
            google={this.props.google}
            name={"Dolores park"}
            draggable={true}
            onDragEnd={this.onMarkerDragEnd}
            position={{
              lat: marker_lat ? marker_lat : 31.963158,
              lng: marker_lng ? marker_lng : 35.930359,
            }}
          />
          <Marker />
        </GoogleMap>
      ))
    );

    return (
      <div>
        <LoadingOverlay active={is_modal_loading} spinner text="Please Wait...">
          <Modal isOpen={show_modal} toggle={this.props.toggleModal}>
            <ModalHeader toggle={this.props.toggleModal}>
              {id ? "Update" : "Create"} Stadium
            </ModalHeader>
            <ModalBody>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="ar_name">Arabic Name</Label>
                    <Input
                      type="text"
                      name="ar_name"
                      onChange={this.onChange}
                      id="ar_name"
                      value={ar_name}
                      placeholder="Arabic Name"
                    />
                    <p className="error">{errors && errors.ar_name}</p>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="en_name">English Name</Label>
                    <Input
                      type="text"
                      name="en_name"
                      onChange={this.onChange}
                      id="en_name"
                      value={en_name}
                      placeholder="English Name"
                    />
                    <p className="error">{errors && errors.en_name}</p>
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={4}>
                  <FormGroup>
                    <Label for="country">Country</Label>
                    <Input
                      type="select"
                      name="country"
                      onChange={this.onChange}
                      id="country"
                      value={country}
                      placeholder="Country"
                    >
                      <option value="">Select Country</option>
                      {countries &&
                        countries.map((item, idx) => {
                          return (
                            <option value={item._id}>
                              {item.en_name} - {item.ar_name}
                            </option>
                          );
                        })}
                    </Input>
                    <p className="error">{errors && errors.country}</p>
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label for="city">City</Label>
                    <Input
                      type="select"
                      name="city"
                      onChange={this.onChange}
                      id="city"
                      value={city}
                      placeholder="city"
                    >
                      <option value="">Select City</option>
                      {country &&
                        cities &&
                        cities
                          .filter((i) => i.country._id === country)
                          .map((item, idx) => {
                            return (
                              <option value={item._id}>
                                {item.en_name} - {item.ar_name}
                              </option>
                            );
                          })}
                    </Input>
                    <p className="error">{errors && errors.city}</p>
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label for="district">District</Label>
                    <Input
                      type="select"
                      name="district"
                      onChange={this.onChange}
                      id="district"
                      value={district}
                      placeholder="district"
                    >
                      <option value="">Select District</option>
                      {country &&
                        city &&
                        districts &&
                        districts
                          .filter((i) => i.city._id === city)
                          .map((item, idx) => {
                            return (
                              <option value={item._id}>
                                {item.en_name} - {item.ar_name}
                              </option>
                            );
                          })}
                    </Input>
                    <p className="error">{errors && errors.city}</p>
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                <Label for="icon">Icon</Label>
                <Input
                  type="file"
                  name="icon"
                  onChange={this.onFileSelect}
                  id="icon"
                  placeholder="Icon"
                  required
                />
                <p className="error">{errors && errors.icon}</p>
              </FormGroup>
              <Row>
                <Col md="12">
                  <AsyncMap
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBF03sTiafhKlqgZLQq0_YIP5bgOcdxTW4&libraries=places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: "300px" }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                  />
                </Col>
              </Row>
              <Row form style={{ marginTop: "30px" }}>
                <Col md={6}>
                  <FormGroup>
                    <Label for="marker_lat">Latitude</Label>
                    <Input
                      type="text"
                      name="marker_lat"
                      onChange={this.onChangeLatMap}
                      id="marker_lat"
                      value={marker_lat}
                      placeholder="Latitude"
                    />
                    <p className="error">{errors && errors.lat}</p>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="marker_lng">Longitude</Label>
                    <Input
                      type="text"
                      name="marker_lng"
                      onChange={this.onChangeLngMap}
                      id="marker_lng"
                      value={marker_lng}
                      placeholder="Longitude"
                    />
                    <p className="error">{errors && errors.lng}</p>
                  </FormGroup>
                </Col>
              </Row>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.onSubmit}>
                {id ? "Update" : "Create"}
              </Button>{" "}
              <Button color="secondary" onClick={this.props.toggleModal}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </LoadingOverlay>
      </div>
    );
  }
}

const mapDispatchToProps = (state) => {
  return {
    stadium: state.stadium.stadium,
    errors: state.errors.errors,
    countries: state.country.countries,
    cities: state.city.cities,
    districts: state.district.districts,
  };
};

export default withRouter(
  connect(mapDispatchToProps, { getStadiums, addorUpdateStadium })(AddDistrict)
);
