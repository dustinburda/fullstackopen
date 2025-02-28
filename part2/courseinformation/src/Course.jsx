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

  export default Course;