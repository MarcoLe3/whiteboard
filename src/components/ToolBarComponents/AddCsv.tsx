'use client'

import { use, useState } from "react";
import useWhiteboardShapes from "@/libs/zustand";

export default function AddCSV() {

    const [fileContent, setFileContent] = useState<string>('')
    const { selectedTool, selectedColor, createShapeAtPosition} = useWhiteboardShapes();


    function handleFileSelection(e) {
        const file = e.target.files[0];
        if (!file) {
            showMessage("No file selected. Please choose a file.", "error");
            return;
        }

        if (!file.type.startsWith("text")) {
            showMessage("Unsupported file type. Please select a text file.", "error");
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            const content = reader.result as string;
            const row = content.split(/\r?\n/);

            const data = row.map((line) => line.split(",")).filter(row => row);

            console.log("CSV Data:", data);
            setFileContent(content);
            console.log(fileContent);
            showMessage("File uploaded successfully", "success");
        };

        reader.onerror = () => {
            showMessage("Error reading the file. Please try again.", "error");
        };
        reader.readAsText(file);
    }

    function showMessage(message,text){
        console.log(message, text)
    }
    
    function generateShapesFromCSV(){
        for (const line of fileContent.split(/\r?\n/)) {
            console.log("Processing line:", line);
            const [xStr,yStr] = line.split(",");
            createShapeAtPosition("circlePointer", parseInt(xStr), parseInt(yStr), "black");
        }
    }


    return (
        <div>
            <input
                type="file"
                onChange={handleFileSelection}
                accept=".csv"
                className="bg-white cursor-pointer"
            />
            <button
                onClick={generateShapesFromCSV}
                className=""
            >
                Generate
            </button>
        </div>
    )
}