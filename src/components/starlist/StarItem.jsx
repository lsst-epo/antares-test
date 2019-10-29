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
    isOpen: false,
  };

  toggleItemsView = e => {
    const { target } = e;
    if (!target.classList.contains('open')) {
      target.classList.add('open');
      this.setState({ isOpen: true });
    } else {
      target.classList.remove('open');
      this.setState({ isOpen: false });
    }
  };

  getClassName = () => {
    const { isOpen } = this.state;
    const openClassText = !isOpen ? null : 'open';
    if (!openClassText) this.setState({ isOpen: false });
    return openClassText;
  };

  render() {
    // eslint-disable-next-line react/destructuring-assignment
    const { star, listIndex } = this.props;

    return (
      <li key={star.name} className={`star-list-item ${this.getClassName()}`}>
        <h4 className="title" onClick={this.toggleItemsView}>
          <span
            className={`data-point dataset-alert-${listIndex +
              1} background-color`}
          />
          {star.name}
          <div className="flex" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
            <path fill="none" d="M0 0h24v24H0V0z" />
          </svg>
        </h4>
        <ul className="star-list-item--guts">
          <div>Alerts</div>
          {star.datapoints.map(data => (
            <StarNestedItem
              key={`${getRandomID(star.name)}_star_id`}
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
  listIndex: PropTypes.string.isRequired,
};

export default StarItem;
