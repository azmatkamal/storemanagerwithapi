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
import AddSubCategory from "./addSubCategory";

import {
  getSubCategories,
  selectSubcategory,
  marksubcategory,
} from "../../redux/subcategory/action";
import { getCategories } from "../../redux/category/action";

class SubCategory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // OTHERS
      show_modal: false,
      is_table_loading: false,
      is_modal_loading: false,

      // Data
      subcategorys: [],
      categorys: [],
      selected_filtered_category: "",
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

  marksubcategory = (data) => {
    if (window.confirm("Would like to proceed with this action?")) {
      this.props.marksubcategory(data, this.toggleTableLoading);
    }
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  updateRow = (city) => {
    this.toggleModal();
    if (!city) {
      this.props.selectSubcategory({});
    } else {
      this.props.selectSubcategory(city);
    }
  };

  componentDidMount() {
    this.props.getSubCategories(this.toggleTableLoading);
    if (this.props && this.props.category) {
      this.setState({
        selected_filtered_category: this.props.category,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.subcategorys) {
      this.setState({
        subcategorys: nextProps.subcategorys,
      });
    }

    if (nextProps && nextProps.category) {
      this.setState({
        selected_filtered_category: nextProps.category,
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
      subcategorys,
      show_modal,
      selected_filtered_category,
    } = this.state;

    let filtered_subcategorys = selected_filtered_category
      ? subcategorys.filter(
          (i) => i.category._id === selected_filtered_category
        )
      : subcategorys;

    return (
      <div>
        <Row>
          <AddSubCategory
            show_modal={show_modal}
            is_modal_loading={is_modal_loading}
            toggleModal={this.toggleModal}
            category={selected_filtered_category}
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
                  Sub Categories
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
                        <th>دول</th>
                        <th>تاريخ الادخال</th>
                        <th>حالة التفعيل</th>
                        <th>الاجراءات</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered_subcategorys &&
                        filtered_subcategorys.map((item, idx) => {
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
                              <td>
                                {item.category.en_name} -{" "}
                                {item.category.ar_name}
                              </td>
                              <td>
                                {moment(item.createdAt).format("DD/MM/YYYY")} -{" "}
                                {moment(item.createdAt).fromNow()}
                              </td>
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
                                    onClick={this.marksubcategory.bind(this, {
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
                                    onClick={this.marksubcategory.bind(this, {
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
                                    onClick={this.marksubcategory.bind(this, {
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
    subcategory: state.subcategory.subcategory,
    subcategorys: state.subcategory.subcategorys,
    categorys: state.category.categorys,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    getSubCategories,
    selectSubcategory,
    marksubcategory,
    getCategories,
  })(SubCategory)
);
