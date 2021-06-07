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
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import moment from "moment";
import DataTable from "react-data-table-component";
import AddAd from "./addAd";

import { getAds, selectAd, markad } from "../../redux/main_ads/action";

class Ads extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // OTHERS
      show_modal: false,
      is_table_loading: false,
      is_modal_loading: false,

      // Data
      ads: [],
      selected_filtered_ad: "",
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

  markad = (data) => {
    if (window.confirm("Would like to proceed with this action?")) {
      this.props.markad(data, this.toggleTableLoading);
    }
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  updateRow = (ad) => {
    this.toggleModal();
    if (!ad) {
      this.props.selectAd({});
    } else {
      this.props.selectAd(ad);
    }
  };

  componentDidMount() {
    this.props.getAds(this.toggleTableLoading);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.ads) {
      this.setState({
        ads: nextProps.ads.map((item, idx) => ({
          ...item,
          index: idx + 1,
        })),
      });
    }
  }

  openExternalLink = (link) => {
    window.open(link, "_blank");
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
            onClick={this.markad.bind(this, {
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
            onClick={this.markad.bind(this, {
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
          onClick={this.markad.bind(this, {
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

  createdAtFormater = (row) => {
    let item = row;
    return <div>{moment(item.createdAt).format("DD/MM/YYYY")}</div>;
  };

  iconFormator = (row) => {
    if (row.media_type === "image") {
      return <img src={row.icon} alt={row.name} style={{ maxWidth: "75px" }} />;
    } else if (row.media_type === "gif") {
      return <img src={row.icon} alt={row.name} style={{ maxWidth: "75px" }} />;
    } else if (row.media_type === "video") {
      return (
        <video
          className="video-container video-container-overlay"
          autoPlay=""
          controls
          data-reactid=".0.1.0.0"
          style={{ maxHeight: "150px", width: "auto" }}
        >
          <source data-reactid=".0.1.0.0.0" src={row.icon} />
        </video>
      );
    } else {
      return "";
    }
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
    const { is_table_loading, is_modal_loading, ads, show_modal } = this.state;

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
        name: "Name",
        selector: "name",
      },
      {
        name: "Tel",
        selector: "tel",
      },
      {
        name: "Internal Link",
        selector: "internal_link",
        format: (row) => {
          return (
            <div
              onClick={() => this.openExternalLink(this, row.external_link)}
              style={{ cursor: "pointer", color: "blue" }}
            >
              Link
            </div>
          );
        },
      },
      {
        name: "External Link",
        selector: "external_link",
        format: (row) => {
          return (
            <div
              onClick={() => this.openExternalLink(this, row.external_link)}
              style={{ cursor: "pointer", color: "blue" }}
            >
              Link
            </div>
          );
        },
      },
      {
        name: "Created At",
        selector: "created_at",
        format: this.createdAtFormater,
        minWidth: "200px",
      },
      {
        name: "Status",
        selector: "status",
        format: this.statusFormat,
      },
      {
        name: "Actions",
        selector: "id",
        minWidth: "200px",
        format: this.actionFormater,
      },
    ];

    return (
      <div>
        <Row>
          <AddAd
            show_modal={show_modal}
            is_modal_loading={is_modal_loading}
            toggleModal={this.toggleModal}
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
                  Manage Main Ads
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
                    data={ads}
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
    ad: state.ad.ad,
    ads: state.ad.ads,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    getAds,
    selectAd,
    markad,
  })(Ads)
);
