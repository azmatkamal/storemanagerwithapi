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

import { getModels, addorUpdateModel } from "../../redux/model/action";

class AddModel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      en_name: "",
      ar_name: "",
      year: "",
      brand: "",
      icon: null,
      is_modal_loading: false,
      show_modal: false,
      countries: [],
      brandDetails: {},
      errors: {},
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidMount() {
    this.setState({ ar_name: "", en_name: "", year: "" });
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps, "nextProps");
    this.setState({ show_modal: nextProps.show_modal });
    this.setState({ is_modal_loading: nextProps.is_modal_loading });
    this.setState({ brand: nextProps.brand });

    if (nextProps && nextProps.show_modal !== this.state.show_modal) {
      this.setState({
        en_name: "",
        ar_name: "",
        year: "",
        icon: null,
        id: null,
      });
    }
    if (nextProps && nextProps.model && nextProps.model.en_name) {
      this.setState({
        en_name: nextProps.model.en_name,
        ar_name: nextProps.model.ar_name,
        year: nextProps.model.year,
        id: nextProps.model._id,
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
    // formData.append("year", this.state.year);
    formData.append("brand", this.state.brand);
    formData.append("icon", this.state.icon);

    this.props.addorUpdateModel(
      formData,
      this.state.id ? false : true,
      this.props.toggleModalLoading,
      this.props.toggleModal,
      this.props.toggleTableLoading
    );
  };

  render() {
    const { ar_name, en_name, id, is_modal_loading, errors, show_modal } =
      this.state;

    return (
      <div>
        <LoadingOverlay active={is_modal_loading} spinner text="Please Wait...">
          <Modal isOpen={show_modal}>
            <ModalHeader toggle={this.props.toggleModal}>
              {id ? "Update" : "Create"} Model{" "}
            </ModalHeader>
            <ModalBody>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="ar_name">?????? ??? ????????</Label>
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
                    <Label for="en_name">?????? ??? ??????????????</Label>
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
                {/* <Col md={4}>
                  <FormGroup>
                    <Label for="year">Year</Label>
                    <Input
                      type="text"
                      name="year"
                      onChange={this.onChange}
                      id="year"
                      value={year}
                      placeholder="Year"
                    />
                    <p className="error">{errors && errors.year}</p>
                  </FormGroup>
                </Col> */}
              </Row>
              <FormGroup>
                <Label for="icon">????????</Label>
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
    model: state.model.model,
    errors: state.errors.errors,
  };
};

export default withRouter(
  connect(mapDispatchToProps, { getModels, addorUpdateModel })(AddModel)
);
