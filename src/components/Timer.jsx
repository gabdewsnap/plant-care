import { useEffect, useState } from 'react';
import {styled} from 'styled-components'

const TimerBar = styled.span`
  background-color: red;
  height: 3px;
  width: ${({ $width }) => $width};
  transform-origin: left center;
  transform: scaleX(0);
  animation: shrinkTransform ${({ $duration }) => $duration}s linear forwards;

  @keyframes shrinkTransform {
    from { transform: scaleX(1); }
    to   { transform: scaleX(0); }
  }
`;



export default function Timer({rounds, fullWidth, failedAttempt}){
  const [duration, setDuration] = useState(5)

  useEffect(() => {
    (duration >= 1 ) && setDuration(prev => prev - .1);
    console.log(duration);
  }

    , [rounds])
  // const duration = rounds - ;

  return(
    <TimerBar key={rounds} $duration={duration} $width={fullWidth} onAnimationEnd={()=>{failedAttempt()}}></TimerBar>
  )
}