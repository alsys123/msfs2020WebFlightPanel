const IDL_URL = "http://10.0.0.216:52020/data.json";

async function fetchIDL() {
  try {
    const response = await fetch(IDL_URL);
    if (!response.ok) throw new Error("IDL fetch failed");

    const data = await response.json();

    // Update UI
    document.getElementById("altitude").textContent =
      `Altitude: ${data.altitude}`;

    document.getElementById("airspeed").textContent =
      `Airspeed: ${data.airspeed}`;

    document.getElementById("heading").textContent =
      `Heading: ${data.heading}`;

  } catch (err) {
    console.error("IDL error:", err);
  }
}

// Poll 10 times per second (same as many sims)
setInterval(fetchIDL, 100);
