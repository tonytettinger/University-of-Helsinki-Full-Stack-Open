import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Title text="Give feedback" />

      <FeedbackButton handleClick={() => setGood(good+1)} feedback="good" />
      <FeedbackButton handleClick={() => setNeutral(neutral+1)} feedback="neutral"/>
      <FeedbackButton handleClick={() => setBad(bad+1)} feedback="bad" />

      <Title text="Statistics" />

      <Statistics good={good} neutral={neutral} bad={bad} />

    </div>
  )
}

const Title = ({text}) => {
  
  return (
    <h2>
      {text}
    </h2>
  )
}

const Statistics = ({good, neutral, bad}) => {
  if((good+neutral+bad == 0)) {
    return (
      <div>
        No feedback given.
      </div>
    )
  }

  return (
    <table>
      <tbody>
      <Statistic type="good" value ={good} />
      <Statistic type="bad" value ={bad} />
      <Statistic type="neutral" value ={neutral} />
      <StatisticsTotal good={good} neutral={neutral} bad={bad} />
      </tbody>
    </table>
  )
}

const Statistic = ({type, value}) => {
  // save clicks of each button to own state

  return (
    <tr>
      <td>{type}</td>
      <td>{value}</td>
    </tr>
  )
}

const StatisticsTotal = ({good, neutral, bad}) => {
  let average = (good+neutral+bad)/3
  let positive = good/(good+neutral+bad)
  if(good == 0) {
    positive = 0
  }

  return (
    <>
      <tr>
      <td>Average</td>
      <td>{average}</td>
      </tr>

      <tr>
      <td>Positive</td>
      <td>{positive}%</td>
      </tr>

    </>
  )
}

const FeedbackButton = ({feedback, handleClick}) => {

  return (
    <button onClick={handleClick}>
      {feedback}
    </button>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)