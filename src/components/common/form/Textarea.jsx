const Textarea = ({ label, name, value, error_msg, alterClass }) => {
  const errorClass = error_msg ? "has-error" : "";
  return (
    <div className={`form-field-box ${alterClass}`}>
      <label className="form-label">{label}</label>
      <textarea
        name={name}
        defaultValue={value}
        className={`form-field  w-full h-32 ${errorClass}`}
      />
      {error_msg && <p className="form-field-error-full">{error_msg}</p>}
    </div>
  );
};

export default Textarea;
