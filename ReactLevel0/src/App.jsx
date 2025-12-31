// import "./App.css";
import Greeting from "./Greeting";
import { Card } from "./card";
import ImageGallery from "./ImageGallery";
import MiniProject from "./MiniProject";
import { FavoritesFoods } from "../simpleList";
import { Routes, Route, useNavigate } from "react-router-dom";
import Appa from "./Missdata";

function App() {
  const navigate = useNavigate();
  // var name=10
  let name = "Suraj";
  let age = 25;
  let city = "Hyderbad";

  return (
    <>
      <Routes>

        {/* HOME PAGE */}
        <Route
          path="/"
          element={
            <>


              <Appa />
              <h1>Task 0.2</h1>
              <div>
                <p>{name}</p>
                <p>{age}</p>
                <p>{city}</p>
              </div>

              <h1> Task 0.3</h1>
              <FavoritesFoods />

              <h1>Task 0.4</h1>
              <Greeting data="xyz" name="Alice" />
              <Greeting data="xyz " name="Bob" />
              <Greeting data="xyz" name="Suraj" />

              <h1>Task 0.5</h1>
              <Card
                title="Suraj"
                content="ipsum dolor sit amet consectetur adipisicing elit..."
              />
              <h1>Task 0.6</h1>
              <ImageGallery />

               <button onClick={() => navigate("/mini-project")}>
                MiniProject
              </button>

              {/* 
              

             

           

             

              */}
            </>
          }
        />

        {/* MINI PROJECT PAGE */}
        <Route path="/mini-project" element={<MiniProject />} />

      </Routes>
    </>
  );
}

export default App;
