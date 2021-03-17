import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Alert } from "@material-ui/lab";

const AlertLayout = ({ alerts }) =>
  alerts.length > 0 &&
  alerts.map((alert) => (
    <Alert
      style={{ marginTop: "5px", marginBottom: "5px" }}
      key={alert.id}
      severity={`${alert.alertType}`}
    >
      {alert.msg} -{" "}
      {alert.alertType === "error" ? (
        <strong>Check it out!</strong>
      ) : (
        <strong>Nice job!</strong>
      )}
    </Alert>
  ));

AlertLayout.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps, {})(AlertLayout);
