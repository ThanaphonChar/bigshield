import React, { useState } from 'react';

function FloatingLabelInput() {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = (e) => {
    setIsFocused(false);
    setHasValue(e.target.value !== '');
  };

  return (
    <div className="relative w-full">
      <label
        className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-all duration-300 ${
          isFocused || hasValue ? 'text-xs top-0 -translate-y-full' : 'text-lg'
        }`}
        htmlFor="email"
      >
        Enter Email
      </label>
      <input
        type="email"
        id="email"
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  );
}

export default FloatingLabelInput;
