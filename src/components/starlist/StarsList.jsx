import React from 'react';
import PropTypes from 'prop-types';
import StarList from './Star';
import { getRandomID } from '../../lib/utilities';

class StarsList extends React.PureComponent {
  render() {
    const { stars } = this.props;
    return (
      <ul>
        {stars.map(star => (
          <StarList key={`${getRandomID(star.name)}_id`} star={star} />
        ))}
      </ul>
    );
  }
}

// PropTypes
StarsList.propTypes = {
  stars: PropTypes.object.isRequired,
};

export default StarsList;
