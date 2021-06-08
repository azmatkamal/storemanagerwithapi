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
import AddColor from "./addColor";

import { getColors, selectcolor, markcolor } from "../../redux/color/action";

class Colors extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // OTHERS
      show_modal: false,
      selected_color: "",
      is_table_loading: false,
      is_modal_loading: false,

      // Data
      colors: [],
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

  markcolor = (data) => {
    if (window.confirm("Would like to proceed with this action?")) {
      this.props.markcolor(data, this.toggleTableLoading);
    }
  };

  updateRow = (color) => {
    this.toggleModal();
    if (!color) {
      this.props.selectcolor({});
    } else {
      this.props.selectcolor(color);
    }
  };

  componentDidMount() {
    this.props.getColors(this.toggleTableLoading);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.colors) {
      this.setState({
        colors: nextProps.colors.map((item, idx) => ({
          ...item,
          index: idx + 1,
        })),
      });
    }
  }

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
            onClick={this.markcolor.bind(this, {
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
            onClick={this.markcolor.bind(this, {
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
            onClick={this.markcolor.bind(this, {
              id: item._id,
              is_active: item.is_active,
              is_deleted: true,
            })}
            title="Delete"
          >
            <i className="fa fa-trash"></i>
          </Button>
        )}
      </div>
    );
  };

  createdAtFormater = (row) => {
    let item = row;
    return <div>{moment(item.createdAt).format("DD/MM/YYYY")}</div>;
  };

  codeFormator = (row) => {
    return (
      <Fragment>
        <div
          style={{
            width: "auto",
            height: "auto",
            padding: "5px",
            background: row.code,
            border: "1px solid black",
            display: "inline-block",
            marginLeft: "10px",
            marginRight: "10px",
          }}
        ></div>
        <div
          style={{
            display: "inline-block",
          }}
        >
          {row.code}
        </div>
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
    const { is_table_loading, is_modal_loading, colors, show_modal } =
      this.state;

    const columns = [
      // {
      //   name: "Id",
      //   selector: "index",
      //   maxWidth: "50px",
      // },
      {
        name: "Code",
        selector: "code",
        format: this.codeFormator,
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
      },
    ];

    return (
      <div>
        <Row>
          <AddColor
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
                  Colors
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
                    data={colors}
                    pagination
                  />

                  {/* <BootstrapTable data={colors}>
                    <TableHeaderColumn
                      dataField="id"
                      isKey={true}
                      dataAlign="center"
                      dataSort={true}
                    >
                      #
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="code"
                      dataFormat={this.codeFormator}
                    >
                      Code
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="en_name">
                      En Name
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="ar_name">
                      Ar Name
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="id"
                      dataFormat={this.createdAtFormater}
                    >
                      Created At
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="id"
                      dataFormat={this.statusFormat}
                    >
                      Status
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="id"
                      dataFormat={this.actionFormater}
                    >
                      Action
                    </TableHeaderColumn>
                  </BootstrapTable> */}
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
    color: state.color.color,
    colors: state.color.colors,
  };
};

export default withRouter(
  connect(mapStateToProps, { getColors, selectcolor, markcolor })(Colors)
);
