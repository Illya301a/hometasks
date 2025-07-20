import { useEffect, useRef } from 'react';

function Dots() {
    const dotsRef = useRef(null);
    
    useEffect(() => {
        const slides = document.querySelectorAll('.slides img');
        const dotsContainer = dotsRef.current;
        const sliderLength = slides.length;
        for (let i = 0; i < sliderLength; i++) {
            const dotDiv = document.createElement('div');
            if (i === 0){
               dotDiv.classList.add("active"); 
            }
            dotDiv.classList.add('dot');
            dotsContainer.appendChild(dotDiv);
        }
    }, []);

    return <div className="dots" ref={dotsRef}></div>
}

export default Dots;