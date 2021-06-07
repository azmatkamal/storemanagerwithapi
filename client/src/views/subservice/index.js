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
  // Table,
  Button,
  Badge,
  // FormGroup,
  // Label,
  // Input,
} from "reactstrap";
import moment from "moment";
import DataTable from "react-data-table-component";
import AddSubService from "./addSubService";

import {
  getSubServices,
  selectSUbService,
  marksubservice,
} from "../../redux/subservice/action";
import { getServices } from "../../redux/service/action";

class Subservuce extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // OTHERS
      show_modal: false,
      is_table_loading: false,
      is_modal_loading: false,

      // Data
      subservices: [],
      serviceDetails: {},
      services: [],
      selected_filtered_service: "",
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

  marksubservice = (data) => {
    if (window.confirm("Would like to proceed with this action?")) {
      this.props.marksubservice(data, this.toggleTableLoading);
    }
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  updateRow = (city) => {
    this.toggleModal();
    if (!city) {
      this.props.selectSUbService({});
    } else {
      this.props.selectSUbService(city);
    }
  };

  componentDidMount() {
    this.props.getSubServices(this.toggleTableLoading);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.subservices) {
      this.setState({
        subservices: nextProps.subservices.map((item, idx) => ({
          ...item,
          index: idx + 1,
        })),
      });
    }
    if (nextProps && nextProps.service) {
      this.setState({
        selected_filtered_service: nextProps.service,
      });
    }
    if (nextProps && nextProps.serviceDetails) {
      this.setState({
        serviceDetails: nextProps.serviceDetails,
      });
    }
  }

  onCloseSection = () => {
    this.props.closeSection();
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
            onClick={this.marksubservice.bind(this, {
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
            onClick={this.marksubservice.bind(this, {
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
          onClick={this.marksubservice.bind(this, {
            id: item._id,
            is_active: item.is_active,
            is_deleted: true,
          })}
          title="Delete"
        >
          <i className="fa fa-trash"></i>
        </Button>
      </div>
    );
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

  createdAtFormater = (row) => {
    let item = row;
    return <div>{moment(item.createdAt).format("DD/MM/YYYY")}</div>;
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
      subservices,
      show_modal,
      selected_filtered_service,
      serviceDetails,
    } = this.state;

    // console.log(selected_filtered_service, "selected_filtered_service");

    let filtered_subservices = selected_filtered_service
      ? subservices.filter((i) => i.service._id === selected_filtered_service)
      : subservices;

    const columns = [
      // {
      //   name: "Id",
      //   selector: "index",
      //   maxWidth: "50px",
      // },
      {
        name: "Ar Name",
        selector: "ar_name",
      },
      {
        name: "Price",
        selector: "price",
      },
      {
        name: "Created At",
        selector: "created_at",
        format: this.createdAtFormater,
        minWidth: "100px",
      },
      {
        name: "Status",
        selector: "status",
        format: this.statusFormat,
        maxWidth: "100px",
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
          <AddSubService
            show_modal={show_modal}
            is_modal_loading={is_modal_loading}
            toggleModal={this.toggleModal}
            service={selected_filtered_service}
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
                  Sub Services
                  {serviceDetails &&
                    serviceDetails.ar_name &&
                    ` - ${serviceDetails.ar_name}`}{" "}
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
                  <DataTable
                    noHeader={true}
                    columns={columns}
                    data={filtered_subservices}
                    pagination
                  />
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
    subservice: state.subservice.subservice,
    subservices: state.subservice.subservices,
    services: state.service.services,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    getSubServices,
    selectSUbService,
    marksubservice,
    getServices,
  })(Subservuce)
);
