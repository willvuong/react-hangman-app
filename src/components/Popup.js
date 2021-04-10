import { useEffect } from 'react'

const Popup = ({ correctLetters, wrongLetters, selectedWord, setPlayable, playAgain}) => {
    let finalMessage = '';
    let correctWord = '';
    let playable = true;

    const checkWinOrLose = (correctLetters, wrongLetters, selectedWord) => {
        let status = 'win'

        selectedWord.split('').forEach(letter => { //split word into individual letters 
            if(!correctLetters.includes(letter)){
                status = ''
            }
        })

        if(wrongLetters.length === 6) {
            status = 'lose'
        }

        return status;
    }

    if(checkWinOrLose(correctLetters, wrongLetters, selectedWord) === 'win') {
        finalMessage = 'You win!'
        playable = false
    } else if (checkWinOrLose(correctLetters, wrongLetters, selectedWord) === 'lose') {
        finalMessage = 'You lose!'
        correctWord = 'The word was: ' + selectedWord
        playable = false;
    }
    
    useEffect(() => setPlayable(playable))

    return (
        <div className="popup-container" style={finalMessage !== '' ? {display:'flex'} : {}}>
            <div className="popup">
                <h2>{finalMessage}</h2>
                <h3>{correctWord}</h3>
                <button onClick={playAgain}>Play Again</button>
            </div>
        </div>
    )
}

export default Popup
