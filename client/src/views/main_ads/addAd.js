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
import moment from "moment";

import { getAds, addorUpdateAd } from "../../redux/main_ads/action";

class AddAd extends Component {
  constructor(props) {
    super(props);

    this.state = {
      icon: null,
      id: null,
      name: "",
      tel: "",
      internal_link: "",
      external_link: "",
      media_type: "",
      date: new Date(),
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
    this.setState({
      icon: null,
      id: null,
      name: "",
      tel: "",
      internal_link: "",
      external_link: "",
      media_type: "",
      date: new Date(),
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ show_modal: nextProps.show_modal });
    this.setState({ is_modal_loading: nextProps.is_modal_loading });

    if (nextProps && nextProps.show_modal !== this.state.show_modal) {
      this.setState({
        icon: null,
        id: null,
        name: "",
        tel: "",
        internal_link: "",
        external_link: "",
        media_type: "",
        date: new Date(),
      });
    }
    if (nextProps && nextProps.ad && nextProps.ad.media_type) {
      this.setState({
        id: nextProps.ad._id,
        name: nextProps.ad.name,
        tel: nextProps.ad.tel,
        internal_link: nextProps.ad.internal_link,
        external_link: nextProps.ad.external_link,
        media_type: nextProps.ad.media_type,
        date: nextProps.ad.date,
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
    formData.append("name", this.state.name);
    formData.append("tel", this.state.tel);
    formData.append("internal_link", this.state.internal_link);
    formData.append("external_link", this.state.external_link);
    formData.append("media_type", this.state.media_type);
    formData.append("date", this.state.date);
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
      id,
      is_modal_loading,
      errors,
      show_modal,
      name,
      tel,
      internal_link,
      external_link,
      media_type,
      date,
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
                <Col md={6}>
                  <FormGroup>
                    <Label for="name">Name</Label>
                    <Input
                      type="text"
                      name="name"
                      onChange={this.onChange}
                      id="name"
                      value={name}
                      placeholder="Name"
                    />
                    <p className="error">{errors && errors.name}</p>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="tel">Tel</Label>
                    <Input
                      type="text"
                      name="tel"
                      onChange={this.onChange}
                      id="tel"
                      value={tel}
                      placeholder="Tel"
                    />
                    <p className="error">{errors && errors.tel}</p>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="internal_link">Internal Link</Label>
                    <Input
                      type="text"
                      name="internal_link"
                      onChange={this.onChange}
                      id="internal_link"
                      value={internal_link}
                      placeholder="Internal Link"
                    />
                    <p className="error">{errors && errors.internal_link}</p>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="external_link">Enternal Link</Label>
                    <Input
                      type="text"
                      name="external_link"
                      onChange={this.onChange}
                      id="external_link"
                      value={external_link}
                      placeholder="Enternal Link"
                    />
                    <p className="error">{errors && errors.external_link}</p>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="date">Date</Label>
                    <Input
                      type="date"
                      name="date"
                      onChange={this.onChange}
                      id="date"
                      value={moment(date).format("YYYY-MM-DD")}
                      format="YYYY-MM-DD"
                      placeholder="Date"
                    />
                    <p className="error">{errors && errors.date}</p>
                  </FormGroup>
                </Col>
                <Col md={6}>
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
  };
};

export default withRouter(
  connect(mapDispatchToProps, { getAds, addorUpdateAd })(AddAd)
);
