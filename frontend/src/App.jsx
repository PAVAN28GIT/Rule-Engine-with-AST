import { useState } from "react";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Toaster />
      <Home />
      
    </div>
  );
}

export default App;
