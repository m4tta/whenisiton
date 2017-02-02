import React, { Component, PropTypes } from 'react';

import Search from '../Components/Search';

class Home extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.BackgroundRotator();
  }

  BackgroundRotator() {
    const backgrounds = [
      {name: 'Arrow', image: 'https://image.tmdb.org/t/p/w1920/dXTyVDTIgeByvUOUEiHjbi8xX9A.jpg'},
      {name: 'Better Call Saul', image: 'https://image.tmdb.org/t/p/w1920/ljik3PqnobCL9fNYJRrDD8eTuFe.jpg'},
      {name: 'Breaking Bad', image: 'https://image.tmdb.org/t/p/w1920/eSzpy96DwBujGFj0xMbXBcGcfxX.jpg'},
      {name: 'Black Sails', image: 'https://image.tmdb.org/t/p/w1920/5dMcDvKxqPgzSitf4cz6ug1P4Pv.jpg'},
      {name: 'Colony', image: 'https://image.tmdb.org/t/p/w1920/10oorhbji4xt0RAYwMDWX4UCmGh.jpg'},
      {name: 'Dark Matter', image: 'https://image.tmdb.org/t/p/w1920/3oYbblv7fGQJMRV5DohgYba3pxr.jpg'},
      {name: 'Designated Survivor', image: 'https://image.tmdb.org/t/p/w1920/eq8mvitSr3wWSoYtsYLtHsmqxL4.jpg'},
      {name: 'Game of Thrones', image: 'https://image.tmdb.org/t/p/w1920/kdV0qUQYczM3eL82q4pIgP51lNT.jpg'},
      // {name: 'Game of Thrones', image: 'https://image.tmdb.org/t/p/w1920/6AfC51zwWOEgCMXPlWKGHXMbDdq.jpg'}, // too much black
      {name: 'Grimm', image: 'https://image.tmdb.org/t/p/w1920/ocWDGFHxddYWcZYeenO1y7ULeIi.jpg'},
      {name: 'Good Behavior', image: 'https://image.tmdb.org/t/p/w1920/mJ3UigMk8alBe5fVSMHUNY7oWon.jpg'},
      {name: 'House of Cards', image: 'https://image.tmdb.org/t/p/w1920/3RognQsjLyE50cy5VMo28auGe9q.jpg'},
      {name: 'Homeland', image: 'https://image.tmdb.org/t/p/w1920/4g3L3tKGZBemEupyqEzaPcJ7Tcu.jpg'},
      {name: 'Incorporated', image: 'https://image.tmdb.org/t/p/w1920/dTcp50GZVvusHp9Bw9hRlOaTyhg.jpg'},
      {name: 'Lucifer', image: 'https://image.tmdb.org/t/p/w1920/mcj4ZAh1WlswDx5i0xK1VIV03W7.jpg'},
      {name: 'Marvel\'s Jessica Jones', image: 'https://image.tmdb.org/t/p/w1920/ihzq7HgeInN7iz8Y9K5yb71LVDJ.jpg'},
      {name: 'Mr. Robot', image: 'https://image.tmdb.org/t/p/w1920/toZQ9IN51cQMzy6fruBZ6024No3.jpg'},
      {name: 'Silicon Valley', image: 'https://image.tmdb.org/t/p/w1920/8vk5R31KG5UQTAwTVEBxn65NSB.jpg'},
      {name: 'Suits', image: 'https://image.tmdb.org/t/p/w1920/iU2cObod4GoHAcgrc5AtfwIVizL.jpg'},
      {name: 'Supernatural', image: 'https://image.tmdb.org/t/p/w1920/o9OKe3M06QMLOzTl3l6GStYtnE9.jpg'},
      {name: 'The Blacklist', image: 'https://image.tmdb.org/t/p/w1920/6yDkRqCqpGkCvX49onaqG605gct.jpg'},
      {name: 'The Expanse', image: 'https://image.tmdb.org/t/p/w1920/beIjmWr3OBOtcWK4tKMObOIDJ1C.jpg'},
      {name: 'The Flash', image: 'https://image.tmdb.org/t/p/w1920/9NzRllYCJyvn8SUnif6HyHPvLNH.jpg'},
      {name: 'The Last Ship', image: 'https://image.tmdb.org/t/p/w1920/20txnfxxmpvqOdDqIiy2hO06qqG.jpg'},
      {name: 'The Magicians', image: 'https://image.tmdb.org/t/p/w1920/lYy3CCH3CLmTpzi2zT3sIMQjUvh.jpg'},
      {name: 'The Strain', image: 'https://image.tmdb.org/t/p/w1920/pCKjrXsvzdq2CFH3OJJ03VeaIQr.jpg'},
      {name: 'The Walking Dead', image: 'https://image.tmdb.org/t/p/w1920/zYFQM9G5j9cRsMNMuZAX64nmUMf.jpg'},
      {name: 'The 100', image: 'https://image.tmdb.org/t/p/w1920/6hUX0tzbd68NIIVVrqX1Ozdz4k7.jpg'},
    ];

    const index = _.random(backgrounds.length-1);

    document.body.style.backgroundImage = `url(${backgrounds[index].image})`;
    this.setState({placeholderText: backgrounds[index].name})
  }

  render() {

    return (
      <div className="container">
        <Search/>
      </div>
    );
  }

}

export default Home;
