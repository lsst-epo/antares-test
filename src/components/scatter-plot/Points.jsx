import React from 'react';
import PropTypes from 'prop-types';
import includes from 'lodash/includes';
import classnames from 'classnames';
import Point from './Point.jsx';

class Points extends React.PureComponent {
  render() {
    const {
      data,
      selectedData,
      hoveredData,
      xScale,
      yScale,
      xValueAccessor,
      yValueAccessor,
      pointClasses,
      // includeSun,
    } = this.props;
    // console.log(data);

    const groupClasses = classnames('data-points', {
      [pointClasses]: pointClasses,
    });

    return (
      <g className={groupClasses}>
        {data.map((d, i) => {
          const { source_id: id } = d;
          const key = `point-${id}-${i}`;
          const selected = includes(selectedData, d);
          const hovered = includes(hoveredData, d);
          const classes = classnames(`data-point-${id} data-point`, {
            [pointClasses]: pointClasses,
            selected,
            hovered,
            'not-active':
              (selectedData || hoveredData) && !selected && !hovered,
          });

          return (
            <Point
              key={key}
              classes={classes}
              selected={selected}
              hovered={hovered}
              x={xScale(d[xValueAccessor])}
              y={yScale(d[yValueAccessor])}
            />
          );
        })}
      </g>
    );
  }
}

Points.propTypes = {
  data: PropTypes.array,
  selectedData: PropTypes.bool,
  hoveredData: PropTypes.bool,
  xValueAccessor: PropTypes.string,
  yValueAccessor: PropTypes.string,
  xScale: PropTypes.string,
  yScale: PropTypes.string,
  pointClasses: PropTypes.string,
};

export default Points;
