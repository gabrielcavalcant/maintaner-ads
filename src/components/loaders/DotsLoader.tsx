import React from "react";
import "./DotsLoaderStyle.css";

export default function DotsLoader() {
  return (
    <div className="loading-wave">
      <div className="loading-bar bg-primary" />
      <div className="loading-bar bg-primary" />
      <div className="loading-bar bg-primary" />
      <div className="loading-bar bg-primary" />
    </div>
  );
}
