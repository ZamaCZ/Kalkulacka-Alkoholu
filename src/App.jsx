import { useState } from "react";
import "./App.css";
import InputForm from "./components/InputForm";
import DrinksList from "./components/DrinksList";
import SelectedDrinks from "./components/SelectedDrinks";
import Results from "./components/Results";
import { drinksData } from "./components/drinksData";

// Načtení všech obrázků z /images
const images = import.meta.glob("./images/*.{png,jpg,jpeg,svg}", { eager: true, import: "default" });

function App() {
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState("male");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [selectedDrinks, setSelectedDrinks] = useState([]);

  // Přidání drinku do seznamu
  const handleAddDrink = (drink) => {
    setSelectedDrinks([...selectedDrinks, { ...drink, vybranaVelikost: drink.velikost[0] }]);
  };

  // Změna velikosti drinku v seznamu
  const handleChangeSize = (index, velikost) => {
    const copy = [...selectedDrinks];
    copy[index].vybranaVelikost = parseFloat(velikost);
    setSelectedDrinks(copy);
  };

  // Odstranění drinku ze seznamu
  const handleRemoveDrink = (index) => {
    setSelectedDrinks(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="container">
      <h1>Alkohol Kalkulačka</h1>

      {/* Formulář pro vstup */}
      <InputForm
        weight={weight} setWeight={setWeight}
        gender={gender} setGender={setGender}
        startTime={startTime} setStartTime={setStartTime}
        endTime={endTime} setEndTime={setEndTime}
      />

      {/* Nabídka drinků */}
      <DrinksList
        drinksData={drinksData}
        images={images}
        handleAddDrink={handleAddDrink}
      />

      {/* Vybrané drinky */}
      <SelectedDrinks
        selectedDrinks={selectedDrinks}
        images={images}
        handleChangeSize={handleChangeSize}
        handleRemoveDrink={handleRemoveDrink}
      />

      {/* Výsledky BAC a střízlivosti */}
      <Results
        weight={weight} gender={gender}
        selectedDrinks={selectedDrinks}
        startTime={startTime} endTime={endTime}
      />
    </div>
  );
}

export default App;