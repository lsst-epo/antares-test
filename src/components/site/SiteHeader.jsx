import React from 'react';
import { Link } from 'react-router-dom';
import Toolbar from 'react-md/lib/Toolbars/Toolbar';
// import SiteNav from './SiteNav';
import logo from '../../assets/images/lsst-logo.svg';

class SiteHeader extends React.PureComponent {
  render() {
    return (
      <Toolbar
        colored
        fixed
        title="LSST"
        titleClassName="screen-reader-only"
        className="header-primary"
      >
        <Link to="/" className="logo-wrapper">
          <span className="screen-reader-only">Home</span>
          <img aria-hidden src={logo} alt="LSST Logo" className="site-logo" />
        </Link>
      </Toolbar>
    );
  }
}

export default SiteHeader;
