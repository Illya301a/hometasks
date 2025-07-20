import './App.css';
import Slides from './components/Slides';
import Dots from './components/Dots';
import Prev from './components/Prev';
import Next from './components/Next';
import UpdateSlider from './components/UpdateSlider';

function App() {
  
  return (
    <div className="App flex flex-col items-center justify-center mx-auto">
      <div className="slider-container flex flex-col">
        <Slides />
        <Prev />
        <Next />
      </div>
        
        <Dots />
        <button className="toggleAuto bg-purple-600 rounded">Пауза</button>

        {/* <UpdateSlider /> */}
    </div>
  );
  

  
}

export default App;
