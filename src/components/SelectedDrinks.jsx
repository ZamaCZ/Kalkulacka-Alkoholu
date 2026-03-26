function SelectedDrinks({ selectedDrinks, images, handleChangeSize, handleRemoveDrink }) {
  return (
    <div className="section">
      <h3>Vybrané nápoje</h3>
      {selectedDrinks.length === 0 && <p>Žádné nápoje</p>}
      <div className="row">
        {selectedDrinks.map((d, i) => {
          const img = images[`./images/${d.imgFileName}.png`];
          return (
            <div className="card" key={i}>
              <img src={img} alt={d.name} style={{ maxWidth: "60px", height: "auto" }} />
              <div>{d.name}</div>
              <select value={d.vybranaVelikost} onChange={e => handleChangeSize(i, e.target.value)}>
                {d.velikost.map((v, idx) => <option key={idx} value={v}>{v} l</option>)}
              </select>
              <button className="btn remove-btn" onClick={() => handleRemoveDrink(i)}>❌</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SelectedDrinks;