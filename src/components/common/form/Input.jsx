const Input = ({ type, name, error_msg }) => {
  return (
    <div className="form-field-box">
      <input type={type} name={name} className="form-field" />
      <p className="form-field-error">{error_msg}&nbsp;</p>
    </div>
  );
};

export default Input;
