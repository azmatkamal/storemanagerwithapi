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
import { Editor } from "@tinymce/tinymce-react";

import { getNews, addorUpdateNews } from "../../redux/news/action";
import { getModels } from "../../redux/model/action";
import { getBrands } from "../../redux/brand/action";
import { getServices } from "../../redux/service/action";
import { getSubServices } from "../../redux/subservice/action";

const API_KEY = "gp6mxy72dyy66lvp5vm6ztavcvitbobj294zp2c1ub5g96xs";

class AddNews extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      is_modal_loading: false,
      show_modal: false,
      brands: [],
      models: [],
      subservices: [],
      services: [],
      description: "",
      header: "",
      icon: null,
      brand: "",
      model: "",
      subservice: "",
      service: "",
      year: "",
      allow_comment: "",
      client_name: "",
      date: new Date(),
      errors: {},
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidMount() {
    this.props.getBrands(() => {});
    this.props.getServices(() => {});
    this.props.getModels(() => {});
    this.props.getSubServices(() => {});
    this.setState({
      description: "",
      header: "",
      icon: null,
      brand: "",
      model: "",
      subservice: "",
      service: "",
      year: "",
      allow_comment: "",
      client_name: "",
      date: new Date(),
      id: null,
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ show_modal: nextProps.show_modal });
    this.setState({ is_modal_loading: nextProps.is_modal_loading });

    if (nextProps && nextProps.subservices) {
      this.setState({
        subservices: nextProps.subservices.map((item, idx) => ({
          ...item,
          index: idx + 1,
        })),
      });
    }

    if (nextProps && nextProps.services) {
      this.setState({
        services: nextProps.services.map((item, idx) => ({
          ...item,
          index: idx + 1,
        })),
      });
    }

    if (nextProps && nextProps.brands) {
      this.setState({
        brands: nextProps.brands.map((item, idx) => ({
          ...item,
          index: idx + 1,
        })),
      });
    }

    if (nextProps && nextProps.models) {
      this.setState({
        models: nextProps.models.map((item, idx) => ({
          ...item,
          index: idx + 1,
        })),
      });
    }

    if (nextProps && nextProps.show_modal !== this.state.show_modal) {
      this.setState({
        description: "",
        header: "",
        icon: null,
        brand: "",
        model: "",
        subservice: "",
        service: "",
        year: "",
        allow_comment: "",
        client_name: "",
        date: new Date(),
        id: null,
      });
    }

    if (nextProps && nextProps.news && nextProps.news.header) {
      this.setState({
        description: nextProps.news.description,
        header: nextProps.news.header,
        brand: nextProps.news.brand,
        model: nextProps.news.model,
        subservice: nextProps.news.subservice,
        service: nextProps.news.service,
        year: nextProps.news.year,
        allow_comment: nextProps.news.allow_comment,
        client_name: nextProps.news.client_name,
        date: nextProps.news.date,
        id: nextProps.news._id,
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
    formData.append("description", this.state.description);
    formData.append("header", this.state.header);
    formData.append("brand", this.state.brand);
    formData.append("model", this.state.model);
    formData.append("subservice", this.state.subservice);
    formData.append("service", this.state.service);
    formData.append("year", this.state.year);
    formData.append("allow_comment", this.state.allow_comment);
    formData.append("client_name", this.state.client_name);
    formData.append("date", this.state.date);
    formData.append("id", this.state.id);
    formData.append("icon", this.state.icon);

    this.props.addorUpdateNews(
      formData,
      this.state.id ? false : true,
      this.props.toggleModalLoading,
      this.props.toggleModal,
      this.props.toggleTableLoading
    );
  };

  onChangeDescription = (e) => {
    this.setState({ description: e });
  };

  render() {
    const {
      header,
      description,
      id,
      is_modal_loading,
      errors,
      brands,
      services,
      subservices,
      models,
      brand,
      service,
      subservice,
      model,
      date,
      allow_comment,
      client_name,
      show_modal,
      year,
    } = this.state;

    let years = [];
    for (let i = 1990; i <= 2050; i++) years.push(i);

    return (
      <div>
        <LoadingOverlay active={is_modal_loading} spinner text="Please Wait...">
          <Modal isOpen={show_modal} size="lg">
            <ModalHeader toggle={this.props.toggleModal}>
              {id ? "Update" : "Create"} News
            </ModalHeader>
            <ModalBody>
              <Row form>
                <Col md={8}>
                  <Row form>
                    <Col md={8}>
                      <FormGroup>
                        <Label for="header">Header</Label>
                        <Input
                          type="text"
                          name="header"
                          onChange={this.onChange}
                          id="header"
                          value={header}
                          placeholder="Header"
                        />
                        <p className="error">{errors && errors.header}</p>
                      </FormGroup>
                    </Col>
                    <Col md={4}>
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
                    <Col md={12}>
                      <FormGroup>
                        <Label for="description">Description</Label>
                        <Editor
                          apiKey={API_KEY}
                          value={description}
                          onEditorChange={this.onChangeDescription}
                          init={{
                            menubar: false,
                            branding: false,
                            statusbar: false,
                            height: "250px",
                            // directionality: "ltr",
                            a11y_advanced_options: true,
                            file_picker_callback: function (
                              callback,
                              value,
                              meta
                            ) {
                              var input = document.createElement("input");
                              input.setAttribute("type", "file");
                              input.setAttribute("accept", "image/*");
                              input.click();
                              input.onchange = function () {
                                var file = input.files[0];
                                var reader = new FileReader();
                                reader.onload = function (e) {
                                  callback(e.target.result, {
                                    alt: file.name,
                                  });
                                };
                                reader.readAsDataURL(file);
                              };
                            },
                            plugins:
                              "image table colorpicker spellchecker hr link textcolor print noneditable  lists",
                            toolbar:
                              "image | styleselect | bold italic underline forecolor | alignleft aligncenter alignright | bullist numlist | outdent indent  ",
                          }}
                        />
                        <p className="error">{errors && errors.description}</p>
                      </FormGroup>
                    </Col>
                  </Row>
                </Col>
                <Col md={4}>
                  <Row form>
                    <Col md="12">
                      <FormGroup>
                        <Label for="brand">Brands</Label>
                        <Input
                          type="select"
                          name="brand"
                          onChange={this.onChange}
                          id="brand"
                          value={brand}
                        >
                          <option value="">Select Brand</option>
                          {brands &&
                            brands
                              .filter(
                                (i) =>
                                  i.is_active === true && i.is_deleted === false
                              )
                              .map((item, idx) => {
                                return (
                                  <option value={item._id} key={idx}>
                                    {item.en_name} - {item.ar_name}
                                  </option>
                                );
                              })}
                        </Input>
                        <p className="error">{errors && errors.brand}</p>
                      </FormGroup>
                    </Col>
                    <Col md="12">
                      <FormGroup>
                        <Label for="model">Models</Label>
                        <Input
                          type="select"
                          name="model"
                          onChange={this.onChange}
                          id="model"
                          value={model}
                        >
                          <option value="">Select Model</option>
                          {models &&
                            models
                              .filter(
                                (i) =>
                                  i.is_active === true &&
                                  i.is_deleted === false &&
                                  i.brand._id === brand
                              )
                              .map((item, idx) => {
                                return (
                                  <option value={item._id} key={idx}>
                                    {item.en_name} - {item.ar_name}
                                  </option>
                                );
                              })}
                        </Input>
                        <p className="error">{errors && errors.model}</p>
                      </FormGroup>
                    </Col>
                    <Col md="12">
                      <FormGroup>
                        <Label for="year">Year</Label>
                        <Input
                          type="select"
                          name="year"
                          onChange={this.onChange}
                          id="year"
                          value={year}
                        >
                          <option value="">Select Year</option>
                          {years &&
                            years.map((item, idx) => {
                              return (
                                <option value={item} key={idx}>
                                  {item}
                                </option>
                              );
                            })}
                        </Input>
                        <p className="error">{errors && errors.year}</p>
                      </FormGroup>
                    </Col>
                    <Col md="12">
                      <FormGroup>
                        <Label for="service">Services</Label>
                        <Input
                          type="select"
                          name="service"
                          onChange={this.onChange}
                          id="service"
                          value={service}
                        >
                          <option value="">Select Service</option>
                          {services &&
                            services
                              .filter(
                                (i) =>
                                  i.is_active === true && i.is_deleted === false
                              )
                              .map((item, idx) => {
                                return (
                                  <option value={item._id} key={idx}>
                                    {item.en_name} - {item.ar_name}
                                  </option>
                                );
                              })}
                        </Input>
                        <p className="error">{errors && errors.service}</p>
                      </FormGroup>
                    </Col>
                    <Col md="12">
                      <FormGroup>
                        <Label for="subservice">Sub Services</Label>
                        <Input
                          type="select"
                          name="subservice"
                          onChange={this.onChange}
                          id="subservice"
                          value={subservice}
                        >
                          <option value="">Select Sub Service</option>
                          {subservices &&
                            subservices
                              .filter(
                                (i) =>
                                  i.is_active === true &&
                                  i.is_deleted === false &&
                                  i.service._id === service
                              )
                              .map((item, idx) => {
                                return (
                                  <option value={item._id} key={idx}>
                                    {item.en_name} - {item.ar_name}
                                  </option>
                                );
                              })}
                        </Input>
                        <p className="error">{errors && errors.subservice}</p>
                      </FormGroup>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row form>
                <Col md={4}>
                  <FormGroup>
                    <Label for="client_name">Client Name</Label>
                    <Input
                      type="text"
                      name="client_name"
                      onChange={this.onChange}
                      id="client_name"
                      value={client_name}
                      placeholder="Client Name"
                    />
                    <p className="error">{errors && errors.client_name}</p>
                  </FormGroup>
                </Col>
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
                    <Label for="allow_comment">Allow Comment</Label>
                    <Input
                      type="select"
                      name="allow_comment"
                      onChange={this.onChange}
                      id="allow_comment"
                      value={allow_comment}
                      placeholder="Allow Comment"
                    >
                      <option>Select an Option</option>
                      <option value="0">No</option>
                      <option value="1">Yes</option>
                    </Input>
                    <p className="error">{errors && errors.allow_comment}</p>
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
    news: state.news.news,
    models: state.model.models,
    brands: state.brand.brands,
    services: state.service.services,
    subservices: state.subservice.subservices,
    errors: state.errors.errors,
  };
};

export default withRouter(
  connect(mapDispatchToProps, {
    getNews,
    addorUpdateNews,
    getModels,
    getBrands,
    getSubServices,
    getServices,
  })(AddNews)
);
