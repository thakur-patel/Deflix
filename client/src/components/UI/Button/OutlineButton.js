import React from 'react';
import clsx from 'clsx';

function OutlineButton({ children, tailwindClass }) {
  const requiredClass =
    'flex-1 px-6 py-2 font-semibold select-none rounded-md text-indigo-700 border bg-transparent';
  /* color, border and hover */
  const extraClass = tailwindClass; // 'border-indigo-500 hover:bg-indigo-50';
  return (
    <button className={clsx(requiredClass, extraClass)}>
      {children}
    </button>
  );
}

export default OutlineButton;
