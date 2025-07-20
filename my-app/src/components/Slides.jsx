function Slides() {
    const images = [
        {
            src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
            alt: "forest"
        },
        {
            src: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca",
            alt: "space"
        },
        {
            src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
            alt: "beach"
        },
        {
            src: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
            alt: "sky"
        },
        {
            src: "https://images.unsplash.com/photo-1464820453369-31d2c0b651af",
            alt: ""
        },
        {
            src: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a",
            alt: ""
        },
    ];
    return (
        <div className="slides flex overflow-hidden">
            {images.map((img, index) => (
                <img key={index} src={img.src} alt={img.alt} className="object-cover acpect-video rounded" />
            ))}
        </div>
    );
}
export default Slides;