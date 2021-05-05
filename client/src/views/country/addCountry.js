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

import { getCountries, addorUpdateCountry } from "../../redux/country/action";

class AddCountry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      en_name: "",
      ar_name: "",
      description: "",
      country_code: "",
      country_phone_code: "",
      timezone: "",
      icon: null,
      is_modal_loading: false,
      show_modal: false,
      errors: {},
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidMount() {
    this.setState({ ar_name: "", en_name: "" });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ show_modal: nextProps.show_modal });
    this.setState({ is_modal_loading: nextProps.is_modal_loading });

    if (nextProps && nextProps.show_modal !== this.state.show_modal) {
      this.setState({
        en_name: "",
        ar_name: "",
        description: "",
        country_code: "",
        country_phone_code: "",
        timezone: "",
        icon: null,
        id: null,
      });
    }

    if (nextProps && nextProps.country && nextProps.country.en_name) {
      this.setState({
        en_name: nextProps.country.en_name,
        ar_name: nextProps.country.ar_name,
        description: nextProps.country.description,
        country_code: nextProps.country.country_code,
        country_phone_code: nextProps.country.country_phone_code,
        timezone: nextProps.country.timezone,
        id: nextProps.country._id,
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
    formData.append("description", this.state.description);
    formData.append("country_code", this.state.country_code);
    formData.append("country_phone_code", this.state.country_phone_code);
    formData.append("timezone", this.state.timezone);
    formData.append("icon", this.state.icon);

    this.props.addorUpdateCountry(
      formData,
      this.state.id ? false : true,
      this.props.toggleModalLoading,
      this.props.toggleModal,
      this.props.toggleTableLoading
    );
  };

  render() {
    const {
      ar_name,
      en_name,
      description,
      country_code,
      country_phone_code,
      timezone,
      id,
      is_modal_loading,
      errors,
      show_modal,
    } = this.state;

    console.log(this.state);

    return (
      <div>
        <LoadingOverlay active={is_modal_loading} spinner text="Please Wait...">
          <Modal isOpen={show_modal} toggle={this.props.toggleModal}>
            <ModalHeader toggle={this.props.toggleModal}>
              {id ? "Update" : "Create"} Country
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
                    <Label for="country_code">Country Code</Label>
                    <Input
                      type="text"
                      name="country_code"
                      onChange={this.onChange}
                      id="country_code"
                      value={country_code}
                      placeholder="Country Code"
                    />
                    <p className="error">{errors && errors.country_code}</p>
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label for="country_phone_code">Phone Code</Label>
                    <Input
                      type="text"
                      name="country_phone_code"
                      onChange={this.onChange}
                      id="country_phone_code"
                      value={country_phone_code}
                      placeholder="Phone Code"
                    />
                    <p className="error">
                      {errors && errors.country_phone_code}
                    </p>
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label for="timezone">Timezone</Label>
                    <Input
                      type="text"
                      name="timezone"
                      onChange={this.onChange}
                      id="timezone"
                      value={timezone}
                      placeholder="Timezone"
                    />
                    <p className="error">{errors && errors.timezone}</p>
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={12}>
                  <FormGroup>
                    <Label for="description">Description</Label>
                    <Input
                      type="textarea"
                      name="description"
                      onChange={this.onChange}
                      id="description"
                      value={description}
                      placeholder="Description"
                      style={{ height: "100px !important" }}
                    />
                    <p className="error">{errors && errors.description}</p>
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
    country: state.country.country,
    errors: state.errors.errors,
  };
};

export default withRouter(
  connect(mapDispatchToProps, { getCountries, addorUpdateCountry })(AddCountry)
);
