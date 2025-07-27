import "./App.css";
import Slides from "./components/Slides";
import Dots from "./components/Dots";
import Actions from "./components/Actions";
import { useEffect, useState, useRef } from "react";
import { images } from "./data";

function App() {
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isAutoPlay) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          images.length === prevIndex + 1 ? 0 : prevIndex + 1
        );
      }, 1000 * 5);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isAutoPlay]);

  return (
    <div className="App flex flex-col items-center justify-center mx-auto mt-10">
      <div className="slider-container flex flex-col">
        <Slides currentIndex={currentIndex} />
      </div>
        <Actions
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          slides={images}
          isAutoPlay={isAutoPlay}
          setIsAutoPlay={setIsAutoPlay}
        />
      <Dots currentIndex={currentIndex} length={images.length} setCurrentIndex={setCurrentIndex} />
    </div>
  );
}

export default App;
