import React, { Component, Fragment } from "react";
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
} from "reactstrap";
import moment from "moment";
import Addcategory from "./addcategory";
import Subcategory from "../subcategory";

import {
  getCategories,
  selectCategory,
  markgategory,
} from "../../redux/category/action";

class Category extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // OTHERS
      show_modal: false,
      selected_category: "",
      is_table_loading: false,
      is_modal_loading: false,

      // Data
      categorys: [],
    };
  }

  toggleModal = () => {
    this.setState({ show_modal: !this.state.show_modal, user: {} });
  };

  toggleModalLoading = () => {
    this.setState({ is_modal_loading: !this.state.is_modal_loading });
  };

  toggleTableLoading = () => {
    this.setState({ is_table_loading: !this.state.is_table_loading });
  };

  toggleSubcategory = (category) => {
    this.setState({ selected_category: category });
  };

  markgategory = (data) => {
    if (window.confirm("Would like to proceed with this action?")) {
      this.props.markgategory(data, this.toggleTableLoading);
    }
  };

  updateRow = (category) => {
    this.toggleModal();
    if (!category) {
      this.props.selectCategory({});
    } else {
      this.props.selectCategory(category);
    }
  };

  componentDidMount() {
    this.props.getCategories(this.toggleTableLoading);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.categorys) {
      this.setState({ categorys: nextProps.categorys });
    }
  }

  onCloseSubcategory = () => {
    this.setState({ selected_category: "" });
  };

  render() {
    const {
      is_table_loading,
      is_modal_loading,
      categorys,
      show_modal,
      selected_category,
    } = this.state;

    return (
      <div>
        <Row>
          <Addcategory
            show_modal={show_modal}
            is_modal_loading={is_modal_loading}
            toggleModal={this.toggleModal}
            toggleModalLoading={this.toggleModalLoading}
            toggleTableLoading={this.toggleTableLoading}
          />
          <Col md={selected_category ? "6" : "12"}>
            <LoadingOverlay
              active={is_table_loading}
              spinner
              text="Please Wait..."
            >
              <Card>
                <CardHeader>
                  Categories
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
                        <th>تاريخ الادخال</th>
                        <th>حالة التفعيل</th>
                        <th>الاجراءات</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categorys &&
                        categorys.map((item, idx) => {
                          return (
                            <Fragment>
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
                                  {moment(item.createdAt).format("DD/MM/YYYY")}{" "}
                                  - {moment(item.createdAt).fromNow()}
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
                                      onClick={this.markgategory.bind(this, {
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
                                      onClick={this.markgategory.bind(this, {
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
                                      className="mr-2"
                                      onClick={this.markgategory.bind(this, {
                                        id: item._id,
                                        is_active: item.is_active,
                                        is_deleted: true,
                                      })}
                                      title="Delete"
                                    >
                                      <i className="fa fa-trash"></i>
                                    </Button>
                                  )}
                                  <Button
                                    size="xs"
                                    color="success"
                                    className="mr-2"
                                    onClick={this.toggleSubcategory.bind(
                                      this,
                                      item._id
                                    )}
                                    title="Subcategories"
                                  >
                                    <i className="fa fa-map-pin"></i>
                                  </Button>
                                </td>
                              </tr>
                            </Fragment>
                          );
                        })}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </LoadingOverlay>
          </Col>
          {selected_category && (
            <Col md={selected_category ? "6" : "12"}>
              <Subcategory
                category={selected_category}
                closeSection={this.onCloseSubcategory}
              />
            </Col>
          )}
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    category: state.category.category,
    categorys: state.category.categorys,
  };
};

export default withRouter(
  connect(mapStateToProps, { getCategories, selectCategory, markgategory })(
    Category
  )
);
