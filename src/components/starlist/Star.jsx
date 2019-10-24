import React from 'react';
import PropTypes from 'prop-types';
import StarNestedList from './StarNestedList';
import { getRandomID } from '../../lib/utilities';

class StarItem extends React.PureComponent {
  render() {
    // eslint-disable-next-line react/destructuring-assignment
    const { name, datapoints } = this.props.star;
    return (
      <li key={name}>
        <h4>{name}</h4>
        <div>Alerts</div>
        <ul>
          {datapoints.map(data => (
            <StarNestedList
              key={`${getRandomID(name)}_star_id`}
              starData={data}
            />
          ))}
        </ul>
      </li>
    );
  }
}

// PropTypes
StarItem.propTypes = {
  star: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  datapoints: PropTypes.object.isRequired,
};

export default StarItem;
