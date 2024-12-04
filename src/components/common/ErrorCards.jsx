import { useContext } from "react";
import { MessageContext } from "utils/context";

const ErrorCards = ({ errors = [], setErrors }) => {
  // let cardActiveClass = "";
  // console.log(errors);
  // if (!errors || errors.length == 0) {
  //   return;
  // }
  //   if (toasts.length == 0) {
  //     cardActiveClass = "toast-card-active";
  //   }
  console.log(errors);
  function removeToast(index) {
    // let remainingToasts = errors;
    console.log(index);
    // delete remainingToasts[index];
    errors.splice(index, 1);
    console.log(errors);
    setErrors([...errors]);
    // setErrors([...remainingToasts]);
  }
  return (
    <div className={`card-grid card-active`}>
      {errors.map((error, index) => (
        <div className="card" key={index}>
          <h5 className="card-title for-error">{error.message}</h5>
          <button className="card-btn" onClick={() => removeToast(index)}>
            X
          </button>
        </div>
      ))}
    </div>
  );
  // const { error, setError } = useContext(MessageContext);
  // let errorClass = "";
  // if (error) {
  //   errorClass = "card-active";
  // }
  // return (
  //   <div className={`card-grid ${errorClass}`}>
  //     <div className="card">
  //       {error && (
  //         <h5 className="card-title for-error">{error.data.message}</h5>
  //       )}
  //       <button className="card-btn" onClick={() => setError(null)}>
  //         X
  //       </button>
  //     </div>
  //   </div>
  // );
};

export default ErrorCards;
