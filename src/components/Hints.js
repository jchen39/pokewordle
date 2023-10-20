import React, { useContext, useState, useEffect } from 'react'
import { AppContext } from '../App'

function Hints({ attemptVal }) {
  const { correctWord, pokemonData, currAttempt } = useContext(AppContext)

  const generateHint = (attempt) => {
    const hintState = currAttempt.attempt < attempt ? 'hidden' : 'shown'

    switch(attempt) {
      case 0:
        return <div className='hint' id={hintState}><p>My name starts with {correctWord.charAt(0).toUpperCase()}</p></div>

      case 1:
        return <p className='hint' id={hintState}>My name ends with {correctWord.charAt(correctWord.length-1).toUpperCase()}</p>

      case 2:
        return <div className='hint' id={hintState}>{pokemonData && (<p>My height is {pokemonData.height}</p>)}</div>

      case 3:
        return <div className='hint' id={hintState}>{pokemonData && (<p>My weight is {pokemonData.weight}</p>)}</div>

      case 4:
        return <div className='hint' id={hintState}>{pokemonData && (<p>My type is {pokemonData.types.map(type => <span>{type.type.name}</span>)}</p>)}</div>
      
      case 5:
        return <div className='hint' id={hintState}>{pokemonData && (<p>I am #{pokemonData.id} in the Pokedex</p>)}</div>
    }
  }

  return (
    <div>
      {generateHint(attemptVal)}
    </div>
  )
}

export default Hints