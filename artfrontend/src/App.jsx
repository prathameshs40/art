import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState({});

  useEffect(() => {
    fetch("http://localhost:8000/users")
      .then((response) => response.json())
      .then((data) => setData(data.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <div className="h-screen w-full flex flex-col justify-center items-center">
        <div className="flex flex-col">
          <span className="font-light font-mont">{data.welcome}</span>
          <span className="text-9xl font-black font-dm">{data.company}</span>
        </div>
      </div>
    </>
  );
}

export default App;
