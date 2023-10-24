import React, { useContext } from 'react'
import { AppContext } from '../App'

function Hints({ attemptVal }) {
  const { correctWord, pokemonData, currAttempt } = useContext(AppContext)

  const generateHint = (attempt) => {
    const hintState = currAttempt.attempt < attempt ? 'hidden' : 'shown'

    switch(attempt) {
      case 0:
        return <p className='hint' id={hintState}>My name starts with {correctWord.charAt(0).toUpperCase()}</p>

      case 1:
        return <p className='hint' id={hintState}>My name ends with {correctWord.charAt(correctWord.length-1).toUpperCase()}</p>

      case 2:
        return <div className='hint' id={hintState}>{pokemonData && (<p>My height is {pokemonData.height}</p>)}</div>

      case 3:
        return <div className='hint' id={hintState}>{pokemonData && (<p>My weight is {pokemonData.weight}</p>)}</div>

      case 4:
        return <div className='hint' id={hintState}>{pokemonData && (<p>My type is: {pokemonData.types.map(type => <p>{type.type.name}</p>)}</p>)}</div>
      
      case 5:
        return <div className='hint' id={hintState}>{pokemonData && (<p>I am #{pokemonData.id} in the Pokedex</p>)}</div>
    }
  }

  return (
    <div className='row'>
      {generateHint(attemptVal)}
    </div>
  )
}

export default Hints