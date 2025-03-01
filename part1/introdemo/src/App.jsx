import { useState } from "react"

const Display = ({count}) => {
  return (
    <div>
      Count: {count} 
      </div>
  );
}

const Button = ({onClick, children}) => {
  return (
  <button onClick={onClick} style={{marginRight: "5px"}}>
    {children}
  </button>
  );
}

const App = () => {
  const [counter, setCounter] = useState(0)

  const handleClickIncrement = () => {
    setCounter(counter + 1);
  }

  const handleClickZero = () => {
    setCounter(0);
  }

  return (
    <div>
      <Display count={counter} />
      <Button onClick={handleClickIncrement}>
        Increment
      </Button>
      <Button onClick={handleClickZero}>
        Zero
      </Button>
    </div>
  )
}

export default App
