import { images } from "../data";

const Slides = ({ currentIndex = 0 }) => {
  return (
    <div className="slides flex overflow-hidden">
      <img
        src={images[currentIndex].src}
        alt={images[currentIndex].alt}
        className="acpect-video rounded w-full h-full"
      />
    </div>
  );
};
export default Slides;
