import ToolBar from "@/components/toolbar";
import Canvas from "@/components/canvas";
import ReadCSV from "@/components/ToolBarComponents/AddCsv"

export default function Home() {
  return (
    <div className="bg-black h-screen w-screen max-h-screen flex">
        <Canvas/>
        <ToolBar/>
        {/* <ReadCSV/> */}
    </div>
  );
}
