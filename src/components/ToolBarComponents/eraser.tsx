'use client'

import useWhiteboard from "@/libs/zustand";
import {useState} from "react";

export default function Eraser() {
    const {selectedTool, setSelectedTool} = useWhiteboard();
    const isActive = selectedTool === "eraser"

    const handleEraserClick = () => {
        if (!isActive) {
            setSelectedTool("eraser")
        } else {
            setSelectedTool("");
        }
    }

    return (
        <div className={`${isActive ? 'bg-[#555555]' : 'bg-[#333333]'} text-white font-bold px-2 rounded w-[80px] text-center`}>
            <button onClick={handleEraserClick} className=" cursor-pointer">Eraser</button>
        </div>
    )
}