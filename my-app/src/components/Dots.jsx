function Dots({ currentIndex, length, setCurrentIndex }) {
  return (
    <div className="dots" style={{ display: 'flex', gap: 6 }}>
      {Array.from({ length }).map((_, i) => (
        <div
          key={i}
          className={i === currentIndex ? 'dot active' : 'dot'}
          style={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            background: i === currentIndex ? '#a78bfa' : '#e5e7eb',
            transition: 'background 0.2s',
            cursor: 'pointer',
          }}
          onClick={() => setCurrentIndex(i)}
        />
      ))}
    </div>
  );
}

export default Dots;