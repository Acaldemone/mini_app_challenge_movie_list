import { useState, useEffect } from 'react';
import './App.css';

// const movies = [
//   {title: 'Mean Girls'},
//   {title: 'Hackers'},
//   {title: 'The Grey'},
//   {title: 'Sunshine'},
//   {title: 'Ex Machina'},
// ];

function App() {
  const [movies, setMovies] = useState([]);
  useEffect(()=>{
    fetch(`http://localhost:8080/movies`)
    .then(res => res.json())
    .then(data => {
      // console.log(data)
      setMovies(data)
    })
    .catch(error => {
      console.log(error)
    })
  },[])

  console.log(movies)
  
  return (
    <div className="App">
      <header className="App-header">
        <ul>
          {movies.map((movie, index) =>(
            <li>{movie.title}</li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
