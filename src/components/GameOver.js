import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../App'

function GameOver() {
  const { gameOver, correctWord, currAttempt, pokemonData } = useContext(AppContext)

  return (
    <div className='gameOver'>
        <h3>
            {gameOver.guessedWord ? "You got the Pokemon!" : "You should review your pokedex..."}
        </h3>
        <h1>
            Correct Pokemon: { correctWord.charAt(0).toUpperCase() + correctWord.slice(1) }
        </h1>
        {gameOver.guessedWord && (<h3>You guessed in {currAttempt.attempt} attempts</h3>)}
        <div>{pokemonData && (<img width='60%' height='60%' src={pokemonData.sprites.front_default} />)}</div>
        <h3>Refresh the page to play another!</h3>
    </div>
  )
}

export default GameOver