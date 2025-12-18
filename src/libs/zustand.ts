import {create} from "zustand";

import { Shapes, PencilStroke } from "@/type";

const useWhiteboard = create((set,get) => ({
    shapes: [] as Shapes[],
    currentStroke: null as PencilStroke | null,
    drawings: [] as PencilStroke[],
    selectedTool: '' as string,
    selectedColor: "red" as string,
    gridShell: new Map(),
    setSelectedTool: (tool: string) => set(() => ({selectedTool: tool})),
    setSelectedColor: (color: string) => set(() => ({selectedColor: color})),
    createShapeAtPosition: (tool: string, x: number, y: number, color?: string) => {
        const selectedColor = color ?? get().selectedColor;
        let newShape: Shapes | undefined;

        switch (tool) {
            case "circle":
            newShape = { type: "circle", x, y, color: selectedColor, radius: 10 };
            break;
            case "rectangle":
            newShape = { type: "rectangle", x, y, color: selectedColor, width: 40, height: 30 };
            break;
            default:
            return;
        }

        set((state) => ({
            shapes: [...state.shapes, newShape!],
        }));
    },
    deleteShapeAtPosition: (x: number, y: number) => {
        set((state) => ({
            shapes: state.shapes.filter((shape) => {
                if (shape.type === "circle") {
                    const dx = x - shape.x;
                    const dy = y - shape.y;
                    return Math.sqrt(dx * dx + dy * dy) > shape.radius;
                } else if (shape.type === "rectangle") {
                    return !(x >= shape.x && x <= shape.x + shape.width && y >= shape.y && y <= shape.y + shape.height);
                }
                return true;
            }),
        }));
    },
    startDrawing: (x: number, y: number) => {
        const color = get().selectedColor;
        set({ currentStroke: { points: [{ x, y, color }] } });
    },

    updateDrawing: (x: number, y: number) => {
        set((state) => {
            if (!state.currentStroke) return {};
            return {
                currentStroke: {
                points: [...state.currentStroke.points, { x, y, color: state.currentStroke.points[0].color }],
                },
            };
        });
    },

    endDrawing: () => {
        set((state) => {
        return {
            drawings: [...state.drawings, state.currentStroke],
            currentStroke: null,
        };
        });
    },
}));

export default useWhiteboard;
