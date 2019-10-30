import React from 'react';
import PropTypes from 'prop-types';
import '../../assets/components/starList/star-nested-item.scss';

class StarNestedList extends React.PureComponent {
  render() {
    // eslint-disable-next-line react/destructuring-assignment
    const { alert_id: alertId, x, y, error } = this.props.starData;
    return (
      <li className="star-nested-item">
        <div>Alert: {alertId}</div>
        <ul>
          <li>X: {x}</li>
          <li>Y: {y}</li>
          {error && <li>error: +/- {error}</li>}
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
  error: PropTypes.string.isRequired,
};

export default StarNestedList;
