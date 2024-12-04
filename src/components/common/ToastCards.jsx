import { useContext } from "react";
import { MessageContext } from "utils/context";

const ToastCards = () => {
  const { toasts, setToasts } = useContext(MessageContext);
  let cardActiveClass = "";
  if (toasts.length == 0) {
    return;
  }
  //   if (toasts.length == 0) {
  //     cardActiveClass = "toast-card-active";
  //   }
  function removeToast(index) {
    let remainingToasts = toasts;
    console.log(index);
    delete remainingToasts[index];
    console.log(remainingToasts);
    setToasts(remainingToasts);
  }
  return (
    <div className={`toast-card-grid toast-card-active`}>
      {toasts.map((toast, index) => (
        <div className="card" key={index}>
          <h5 className="card-title">{toast.message}</h5>
          <button className="card-btn" onClick={() => removeToast(index)}>
            X
          </button>
        </div>
      ))}
    </div>
  );
};

export default ToastCards;
