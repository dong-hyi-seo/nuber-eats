import React from 'react';

interface IButtonProps {
  canClick: boolean;
  loading: boolean;
  actionText: string;
}
export const Button: React.FC<IButtonProps> = ({
  canClick,
  loading,
  actionText,
}) => {
  return (
    <button
      className={`text-lg font-medium focus:outline-none
      py-4 text-white transition-colors ${
        canClick
          ? 'bg-lime-600 hover:bg-lime-700'
          : 'bg-gray-300 pointer-events-none'
      }`}>
      {loading ? 'Loading...' : actionText}
    </button>
  );
};
