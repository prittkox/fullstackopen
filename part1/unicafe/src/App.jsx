import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.onClick}>{props.text}</button>
)

const Statistics = (props) => {
  if (props.all === 0) {
    return (
      <div>
        <h2>statistics</h2>
        <div>No feedback given</div>
      </div>
    )
    }
  return (
  <div>
    <h2>statistics</h2>
    <table>
      <tbody>
        <StatisticLine text="good" value={props.good}></StatisticLine>
        <StatisticLine text="neutral" value={props.neutral}></StatisticLine>
        <StatisticLine text="bad" value={props.bad}></StatisticLine>
        <StatisticLine text="all" value={props.all}></StatisticLine>
        <StatisticLine text="average" value={props.average}></StatisticLine>
        <StatisticLine text="positive" value={props.positive}></StatisticLine>
      </tbody>
    </table>
  </div>
  )
}


const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + neutral + bad
  const average = ((good - bad) /all)
  const positive = ((good / all) * 100)

  const handleGoodClick = () => {
    setGood(good + 1)
}

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGoodClick} text="good"></Button>
      <Button onClick={handleNeutralClick} text="neutral"></Button>
      <Button onClick={handleBadClick} text="bad"></Button>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average}
        positive={positive}
       />

    </div>
  )
}

export default App
