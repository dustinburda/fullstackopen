const Part = ({part}) => {
  return (
    <li>
      {part.name} {part.exercises}
    </li>
  );
}

const Content = ({parts}) => {
  return (
    <ul>
      {parts.map((part) => {
        return (<Part part={part} key={part.id}/>);
      })}
    </ul>
  );
}


const Header = ({text}) => {
  return (
    <h1>{text}</h1>
  );
}

const Sum = ({parts}) => {
  return (
    <div style={{fontWeight: "bold"}}> total of {parts.reduce((accum, curr) => accum + curr.exercises, 0)} exercises</div>
  );
}

const Course = ({course}) => {
  return (
    <>
      <Header text={course.name}/>
      <Content parts={course.parts}/>
      <Sum parts={course.parts}/>
    </>
  );
} 


const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App