import { useState } from 'react'
import {styled} from 'styled-components'
import {Row, Col} from 'react-bootstrap';
import '../styles.css';
import Game from './Game.jsx'
import Strikes from './Strikes.jsx'
import GameOver from './GameOver.jsx'
import Timer from './Timer.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';


 const Title = styled.img`
  width: 500px;

  @media (max-width: 768px) {
    width: 375px;
  }
`

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 500px;

   @media (max-width: 768px) {
    width: 375px;
  }
` 

export default function App() {
  const [rounds, setRounds] = useState(0)
  const [score, setScore] = useState(0)
  const [strikes, setStrikes] = useState(0)
  const [firstStrike, setfirstStrike] = useState(false) 
  const [playingGame, setPlayingGame] = useState(false)

  function addStrikes(){
    setStrikes(prev => prev + 1);

    if(strikes === 3){
      setGameOver(prev => !prev)
    }

    if(strikes === 0){
        setfirstStrike(true);
    }
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

  function failedAttempt(){  
      addStrikes();
      addRounds(); 
  }

  function resetGame(){
    setStrikes(0);
    setRounds(0);
    setScore(0);
  }

  return (
    <div className="app">
      <Container>
        <Title src="/images/title.png" alt="plant love logo"/>

        {!playingGame && 
        <Container>
          <p className='delius-unicase-regular fs-3 '>love the plant and fullfill its needs!</p>
          <button className='p-3 rounded-3 fs-3 delius-unicase-regular mt-5 game-btn' onClick={() => setPlayingGame(prev => !prev)}> Play Game</button>
        </Container> }
        
        {(playingGame && strikes < 3) && 
        
        <Container>
          <Row className="score-strikes">
            <Col xs={4}><span className='delius-unicase-regular fs-2'>{score}</span></Col>
            {(rounds >= 25 ) ? <Col xs={4}><Timer failedAttempt={failedAttempt} rounds={rounds} fullWidth='100%'/></Col> : <Col xs={4}/>}
            <Col xs={4}><Strikes strikes={strikes} /></Col>   
          </Row>
          
          <Game addStrikes={addStrikes} 
                addRounds={addRounds} 
                addScore={addScore} 
                failedAttempt={failedAttempt}
                rounds={rounds} 
                score = {score}
                strikes={strikes} 
                firstStrike={firstStrike}/>
        </Container>}

        {(strikes === 3) && 
          <GameOver resetGame={resetGame} score={score} />
        }
      </Container>
    </div>
  )
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
  // - ramp up difficulty after so many rounds✔️
  // - plant grows after so many points 10? ✔️
  // - a strike regresses the plant growth ✔️
  // - withered version of plant if reaches 3rd strike?
  // - share results page
  // - ramp up difficulty after so many rounds // fade after awhile then a timer? 
  //      - timer counting down? if icon not chosen  == strike 
  // - add fade to icons when they pop up ✔️
  // - update 2d array with icon & sound to be array of objects with value: sound: 
// 