/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/jsx-handler-names */
import React from 'react';
import PropTypes from 'prop-types';
import '../assets/components/toggle-upper-limit.scss';

class ToggleUpperLimit extends React.PureComponent {
  render() {
    const { upperLimit, toggleUpperLimit } = this.props;
    return (
      <div className="input-container checkbox">
        <input
          type="checkbox"
          id="upper-limit"
          checked={upperLimit}
          onClick={toggleUpperLimit}
        />
        <label htmlFor="upper-limit">View Upper Limit</label>
      </div>
    );
  }
}

ToggleUpperLimit.propTypes = {
  upperLimit: PropTypes.bool.isRequired,
  toggleUpperLimit: PropTypes.func.isRequired,
};

export default ToggleUpperLimit;
