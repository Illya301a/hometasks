const slider = document.querySelector(".slides");
import { currentIndex } from "./Data";

function UpdateSlider() {
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    document.querySelectorAll(".dot").forEach((dotElement, i) => {
        if (currentIndex === i) dotElement.classList.add("active"); else dotElement.classList.remove("active");
    });
    
}

export default UpdateSlider;