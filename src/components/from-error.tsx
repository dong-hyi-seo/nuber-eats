import React from 'react';
/**
 * 그냥 function과 React.FC의 차이
 * https://react.vlpt.us/using-typescript/02-ts-react-basic.html
 * react FC를 사용할경우 해당 component가 반드시 얻어야하는 유일한 prop은 children이다.
 */
interface IFormErrorProps {
  errorMessage: string;
}
export const FormError: React.FC<IFormErrorProps> = ({ errorMessage }) => (
  <span className="font-medium text-red-500">{errorMessage}</span>
);
