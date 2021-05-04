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
  getPermissions,
  addorUpdatePermission,
} from "../../redux/permission/action";

class AddCity extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      link: "",
      name: "",
      is_modal_loading: false,
      show_modal: false,
      errors: {},
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidMount() {
    this.setState({ link: "", name: "" });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ show_modal: nextProps.show_modal });
    this.setState({ is_modal_loading: nextProps.is_modal_loading });
    if (nextProps && nextProps.permission) {
      this.setState({
        link: nextProps.permission.link ? nextProps.permission.link : "",
        name: nextProps.permission.name ? nextProps.permission.name : "",
        id: nextProps.permission._id,
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
    this.props.addorUpdatePermission(
      { id: this.state.id, link: this.state.link, name: this.state.name },
      this.state.id ? false : true,
      this.props.toggleModalLoading,
      this.props.toggleModal,
      this.props.toggleTableLoading
    );
  };

  render() {
    const { link, id, name, is_modal_loading, errors, show_modal } = this.state;

    return (
      <div>
        <LoadingOverlay active={is_modal_loading} spinner text="Please Wait...">
          <Modal isOpen={show_modal} toggle={this.props.toggleModal}>
            <ModalHeader toggle={this.props.toggleModal}>
              {id ? "Update" : "Create"} Permission
            </ModalHeader>
            <ModalBody>
              <Row form>
                <Col md={12}>
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
    permission: state.permission.permission,
    errors: state.errors.errors,
  };
};

export default withRouter(
  connect(mapDispatchToProps, { getPermissions, addorUpdatePermission })(
    AddCity
  )
);
