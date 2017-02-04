import React from 'react';

class Footer extends React.Component {

  render() {
    return (
      <div className="footer">
        <div className="attribute">
        <span>This product uses the TMDb API but is not endorsed or certified by TMDb.</span>
          <a href="https://www.themoviedb.org">
            <img className='logo' src="https://www.themoviedb.org/assets/static_cache/2dceae11589334eecd61443249261daf/images/v4/logos/208x226-stacked-green.png" />
          </a>
        </div>
      </div>
    );
  }

}

export default Footer;
