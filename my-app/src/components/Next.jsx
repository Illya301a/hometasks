import { currentIndex } from "./Data";

function Next() {
    const slides = document.querySelectorAll('.slides img');

    return (
        <button className="next bg-purple-700 rounded" onClick={
           () => {
               console.log("Next")
            }
        }>→</button>
    );
}

export default Next;