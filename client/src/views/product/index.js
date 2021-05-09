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
import AddProduct from "./addProduct";

import {
  getProducts,
  selectproduct,
  markproduct,
  uploadImg,
} from "../../redux/product/action";

class Products extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // OTHERS
      show_modal: false,
      is_table_loading: false,
      is_modal_loading: false,

      // Data
      products: [],
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

  markproduct = (data) => {
    if (window.confirm("Would like to proceed with this action?")) {
      this.props.markproduct(data, this.toggleTableLoading);
    }
  };

  updateRow = (product) => {
    this.toggleModal();
    if (!product) {
      this.props.selectproduct({});
    } else {
      this.props.selectproduct(product);
    }
  };

  componentDidMount() {
    this.props.getProducts(this.toggleTableLoading);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.products) {
      this.setState({ products: nextProps.products });
    }
  }

  render() {
    const {
      is_table_loading,
      is_modal_loading,
      products,
      show_modal,
    } = this.state;

    return (
      <div>
        <Row>
          <AddProduct
            show_modal={show_modal}
            is_modal_loading={is_modal_loading}
            toggleModal={this.toggleModal}
            toggleModalLoading={this.toggleModalLoading}
            toggleTableLoading={this.toggleTableLoading}
          />
          <Col md={"12"}>
            <LoadingOverlay
              active={is_table_loading}
              spinner
              text="Please Wait..."
            >
              <Card>
                <CardHeader>
                  Products
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
                        <th>1 صورة</th>
                        <th>2 صورة</th>
                        <th>3 صورة</th>
                        <th>اسم – انجليزي</th>
                        <th>اسم – عربي</th>
                        <th>تاريخ الادخال</th>
                        <th>حالة التفعيل</th>
                        <th>الاجراءات</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products &&
                        products.map((item, idx) => {
                          return (
                            <Fragment>
                              <tr key={idx}>
                                <th scope="row">{idx + 1}</th>
                                <td>
                                  {item.img1 ? (
                                    <img
                                      src={item.img1}
                                      alt={item.en_name}
                                      style={{ maxWidth: "75px" }}
                                    />
                                  ) : (
                                    ""
                                  )}
                                </td>
                                <td>
                                  {item.img2 ? (
                                    <img
                                      src={item.img2}
                                      alt={item.en_name}
                                      style={{ maxWidth: "75px" }}
                                    />
                                  ) : (
                                    ""
                                  )}
                                </td>
                                <td>
                                  {item.img3 ? (
                                    <img
                                      src={item.img3}
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
                                      onClick={this.markproduct.bind(this, {
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
                                      onClick={this.markproduct.bind(this, {
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
                                      onClick={this.markproduct.bind(this, {
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
                            </Fragment>
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
    product: state.product.product,
    products: state.product.products,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    getProducts,
    selectproduct,
    markproduct,
    uploadImg,
  })(Products)
);
