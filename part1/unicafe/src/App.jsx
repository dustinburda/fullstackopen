import { useState } from "react"

const Button = ( {onClick, children} ) => {
  return (
    <button onClick={onClick} style={{marginRight:"5px"}}>
      {children}
    </button>
  )
}

const StatisticLine = ({text, num}) => {
  
  return (
  <tr> 
    <td>{text}</td>
    <td>{num} {text==="positive" && "%"}</td>
  </tr>
  );
}

const Statistics = ({good, neutral, bad}) => {
  if (good === 0 && bad === 0 && neutral === 0) {
    return (
      <div>No feedback given</div>
    );
  }


  return (
    <>
    <table>
      <StatisticLine text={"good"} num={good}/>
      <StatisticLine text={"neutral"} num={neutral}/>
      <StatisticLine text={"bad"} num={bad}/>
      <StatisticLine text={"all"} num={bad + good + neutral}/>
      <StatisticLine text={"average"} num={(good - bad) / (bad + good + neutral)}/>
      <StatisticLine text={"positive"} num={(good) / (bad + good + neutral) * 100}/>
      </table>
    </>
  );
}
 

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const onGood = () => {
    setGood(good + 1)
  }
  
  const onNeutral = () => {
    setNeutral(neutral + 1)
  }

  const onBad = () => {
    setBad(bad + 1)
  }



  return ( 
    <>
      <h1>give feedback</h1>
      <Button onClick={onGood}>good</Button>
      <Button onClick={onNeutral}>netural</Button>
      <Button onClick={onBad}>bad</Button>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </>
  )
}

export default App
