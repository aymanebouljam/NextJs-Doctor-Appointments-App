import React from "react";
import CategoryList from "./_components/CategoryList";

export default function layout({ children }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 pt-4">
      <div className="pt-3 flex items-center justify-center md:items-start">
        <CategoryList />
      </div>
      <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6 py-3">
        {children}
      </div>
    </div>
  );
}
