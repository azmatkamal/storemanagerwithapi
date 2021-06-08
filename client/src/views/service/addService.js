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
  getServices,
  addorUpdateService,
  uploadImg,
} from "../../redux/service/action";

class AddService extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      en_name: "",
      ar_name: "",
      en_desc: "",
      ar_desc: "",
      media_type: "",
      icon2: null,
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
    this.setState({
      ar_name: "",
      en_name: "",
      ar_desc: "",
      en_desc: "",
      media_type: "",
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ show_modal: nextProps.show_modal });
    // this.setState({ is_modal_loading: nextProps.is_modal_loading });

    if (nextProps && nextProps.show_modal !== this.state.show_modal) {
      this.setState({
        en_name: "",
        ar_name: "",
        en_desc: "",
        ar_desc: "",
        media_type: "",
        icon2: null,
        icon: null,
        banner: null,
        id: null,
      });
    }

    if (nextProps && nextProps.service && nextProps.service.en_name) {
      this.setState({
        en_name: nextProps.service.en_name,
        ar_name: nextProps.service.ar_name,
        en_desc: nextProps.service.en_desc,
        ar_desc: nextProps.service.ar_desc,
        media_type: nextProps.service.media_type,
        id: nextProps.service._id,
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

  onFileSelect2 = (e) => {
    this.setState({ icon2: e.target.files[0] });
  };

  onFileBannerSelect = (e) => {
    this.setState({ banner: e.target.files[0] });
  };

  toggleModalLoading = () => {
    this.setState({ is_modal_loading: !this.state.is_modal_loading });
  };

  uploadImage = async (field) => {
    const formData = new FormData();
    formData.append("icon", this.state[field]);
    return await this.props.uploadImg(formData);
  };

  onSubmit = async () => {
    let icon = "";
    if (this.state.icon) {
      icon = await this.uploadImage("icon");
    }
    let icon2 = "";
    if (this.state.icon2) {
      icon2 = await this.uploadImage("icon2");
    }

    let data = {};

    if (this.state.id) {
      data = {
        id: this.state.id,
        ar_name: this.state.ar_name,
        en_name: this.state.en_name,
        ar_desc: this.state.ar_desc,
        en_desc: this.state.en_desc,
        media_type: this.state.media_type,
      };
      if (icon && icon.icon && this.state.icon) {
        data.icon = icon.icon;
      }
      if (icon2 && icon2.icon && this.state.icon2) {
        data.icon2 = icon2.icon;
      }
    } else {
      data = {
        id: this.state.id,
        ar_name: this.state.ar_name,
        en_name: this.state.en_name,
        ar_desc: this.state.ar_desc,
        en_desc: this.state.en_desc,
        media_type: this.state.media_type,
        icon: icon.icon ? icon.icon : "",
        icon2: icon2.icon ? icon2.icon : "",
      };
    }

    this.props.addorUpdateService(
      data,
      this.state.id ? false : true,
      this.toggleModalLoading,
      this.props.toggleModal,
      this.props.toggleTableLoading
    );
  };

  render() {
    const {
      ar_name,
      en_name,
      ar_desc,
      en_desc,
      id,
      is_modal_loading,
      media_type,
      errors,
      show_modal,
    } = this.state;

    return (
      <div>
        <Modal isOpen={show_modal}>
          <ModalHeader toggle={this.props.toggleModal}>
            {id ? "Update" : "Create"} Service
          </ModalHeader>
          <LoadingOverlay
            active={is_modal_loading}
            spinner
            text="Please Wait..."
          >
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
                <Col md={12}>
                  <FormGroup>
                    <Label for="ar_desc">Arabic Desc</Label>
                    <Input
                      type="text"
                      name="ar_desc"
                      onChange={this.onChange}
                      id="ar_desc"
                      value={ar_desc}
                      placeholder="Arabic Desc"
                    />
                    <p className="error">{errors && errors.ar_desc}</p>
                  </FormGroup>
                </Col>
                <Col md={12}>
                  <FormGroup>
                    <Label for="en_desc">English Desc</Label>
                    <Input
                      type="text"
                      name="en_desc"
                      onChange={this.onChange}
                      id="en_desc"
                      value={en_desc}
                      placeholder="English Desc"
                    />
                    <p className="error">{errors && errors.en_desc}</p>
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={4}>
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
                <Col md={4}>
                  <FormGroup>
                    <Label for="icon">Banner</Label>
                    <Input
                      type="file"
                      name="icon2"
                      onChange={this.onFileSelect2}
                      id="icon"
                      placeholder="Icon"
                      required
                    />
                    <p className="error">{errors && errors.icon2}</p>
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label for="media_type">Media Type</Label>
                    <Input
                      type="select"
                      name="media_type"
                      onChange={this.onChange}
                      id="media_type"
                      value={media_type}
                      placeholder="Media Type"
                    >
                      <option>Select an Option</option>
                      <option value="image">Image</option>
                      <option value="gif">GIF</option>
                      <option value="video">Video</option>
                    </Input>
                    <p className="error">{errors && errors.media_type}</p>
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
          </LoadingOverlay>
        </Modal>
      </div>
    );
  }
}

const mapDispatchToProps = (state) => {
  return {
    service: state.service.service,
    errors: state.errors.errors,
  };
};

export default withRouter(
  connect(mapDispatchToProps, { getServices, addorUpdateService, uploadImg })(
    AddService
  )
);
