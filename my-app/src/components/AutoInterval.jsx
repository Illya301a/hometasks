import { autoPlayInterval } from "./Data";

function StartAutoPlay() {
    autoPlayInterval = setInterval(() => {
        console.log("AutoPlay Next Slide");
        console.log(autoPlayInterval)
    }, 1000 * 5)
}

export default StartAutoPlay;
