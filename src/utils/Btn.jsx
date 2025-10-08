const Btn = ({ id, title, leftIcon, rightIcon, containerClass }) => {
  return (
    <button
      type="button"
      id={id}
      title={title}
      className={`group relative z-20 w-fit overflow-hidden rounded-full px-7 py-3 text-black duration-300 hover:bg-red-400 ${containerClass}`}
    >
      {leftIcon}
      <span className="incline-flex font-general relative overflow-hidden text-xs uppercase">
        <div>{title}</div>
      </span>
      {rightIcon}
    </button>
  );
};

export default Btn;
