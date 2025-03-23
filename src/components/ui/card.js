import React from "react";

export function Card({ children, className }) {
  return <div className={`p-4 bg-white shadow rounded ${className}`}>{children}</div>;
}

export function CardContent({ children, className }) {
  return <div className={`p-2 ${className}`}>{children}</div>;
}
