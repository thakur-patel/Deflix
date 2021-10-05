import React from 'react';
import clsx from 'clsx';

function PrimaryButton({ children, tailwindClass }) {
  const requiredClass =
    'flex-1 py-2 px-6 font-semibold rounded-md select-none';
  /* color, bg, and hover */
  const extraClass = tailwindClass; // 'bg-indigo-500 hover:bg-indigo-600';
  return (
    <button className={clsx(requiredClass, extraClass)}>
      {children}
    </button>
  );
}

export default PrimaryButton;
