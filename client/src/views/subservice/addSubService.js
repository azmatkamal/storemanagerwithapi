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
  getSubServices,
  addorUpdateSubService,
} from "../../redux/subservice/action";

class Addsubservice extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      en_name: "",
      ar_name: "",
      en_desc: "",
      ar_desc: "",
      price: "",
      service: "",
      icon: null,
      is_modal_loading: false,
      show_modal: false,
      services: [],
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
      price: "",
      en_desc: "",
      ar_desc: "",
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ show_modal: nextProps.show_modal });
    this.setState({ is_modal_loading: nextProps.is_modal_loading });
    this.setState({ service: nextProps.service });

    if (nextProps && nextProps.show_modal !== this.state.show_modal) {
      this.setState({
        en_name: "",
        ar_name: "",
        en_desc: "",
        ar_desc: "",
        price: "",
        icon: null,
        id: null,
      });
    }
    if (nextProps && nextProps.subservice && nextProps.subservice.en_name) {
      this.setState({
        en_name: nextProps.subservice.en_name,
        ar_name: nextProps.subservice.ar_name,
        en_desc: nextProps.subservice.en_desc,
        ar_desc: nextProps.subservice.ar_desc,
        price: nextProps.subservice.price,
        id: nextProps.subservice._id,
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
    // const formData = new FormData();
    const data = {
      id: this.state.id,
      ar_name: this.state.ar_name,
      en_name: this.state.en_name,
      ar_desc: this.state.ar_desc,
      en_desc: this.state.en_desc,
      price: this.state.price,
      service: this.state.service,
    };
    // formData.append("icon", this.state.icon);

    this.props.addorUpdateSubService(
      data,
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
      ar_desc,
      en_desc,
      price,
      id,
      is_modal_loading,
      errors,
      show_modal,
    } = this.state;

    return (
      <div>
        <LoadingOverlay active={is_modal_loading} spinner text="Please Wait...">
          <Modal isOpen={show_modal} toggle={this.props.toggleModal}>
            <ModalHeader toggle={this.props.toggleModal}>
              {id ? "Update" : "Create"} Sub Service
            </ModalHeader>
            <ModalBody>
              <Row form>
                <Col md={4}>
                  <FormGroup>
                    <Label for="ar_name">اسم – عربي</Label>
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
                <Col md={4}>
                  <FormGroup>
                    <Label for="en_name">اسم – انجليزي</Label>
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
                <Col md={4}>
                  <FormGroup>
                    <Label for="price">Price</Label>
                    <Input
                      type="text"
                      name="price"
                      onChange={this.onChange}
                      id="price"
                      value={price}
                      placeholder="Price"
                    />
                    <p className="error">{errors && errors.price}</p>
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
              {/* <FormGroup>
                <Label for="icon">صورة</Label>
                <Input
                  type="file"
                  name="icon"
                  onChange={this.onFileSelect}
                  id="icon"
                  placeholder="Icon"
                  required
                />
                <p className="error">{errors && errors.icon}</p>
              </FormGroup> */}
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
    subservice: state.subservice.subservice,
    errors: state.errors.errors,
  };
};

export default withRouter(
  connect(mapDispatchToProps, { getSubServices, addorUpdateSubService })(
    Addsubservice
  )
);
