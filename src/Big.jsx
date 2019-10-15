import React from 'react';
import CircularProgress from 'react-md/lib//Progress/CircularProgress';
import API from './components/site/API';

class Big extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      galaxies: {},
      loading: true,
    };
  }

  constructConeSearch() {
    return 'https://antares.noao.edu/api/alerts/cone_search/?';
  }

  componentDidMount() {
    const ra = 58.044708;
    const dec = -8.506381;
    const radius = 1 / 3200;

    axios.get(
      `https://antares.noao.edu/api/alerts/cone_search/?ra=${ra}&dec=${dec}&radius=${radius}`
    );
    // 'https://antares.noao.edu/api/alerts/cone_search/?ra={ra}&dec={dec}&radius{radius}&limit=10&offset=0'

    // API.get('static-data/SDSS_SpecGals_DR8.json').then(res => {
    //   this.setState(prevState => ({
    //     ...prevState,
    //     galaxies: res.data.galaxies,
    //     loading: false,
    //   }));
    // });
  }

  render() {
    const { galaxies, loading } = this.state;

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
          <span>stuff</span>
          // <ul>
          //   {galaxies.map((galaxy, i) => {
          //     return (
          //       <li key={`${galaxy.RA}-${galaxy.redshift}`}>
          //         <h3>Galaxy: {i + 1}</h3>
          //         <ul>
          //           <li>RA: {galaxy.RA}</li>
          //           <li>Dec: {galaxy.Dec}</li>
          //           <li>Redshift: {galaxy.redshift}</li>
          //           <li>Mass: {galaxy.stellar_mass}</li>
          //         </ul>
          //       </li>
          //     );
          //   })}
          // </ul>
        )}
      </div>
    );
  }
}

export default Big;
