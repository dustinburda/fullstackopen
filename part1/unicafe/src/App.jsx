import { useState } from "react"

const Button = ( {onClick, children} ) => {
  return (
    <button onClick={onClick} style={{marginRight:"5px"}}>
      {children}
    </button>
  )
}

const Statistic = ({text, num}) => {
  return (
  <p> {text}  {num}</p>
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
      <Statistic text={"good"} num={good}/>
      <Statistic text={"netural"} num={neutral}/>
      <Statistic text={"bad"} num={bad}/>
    </>
  )
}

export default App
