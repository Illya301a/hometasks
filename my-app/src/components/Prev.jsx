import { currentIndex } from "./Data";
import UpdateSlider from './UpdateSlider.jsx';

function Prev() {
    const slides = document.querySelectorAll('.slides img');

    return (
        <button className="prev bg-purple-700 rounded" onClick={
            () => {
                let slides = document.querySelector(".slides")
                slides.style.transform = `translateX(-100%)`;
                slides.style.transition = 'transform 0.5s ease-in-out';
            }
        }>←</button>
    );
}

export default Prev;