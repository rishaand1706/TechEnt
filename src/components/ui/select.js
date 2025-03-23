import React from "react";

export function Select({ options, value, onChange, className }) {
  return (
    <select value={value} onChange={onChange} className={`border p-2 w-full rounded ${className}`}>
      {options.map((opt, index) => (
        <option key={index} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
