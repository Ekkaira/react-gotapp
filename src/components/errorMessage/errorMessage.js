import React from "react";
import img from "./error.jpeg";
import "./errorMessage.css";

const ErrorMessage = () => {
  return (
    <>
      <img src={img} alt="error" />
      <span>Something went wrong</span>
    </>
  );
};

export default ErrorMessage;
