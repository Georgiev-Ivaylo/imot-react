const Input = ({ type = "text", label, name, value, error_msg }) => {
  // const errorClass = error_msg ? "active" : "";
  const errorClass = error_msg ? "has-error" : "";
  return (
    <div className="form-field-box">
      <label className="form-label">{label}</label>
      <input
        type={type}
        name={name}
        defaultValue={value}
        // className="form-field"
        className={`form-field ${errorClass}`}
      />
      {/* <p className={`form-field-error ${errorClass}`}>{error_msg}&nbsp;</p> */}
      {error_msg && <p className="form-field-error-full">{error_msg}</p>}
    </div>
  );
};

export default Input;
