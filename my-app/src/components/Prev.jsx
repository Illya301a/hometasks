import { currentIndex } from "./Data";
import UpdateSlider from './UpdateSlider.jsx';

function Prev() {

    return (
        <button className="prev bg-purple-700 rounded" onClick={
            () => {
                if (currentIndex === 0) currentIndex = slides.length - 1; else --currentIndex;
                UpdateSlider()
            }
        }>←</button>
    );
}

export default Prev;