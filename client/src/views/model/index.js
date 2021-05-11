import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import LoadingOverlay from "react-loading-overlay";
import {
  Card,
  CardBody,
  Row,
  Col,
  CardHeader,
  Table,
  Button,
  Badge,
  // FormGroup,
  // Label,
  // Input,
} from "reactstrap";
import moment from "moment";
import AddModel from "./addModel";

import { getModels, selectModel, markmodel } from "../../redux/model/action";
import { getBrands } from "../../redux/brand/action";

class Models extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // OTHERS
      show_modal: false,
      is_table_loading: false,
      is_modal_loading: false,

      // Data
      models: [],
      brands: [],
      brandDetails: {},
      selected_filtered_brand: "",
    };
  }

  toggleModal = () => {
    this.setState({ show_modal: !this.state.show_modal });
  };

  toggleModalLoading = () => {
    this.setState({ is_modal_loading: !this.state.is_modal_loading });
  };

  toggleTableLoading = () => {
    this.setState({ is_table_loading: !this.state.is_table_loading });
  };

  markmodel = (data) => {
    if (window.confirm("Would like to proceed with this action?")) {
      this.props.markmodel(data, this.toggleTableLoading);
    }
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  updateRow = (city) => {
    this.toggleModal();
    if (!city) {
      this.props.selectModel({});
    } else {
      this.props.selectModel(city);
    }
  };

  componentDidMount() {
    this.props.getModels(this.toggleTableLoading);
  }

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps, "nextProps 2");
    if (nextProps && nextProps.models) {
      this.setState({
        models: nextProps.models,
      });
    }
    if (nextProps && nextProps.brand) {
      this.setState({
        selected_filtered_brand: nextProps.brand,
      });
    }
    if (nextProps && nextProps.brandDetails) {
      this.setState({
        brandDetails: nextProps.brandDetails,
      });
    }
  }

  onCloseSection = () => {
    this.props.closeSection();
  };

  render() {
    const {
      is_table_loading,
      is_modal_loading,
      models,
      show_modal,
      selected_filtered_brand,
      brandDetails,
    } = this.state;

    // console.log(selected_filtered_brand, "selected_filtered_brand");

    let filtered_models = selected_filtered_brand
      ? models.filter((i) => i.brand._id === selected_filtered_brand)
      : models;

    return (
      <div>
        <Row>
          <AddModel
            show_modal={show_modal}
            is_modal_loading={is_modal_loading}
            toggleModal={this.toggleModal}
            brand={selected_filtered_brand}
            toggleModalLoading={this.toggleModalLoading}
            toggleTableLoading={this.toggleTableLoading}
          />
          <Col md="12">
            <LoadingOverlay
              active={is_table_loading}
              spinner
              text="Please Wait..."
            >
              <Card>
                <CardHeader>
                  {brandDetails && brandDetails.ar_name
                    ? `${brandDetails.ar_name} - `
                    : ""}
                  Models
                  <Button
                    size="xs"
                    color="danger"
                    className="mr-2 float-right"
                    onClick={this.onCloseSection}
                  >
                    <i className="fa fa-close" alt="Update"></i>
                  </Button>
                  <Button
                    size="xs"
                    color="success"
                    className="mr-2 float-right"
                    onClick={this.updateRow.bind(this, false)}
                  >
                    <i className="fa fa-plus" alt="Update"></i>
                  </Button>
                </CardHeader>
                <CardBody>
                  <Table responsive striped bordered>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>صورة</th>
                        <th>اسم – انجليزي</th>
                        <th>اسم – عربي</th>
                        <th>Year</th>
                        <th>حالة التفعيل</th>
                        <th>الاجراءات</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered_models &&
                        filtered_models.map((item, idx) => {
                          return (
                            <tr key={idx}>
                              <th scope="row">{idx + 1}</th>
                              <td>
                                {item.icon ? (
                                  <img
                                    src={item.icon}
                                    alt={item.en_name}
                                    style={{ maxWidth: "75px" }}
                                  />
                                ) : (
                                  ""
                                )}
                              </td>
                              <td>{item.en_name}</td>
                              <td>{item.ar_name}</td>
                              <td>{item.year}</td>
                              {/* <td>
                                {item.brand.en_name} - {item.brand.ar_name}
                              </td> */}
                              {/* <td>
                                {moment(item.createdAt).format("DD/MM/YYYY")} -{" "}
                                {moment(item.createdAt).fromNow()}
                              </td> */}
                              <td>
                                {item.is_active ? (
                                  <Badge color="primary" outline>
                                    Active
                                  </Badge>
                                ) : (
                                  <Badge color="danger" outline>
                                    Inactive
                                  </Badge>
                                )}
                              </td>
                              <td style={{ minWidth: "200px" }}>
                                <Button
                                  size="xs"
                                  color="warning"
                                  className="mr-2"
                                  onClick={this.updateRow.bind(this, item)}
                                  title="Update"
                                >
                                  <i className="fa fa-pencil"></i>
                                </Button>
                                {!item.is_active && (
                                  <Button
                                    size="xs"
                                    color="success"
                                    className="mr-2"
                                    onClick={this.markmodel.bind(this, {
                                      id: item._id,
                                      is_active: true,
                                      is_deleted: item.is_deleted,
                                    })}
                                    title="Enable Account"
                                  >
                                    <i className="fa fa-check"></i>
                                  </Button>
                                )}
                                {item.is_active && (
                                  <Button
                                    size="xs"
                                    color="primary"
                                    className="mr-2"
                                    onClick={this.markmodel.bind(this, {
                                      id: item._id,
                                      is_active: false,
                                      is_deleted: item.is_deleted,
                                    })}
                                    title="Disable Account"
                                  >
                                    <i className="fa fa-times"></i>
                                  </Button>
                                )}
                                {item.user_type !== "1" && (
                                  <Button
                                    size="xs"
                                    color="danger"
                                    onClick={this.markmodel.bind(this, {
                                      id: item._id,
                                      is_active: item.is_active,
                                      is_deleted: true,
                                    })}
                                    title="Delete"
                                  >
                                    <i className="fa fa-trash"></i>
                                  </Button>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </LoadingOverlay>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    model: state.model.model,
    models: state.model.models,
    brands: state.brand.brands,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    getModels,
    selectModel,
    markmodel,
    getBrands,
  })(Models)
);
