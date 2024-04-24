import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useRef } from "react";
const Dropdown = ({ children, title, id, index }) => {
  const [isActive, setActive] = useState(false);

  return (
    <div>
      <div
        className="border border-gray-150 py-2 px-4 cursor-pointer flex justify-between items-center hover:bg-slate-200"
        onClick={() => setActive(!isActive)}
      >
        <div className={title === "Ny tjänst" ? "text-gray-300" : "text-black"}>
          {title}
        </div>
        <div>
          <IoIosArrowDown
            className={
              isActive
                ? "rotate-360 transition-all duration-300"
                : "rotate-180 transition-all duration-300"
            }
          />
        </div>
      </div>
      <div
        className={
          isActive
            ? "gap-4 max-h-[0px] transition-[max-height] duration-300 overflow-hidden"
            : "gap-4 max-h-[200px] transition-[max-height] duration-300 overflow-hidden"
        }
      >
        {children}
      </div>
    </div>
  );
};

export default Dropdown;
