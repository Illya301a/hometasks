import './App.css';
import Slides from './components/Slides';
import Dots from './components/Dots';
import Prev from './components/Prev';
import Next from './components/Next';
import UpdateSlider from './components/UpdateSlider';
import StartAutoPlay from './components/AutoInterval';

function App() {
  
const slides = document.querySelectorAll(".slides img");
const slider = document.querySelector(".slides");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");
const dotsContainer = document.querySelector(".dots");
const toggleAutoBtn = document.querySelector(".toggleAuto");

let currentIndex = 0;
let autoPlayInterval;



  return (
    <div className="App flex flex-col items-center justify-center mx-auto">
      <div className="slider-container flex flex-col">
        <Slides />
        <Prev />
        <Next />
      </div>
        
        <Dots />
        <button className="toggleAuto bg-purple-600 rounded">Пауза</button>

        <UpdateSlider />
        <StartAutoPlay />
    </div>
  );
  

  
}

export default App;
