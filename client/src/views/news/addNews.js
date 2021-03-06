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
import Select from "react-select";
import { Editor } from "@tinymce/tinymce-react";
import makeAnimated from "react-select/animated";

import { getNews, addorUpdateNews } from "../../redux/news/action";
import { getModels } from "../../redux/model/action";
import { getBrands } from "../../redux/brand/action";
import { getServices } from "../../redux/service/action";
import { getSubServices } from "../../redux/subservice/action";

const API_KEY = "gp6mxy72dyy66lvp5vm6ztavcvitbobj294zp2c1ub5g96xs";
const animatedComponents = makeAnimated();

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
      client_name: "",
      ar_description: "",
      ar_header: "",
      ar_client_name: "",
      icon: null,
      brand: "",
      model: "",
      subservice: "",
      service: "",
      year: "",
      allow_comment: "",
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
      client_name: "",
      ar_description: "",
      ar_header: "",
      ar_client_name: "",
      icon: null,
      brand: "",
      model: "",
      subservice: "",
      service: "",
      year: "",
      allow_comment: "",
      date: new Date(),
      id: null,
    });
  }

  onChangeService = (e) => {
    this.setState({ service: e.map((i) => i.value) });
  };

  onChangeSubService = (e) => {
    this.setState({ subservice: e.map((i) => i.value) });
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ show_modal: nextProps.show_modal });

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
        client_name: "",
        ar_description: "",
        ar_header: "",
        ar_client_name: "",
        icon: null,
        brand: "",
        model: "",
        subservice: "",
        service: "",
        year: "",
        allow_comment: "",
        date: new Date(),
        id: null,
      });
    }

    if (nextProps && nextProps.news && nextProps.news.header) {
      this.setState({
        description: nextProps.news.description,
        header: nextProps.news.header,
        client_name: nextProps.news.client_name,
        ar_description: nextProps.news.ar_description,
        ar_header: nextProps.news.ar_header,
        ar_client_name: nextProps.news.ar_client_name,
        brand: nextProps.news.brand,
        model: nextProps.news.model,
        service: nextProps.news.service
          ? nextProps.news.service.split(",")
          : "",
        subservice: nextProps.news.subservice
          ? nextProps.news.subservice.split(",")
          : "",
        year: nextProps.news.year,
        allow_comment: nextProps.news.allow_comment,
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

  toggleModalLoading = () => {
    this.setState({ is_modal_loading: !this.state.is_modal_loading });
  };

  onSubmit = () => {
    const formData = new FormData();
    formData.append("description", this.state.description);
    formData.append("header", this.state.header);
    formData.append("client_name", this.state.client_name);
    formData.append("ar_description", this.state.ar_description);
    formData.append("ar_header", this.state.ar_header);
    formData.append("ar_client_name", this.state.ar_client_name);
    formData.append("brand", this.state.brand);
    formData.append("model", this.state.model);
    formData.append(
      "subservice",
      this.state.subservice && this.state.subservice.length
        ? this.state.subservice.join(",")
        : ""
    );
    formData.append(
      "service",
      this.state.service && this.state.service.length
        ? this.state.service.join(",")
        : ""
    );
    formData.append("year", this.state.year);
    formData.append("allow_comment", this.state.allow_comment);
    formData.append("date", this.state.date);
    formData.append("id", this.state.id);
    formData.append("icon", this.state.icon);

    this.props.addorUpdateNews(
      formData,
      this.state.id ? false : true,
      this.toggleModalLoading,
      this.props.toggleModal,
      this.props.toggleTableLoading
    );
  };

  onChangeDescription = (e) => {
    this.setState({ description: e });
  };

  onChangeDescriptionAR = (e) => {
    this.setState({ ar_description: e });
  };

  render() {
    const {
      header,
      description,
      client_name,
      ar_header,
      ar_description,
      ar_client_name,
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
      show_modal,
      year,
    } = this.state;

    let years = [];
    for (let i = 1990; i <= 2050; i++) years.push(i);

    let selected_services =
      services &&
      services
        .filter(
          (i) =>
            i.is_active === true &&
            i.is_deleted === false &&
            service.includes(i._id)
        )
        .map((item) => {
          return { value: item._id, label: item.en_name };
        });

    let temp_service = selected_services.map((i) => {
      if (i && i.value) {
        return i.value;
      }
    });

    let selected_sub_services =
      subservices &&
      subservices
        .filter(
          (i) =>
            i.is_active === true &&
            i.is_deleted === false &&
            subservice.includes(i._id)
        )
        .map((item) => {
          return { value: item._id, label: item.en_name };
        });

    let temp_subservices =
      subservices &&
      subservices
        .filter(
          (i) =>
            i.is_active === true &&
            i.is_deleted === false &&
            temp_service.includes(i.service._id)
        )
        .map((item) => {
          return {
            value: item._id,
            label: item.en_name,
          };
        });

    return (
      <div>
        <Modal isOpen={show_modal} size="lg">
          <ModalHeader toggle={this.props.toggleModal}>
            {id ? "Update" : "Create"} News
          </ModalHeader>
          <LoadingOverlay
            active={is_modal_loading}
            spinner
            text="Please Wait..."
          >
            <ModalBody>
              <Row form>
                <Col md={8}>
                  <Row form>
                    <Col md={12}>
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
                    <Col md={12}>
                      <FormGroup>
                        <Label for="ar_header">Header - AR</Label>
                        <Input
                          type="text"
                          name="ar_header"
                          onChange={this.onChange}
                          id="ar_header"
                          value={ar_header}
                          placeholder="Header - AR"
                        />
                        <p className="error">{errors && errors.ar_header}</p>
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
                              "emoticons image table colorpicker spellchecker hr link textcolor print noneditable  lists",
                            toolbar:
                              "emoticons | image | styleselect | bold italic underline forecolor | alignleft aligncenter alignright | bullist numlist | outdent indent  ",
                          }}
                        />
                        <p className="error">{errors && errors.description}</p>
                      </FormGroup>
                    </Col>
                    <Col md={12}>
                      <FormGroup>
                        <Label for="ar_description">Description - AR</Label>
                        <Editor
                          apiKey={API_KEY}
                          value={ar_description}
                          onEditorChange={this.onChangeDescriptionAR}
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
                              "emoticons image table colorpicker spellchecker hr link textcolor print noneditable  lists",
                            toolbar:
                              "emoticons | image | styleselect | bold italic underline forecolor | alignleft aligncenter alignright | bullist numlist | outdent indent  ",
                          }}
                        />
                        <p className="error">
                          {errors && errors.ar_description}
                        </p>
                      </FormGroup>
                    </Col>
                  </Row>
                </Col>
                <Col md={4}>
                  <Row form>
                    <Col md={12}>
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
                        <Select
                          closeMenuOnSelect={false}
                          components={animatedComponents}
                          onChange={this.onChangeService}
                          defaultValue={selected_services}
                          isMulti
                          options={
                            services &&
                            services
                              .filter(
                                (i) =>
                                  i.is_active === true && i.is_deleted === false
                              )
                              .map((item) => {
                                return { value: item._id, label: item.en_name };
                              })
                          }
                        />
                        <p className="error">{errors && errors.service}</p>
                      </FormGroup>
                    </Col>
                    <Col md="12">
                      <FormGroup>
                        <Label for="subservice">Sub Services</Label>
                        <Select
                          closeMenuOnSelect={false}
                          components={animatedComponents}
                          onChange={this.onChangeSubService}
                          defaultValue={selected_sub_services}
                          isMulti
                          options={temp_subservices}
                        />
                        <p className="error">{errors && errors.subservice}</p>
                      </FormGroup>
                    </Col>
                    <Col md={12}>
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
                    <Col md={12}>
                      <FormGroup>
                        <Label for="ar_client_name">Client Name - AR</Label>
                        <Input
                          type="text"
                          name="ar_client_name"
                          onChange={this.onChange}
                          id="ar_client_name"
                          value={ar_client_name}
                          placeholder="Client Name - AR"
                        />
                        <p className="error">
                          {errors && errors.ar_client_name}
                        </p>
                      </FormGroup>
                    </Col>
                    <Col md={12}>
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
                    <Col md={12}>
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
                        <p className="error">
                          {errors && errors.allow_comment}
                        </p>
                      </FormGroup>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row form></Row>
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
