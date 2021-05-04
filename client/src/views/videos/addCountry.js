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

import { getVideos, addorUpdateVideo } from "../../redux/videos/action";

class AddCountry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      en_name: "",
      ar_name: "",
      en_sologan: "",
      ar_sologan: "",
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
    this.setState({ ar_name: "", en_name: "", en_sologan: "", ar_sologan: "" });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ show_modal: nextProps.show_modal });
    this.setState({ is_modal_loading: nextProps.is_modal_loading });

    if (nextProps && nextProps.show_modal !== this.state.show_modal) {
      this.setState({
        en_name: "",
        ar_name: "",
        en_sologan: "",
        ar_sologan: "",
        icon: null,
        id: null,
      });
    }

    if (nextProps && nextProps.video && nextProps.video.en_name) {
      this.setState({
        en_name: nextProps.video.en_name,
        ar_name: nextProps.video.ar_name,
        en_sologan: nextProps.video.en_sologan,
        ar_sologan: nextProps.video.ar_sologan,
        id: nextProps.video._id,
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
    formData.append("ar_sologan", this.state.ar_sologan);
    formData.append("en_sologan", this.state.en_sologan);
    formData.append("icon", this.state.icon);

    this.props.addorUpdateVideo(
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
      ar_sologan,
      en_sologan,
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
              {id ? "Update" : "Create"} Into Video
            </ModalHeader>
            <ModalBody>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="ar_name">Arabic Text</Label>
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
                    <Label for="en_name">English Text</Label>
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
                <Col md={6}>
                  <FormGroup>
                    <Label for="ar_sologan">Arabic Sologan</Label>
                    <Input
                      type="text"
                      name="ar_sologan"
                      onChange={this.onChange}
                      id="ar_sologan"
                      value={ar_sologan}
                      placeholder="Arabic Sologan"
                    />
                    <p className="error">{errors && errors.ar_sologan}</p>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="en_sologan">English Sologan</Label>
                    <Input
                      type="text"
                      name="en_sologan"
                      onChange={this.onChange}
                      id="en_sologan"
                      value={en_sologan}
                      placeholder="English Sologan"
                    />
                    <p className="error">{errors && errors.en_sologan}</p>
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                <Label for="icon">Video</Label>
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
    video: state.video.video,
    errors: state.errors.errors,
  };
};

export default withRouter(
  connect(mapDispatchToProps, { getVideos, addorUpdateVideo })(AddCountry)
);
