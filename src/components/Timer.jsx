import {styled} from 'styled-components'
import {useState, useEffect} from 'react'

const TimerBar = styled.span`
   background-color: red;
   height: 3px;
   width: 100%;
   transition: width ${({ $duration }) => $duration}s ease;
`



export default function Timer({rounds}){
  const [duration, setDuration] = useState(2); // initial duration

  useEffect(() => {
    const random = Math.random() * 3 + 0.5; // e.g. between 0.5 and 3.5s
    setDuration(random);
  }, [rounds]);
  

  return(
    
    <TimerBar $duration={duration}></TimerBar>
  
  )
}