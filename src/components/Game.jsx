import {useEffect, useState, useMemo, useRef} from 'react'
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
  align-items:start;
  justify-content:center;
  position: relative;
  height: 100px;
  ${props => props.$rounds > 30 &&`
    justify-content: start;
  `}
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
  const [isShowingIcon, setShowingIcon] = useState(true);
  const [relativePosition, setRelativePosition] = useState("relative")
  const [careIcons, setCareIcons] = useState([["💧", "sound.mp3"], ["☀️", "sound.mp3"], ["💩", "fart.mp3"]]);
  const [buttonPositions, setButtonPositions] = useState(Array(3).fill().map(() => ({ top: 0, left: 0 })));
  const hasShuffled = useRef(false);
  const [playToot] = useSound('/public/sounds/Toot.mp3', {volume: 1});
  const plantImgs = ["/images/plant1.png", "/images/plant2.png", "/images/plant3.png", "/images/plant4.png", "/images/plant5.png", "/images/plant6.png"];
  const iconSize = 50;


  //shuffles the careIcons array around
  const shuffle = array => {
    const sortedArr = structuredClone(array);
    for (let i = sortedArr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [sortedArr[i], sortedArr[j]] = [sortedArr[j], sortedArr[i]];
    }
    return sortedArr;
  }

  
  //shuffles icons after 5 round
  const shuffledIcons = useMemo(() => {
    return score >= 10 ? shuffle(careIcons) : careIcons;
  }, [careIcons, score]);
  
  //generate random top and left positions
  function getRandomPosition() {
    return {
      top: Math.floor(Math.random() *100), 
      left: Math.floor(Math.random() *100)
    }
  }

  //function to compare positions to see if there is any overlap
  function isOverlapping(a, b) {
    return !(
      a.left + iconSize < b.left ||
      a.left > b.left + iconSize ||
      a.top + iconSize < b.top ||
      a.top > b.top + iconSize
    )
  }

  //generate positions that dont overlap
  function getNonOverlappingPositions() {
    const newPositions = [];
    shuffledIcons.forEach(() => {
      let pos, attempts = 0;
      do {
        pos = getRandomPosition();
        attempts++;
      } while (
        newPositions.some(e => isOverlapping(e, pos)) &&
        attempts < 50
      );
      newPositions.push(pos);
    });
    return newPositions;
  }


  // 
  function shuffleIconsPosition(){
    setButtonPositions(prev => getNonOverlappingPositions())
    //checking if the buttons have been shuffled so I can set the position to absolute once
    if (!hasShuffled.current) {
      hasShuffled.current = true
      setRelativePosition("absolute")
    }
  }


  useEffect(()=>{   
      //add additional icon after 10 rounds
      if(score >= 5 && careIcons.length === 3){
        setCareIcons(prev => [...prev, ["💗", "love.mp3"]])
      }

      //randomize position of icons after so many rounds
      if(score >= 15){
        shuffleIconsPosition();
      }
      
      //randomize the icon that is meant to be matched
      setRandomIcon(shuffledIcons[Math.floor(Math.random() * 3)][0]);  

      setTimeout(() => {
        setShowingIcon(false);
      }, 250);
  }, [rounds])


  function checkAnswer(care){
    //play funny sound hehe 
    if( care === "💩"){
      playToot();
    }

    if(care === randomIcon){
      //after 15 consectively won round, increase the plant index (visualizing it "growing")
      if((rounds && consecutiveWins > 0) && (consecutiveWins % 14 === 0) && (plantIndex < plantImgs.length) ){
        setPlantIndex(prev => prev + 1);
      }
      setConsecutiveWins(prev => prev + 1);
      addScore();
    }
    else{
      //if wrong guess set back the plant growth
      if(plantIndex >= 1){
        setPlantIndex(prev => prev - 1);
      }
   
      setConsecutiveWins(0);
      addStrikes();
    }

    setShowingIcon(true);
    addRounds(); 
  }

  return(
    <div className="game-container">
      <Plant>
        <RandomIcon className={isShowingIcon ? 'icon-shown' : 'icon-hidden'} >{randomIcon}</RandomIcon>
        <img src={plantImgs[plantIndex]} className='plants'/>
        <Hint className="hints" firstStrike={firstStrike} rounds={rounds}/>
      </Plant>

      <Buttons $rounds={rounds}>
        {shuffledIcons.map((care, index) => (
          <button 
            key={index} 
            className={"icon-btns"} 
            onClick={() => checkAnswer(care[0])} 
            style={{
              position: `${relativePosition}`,
              top: `${buttonPositions[index]?.top || 0}%`,
              left: `${buttonPositions[index]?.left || 0}%`,
              transition: 'top 0.3s, left 0.3s'
            }}>
              {care[0]}
          </button>
        ))}
      </Buttons>
    </div>
  )
}