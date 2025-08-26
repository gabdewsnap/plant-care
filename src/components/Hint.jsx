
// bottom hint should pop up if the wrong icon is hit in the first three rounds
import {styled} from 'styled-components'
import '../styles.css';

const FirstHint = styled.div`
    position: absolute;
    width: 60%;
    left: -25%;
    top: 60%;
    font-size: 1.25rem;

    @media (max-width: 768px) {
      width: 100px;
      left: 2%;
      top: 50%;
      font-size: 1rem;
    }
  `
  const SecondHint = styled(FirstHint)`
    position: absolute;
    top: 25%;
    left: 90%;
    font-size: 1.25rem;

     @media (max-width: 768px) {
      width: 150px;
      left: 55%;
      top: 10%;
      text-align: end;
      font-size: 1rem;
    }
  `
  const FirstSquiggle = styled.img`
    position: absolute;
    top: -135%;
    width:25%;
    transform: rotateY(180deg);
    rotate: 60deg;
    left:0%;
    
     @media (max-width: 768px) {
      left: 45%;
      top: -50%;
      
    }
  `

  const SecondSquiggle = styled.img`
    position: absolute;
    left:50%;
    bottom: -100%;
    width:25%;
    rotate: 25deg;

    @media (max-width: 768px) {
      width: 50%;
      left:35%;
      bottom: -50%;
      
    }
  `

    const ThirdSquiggle = styled.img`
    position: absolute;
    top: -150%;
    width:50%;
    rotate: 320deg;
    left:40%;

    @media (max-width: 768px) {
      width: 100%;
      left:15%;
      top: -75%;
      
    }
  `




export default function Hint({firstStrike, rounds}){
  
  return(
    <>
      {(rounds === 0) && 
      
        <FirstHint>
            <ThirdSquiggle src="/svg/squiggle-3.svg"/>
            <p className="delius-unicase-regular"><u>How to Play: </u><br/> an icon will appear here - hit the matching icon here </p>
            <SecondSquiggle src="/svg/squiggle-1.svg"/>
        </FirstHint>
      }
      
      {firstStrike && (rounds < 3) && 
      <SecondHint> 
        <FirstSquiggle src="/svg/squiggle-1.svg"/>
        <p className="delius-unicase-regular">not quite! you've recieved a strike for selecting incorrectly. careful, two more strikes and you're out! :(</p>
      </SecondHint>}
    </>
    
  )
}