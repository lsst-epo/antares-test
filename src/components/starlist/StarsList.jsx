import React from 'react';
import PropTypes from 'prop-types';
import StarItem from './StarItem';
import { getRandomID } from '../../lib/utilities';
import '../../assets/components/starList/stars-list.scss';

class StarsList extends React.PureComponent {
  render() {
    const { stars } = this.props;
    return (
      <ul className="stars-list">
        {stars.map(star => (
          <StarItem key={`${getRandomID(star.name)}_id`} star={star} />
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
