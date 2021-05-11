import React, { Component } from "react";

import {
  Card,
  CardBody,
  Row,
  Col,
  CardHeader,
  Table,
  Button,
  Collapse,
  Badge,
} from "reactstrap";
import moment from "moment";
import { slideDown, slideUp } from "../animate";

class UserTableRow extends Component {
  state = { expanded: false };

  toggleExpander = (e) => {
    if (!this.state.expanded) {
      this.setState({ expanded: true }, () => {
        if (this.refs.expanderBody) {
          slideDown(this.refs.expanderBody);
        }
      });
    } else {
      slideUp(this.refs.expanderBody, {
        onComplete: () => {
          this.setState({ expanded: false });
        },
      });
    }
  };

  render() {
    const { item, idx } = this.props;
    return [
      <tr key={idx} onClick={this.toggleExpander}>
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
            onClick={this.props.updateRow.bind(this, item)}
            title="Update"
          >
            <i className="fa fa-pencil"></i>
          </Button>
          {!item.is_active && (
            <Button
              size="xs"
              color="success"
              className="mr-2"
              onClick={this.props.markCountry.bind(this, {
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
              onClick={this.props.markCountry.bind(this, {
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
              onClick={this.props.markCountry.bind(this, {
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
            onClick={this.props.toggleCities.bind(this, item._id)}
            title="Cities"
          >
            <i className="fa fa-list-alt"></i>
          </Button>
        </td>
      </tr>,
      this.state.expanded && <tr className="expandable" key="tr-expander"></tr>,
    ];
  }
}

export default UserTableRow;
