import "./App.css";
import BrazilMap from "./components/BrazilMap";

function App() {
  return (
    <main className="h-screen bg-orange-50 flex justify-center items-center">
      <div className="flex justify-center items-center w-full max-w-[800px] h-auto aspect-square bg-black">
        <BrazilMap />
      </div>
      <div className="flex justify-center items-center w-full max-w-[800px] h-auto aspect-square bg-black"></div>
    </main>
  );
}

export default App;
