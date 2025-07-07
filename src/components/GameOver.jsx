 import * as htmlToImage from 'html-to-image';
 import { copyImageToClipboard } from 'copy-image-clipboard'
 import {styled} from 'styled-components'

const EndGame = styled.section`
  display:flex;
  flex-direction: column;
  align-items:center;
  justify-content:center;
`
 
 export default function GameOver({resetGame, score}){

    const deadPlant = "🌾";
    
    function endingPhrase(){
      if(score < 15) return `you only loved your plant ${score}x times :(`
      else if(score < 50) return `your plant had more potiential! you loved it ${score}x times. try loving it more :)`
      else if(score < 100) return `wow! you have lots of love to give! you loved your plant ${score}x times!`
      else if (score < 150) return `woowzers! you've given you're plant ${score}x love!`
    }

    function shareResults(){
    //  htmlToImage
    //   .toCanvas(document.getElementById('capture'))
    //   .then(function (canvas) {
    //     document.body.appendChild(canvas);
    //   });

      const node = document.getElementById('capture');

      htmlToImage
        .toJpeg(node, { quality: 0.95, backgroundColor: 'white' })
        .then((dataUrl) => {
          console.log(dataUrl)
          copyImageToClipboard(dataUrl          )
            .then(() => {
              console.log('Image Copied')
            })
            .catch((e) => {
              console.log('Error: ', e.message)
            })

          
          //failed to execute 'write' on 'clipboard': the clipboard api has blocked because of permissions policy applied to the current document
          // think this doesn't work because in scrimba "browser"

        //  copyImageToClipboard(dataUrl)
        // .then(() => {
        //   alert('results copied to clipboard')
        // })
        // .catch((e) => {
        //   console.error('Error: ', e.message)
        // })

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