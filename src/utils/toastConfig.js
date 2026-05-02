import { toast } from "react-toastify";

const defaultConfig = {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: true,
  theme: "colored",
};

export const showSuccess = (message) => {
  toast.success(message, defaultConfig);
};

export const showError = (message) => {
  toast.error(message, defaultConfig);
};
