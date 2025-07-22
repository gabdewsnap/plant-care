 import * as htmlToImage from 'html-to-image';
 import { copyImageToClipboard } from 'copy-image-clipboard'
 import {styled} from 'styled-components'

const EndGame = styled.section`
  display:flex;
  flex-direction: column;
  align-items:center;
  justify-content:center;
`

//Show dead plant on screen but when sharing result show plant player ended with?
//Include link to game as well.
 
 export default function GameOver({resetGame, score}){

    const deadPlant = "🌾";
    
    function endingPhrase(){
      if(score < 15) return `you only loved your plant ${score}x times :(`
      else if(score < 50) return `your plant had more potiential! you loved it ${score}x times. try loving it more :)`
      else if(score < 100) return `wow! you have lots of love to give! you loved your plant ${score}x times!`
      else if (score < 150) return `woowzers! you've given you're plant ${score}x love!`
    }

    function shareResults(){

      const node = document.getElementById('capture');
      // TO DO ADD DATE TO IMAGE
      htmlToImage
        .toJpeg(node, { quality: 0.95, backgroundColor: 'white' })
        .then((dataUrl) => {
          copyImageToClipboard(dataUrl)
            .then(() => {
              window.alert('Results Copied')
            })
            .catch((e) => {
              console.log('Error: ', e.message)
            })
        })
        .catch((err) => {
          console.error('oops, something went wrong!', err);
        });
    }
    
    return(
      <>
        <EndGame id="capture" >
            <p>{deadPlant}</p>
            <p className="final-score">{endingPhrase()}</p>
        </EndGame>

        <button onClick={shareResults}>Share Results</button>       
        <button onClick={resetGame}>Play Again?</button>
      </>
    )
 }