const Loader = ({ containerClass }) => {
  return (
    <div
      className={`flex-center absolute inset-0 z-100 mx-auto h-full w-full overflow-hidden ${containerClass}`}
    >
      <div className="three-body">
        <span className="three-body__dot"></span>
        <span className="three-body__dot"></span>
        <span className="three-body__dot"></span>
      </div>
    </div>
  );
};

export default Loader;
