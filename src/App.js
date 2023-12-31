import './App.css';
import Keyboard from './components/Keyboard';
import Board from './components/Board';
import { createContext, useEffect, useState } from 'react';
import { boardDefault, generateWordSet } from './Words';
import GameOver from './components/GameOver';
import axios from 'axios';

export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({attempt: 0, letterPosition: 0})
  const [wordSet, setWordSet] = useState(new Set())
  const [disabledLetters, setDisabledLetters] = useState([])
  const [correctWord, setCorrectWord] = useState("")
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessedWord: false
  })
  const [pokemonData, setPokemonData] = useState(null);

  useEffect(() => {
    // Define a function to fetch data
    const fetchData = async () => {
      try {
        // Make an API request to fetch data based on 'correctWord'
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${correctWord}`);

        // Update the state with the received data
        setPokemonData(response.data);
      } catch (error) {
        // Handle any errors here
        console.error('Error fetching data:', error);
      }
    };

    if (correctWord) {
      fetchData(); // Call the fetch function when 'correctWord' changes
    }
  }, [correctWord]);

  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet)
      setCorrectWord(words.randomWord)
    })
  }, [])

  const onSelectLetter = (keyVal) => {
    if(currAttempt.letterPosition > correctWord.length) return;
        
    const newBoard = [...board]
    newBoard[currAttempt.attempt][currAttempt.letterPosition] = keyVal
    setBoard(newBoard)
    setCurrAttempt({...currAttempt, letterPosition: currAttempt.letterPosition + 1})
  }

  const onDelete = () => {
    if(currAttempt.letterPosition === 0) return;

    const newBoard = [...board]
    newBoard[currAttempt.attempt][currAttempt.letterPosition - 1] = ""
    setBoard(newBoard)
    setCurrAttempt( {...currAttempt, letterPosition: currAttempt.letterPosition - 1 })
  }

  const onEnter = () => {
    if(currAttempt.letterPosition !== correctWord.length) return;

    let currWord = ''
    for(let i = 0; i < correctWord.length; i++) {
      currWord += board[currAttempt.attempt][i].toLowerCase()
    }

    if(wordSet.has(currWord.toLowerCase())) {
      setCurrAttempt({ attempt: currAttempt.attempt + 1, letterPosition: 0 })
    } else {
      alert("That is not a Pokemon!")
    }

    if(currWord === correctWord) {
      setGameOver({gameOver: true, guessedWord: true})
      return;
    }

    if(currAttempt.attempt === 5) {
      setGameOver({gameOver: true, guessedWord: false})
    }
  }

  return (
    <div className="App">
      <nav>
        <h1>PokeWordle</h1>
      </nav>
      <AppContext.Provider 
        value={{
          board,
          setBoard,
          currAttempt,
          setCurrAttempt,
          onSelectLetter,
          onEnter,
          onDelete,
          correctWord,
          disabledLetters,
          setDisabledLetters,
          gameOver,
          setGameOver,
          pokemonData,
          setPokemonData
        }}
      >
        <div className='game'>
          <Board />
          {gameOver.gameOver ? <GameOver /> : <Keyboard />}
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
