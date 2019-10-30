import React from 'react';
// import CircularProgress from 'react-md/lib//Progress/CircularProgress';
import ScatterPlot from './components/scatter-plot';
import { AntaresClient } from './lib/utilities';
import StarsList from './components/starlist/StarsList';
import ToggleUpperLimit from './components/toggleUpperLimit';

class Big extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      loading: true,
      upperLimit: false,
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

  toggleUpperLimit = e => {
    const isChecked = e.target.checked;
    const { data } = this.state;
    const newData = this.filterOutUpperLimit(data, isChecked);
    this.setState(prevState => ({
      ...prevState,
      upperLimit: isChecked,
      data: newData,
    }));
  };

  filterOutUpperLimit(data, nofilter) {
    const { upperLimit } = this.state;
    const showUpperlimit = nofilter || upperLimit;
    if (!showUpperlimit) {
      return data.filter(dataset => {
        return dataset.name.search(/Upper Limit/i) < 0;
      });
    }
    return data;
  }

  formatData(data) {
    return data.map((datum, index) => {
      return {
        data: datum.datapoints,
        className: `dataset-alert-${index + 1}`,
      };
    });
  }

  buildLegend(data) {
    return data.map((datum, index) => {
      return (
        <div key={datum.name} className="container-flex centered spaced">
          <div className="set-name">{datum.name}</div>
          <div
            className={`data-point dataset-alert-${index + 1} background-color`}
          />
        </div>
      );
    });
  }

  render() {
    const { upperLimit, loading, data } = this.state;
    const renderData = !data ? {} : this.filterOutUpperLimit(data);
    return (
      <div className="container-flex container-page">
        <div className="col-width-50 scrollable">
          {!loading && (
            <ToggleUpperLimit
              upperLimit={upperLimit}
              toggleUpperLimit={this.toggleUpperLimit}
            />
          )}
          {!loading && <StarsList stars={renderData} />}
        </div>
        <div className="col-width-50 padded col-fixed">
          {!loading && (
            <ScatterPlot
              data={this.formatData(renderData)}
              xDomain={[58710, 58780]}
              yDomain={[21, 17.5]}
              xValueAccessor="x"
              yValueAccessor="y"
              xAxisLabel="Time"
              yAxisLabel="Magnitude"
              legend={this.buildLegend(renderData)}
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
