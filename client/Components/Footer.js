import React from 'react';

class Footer extends React.Component {

  render() {
    return (
      <div className="footer">
        <div className="attribute">
        <span>This product uses the TMDb API but is not endorsed or certified by TMDb.</span>
          <a href="https://www.themoviedb.org">
            <img className='logo' src="https://www.themoviedb.org/assets/static_cache/22af8ff1419ab3b085608e48ae299d1e/images/v4/logos/stacked-green.svg" />
          </a>
        </div>
      </div>
    );
  }

}

export default Footer;
