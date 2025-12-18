'use client';

import useWhiteboard from "@/libs/zustand";

export default function ColorPlat() {
    const setSelectedColor = useWhiteboard((state) => state.setSelectedColor);

    const chooseColor = (value) => {
        setSelectedColor(value.target.value);
        console.log(value.target.value);
    }

    return (
        <div>
            <select className="bg-[#444444] text-white font-bold px-2 rounded" onChange={chooseColor}>
                <option value="red">Red</option>
                <option value="blue">Blue</option>
                <option value="green">Green</option>
            </select>
        </div>
    )
}