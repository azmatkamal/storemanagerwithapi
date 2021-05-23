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
import Geocode from "react-geocode";
import Map from "./Map";

import { getCompanys, addorUpdateCompany } from "../../redux/company/action";

Geocode.setApiKey("AIzaSyBF03sTiafhKlqgZLQq0_YIP5bgOcdxTW4");
Geocode.enableDebug();

class AddCompany extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      en_name: "",
      ar_name: "",
      ar_desc: "",
      en_desc: "",
      address: "",
      location: "",
      tel: "",
      mobile1: "",
      mobile2: "",
      facebook: "",
      twitter: "",
      instagram: "",
      snapchat: "",
      youtube: "",
      icon: null,
      is_modal_loading: false,
      show_modal: false,
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
      ar_name: "",
      en_name: "",
      ar_desc: "",
      en_desc: "",
      address: "",
      location: "",
      map_lat: 31.963158,
      map_lng: 35.930359,
      marker_lat: 31.963158,
      marker_lng: 35.930359,
      tel: "",
      mobile1: "",
      mobile2: "",
      facebook: "",
      twitter: "",
      instagram: "",
      snapchat: "",
      youtube: "",
    });
  }

  resetState = () => {
    this.setState({
      en_name: "",
      ar_name: "",
      ar_desc: "",
      en_desc: "",
      address: "",
      location: "",
      tel: "",
      mobile1: "",
      mobile2: "",
      facebook: "",
      twitter: "",
      instagram: "",
      snapchat: "",
      youtube: "",
      icon: null,
      id: null,
    });
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ show_modal: nextProps.show_modal });
    this.setState({ is_modal_loading: nextProps.is_modal_loading });

    if (nextProps && nextProps.show_modal !== this.state.show_modal) {
      this.resetState();
    }

    if (nextProps && nextProps.company && nextProps.company.en_name) {
      this.setState({
        en_name: nextProps.company.en_name,
        ar_name: nextProps.company.ar_name,
        ar_desc: nextProps.company.ar_desc,
        en_desc: nextProps.company.en_desc,
        address: nextProps.company.address,
        location: nextProps.company.location,
        tel: nextProps.company.tel,
        mobile1: nextProps.company.mobile1,
        mobile2: nextProps.company.mobile2,
        facebook: nextProps.company.facebook,
        twitter: nextProps.company.twitter,
        instagram: nextProps.company.instagram,
        snapchat: nextProps.company.snapchat,
        youtube: nextProps.company.youtube,
        id: nextProps.company._id,
        map_lat: nextProps.company.lat ? parseFloat(nextProps.company.lat) : 0,
        map_lng: nextProps.company.lng ? parseFloat(nextProps.company.lng) : 0,
        marker_lat: nextProps.company.lat
          ? parseFloat(nextProps.company.lat)
          : 0,
        marker_lng: nextProps.company.lng
          ? parseFloat(nextProps.company.lng)
          : 0,
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
    console.log(this.state.marker_lng, this.state.marker_lat);
    // return;
    const formData = new FormData();
    formData.append("id", this.state.id);
    formData.append("ar_name", this.state.ar_name);
    formData.append("en_name", this.state.en_name);
    formData.append("ar_desc", this.state.ar_desc);
    formData.append("en_desc", this.state.en_desc);
    formData.append("address", this.state.address);
    formData.append("lat", this.state.marker_lat);
    formData.append("lng", this.state.marker_lng);
    formData.append("tel", this.state.tel);
    formData.append("mobile1", this.state.mobile1);
    formData.append("mobile2", this.state.mobile2);
    formData.append("facebook", this.state.facebook);
    formData.append("twitter", this.state.twitter);
    formData.append("instagram", this.state.instagram);
    formData.append("snapchat", this.state.snapchat);
    formData.append("youtube", this.state.youtube);
    formData.append("icon", this.state.icon);

    this.props.addorUpdateCompany(
      formData,
      this.state.id ? false : true,
      this.props.toggleModalLoading,
      this.props.toggleModal,
      this.props.toggleTableLoading,
      this.resetState
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
      ar_desc,
      en_desc,
      address,
      tel,
      mobile1,
      mobile2,
      facebook,
      twitter,
      instagram,
      snapchat,
      youtube,
      id,
      is_modal_loading,
      errors,
      show_modal,
      map_lat,
      map_lng,
      marker_lat,
      marker_lng,
    } = this.state;

    console.log(this.state.marker_lng, this.state.marker_lat, map_lat, map_lng);

    return (
      <div>
        <LoadingOverlay active={is_modal_loading} spinner text="Please Wait...">
          <Modal isOpen={show_modal} size="lg">
            <ModalHeader toggle={this.props.toggleModal}>
              {id ? "Update" : "Create"} Company Profile
            </ModalHeader>
            <ModalBody>
              <Row>
                <Col md="8">
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
                    <Col md={12}>
                      <FormGroup>
                        <Label for="ar_desc">Arabic Description</Label>
                        <Input
                          type="text"
                          name="ar_desc"
                          onChange={this.onChange}
                          id="ar_desc"
                          value={ar_desc}
                          placeholder="Arabic Description"
                        />
                        <p className="error">{errors && errors.ar_desc}</p>
                      </FormGroup>
                    </Col>
                    <Col md={12}>
                      <FormGroup>
                        <Label for="en_desc">English Description</Label>
                        <Input
                          type="text"
                          name="en_desc"
                          onChange={this.onChange}
                          id="en_desc"
                          value={en_desc}
                          placeholder="English Description"
                        />
                        <p className="error">{errors && errors.en_desc}</p>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row form>
                    <Col md={4}>
                      <FormGroup>
                        <Label for="address">Address</Label>
                        <Input
                          type="text"
                          name="address"
                          onChange={this.onChange}
                          id="address"
                          value={address}
                          placeholder="Address"
                        />
                        <p className="error">{errors && errors.address}</p>
                      </FormGroup>
                    </Col>
                    <Col md={4}>
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
                    <Col md={4}>
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
                  <Row form>
                    <Col md={4}>
                      <FormGroup>
                        <Label for="tel">Telephone</Label>
                        <Input
                          type="text"
                          name="tel"
                          onChange={this.onChange}
                          id="tel"
                          value={tel}
                          placeholder="Telephone"
                        />
                        <p className="error">{errors && errors.tel}</p>
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                        <Label for="mobile1">Mobile 1</Label>
                        <Input
                          type="text"
                          name="mobile1"
                          onChange={this.onChange}
                          id="mobile1"
                          value={mobile1}
                          placeholder="Mobile 1"
                        />
                        <p className="error">{errors && errors.mobile1}</p>
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                        <Label for="mobile2">Mobile 2</Label>
                        <Input
                          type="text"
                          name="mobile2"
                          onChange={this.onChange}
                          id="mobile2"
                          value={mobile2}
                          placeholder="Mobile 2"
                        />
                        <p className="error">{errors && errors.mobile2}</p>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row form>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="facebook">Facebook</Label>
                        <Input
                          type="text"
                          name="facebook"
                          onChange={this.onChange}
                          id="facebook"
                          value={facebook}
                          placeholder="Facebook"
                        />
                        <p className="error">{errors && errors.facebook}</p>
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="twitter">Twitter</Label>
                        <Input
                          type="text"
                          name="twitter"
                          onChange={this.onChange}
                          id="twitter"
                          value={twitter}
                          placeholder="Twitter"
                        />
                        <p className="error">{errors && errors.twitter}</p>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row form>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="instagram">Instagram</Label>
                        <Input
                          type="text"
                          name="instagram"
                          onChange={this.onChange}
                          id="instagram"
                          value={instagram}
                          placeholder="Instagram"
                        />
                        <p className="error">{errors && errors.instagram}</p>
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="snapchat">Snapchat</Label>
                        <Input
                          type="text"
                          name="snapchat"
                          onChange={this.onChange}
                          id="snapchat"
                          value={snapchat}
                          placeholder="Snapchat"
                        />
                        <p className="error">{errors && errors.snapchat}</p>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row form>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="youtube">Youtube</Label>
                        <Input
                          type="text"
                          name="youtube"
                          onChange={this.onChange}
                          id="youtube"
                          value={youtube}
                          placeholder="Youtube"
                        />
                        <p className="error">{errors && errors.youtube}</p>
                      </FormGroup>
                    </Col>
                    <Col md={6}>
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
                    </Col>
                  </Row>
                </Col>
                <Col md="4">
                  <Row>
                    <Col md="12">
                      <Map
                        map_lat={map_lat}
                        map_lng={map_lng}
                        marker_lat={marker_lat}
                        marker_lng={marker_lng}
                        onMarkerDragEnd={this.onMarkerDragEnd}
                        onPlaceSelected={this.onPlaceSelected}
                      />
                    </Col>
                  </Row>
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
    company: state.company.company,
    errors: state.errors.errors,
  };
};

export default withRouter(
  connect(mapDispatchToProps, { getCompanys, addorUpdateCompany })(AddCompany)
);
