const Actions = ({ currentIndex, setCurrentIndex, slides, isAutoPlay, setIsAutoPlay }) => {
  return (
    <div className="flex justify-center w-full mt-5">
      <button
        className="prev bg-purple-700 rounded w-10 h-10 m-3"
        onClick={() => {
          if (currentIndex === 0) setCurrentIndex(slides.length - 1);
          else setCurrentIndex(currentIndex - 1);
        }}
      >
        ←
      </button>

      <button
        className="toggleAuto bg-purple-600 rounded w-20 h-10 m-3"
        onClick={() => setIsAutoPlay((prev) => !prev)}
      >
        {isAutoPlay ? "Пауза" : "Старт"}
      </button>


      <button
        className="next bg-purple-700 rounded w-10 h-10 m-3" 
        onClick={() => {
          if (currentIndex === slides.length - 1) {
            setCurrentIndex(0);
          } else {
            setCurrentIndex((prevState) => prevState + 1);
          }
        }}
      >
        →
      </button>
    </div>
  );
};

export default Actions;
