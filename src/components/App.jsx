import { useState } from 'react'
import {styled} from 'styled-components'
import {Row, Col} from 'react-bootstrap';
import '../styles.css';
import Game from './Game.jsx'
import Strikes from './Strikes.jsx'
import GameOver from './GameOver.jsx'
import Timer from './Timer.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';


const Title = styled.h1`
  margin: .5rem 0;
  font-size: 2em;
  text-align: center;
`

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width : 350px
` 


function App() {

  const [rounds, setRounds] = useState(0)
  const [score, setScore] = useState(0)
  const [strikes, setStrikes] = useState(0)
  const [firstStrike, setfirstStrike] = useState(false) 
  const [playingGame, setPlayingGame] = useState(false)
  const [randNumTimer, setRandNumTimer] = useState(0)



  function togglePlayGame(){
    setPlayingGame(prev => !prev);
  }

  function addStrikes(){
    setStrikes(prev => prev + 1);

    if(strikes ==- 3){
      setGameOver(prev => !prev)
    }

    if(strikes === 0){
        setfirstStrike(true);
    }
  }

  function randomizedAnimationTimer(){
    setRandNumTimer(Math.floor(Math.random() * 6)); 
  }

  function addRounds(){
    setRounds(prev => rounds + 1);
    if(firstStrike === true){
        setfirstStrike(false);
    }
  }

  function addScore(){
    setScore(prev => score + 1);
  }

  function resetGame(){
    setStrikes(0);
    setRounds(0);
    setScore(0);
  }



  // TO DO:
  // - handle functionality to show random "care" ✔️
  // -pass the index to button and compare if they match = point ✔️
  // - if not match then = strike ✔️
  // - find way to display notes only on first 1-3 turns  ✔️
  // -keep track of "turn" ✔️ using score instead 
  // - want the pop up to over lay the image of plant and have comic style urgent border
  // - create array of emojis to map and make button components each with index and on click function? ✔️
  // - love button not to show until after 10 rounds ✔️
  // - score keeping ✔️
  // - timer
  // - ramp up difficulty after so many rounds
  // - plant grows after so many points 10? ✔️
  // - a strike regresses the plant growth ✔️
  // - withered version of plant if reaches 3rd strike?
  // - share results page
  // - ramp up difficulty after so many rounds // fade after awhile then a timer? 
  //      - timer counting down? if icon not chosen  == strike 
  // - add fade to icons when they pop up ✔️
  // - update 2d array with icon & sound to be array of objects with value: sound: 
// 
  return (


    <div className="app">

      <Title>Plant Care</Title>

      {!playingGame && 
      <Container>
        <p>love the plant and fullfill its needs!</p>
        <button onClick={togglePlayGame}> Play Game</button>
      </Container> }
      
      {(playingGame && strikes < 3) && 
      <Container>
      
        <Row className="score-strikes">
          <Col xs={4}><span>{score}</span></Col>
          <Col xs={4}><Timer addStrikes={addStrikes} rounds={rounds}/></Col>
          <Col xs={4}><Strikes strikes={strikes} randNumTimer={randNumTimer}/></Col>   
        </Row>
        
        <Game addStrikes={addStrikes} 
              addRounds={addRounds} 
              addScore={addScore} 
              rounds={rounds} 
              score = {score}
              strikes={strikes} 
              firstStrike={firstStrike}/>
      </Container>}

      {(strikes === 3) && 
        <GameOver resetGame={resetGame} score={score} />
      }
    </div>
  )
}

export default App
