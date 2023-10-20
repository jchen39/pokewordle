import React, { useContext } from "react"
import { AppContext } from "../App"
import Letter from './Letter';

function Board() {
  const { correctWord } = useContext(AppContext)
  const row = []
  
  for(let i = 0; i < 6; i++) {
    const rowLetters = []
    for(let j = 0; j < correctWord.length; j++) {
      rowLetters.push(
        <Letter letterPosition={j} attemptVal={i}/>
      )
    }

    row.push(
      <div className='row'>
        {rowLetters}
      </div>
    )
  }

  return (
    <div className='board'>
      {row}
    </div>
  )
}

export default Board