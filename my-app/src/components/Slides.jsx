import { images } from "../data";
import { useRef, useEffect, useState, useCallback } from "react";

const Slides = ({ currentIndex = 0, setCurrentIndex }) => {
  const slidesRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const touchStartY = useRef(0);
  const touchEndY = useRef(0);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragOffset = useRef(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [scale, setScale] = useState(1);
  const [lastDistance, setLastDistance] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToNext = useCallback(() => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    if (currentIndex === images.length - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
    
    setTimeout(() => setIsTransitioning(false), 300);
  }, [currentIndex, setCurrentIndex, isTransitioning]);

  const goToPrev = useCallback(() => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    if (currentIndex === 0) {
      setCurrentIndex(images.length - 1);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
    
    setTimeout(() => setIsTransitioning(false), 300);
  }, [currentIndex, setCurrentIndex, isTransitioning]);

  const getDistance = useCallback((touch1, touch2) => {
    const dx = touch1.clientX - touch2.clientX;
    const dy = touch1.clientY - touch2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }, []);

  const handleTouchStart = useCallback((e) => {
    if (isTransitioning) return;
    
    if (e.touches.length === 1) {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
    } else if (e.touches.length === 2) {
      setLastDistance(getDistance(e.touches[0], e.touches[1]));
    }
  }, [isTransitioning, getDistance]);

  const handleTouchMove = useCallback((e) => {
    if (isTransitioning) return;
    
    if (e.touches.length === 1) {
      touchEndX.current = e.touches[0].clientX;
      touchEndY.current = e.touches[0].clientY;
    } else if (e.touches.length === 2) {
      const currentDistance = getDistance(e.touches[0], e.touches[1]);
      const newScale = scale * (currentDistance / lastDistance);
      
      if (newScale >= 1 && newScale <= 3) {
        setScale(newScale);
        setLastDistance(currentDistance);
      }
    }
  }, [isTransitioning, getDistance, scale, lastDistance]);

  const handleTouchEnd = useCallback((e) => {
    if (isTransitioning || e.touches.length > 0) return;
    
    if (isZoomed) {
      const swipeThreshold = 50;
      const diffX = touchStartX.current - touchEndX.current;
      const diffY = touchStartY.current - touchEndY.current;
      
      if (Math.abs(diffY) > Math.abs(diffX) && diffY > swipeThreshold) {
        setScale(1);
        setIsZoomed(false);
      } else if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > swipeThreshold) {
        if (diffX > 0) {
          goToNext();
        } else {
          goToPrev();
        }
      }
    } else {
      const swipeThreshold = 50;
      const diffX = touchStartX.current - touchEndX.current;
      const diffY = touchStartY.current - touchEndY.current;
      
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > swipeThreshold) {
        if (diffX > 0) {
          goToNext();
        } else {
          goToPrev();
        }
      }
    }
  }, [isZoomed, goToNext, goToPrev, isTransitioning]);

  const handleDoubleTap = useCallback((e) => {
    if (isTransitioning) return;
    
    e.preventDefault();
    if (scale === 1) {
      setScale(2);
      setIsZoomed(true);
    } else {
      setScale(1);
      setIsZoomed(false);
    }
  }, [scale, isTransitioning]);

  const handleMouseDown = useCallback((e) => {
    if (isZoomed || isTransitioning) return;
    
    isDragging.current = true;
    dragStartX.current = e.clientX;
    dragOffset.current = 0;
    slidesRef.current.style.cursor = 'grabbing';
  }, [isZoomed, isTransitioning]);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging.current || isZoomed || isTransitioning) return;
    
    const currentX = e.clientX;
    dragOffset.current = currentX - dragStartX.current;
    
    if (slidesRef.current) {
      const opacity = Math.min(Math.abs(dragOffset.current) / 100, 0.3);
      slidesRef.current.style.opacity = 1 - opacity;
    }
  }, [isZoomed, isTransitioning]);

  const handleMouseUp = useCallback(() => {
    if (!isDragging.current || isZoomed || isTransitioning) return;
    
    isDragging.current = false;
    slidesRef.current.style.cursor = 'grab';
    
    const dragThreshold = 100;
    
    if (Math.abs(dragOffset.current) > dragThreshold) {
      if (dragOffset.current > 0) {
        goToPrev();
      } else {
        goToNext();
      }
    }
    
    if (slidesRef.current) {
      slidesRef.current.style.opacity = 1;
      slidesRef.current.style.transition = 'opacity 0.3s ease-out';
    }
    
    dragOffset.current = 0;
  }, [isZoomed, goToNext, goToPrev, isTransitioning]);

  const handleSlideClick = useCallback((e) => {
    if (isDragging.current || isZoomed || isTransitioning) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const slideWidth = rect.width;
    
    if (clickX < slideWidth * 0.4) {
      goToPrev();
    } else if (clickX > slideWidth * 0.6) {
      goToNext();
    }
  }, [isZoomed, goToNext, goToPrev, isTransitioning]);

  const handleDoubleClick = useCallback(() => {
    if (isTransitioning) return;
    
    if (scale === 1) {
      setScale(2);
      setIsZoomed(true);
    } else {
      setScale(1);
      setIsZoomed(false);
    }
  }, [scale, isTransitioning]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isTransitioning) return;
      
      if (e.key === 'ArrowLeft') {
        goToPrev();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      } else if (e.key === 'Escape' && isZoomed) {
        setScale(1);
        setIsZoomed(false);
      }
    };

    const handleWheel = (e) => {
      if (isZoomed || isTransitioning) return;
      
      e.preventDefault();
      if (e.deltaY > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [goToNext, goToPrev, isZoomed, isTransitioning]);

  useEffect(() => {
    if (isZoomed) {
      setScale(1);
      setIsZoomed(false);
    }
  }, [currentIndex, isZoomed]);

  return (
    <div 
      ref={slidesRef}
      className="slides relative overflow-hidden rounded-lg cursor-grab select-none"
      style={{ 
        width: '600px', 
        height: '400px',
        touchAction: 'none',
        transition: 'opacity 0.3s ease-out'
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onClick={handleSlideClick}
      onDoubleClick={handleDoubleClick}
      onDoubleTap={handleDoubleTap}
    >
      <img
        src={images[currentIndex].src}
        alt={images[currentIndex].alt}
        className="w-full h-full object-cover"
        draggable={false}
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          transition: isTransitioning ? 'none' : 'transform 0.3s ease-out'
        }}
      />
      
      <div className="hidden md:block absolute inset-0 pointer-events-none">
        <div className="absolute left-0 top-0 w-2/5 h-full bg-black bg-opacity-0 hover:bg-opacity-10 transition-all duration-200 flex items-center justify-center">
          <span className="text-white text-opacity-0 hover:text-opacity-100 transition-all duration-200 text-2xl">‹</span>
        </div>
        <div className="absolute right-0 top-0 w-2/5 h-full bg-black bg-opacity-0 hover:bg-opacity-10 transition-all duration-200 flex items-center justify-center">
          <span className="text-white text-opacity-0 hover:text-opacity-100 transition-all duration-200 text-2xl">›</span>
        </div>
      </div>

      <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
        {currentIndex + 1} / {images.length}
      </div>

      {isZoomed && (
        <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
          {Math.round(scale * 100)}%
        </div>
      )}

      <div className="md:hidden absolute top-2 left-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
        Свайп для навигации
      </div>

      {isTransitioning && (
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>
      )}
    </div>
  );
};

export default Slides;
