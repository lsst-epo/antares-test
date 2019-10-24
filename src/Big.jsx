import React from 'react';
// import CircularProgress from 'react-md/lib//Progress/CircularProgress';
import ScatterPlot from './components/scatter-plot';
import { AntaresClient } from './lib/utilities';
import StarsList from './components/starlist/StarsList';

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
        // eslint-disable-next-line no-console
        console.log('error pulling data', err);
      });
  }

  formatData(data) {
    return data.map((datum, index) => {
      return {
        data: datum.datapoints,
        className: `dataset-alert-${index + 1}`,
      };
    });
  }

  render() {
    const { loading, data } = this.state;
    return (
      <div className="container-flex">
        <div className="col-width-50">
          {!loading && <StarsList stars={data} />}
        </div>
        <div className="col-width-50 padded">
          {!loading && (
            <ScatterPlot
              data={this.formatData(data)}
              xDomain={[58710, 58780]}
              yDomain={[21, 17.5]}
              xValueAccessor="x"
              yValueAccessor="y"
              xAxisLabel="Time"
              yAxisLabel="Magnitude"
              showColorLegend
              preSelected
              multiple
            />
          )}
        </div>
      </div>
    );
  }
}

export default Big;
