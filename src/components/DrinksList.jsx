export default function DrinksList({ drinksData, images, handleAddDrink }) {
  return (
    <div className="section">
      <h3>Nejčastější</h3>
      <div className="row">
        {drinksData.map((drink, i) => {
          const img = images[`./images/${drink.imgFileName}.png`];
          return (
            <div className="card" key={i}>
              <img src={img} alt={drink.name} />
              <div className="name">{drink.name}</div>
              <button className="btn" onClick={() => handleAddDrink(drink)}>
                + Přidat
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}