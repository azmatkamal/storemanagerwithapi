import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

class Alert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: {},
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.alerts && nextProps.alerts.alerts) {
      this.createNotification(
        nextProps.alerts.alerts.type,
        nextProps.alerts.alerts.msg
      );
    }
  }

  createNotification = (type, msg) => {
    switch (type) {
      case "info":
        NotificationManager.info(msg);
        break;
      case "success":
        NotificationManager.success(msg);
        break;
      case "warning":
        NotificationManager.warning(msg);
        break;
      case "error":
        NotificationManager.error(msg);
        break;
      default:
        break;
    }
  };

  render() {
    return <NotificationContainer />;
  }
}

Alert.propTypes = {
  alerts: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alerts,
});

export default connect(mapStateToProps)(Alert);
