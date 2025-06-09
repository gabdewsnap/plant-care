import {useEffect, useState, useMemo} from 'react'
import {styled} from 'styled-components'
import useSound from 'use-sound';
// import loveSfx from '../../public/sounds/love.mp3';
// import waterSfx from '../../public/sounds/water.mp3';
// import sunSfx from '../../public/sounds/sun.mp3';
// import tootSfx from './../public/sounds/Toot.mp3'
import Hint from "./Hint.jsx"
import React from 'react'

// STYLED COMPONENTS
const Buttons = styled.section`
  display:flex;
  align-items:center;
  justify-content:center;
`

const Plant = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items:center;
  position: relative;
  margin: 2rem 0;
  width: 100%

`
const RandomIcon = styled.p`
  position: absolute;
  top: 0;
`


export default function Game({addRounds, addStrikes, addScore, rounds, score, firstStrike}){

  const [plantIndex, setPlantIndex] = useState(0)
  const [randomIcon, setRandomIcon] = useState();
  const [consecutiveWins, setConsecutiveWins] = useState(0);
  const [isShowingIcon, setShowingIcon] = React.useState(true);
  const [careIcons, setCareIcons] = useState([["💧", "sound.mp3"], ["☀️", "sound.mp3"], ["💩", "fart.mp3"]]);
  const [playToot] = useSound('/public/sounds/Toot.mp3', {volume: 1});
  const plantImgs = ["🌱", "🌿", "🌳", "🌺", "💐"];
  const deadPlant = "🌾";


  const shuffle = array => {
    const sortedArr = structuredClone(array);
    for (let i = sortedArr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [sortedArr[i], sortedArr[j]] = [sortedArr[j], sortedArr[i]];
    }
    return sortedArr;
  }

  const shuffledIcons = useMemo(() => {
    return score >= 5 ? shuffle(careIcons) : careIcons;
  }, [careIcons, score]);
  

  useEffect(()=>{   
      if(score >= 50 && careIcons.length === 3){
        setCareIcons(prev => [...prev, ["💗", "love.mp3"]])
      }
      
      setRandomIcon(shuffledIcons[Math.floor(Math.random() * 3)][0]);  
      // setShowingIcon(true);
      setTimeout(() => {
        setShowingIcon(false);
      }, 10);
  }, [rounds])


  function checkAnswer(care){
    if( care === "💩"){
      playToot();
    }

    if(care === randomIcon){
      if((rounds && consecutiveWins > 0) && (consecutiveWins % 14 === 0) && (plantIndex < plantImgs.length) ){
        setPlantIndex(prev => prev + 1);
      }
      setConsecutiveWins(prev => prev + 1);
      addScore();
    }
    else{
      if(plantIndex >= 1){
        setPlantIndex(prev => prev - 1);
      }
   
      setConsecutiveWins(0);
      addStrikes();
      
    }

    setShowingIcon(true);
    addRounds(); 
  }


  // <img alt="plant whomst which you are providing care to"/>
  // using paragrpahs elemenst as place holders for images for now 
  return(
    <div className="game-container">
      <Plant>
        <RandomIcon className={isShowingIcon ? 'icon-shown' : 'icon-hidden'} >{randomIcon}</RandomIcon>
        <p>{plantImgs[plantIndex]}</p>
        <Hint className="hints" firstStrike={firstStrike} rounds={rounds}/>
      </Plant>

      <Buttons>
        {shuffledIcons.map((care, index) => (
          <button key={index} className={"icon-btns"} onClick={() => checkAnswer(care[0])}>
              {care[0]}
          </button>
        ))}
      </Buttons>
    </div>
  )
}