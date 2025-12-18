'use client'

import { useRef, useEffect } from "react";
import useWhiteboard from "@/libs/zustand";
import {MousePosition} from "../functions/MouseMovement"

export default function Canvas() {
  const { 
    selectedTool, 
    selectedColor, 
    createShapeAtPosition, 
    deleteShapeAtPosition, 
    shapes, 
    drawings, 
    currentStroke,
    startDrawing,
    updateDrawing,
    endDrawing
  } = useWhiteboard();

  const canvasRef = useRef<HTMLCanvasElement>(null);

// Draw shapes on canvas getting the data from zustand store array 
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!canvas || !ctx) return;

    const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };

    const drawPencilStrokes = () => {
      drawings.forEach(renderStroke);

      if (currentStroke) {
        renderStroke(currentStroke);
      }
    };

    const drawShapes = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      shapes.forEach((shape) => {
        switch (shape.type) {
          case "circle":
            ctx.beginPath();
            ctx.arc(shape.x, shape.y, shape.radius, 0, Math.PI * 2);
            ctx.fillStyle = shape.color;
            ctx.fill();
            break;
          case "rectangle":
            ctx.fillStyle = shape.color;
            ctx.fillRect(shape.x, shape.y, shape.width, shape.height);
            break;
          case "circlePointer":
            ctx.beginPath();
            ctx.arc(shape.x, shape.y, shape.radius, 0, Math.PI * 2);
            ctx.fillStyle = shape.color;
            ctx.fill();
            break;
        }
      })
    }

    const renderStroke = (stroke) => {
      const points = stroke.points;
      if (points.length < 2) return;

      ctx.beginPath();
      ctx.strokeStyle = points[0].color;
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }
      ctx.stroke();
    };
    resize();
    // drawShapes();
    drawPencilStrokes();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [shapes, drawings, currentStroke]);


// adding position shape and selected shape tool on to the array in zustand store
  const clickPositionOnCanvas = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!selectedTool) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const {x,y} = MousePosition(e)

    switch(selectedTool){
      case ("eraser"):
        deleteShapeAtPosition(x,y);
        break;
      case ("circle"):
      case ("rectangle"):
        createShapeAtPosition(selectedTool, x, y, selectedColor);
        break;
    }
  };


  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (selectedTool !== "pencil") return;
    const { x, y } = MousePosition(e);
    startDrawing(x, y);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (selectedTool !== "pencil" || !currentStroke) return;
    const { x, y } = MousePosition(e);
    updateDrawing(x, y);
  };

  const handleMouseUp = () => {
    if (selectedTool !== "pencil") return;
    endDrawing();
  };


  return (
    <canvas
      ref={canvasRef}
      className="border-2 bg-[#222222] rounded-l-lg border-[#555555] w-[80vw] h-[100vh] cursor-crosshair"
      onClick={clickPositionOnCanvas}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp = {handleMouseUp}
    />
  );
}
