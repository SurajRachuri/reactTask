import { useState, useRef, useEffect } from "react";

const POPULAR_LOCATIONS = [
  "Andhra Pradesh, India", "Visakhapatnam, India", "Vijayawada, India", "Tirupati, India",
  "Arunachal Pradesh, India", "Itanagar, India",
  "Assam, India", "Guwahati, India", "Dibrugarh, India", "Silchar, India",
  "Bihar, India", "Patna, India", "Gaya, India", "Muzaffarpur, India",
  "Chhattisgarh, India", "Raipur, India", "Bhilai, India", "Bilaspur, India",
  "Goa, India", "Panaji, India", "Margao, India",
  "Gujarat, India", "Ahmedabad, India", "Surat, India", "Vadodara, India", "Rajkot, India",
  "Haryana, India", "Gurugram, India", "Faridabad, India", "Panipat, India",
  "Himachal Pradesh, India", "Shimla, India", "Manali, India", "Dharamshala, India",
  "Jharkhand, India", "Ranchi, India", "Jamshedpur, India", "Dhanbad, India",
  "Karnataka, India", "Bangalore, India", "Mysore, India", "Mangalore, India", "Hubli, India",
  "Kerala, India", "Kochi, India", "Thiruvananthapuram, India", "Kozhikode, India",
  "Madhya Pradesh, India", "Bhopal, India", "Indore, India", "Jabalpur, India", "Gwalior, India",
  "Maharashtra, India", "Mumbai, India", "Pune, India", "Nagpur, India", "Nashik, India", "Aurangabad, India",
  "Manipur, India", "Imphal, India",
  "Meghalaya, India", "Shillong, India",
  "Mizoram, India", "Aizawl, India",
  "Nagaland, India", "Kohima, India", "Dimapur, India",
  "Odisha, India", "Bhubaneswar, India", "Cuttack, India", "Rourkela, India",
  "Punjab, India", "Chandigarh, India", "Ludhiana, India", "Amritsar, India", "Jalandhar, India",
  "Rajasthan, India", "Jaipur, India", "Udaipur, India", "Jodhpur, India", "Kota, India",
  "Sikkim, India", "Gangtok, India",
  "Tamil Nadu, India", "Chennai, India", "Coimbatore, India", "Madurai, India", "Tiruchirappalli, India",
  "Telangana, India", "Hyderabad, India", "Warangal, India", "Nizamabad, India",
  "Tripura, India", "Agartala, India",
  "Uttar Pradesh, India", "Lucknow, India", "Kanpur, India", "Varanasi, India", "Agra, India", "Noida, India", "Ghaziabad, India", "Prayagraj, India",
  "Uttarakhand, India", "Dehradun, India", "Haridwar, India", "Rishikesh, India", "Nainital, India",
  "West Bengal, India", "Kolkata, India", "Howrah, India", "Durgapur, India", "Siliguri, India",
  "Delhi, India",
  "Union Territories, India", "Chandigarh, India", "Puducherry, India", "Lakshadweep, India",
  "Andaman and Nicobar Islands, India", "Jammu, India", "Srinagar, India", "Leh, India"
];

export default function LocationSearch() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const containerRef = useRef(null);

  // Filter from local array
  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    const filtered = POPULAR_LOCATIONS.filter((location) =>
      location.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 8);

    setSuggestions(filtered);
  }, [query]);

  const handleSelect = (location) => {
    setQuery(location);   // reflect in input
    setSuggestions([]);   // close dropdown
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setSuggestions([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ width: "360px", position: "relative" }}
    >
      <input
        type="text"
        placeholder="Search location..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          boxSizing: "border-box"
        }}
      />

      {suggestions.length > 0 && (
        <ul
          style={{
            listStyle: "none",
            margin: 0,
            padding: 0,
            position: "absolute",
            width: "100%",
            background: "#fff",
            border: "1px solid #ccc",
            zIndex: 1000,
            maxHeight: "220px",
            overflowY: "auto"
          }}
        >
          {suggestions.map((location, index) => (
            <li
              key={index}
              onClick={() => handleSelect(location)}
              style={{
                padding: "10px",
                cursor: "pointer",
                borderBottom: "1px solid #eee"
              }}
            >
              {location}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
