import React from 'react';
// import CircularProgress from 'react-md/lib//Progress/CircularProgress';
import ScatterPlot from './components/scatter-plot';
import { AntaresClient } from './lib/utilities';

class Big extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      loading: true,
    };

    this.antares = new AntaresClient();
  }

  async componentDidMount() {
    const ra = 58.044708;
    const dec = -8.506381;
    const radius = 1 / 3200;

    this.antares
      .getLightCurves(ra, dec, radius)
      .then(res => {
        this.setState(prevState => ({
          ...prevState,
          loading: false,
          data: res,
        }));
      })
      .catch(err => {
        console.log('error pulling data', err);
      });
  }

  formatData(data) {
    return data.map(datum => {
      return { data: datum.datapoints };
    });
  }

  renderStarData(data) {
    return (
      <li>
        <div>Alert: {data.alert_id}</div>
        <ul>
          <li>X: {data.x}</li>
          <li>Y: {data.y}</li>
        </ul>
      </li>
    );
  }

  renderStar(star) {
    return (
      <li key={star.name}>
        <h4>{star.name}</h4>
        <div>Alerts</div>
        <ul>
          {star.datapoints.map(data => {
            return this.renderStarData(data);
          })}
        </ul>
      </li>
    );
  }

  renderStars(data) {
    return (
      <ul>
        {data.map(star => {
          return this.renderStar(star);
        })}
      </ul>
    );
  }

  render() {
    const { loading, data } = this.state;
    return (
      <>
        {!loading && (
          <ScatterPlot
            data={this.formatData(data)}
            xDomain={[58710, 58780]}
            yDomain={[21, 17.5]}
            xValueAccessor="x"
            yValueAccessor="y"
            xAxisLabel="Time"
            yAxisLabel="Magnitude"
            preSelected
            multiple
          />
        )}
        {!loading && this.renderStars(data)}
      </>
    );
  }
}

export default Big;
