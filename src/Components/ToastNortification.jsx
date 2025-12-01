import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ToastNortification() {
  return (
    <>
      {/* your routes/Components */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </>
  );
}

export default ToastNortification;
