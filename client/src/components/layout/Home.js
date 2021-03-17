import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Home = ({ auth: { isAuthenticated } }) => {
  return (
    <Fragment>
      <h1>Am I Authenticated? {isAuthenticated ? "TRUE" : "FALSE"} </h1>
    </Fragment>
  );
};

Home.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(Home);
