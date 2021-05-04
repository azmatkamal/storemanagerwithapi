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

import { getAds, addorUpdateAd } from "../../redux/main_ads/action";

class AddCity extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      link: "",
      country: "",
      icon: null,
      is_modal_loading: false,
      show_modal: false,
      countries: [],
      errors: {},
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidMount() {
    this.setState({ link: "" });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ show_modal: nextProps.show_modal });
    this.setState({ is_modal_loading: nextProps.is_modal_loading });

    if (nextProps && nextProps.show_modal !== this.state.show_modal) {
      this.setState({
        link: "",
        city: "",
        icon: null,
        id: null,
      });
    }
    if (nextProps && nextProps.ad && nextProps.ad.link) {
      this.setState({
        link: nextProps.ad.link,
        country: nextProps.ad.country._id,
        id: nextProps.ad._id,
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
    formData.append("link", this.state.link);
    formData.append("country", this.state.country);
    formData.append("icon", this.state.icon);

    this.props.addorUpdateAd(
      formData,
      this.state.id ? false : true,
      this.props.toggleModalLoading,
      this.props.toggleModal,
      this.props.toggleTableLoading
    );
  };

  render() {
    const {
      link,
      id,
      is_modal_loading,
      errors,
      show_modal,
      countries,
      country,
    } = this.state;

    return (
      <div>
        <LoadingOverlay active={is_modal_loading} spinner text="Please Wait...">
          <Modal isOpen={show_modal} toggle={this.props.toggleModal}>
            <ModalHeader toggle={this.props.toggleModal}>
              {id ? "Update" : "Create"} Main Ad
            </ModalHeader>
            <ModalBody>
              <Row form>
                <Col md={12}>
                  <FormGroup>
                    <Label for="link">Link</Label>
                    <Input
                      type="text"
                      name="link"
                      onChange={this.onChange}
                      id="link"
                      value={link}
                      placeholder="Link"
                    />
                    <p className="error">{errors && errors.link}</p>
                  </FormGroup>
                </Col>
              </Row>
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
    ad: state.ad.ad,
    errors: state.errors.errors,
    countries: state.country.countries,
  };
};

export default withRouter(
  connect(mapDispatchToProps, { getAds, addorUpdateAd })(AddCity)
);
