export default function InputForm({ weight, setWeight, gender, setGender, startTime, setStartTime, endTime, setEndTime }) {
  return (
    <div className="section">
      <div className="row">
        <div className="toggle-group">
          <button className={`toggle-btn ${gender==="male"?"active":""}`} onClick={()=>setGender("male")}>Muž</button>
          <button className={`toggle-btn ${gender==="female"?"active":""}`} onClick={()=>setGender("female")}>Žena</button>
        </div>

        <input type="number" placeholder="Hmotnost (kg)" value={weight} onChange={e=>setWeight(e.target.value)} min={1}/>
        <input type="time" value={startTime} onChange={e=>setStartTime(e.target.value)} title="Čas začátku pití"/>
        <input type="time" value={endTime} onChange={e=>setEndTime(e.target.value)} title="Čas konce pití"/>
      </div>
    </div>
  )
}