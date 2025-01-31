import React, { Component } from 'react';
import Navbar from './Navbar';
import Container from './Container';
import Footer from './Footer';
import Banner from './Banner';
import images from '../images';

class ClickyGame extends Component {
  state = {
    score: 0,
    highScore: 0,

    navMsgColor: '',

    navMessage: 'Click an image to begin the metal!',

  
    allCharacters: this.shuffleArray(),

   
    wasClicked: [],

    shake: false
  };

  
  clickEvent = this.checkClicked.bind(this);

 
  shuffleArray() {

    const newArr = images.slice();

   
    const shuffleArr = [];

   
    while (newArr.length > 0) {
      shuffleArr.push(newArr.splice(Math.floor(Math.random() * newArr.length), 1)[0]);
    }

    return shuffleArr;
  }

  checkClicked(clickedElem) {
   
    const prevState = this.state.wasClicked.slice();

    
    const shuffled = this.shuffleArray();

    
    let score = this.state.score;
    let highScore = this.state.highScore;

  
    if (!this.state.wasClicked.includes(clickedElem)) {
      
      if (score === highScore) {
        score++;
        highScore++;

        
      } else {
        score++;
      }

      
      prevState.push(clickedElem);
    }

    
    if (this.state.wasClicked.includes(clickedElem)) {
      let score = 0;
      return this.setState({
        score: score,
        highScore: highScore,
        navMsgColor: 'incorrect',
        navMessage: 'WRONG!',
        allCharacters: shuffled,
        wasClicked: [],
        shake: true
      });
    }

    
    this.setState({
      score: score,
      highScore: highScore,
      navMsgColor: 'correct',
      navMessage: 'Whatever',
      allCharacters: shuffled,
      wasClicked: prevState,
      shake: false
    });

    
    return setTimeout(() => this.setState({ navMsgColor: '' }), 500);
  }

  
  render() {
    const state = this.state;
    return (
      <div>
        <Navbar
          score={state.score}
          highScore={state.highScore}
          navMessage={state.navMessage}
          navMsgColor={state.navMsgColor}
        />
        <Banner />
        <Container
          shake={state.shake}
          characters={state.allCharacters}
          clickEvent={this.clickEvent}
        />
        <Footer />
      </div>
    );
  }
}

export default ClickyGame;