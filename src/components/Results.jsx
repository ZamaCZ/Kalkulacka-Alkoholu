export default function Results({ weight, gender, selectedDrinks, startTime, endTime }) {
  const totalAlcoholGrams = selectedDrinks.reduce((acc, d) => {
    return acc + d.vybranaVelikost * (d.alkohol / 100) * 0.8 * 1000;
  }, 0);


  const getElapsedHours = () => {
    if (!startTime || !endTime) return 0;
    const [startH, startM] = startTime.split(":").map(Number);
    const [endH, endM] = endTime.split(":").map(Number);
    let start = new Date(); start.setHours(startH, startM, 0,0);
    let end = new Date(); end.setHours(endH, endM, 0,0);
    if (end < start) end.setDate(end.getDate()+1);
    return (end-start)/(1000*60*60);
  }

  const elapsedHours = getElapsedHours();
  const calculateBAC = () => {
    if (!weight || weight<=0) return 0;
    const r = gender==="male"?0.73:0.66;
    const weightLbs = weight*2.20462;
    const alcoholOz = totalAlcoholGrams*0.035274;
    let bac = (alcoholOz*5.14)/(weightLbs*r);
    const METAB_RATE = 0.015;
    bac -= METAB_RATE*elapsedHours;
    if (bac<0) bac=0;
    return bac;
  }

  const bac = calculateBAC();


  const getSoberingTime = () => {
    if (bac<=0) return "Jste střízlivý/á";
    const METAB_RATE = 0.15; 
    const bacPromile = bac*10;
    const hoursToSober = bacPromile / METAB_RATE;
    if (endTime){
      const [endH, endM] = endTime.split(":").map(Number);
      let end = new Date(); end.setHours(endH,endM,0,0);
      if (end<new Date()) end.setDate(end.getDate()+1);
      const soberDate = new Date(end.getTime() + hoursToSober*60*60*1000);
      return `Odhad střízlivosti: za cca ${hoursToSober.toFixed(1)} hod (okolo ${soberDate.getHours()}:${soberDate.getMinutes().toString().padStart(2,"0")})`
    }
    return `Odhad střízlivosti: za cca ${hoursToSober.toFixed(1)} hod`;
  }

  return (
    <div className="section result-grid">
      <div className="result-box">
        <h2>{(bac*10).toFixed(2)} ‰</h2>
        <p>promile alkoholu v krvi</p>
      </div>
      <div className="result-box" style={{backgroundColor: bac>0?"#f28c8c":"#8cf28c"}}>
        <p>{getSoberingTime()}</p>
      </div>
    </div>
  )
}