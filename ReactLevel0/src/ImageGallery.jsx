function ImageGallery() {
  const images = [
    { id: 1, url: "https://picsum.photos/200", caption: "Random 1" },
    { id: 2, url: "https://picsum.photos/201", caption: "Random 2" },
    { id: 3, url: "https://picsum.photos/202", caption: "Random 3" },
  ];

  return (
    <div className="gallery">
      {images.map((image) => (
        <div key={image.id} className="gallery-card">
          <img src={image.url} alt={image.caption} />
          <p>{image.caption}</p>
        </div>
      ))}
    </div>
  );
}

export default ImageGallery;
