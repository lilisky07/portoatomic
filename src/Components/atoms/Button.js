const Button = ({ label, onClick }) => {
  return (
    <button className="btn btn-dark mt-3" onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
