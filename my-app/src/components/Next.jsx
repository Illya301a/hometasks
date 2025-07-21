import { currentIndex } from "./Data";
import UpdateSlider from './UpdateSlider.jsx';

function Next() {
    const slides = document.querySelectorAll('.slides img');

    return (
        <button className="next bg-purple-700 rounded" onClick={
           () => {
                if (currentIndex === slides.length - 1) currentIndex = 0; else ++currentIndex;
                UpdateSlider();
            }
        }>→</button>
    );
}

export default Next;