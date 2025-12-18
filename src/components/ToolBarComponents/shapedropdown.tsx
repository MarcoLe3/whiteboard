'use client';

import useWhiteboard from "@/libs/zustand";

export default function ShapeDropdown() {
    const {setSelectedTool} = useWhiteboard();
    
    const chooseShape = (value) => {
        setSelectedTool(value.target.value);
    }

    return (
        <div>
            <select onChange = {chooseShape} className="text-white font-bold px-2 bg-[#444444] rounded cursor-pointer">
                <option value="circle">Circle</option>
                <option value="rectangle">Rectangle</option>
            </select>
        </div>
    )
}