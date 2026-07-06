import React from "react";

interface BattonButton {
  name: string;
  icon: React.ReactNode;
}

interface BattonWithClickProps {
  cat: BattonButton;
  isSelected: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  id: number;
}

const BattonWithClick = ({
  id,
  cat,
  isSelected,
  onClick,
}: BattonWithClickProps): React.ReactElement => {
  return (
    // Убрали <div className='flex'>, возвращаем сразу button
    <button
      id={id.toString()}
      onClick={onClick}
      className={`flex items-center md:w-39 h-10 gap-2  justify-center rounded-full text-[15px] font-medium transition-all duration-200 whitespace-nowrap
        ${
          isSelected
            ? "bg-[#5c6350] text-white shadow-md"
            : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 shadow-sm"
        }
      `}
    >
      <span className={isSelected ? "text-white" : "text-gray-400"}>
        {cat.icon}
      </span>
      {cat.name}
    </button>
  );
};

export default BattonWithClick;
