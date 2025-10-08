const ImageClipBox = ({ src, clipClass }) => {
  return (
    <div className={`${clipClass} tilt-wrapper`}>
      <img
        src={src}
        alt="contact image"
        // loading="lazy"
        // decoding="async"
        className="tilt"
      />
    </div>
  );
};

export default ImageClipBox;
