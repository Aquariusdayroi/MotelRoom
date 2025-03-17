import logo from './logo.svg';
import './App.css';
import AppRoutes  from './routes';


// import { useState } from "react";
// import Intro from "../Intro";
// import Home from "../Home";

// function App() {
//   const [showIntro, setShowIntro] = useState(true);

//   return (
//     <div>
//       {showIntro ? <Intro onStart={() => setShowIntro(false)} /> : <Home />}
//     </div>
//   );
// }

// export default App;


function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
    return (
        <AppRoutes />
    )
}

export default App;
