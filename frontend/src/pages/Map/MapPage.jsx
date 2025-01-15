import React,{useState}from 'react'
import MapComponent from '../../components/MapComponent'
import{useSelector,useDispatch} from 'react-redux'
import{createBook} from '../../features/bookings/bookSlice'

function MapPage() {
  const {user} = useSelector((state)=>state.auth);
  const [locations, setLocations] = useState([]);
  const dispatch = useDispatch()

  const[startDate,setStartDate] = useState("")
  const [endDate,setEndDate] = useState("")


  const onSubmit=(e)=>{
    e.preventDefault();
    
    if (new Date(startDate) >= new Date(endDate)) {
      alert("End date must be after the start date.");
      return;
    }

    const formData = {
      booking_date: [startDate, endDate],
      locations,
    }

    dispatch(createBook(formData))
    console.log(formData)
    setLocations([])
    setStartDate('')
    setEndDate('')
  }

  const handleLocationsUpdate = (updatedLocations) => {
    setLocations(updatedLocations); 
  };

  const removeLocation=(name)=>{
    const updateLocations = locations.filter(locations=>locations!==name);
    setLocations(updateLocations)
    console.log(locations)
  }

  return (
    <div className='box-container'>
      <div className='map-container'>
        <MapComponent onLocationsChange={handleLocationsUpdate}/>
      </div>
      
  <div className='data-container'>
  <h3>Selected Locations:</h3>
  {locations.length > 0 ? (
    <ul style={{ listStyleType: "none", padding: 0 }}>
      {locations.map((location, index) => (
        <li
          key={index}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            marginBottom: "10px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <span>{location}</span>
          <button
            style={{
              padding: "5px 10px",
              backgroundColor: "#ff4d4f",
              color: "#fff",
              border: "none",
              borderRadius: "3px",
              cursor: "pointer",
            }}
            onClick={()=>removeLocation(location)}
          >
            Remove
          </button>
        </li>
      ))}
    </ul>
  ) : (
    <p>No locations selected.</p>
  )}

<div className='data-form-container'>
  <form onSubmit={onSubmit}>
    <input type='text' id='user' name='user' value={user && user.name} disabled/>
    <select>
      {locations.map((location, index) => (
        <option key={index} value={location}>
          {location}
        </option>
  ))}
</select>
  <label for="start_date">Start Date:</label>
  <input type="date" id="start_date" name="start_date" value={startDate}
  onChange={(e) => setStartDate(e.target.value)} required />

  <label for="end_date">End Date:</label>
  <input type="date" id="end_date" name="end_date" value={endDate}
  onChange={(e) => setEndDate(e.target.value)} required />
    <button>Reserve</button>
  </form>
</div>
</div>

      
</div>
  )
}

export default MapPage