import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const newArray = new Array(6).fill(0)
  const [count, setCount] = useState(newArray)
  const [max, setMax] = useState(0)
  //on click generate random number, change state with setSelected to the random

  const nextAnecdote = () => {
  let randNum = Math.floor(Math.random() * anecdotes.length)
  setSelected(randNum)
  }
  
  const indexOfMax = (arr) => {
    if (arr.length === 0) {
        return -1;
    }

    var max = arr[0];
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }

    return maxIndex;
}

  const voteAnecdote = () => {
    const copyCount = [...count]
    copyCount[selected] += 1
    setCount(copyCount)
    const maxIndex = indexOfMax(copyCount)
    setMax(maxIndex)
  }

  return (
    <div>
      <Title titleText='Anecdote of the day' />
      <Anecdotes anecdotes={anecdotes} selected={selected}/>
      <VoteCount count={count} selected={selected}/>
      <Button handleClick={voteAnecdote} text="Vote anecdote" />
      <Button handleClick={nextAnecdote} text="Next anecdote" />
      <Title titleText='Anecdote with the most votes' />
      <AnecdoteMostVotes max={max} count={count} selected={selected}/>

    </div>
  )
}

const Anecdotes = ({anecdotes, selected}) => {
  let anecdote = anecdotes[selected]
  return(
    <div>
      {anecdote}
    </div>
  )
}

const Button = ({handleClick, text}) => {
  return(
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const AnecdoteMostVotes = ({max, count, selected}) => {
  return(
    <div>
      <div>
        {anecdotes[max]}
      </div>
      <div>
      With <strong>{count[max]}</strong> of votes
      </div>
    </div>
  )
}

const Title = ({titleText}) => {
  return(
    <h2>
      {titleText}
    </h2>
  )
}

const VoteCount = ({count, selected}) => {
  return(
    <div>
      The current anecdote has {count[selected]} number of votes.
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)