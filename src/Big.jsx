import React from 'react';
import CircularProgress from 'react-md/lib//Progress/CircularProgress';
// import API from './components/site/API';
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

  // constructConeSearch() {
  //   return 'https://antares.noao.edu/api/alerts/cone_search/?';
  // }

  async componentDidMount() {
    const ra = 58.044708;
    const dec = -8.506381;
    const radius = 1 / 3200;

    const data = await this.antares
      .getLightCurves(ra, dec, radius)
      .catch(err => {
        // console.log(err);
        console.log('error pulling data', err);
      });
    this.setState(prevState => ({
      ...prevState,
      loading: false,
      data,
    }));
  }

  render() {
    const { loading, data } = this.state;

    return (
      <div>
        <h1>Giant data set</h1>
        {loading && (
          <CircularProgress
            scale={4}
            value={loading}
            className="chart-loader"
          />
        )}
        {!loading && (
          <>
            <span>stuff</span>
            <ul>
              {data.map((galaxy, i) => {
                /* eslint-disable */
                return <div key={galaxy.name + '-' + i}>stuff</div>;
                /* eslint-enable */
                // eslint-enable
                // return (
                //   <li key={`${galaxy.RA}-${galaxy.redshift}`}>
                //     <h3>Galaxy: {i + 1}</h3>
                //     <ul>
                //       <li>RA: {galaxy.RA}</li>
                //       <li>Dec: {galaxy.Dec}</li>
                //       <li>Redshift: {galaxy.redshift}</li>
                //       <li>Mass: {galaxy.stellar_mass}</li>
                //     </ul>
                //   </li>
                // );
              })}
            </ul>
          </>
        )}
      </div>
    );
  }
}

export default Big;
