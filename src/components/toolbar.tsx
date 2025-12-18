import ShapeDropdown from "./ToolBarComponents/shapedropdown"
import Eraser from "./ToolBarComponents/eraser"
import ColorPlat from "./ToolBarComponents/ColorPicker/colorplat"
import Pencil from "@/components/ToolBarComponents/pencil"

export default function ToolBar() {
    return (
        <div className="w-[20vw] h-[100vh] bg-[#222222] border-2 rounded-r-lg border-l-0 border-[#555555] flex-col items-center px-4 gap-20">
            <h1 className="text-white font-bold text-lg">Shapes:</h1>
            <ShapeDropdown />
            <h1 className="text-white font-bold text-lg">Colors:</h1>
            <ColorPlat />
            <h1 className="text-white font-bold text-lg">Eraser:</h1>
            <Eraser />
            <h1 className="text-white font-bold text-lg">Pencil:</h1>
            <Pencil />
        </div>
    )
}