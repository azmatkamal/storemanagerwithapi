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
import AddCity from "./addCity";

import { getAds, selectAd, markad } from "../../redux/main_ads/action";
import { getCountries } from "../../redux/country/action";

class Countries extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // OTHERS
      show_modal: false,
      is_table_loading: false,
      is_modal_loading: false,

      // Data
      cities: [],
      countries: [],
      selected_filtered_country: "",
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

  updateRow = (city) => {
    this.toggleModal();
    if (!city) {
      this.props.selectAd({});
    } else {
      this.props.selectAd(city);
    }
  };

  componentDidMount() {
    this.props.getCountries(() => {});
    this.props.getAds(this.toggleTableLoading);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.ads) {
      this.setState({ ads: nextProps.ads });
    }
    if (nextProps && nextProps.countries) {
      this.setState({
        countries: nextProps.countries.filter((c) => c.is_active === true),
      });
    }
  }

  openExternalLink = (link) => {
    window.open(link, "_blank");
  };

  render() {
    const {
      is_table_loading,
      is_modal_loading,
      ads,
      show_modal,
      countries,
      selected_filtered_country,
    } = this.state;

    let filtered_ads = selected_filtered_country
      ? ads.filter((i) => i.country._id === selected_filtered_country)
      : ads;

    return (
      <div>
        <Row>
          <AddCity
            show_modal={show_modal}
            is_modal_loading={is_modal_loading}
            toggleModal={this.toggleModal}
            toggleModalLoading={this.toggleModalLoading}
            toggleTableLoading={this.toggleTableLoading}
          />
          <Col md={12}>
            <FormGroup>
              <Label for="selected_filtered_country">Select Country</Label>
              <Input
                style={{ maxWidth: "200px" }}
                type="select"
                name="selected_filtered_country"
                onChange={this.onChange}
                id="selected_filtered_country"
                value={selected_filtered_country}
                placeholder="Select Country"
              >
                <option value="">Select Country</option>
                {countries &&
                  countries.map((item, idx) => {
                    return (
                      <option value={item._id} key={idx}>
                        {item.en_name + " " + item.ar_name}
                      </option>
                    );
                  })}
              </Input>
            </FormGroup>
          </Col>
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
                  <Table responsive striped bordered>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Icon</th>
                        <th>Link</th>
                        <th>Country</th>
                        <th>Created At</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered_ads &&
                        filtered_ads.map((item, idx) => {
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
                              <td>
                                <span
                                  onClick={this.openExternalLink.bind(
                                    this,
                                    item.link
                                  )}
                                  style={{ color: "blue", cursor: "pointer" }}
                                >
                                  {item.link}
                                </span>
                              </td>
                              <td>
                                {item.country.en_name} - {item.country.ar_name}
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
                                {item.user_type !== "1" && (
                                  <Button
                                    size="xs"
                                    color="danger"
                                    onClick={this.markad.bind(this, {
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
    ad: state.ad.ad,
    ads: state.ad.ads,
    countries: state.country.countries,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    getAds,
    selectAd,
    markad,
    getCountries,
  })(Countries)
);
