import { FC, MouseEventHandler, ReactNode } from 'react'

type ButtonProps = {
  children: ReactNode;
  color?: 'red' | 'green';
  className?: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const getColor = (color: 'red' | 'green') => {
  switch (color) {
    case 'red':
      return 'bg-red-500 active:bg-red-600'  
    default:
      return 'bg-emerald-500 active:bg-emerald-600';
  }
};

export const Button: FC<ButtonProps> = ({ children, color = 'green', className, onClick }) => {
  return (
    <button
      className={`${getColor(color)} text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
