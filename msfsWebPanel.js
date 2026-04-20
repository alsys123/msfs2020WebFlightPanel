/* ------------------------------
   Mainline
   ------------------------------ */

// Test mode toggle
let testMode = true;
let updateTimer = null;

// for testing only!!!
let currentKts = 0;

/* ------------------------------
   UPDATE FUNCTIONS
   ------------------------------ */

// TEST MODE (smooth random)
function updateASI_test() {
  const target = Math.random() * 160;
  currentKts += (target - currentKts) * 0.1;
  updateNeedle(currentKts);

//    updateNeedle(160);

}

// LIVE MODE (fetch from backend)
async function updateASI_live() {
  try {
    const res = await fetch("http://10.0.0.216:5000/data");
    const d = await res.json();
    updateNeedle(d.airspeed);
  } catch (e) {
    console.log("Error:", e);
  }
}

// Shared needle update
function updateNeedle(kts) {
/*  const MIN = 0;
  const MAX = 160;
  const angle = -135 + (kts - MIN) / (MAX - MIN) * 270;
*/
    
    const MIN = 0;
    const MAX = 160;
     
    // tune these two to match your image
    const ANGLE_MIN = 0;  // where 0 kt is on the image
    const ANGLE_MAX = 265;   // where 160 kt is on the image
    
    const angle =
	  ANGLE_MIN + (kts - MIN) / (MAX - MIN) * (ANGLE_MAX - ANGLE_MIN);
    
  dei("needle").style.transform = `rotate(${angle}deg)`;
}

/* ------------------------------
   START / SWITCH UPDATE LOOP
   ------------------------------ */

function startUpdateLoop() {
  if (updateTimer) clearInterval(updateTimer);

  if (testMode) {
    updateTimer = setInterval(updateASI_test, 200);
  } else {
    updateTimer = setInterval(updateASI_live, 200);
  }
}

// Start immediately
startUpdateLoop();


/* ------------------------------
   TOP BAR SELECT
   ------------------------------ */

// Panel selection
document.querySelectorAll(".panel-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".panel-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const panel = btn.dataset.panel;
    console.log("Selected panel:", panel);
  });
});

// Test mode toggle
document.getElementById("testToggle").addEventListener("click", () => {
  testMode = !testMode;
  document.getElementById("testToggle").textContent =
    `Test Mode: ${testMode ? "ON" : "OFF"}`;

  console.log("Test mode:", testMode);

  startUpdateLoop();   // switch immediately
});
