/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/jsx-handler-names */
import React from 'react';
import PropTypes from 'prop-types';
import StarNestedItem from './StarNestedItem';
import { getRandomID } from '../../lib/utilities';
import '../../assets/components/starList/star-item.scss';

class StarItem extends React.PureComponent {
  state = {
    showItems: false,
  };

  toggleItemsView = () => {
    const { showItems } = this.state;
    this.setState({ showItems: !showItems });
  };

  getClassName = () => {
    const { showItems } = this.state;
    const openClassText = !showItems ? '' : 'open';
    document
      .querySelectorAll('.star-list-item--guts')
      .forEach(elem => elem.classList.remove('open'));
    return ['star-list-item--guts', openClassText].join(' ');
  };

  render() {
    // eslint-disable-next-line react/destructuring-assignment
    const { name, datapoints } = this.props.star;

    return (
      <li key={name} className="star-list-item">
        <h4 className="title" onClick={this.toggleItemsView}>
          {name}
        </h4>
        <ul className={this.getClassName()}>
          <div>Alerts</div>
          {datapoints.map(data => (
            <StarNestedItem
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
