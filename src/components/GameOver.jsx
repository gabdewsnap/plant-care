
import Alert from './Alert';
import { useState } from 'react';


 
 export default function GameOver({resetGame, score}){

    const [alertVisible, setAlertVisible] = useState(false);
    
    function endingPhrase(){
      if(score < 15) return `you only loved your plant ${score}x times :(`
      else if(score < 50) return `your plant had more potiential! you loved it ${score}x times. try loving it more :)`
      else if(score < 100) return `wow! you have lots of love to give! you loved your plant ${score}x times!`
      else if (score < 150) return `woowzers! you've given you're plant ${score}x love!`
    }

    function copyToClipboard() {
     
      navigator.clipboard.writeText("🌱 " + endingPhrase() + " 🌱 " + `\nvisit here to try for a higher score + link `)
        .then(() => {
          setAlertVisible(true);
        })
        .catch(err => {
          console.error("Failed to copy text: ", err)
        })
      }
    
    return(
      <>
        <p className="final-score delius-unicase-regular fs-3 m-3">{endingPhrase()}</p>
        <button onClick={copyToClipboard} className="p-3 rounded-3 fs-3 delius-unicase-regular my-4 game-btn">Share Results</button>       
        <button onClick={resetGame} className="p-3 rounded-3 fs-3 delius-unicase-regular my-4 game-btn">Play Again?</button>

        <Alert message="Copied to clipboard!"  isVisible={alertVisible} onClose={() => setAlertVisible(false)}/>
      </>
    )
 }
