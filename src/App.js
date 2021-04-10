import { useState, useEffect } from 'react'

import './App.css';
import Header from './components/Header.js'
import Figure from './components/Figure.js'
import WrongLetters from './components/WrongLetters.js'
import Word from './components/Word.js'
import Notification from './components/Notification.js'
import Popup from './components/Popup';

//hardcoded words
const words = ['application', 'programming', 'interface', 'tyranny', 'onomatopoeia', 'television']
//randomly selects a word from 'words' array
let selectedWord = words[Math.floor(Math.random() * words.length)]

const App = () => {

  const [correctLetters, setCorrectLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [playable, setPlayable] = useState(true) //only ever false once you win or lose; able to reset to true once you play again
  const [notification, setNotification] = useState(false) //popup to show you have entered the same letter more than once

  useEffect(() => {
    const handleKeydown = event => {
      console.log(selectedWord)
      const { key, keyCode } = event

      if (playable && keyCode >= 65 && keyCode <= 90) { //keycode = letter keys on keyboard
        const letter = key.toLowerCase();

        if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetters(currentLetters => [...currentLetters, letter]); //creates new array with our current letters + additional correct letters
          } else {
            showNotification(setNotification)
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters(wrongLetters => [...wrongLetters, letter]);
          } else {
            showNotification(setNotification)
          }
        }
      }

    }
    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
    //^^^ allows only one eventlistener to be running at a time 
  }, [correctLetters, wrongLetters, playable]); //any time any of these 3 get updated, the useEffect will be called

  const showNotification = (notification) => {
    notification(true)
    setTimeout(() => [
      notification(false)
    ], 2000)
  }

  const playAgain = () => {
    setPlayable(true)

    setCorrectLetters([])
    setWrongLetters([])

    let newWord = words[Math.floor(Math.random() * words.length)]
    selectedWord = newWord
  }

  return (
    <div className="app">
      <Header />
      <div className="game-container">
        <Figure wrongLetters={wrongLetters}/>
        <WrongLetters wrongLetters={wrongLetters}/>
        <Word selectedWord={selectedWord} correctLetters={correctLetters} />
      </div>
     <Notification notification={notification} />
     <Popup correctLetters={correctLetters} wrongLetters={wrongLetters} selectedWord={selectedWord} setPlayable={setPlayable} playAgain={playAgain}/>
    </div>
  );
}

export default App;
