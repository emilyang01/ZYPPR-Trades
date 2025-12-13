import React from "react";
import "./Card.css";

export const Card = ({ cardVariant = "default", className = "" }) => {
  return (
    <div className={`card card--${cardVariant} ${className}`}>
      {/* Card content */}
    </div>
  );
};
