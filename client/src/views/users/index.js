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
import AddUser from "./addUser";

import { getUsers, selectUser, markAccount } from "../../redux/users/action";

class Users extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // OTHERS
      show_modal: false,
      is_table_loading: false,
      is_modal_loading: false,

      // Data
      users: [],
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

  markAccount = (data) => {
    if (window.confirm("Would like to proceed with this action?")) {
      this.props.markAccount(data, this.toggleTableLoading);
    }
  };

  updateRow = (user) => {
    this.toggleModal();
    if (!user) {
      this.props.selectUser({});
    } else {
      console.log(user, "user");
      this.props.selectUser(user);
    }
  };

  componentDidMount() {
    this.props.getUsers(this.toggleTableLoading);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.users) {
      this.setState({
        users: nextProps.users.users.map((item, idx) => ({
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
            onClick={this.markAccount.bind(this, {
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
            onClick={this.markAccount.bind(this, {
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
          onClick={this.markAccount.bind(this, {
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
    return (
      <Fragment>
        {row.avatar ? (
          <img
            src={row.avatar}
            alt={row.first_name}
            style={{ maxWidth: "75px" }}
          />
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
    const { is_table_loading, is_modal_loading, users, show_modal } =
      this.state;

    const columns = [
      // {
      //   name: "Id",
      //   selector: "index",
      //   maxWidth: "50px",
      // },
      {
        name: "Avatar",
        selector: "avatar",
        format: this.iconFormator,
      },
      {
        name: "First Name",
        selector: "first_name",
      },
      {
        name: "Last Name",
        selector: "last_name",
      },
      {
        name: "Email",
        selector: "email",
      },
      {
        name: "Mobile",
        selector: "mobile",
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
          <AddUser
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
                  Manage USers
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
                    data={users}
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
    users: state.users,
  };
};

export default withRouter(
  connect(mapStateToProps, { getUsers, selectUser, markAccount })(Users)
);
