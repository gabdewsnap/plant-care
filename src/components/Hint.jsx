
// bottom hint should pop up if the wrong icon is hit in the first three rounds
import {styled} from 'styled-components'

const FirstHint = styled.div`
    position: absolute;
    width: 45%;
    font-size: 1rem;
    left: 0;
    
  `

  const StrikeHint = styled(FirstHint)`
    position: absolute;
    left: auto;
    right: 0;
  `


export default function Hint({firstStrike, rounds}){
  
  return(
    <>
      {(rounds === 0) && 
      
        <FirstHint>
          <div>
            <img />
            <p>How to Play: <br/> an icon will appear here - hit the matching icon here</p>
          </div>
        </FirstHint>
      }

      
      {firstStrike && (rounds < 3) && <StrikeHint>not quite! you've recieved a strike for selecting incorrectly. careful, two more strikes and you're out! :(</StrikeHint>}
    </>
    
  )
}