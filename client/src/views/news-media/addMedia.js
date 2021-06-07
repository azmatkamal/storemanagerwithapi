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

import { getMedias, addorUpdateMedia } from "../../redux/news-media/action";

class AddMedia extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      media_type: "",
      icon: null,
      is_modal_loading: false,
      show_modal: false,
      newsmedia: {},
      news: {},
      errors: {},
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidMount() {
    this.setState({ media_type: "" });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ show_modal: nextProps.show_modal });
    this.setState({ news: nextProps.news });

    if (nextProps && nextProps.show_modal !== this.state.show_modal) {
      this.setState({
        media_type: "",
        icon: null,
        id: null,
      });
    }
    if (nextProps && nextProps.newsmedia && nextProps.newsmedia.media_type) {
      this.setState({
        media_type: nextProps.newsmedia.media_type,
        id: nextProps.newsmedia._id,
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

  toggleModalLoading = () => {
    this.setState({ is_modal_loading: !this.state.is_modal_loading });
  };

  onSubmit = () => {
    const formData = new FormData();
    formData.append("media_type", this.state.media_type);
    formData.append("icon", this.state.icon);
    formData.append("news", this.state.news);

    this.props.addorUpdateMedia(
      formData,
      true,
      this.toggleModalLoading,
      this.props.toggleModal,
      this.props.toggleTableLoading
    );
  };

  render() {
    const { media_type, is_modal_loading, errors, show_modal } = this.state;

    return (
      <div>
        <Modal isOpen={show_modal}>
          <ModalHeader toggle={this.props.toggleModal}>
            Create Media Type
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
                Create
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
    newsmedialist: state.newsmedia.newsmedialist,
    errors: state.errors.errors,
  };
};

export default withRouter(
  connect(mapDispatchToProps, { getMedias, addorUpdateMedia })(AddMedia)
);
