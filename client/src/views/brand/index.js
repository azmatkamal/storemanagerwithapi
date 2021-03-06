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
  //Table,
  Button,
  Badge,
} from "reactstrap";
import moment from "moment";
import DataTable from "react-data-table-component";
import AddBrand from "./addBrand";
import Model from "../model";

import { getBrands, selectBrand, markbrand } from "../../redux/brand/action";

class Brands extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // OTHERS
      show_modal: false,
      selected_brand: "",
      brandDetails: {},
      is_table_loading: false,
      is_modal_loading: false,

      // Data
      brands: [],
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

  toggleModel = (brand) => {
    this.setState({ selected_brand: brand._id, brandDetails: brand });
  };

  markbrand = (data) => {
    if (window.confirm("Would like to proceed with this action?")) {
      this.props.markbrand(data, this.toggleTableLoading);
    }
  };

  updateRow = (brand) => {
    this.toggleModal();
    if (!brand) {
      this.props.selectBrand({});
    } else {
      this.props.selectBrand(brand);
    }
  };

  componentDidMount() {
    this.props.getBrands(this.toggleTableLoading);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.brands) {
      this.setState({
        brands: nextProps.brands.map((item, idx) => ({
          ...item,
          index: idx + 1,
        })),
      });
    }
  }

  onCloseModel = () => {
    this.setState({ selected_brand: "" });
  };

  actionFormater = (row) => {
    let item = row;
    return (
      <div>
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
            onClick={this.markbrand.bind(this, {
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
            onClick={this.markbrand.bind(this, {
              id: item._id,
              is_active: false,
              is_deleted: item.is_deleted,
            })}
            title="Disable Account"
          >
            <i className="fa fa-times"></i>
          </Button>
        )}
        <Button
          size="xs"
          color="danger"
          className="mr-2"
          onClick={this.markbrand.bind(this, {
            id: item._id,
            is_active: item.is_active,
            is_deleted: true,
          })}
          title="Delete"
        >
          <i className="fa fa-trash"></i>
        </Button>
        <Button
          size="xs"
          color="success"
          className="mr-2"
          onClick={this.toggleModel.bind(this, item)}
          title="Models"
        >
          <i className="fa fa-list-alt"></i>
        </Button>
      </div>
    );
  };

  createdAtFormater = (row) => {
    let item = row;
    return <div>{moment(item.createdAt).format("DD/MM/YYYY")}</div>;
  };

  iconFormator = (row) => {
    return (
      <Fragment>
        {row.icon ? (
          <img src={row.icon} alt={row.en_name} style={{ maxWidth: "75px" }} />
        ) : (
          ""
        )}
      </Fragment>
    );
  };

  statusFormat = (row) => {
    let item = row;
    return item.is_active ? (
      <Badge color="primary" outline>
        Active
      </Badge>
    ) : (
      <Badge color="danger" outline>
        Inactive
      </Badge>
    );
  };

  render() {
    const {
      is_table_loading,
      is_modal_loading,
      brands,
      show_modal,
      selected_brand,
      brandDetails,
    } = this.state;

    const columns = [
      // {
      //   name: "Id",
      //   selector: "index",
      //   maxWidth: "50px",
      // },
      {
        name: "Icon",
        selector: "icon",
        format: this.iconFormator,
      },
      {
        name: "EN Name",
        selector: "en_name",
      },
      {
        name: "Ar Name",
        selector: "ar_name",
      },
      {
        name: "Created At",
        selector: "created_at",
        format: this.createdAtFormater,
        minWidth: "75px",
      },
      {
        name: "Status",
        selector: "status",
        format: this.statusFormat,
        maxWidth: "75px",
      },
      {
        name: "Actions",
        selector: "id",
        format: this.actionFormater,
        minWidth: "250px",
      },
    ];

    return (
      <div>
        <Row>
          <AddBrand
            show_modal={show_modal}
            is_modal_loading={is_modal_loading}
            toggleModal={this.toggleModal}
            toggleModalLoading={this.toggleModalLoading}
            toggleTableLoading={this.toggleTableLoading}
          />
          <Col md={selected_brand ? "6" : "12"}>
            <LoadingOverlay
              active={is_table_loading}
              spinner
              text="Please Wait..."
            >
              <Card>
                <CardHeader>
                  Brands
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
                  <DataTable
                    noHeader={true}
                    columns={columns}
                    data={brands}
                    pagination
                  />
                </CardBody>
              </Card>
            </LoadingOverlay>
          </Col>
          {selected_brand && (
            <Col md={selected_brand ? "6" : "12"}>
              <Model
                brand={selected_brand}
                brandDetails={brandDetails}
                closeSection={this.onCloseModel}
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
    brand: state.brand.brand,
    brands: state.brand.brands,
  };
};

export default withRouter(
  connect(mapStateToProps, { getBrands, selectBrand, markbrand })(Brands)
);
