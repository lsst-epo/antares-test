import React from 'react';
import PropTypes from 'prop-types';

class StarNestedList extends React.PureComponent {
  render() {
    // eslint-disable-next-line react/destructuring-assignment
    const { alert_id: alertId, x, y } = this.props.starData;
    return (
      <li>
        <div>Alert: {alertId}</div>
        <ul>
          <li>X: {x}</li>
          <li>Y: {y}</li>
        </ul>
      </li>
    );
  }
}

StarNestedList.propTypes = {
  starData: PropTypes.object.isRequired,
  alert_id: PropTypes.string.isRequired,
  x: PropTypes.string.isRequired,
  y: PropTypes.string.isRequired,
};

export default StarNestedList;
