import React from "react";
// import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import PropTypes from "prop-types";
import {truncateAddress} from "../../utils";
const Address = ({ address }) => {
  if (address) {
    return (
        <button type='button' className='secondary-btn'>

          {/* format user wallet address to a more suitable display */}
          {truncateAddress(address)}
        </button>
    );
  }

  return null;
};

Address.propTypes = {
  address: PropTypes.string,
};

Address.defaultProps = {
  address: "",
};

export default Address;
