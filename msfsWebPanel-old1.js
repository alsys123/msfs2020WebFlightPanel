/* ------------------------------
   Mainline
   ------------------------------ */

// Test mode toggle
let testMode = true;

// Draw gauge background once
function drawGauge() {
  const c = document.getElementById("gauge");
  const ctx = c.getContext("2d");
  const cx = 150, cy = 150, r = 140;

  ctx.clearRect(0, 0, 300, 300);

  // Outer bezel
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fillStyle = "#000";
  ctx.fill();
  ctx.lineWidth = 6;
  ctx.strokeStyle = "#666";
  ctx.stroke();

  // Tick marks
  const MIN = 0;
  const MAX = 160;

  for (let kts = MIN; kts <= MAX; kts += 10) {
    const angle = (-135 + (kts - MIN) / (MAX - MIN) * 270) * Math.PI / 180;

    const inner = kts % 20 === 0 ? 100 : 115;
    const outer = 130;

    const x1 = cx + inner * Math.cos(angle);
    const y1 = cy + inner * Math.sin(angle);
    const x2 = cx + outer * Math.cos(angle);
    const y2 = cy + outer * Math.sin(angle);

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineWidth = kts % 20 === 0 ? 4 : 2;
    ctx.strokeStyle = "#fff";
    ctx.stroke();

    // Numbers every 20 knots
    if (kts % 20 === 0) {
      const tx = cx + 80 * Math.cos(angle);
      const ty = cy + 80 * Math.sin(angle);
      ctx.fillStyle = "#fff";
      ctx.font = "20px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(kts, tx, ty);
    }
  }
}

//drawGauge();

// for testing only!!!
let currentKts = 0;

// for testing only!!!
async function updateASI-test() {
  // target speed (mock)
  const target = Math.random() * 160;

  // smooth interpolation
  currentKts += (target - currentKts) * 0.1;

  const MIN = 0;
  const MAX = 160;
  const angle = -135 + (currentKts - MIN) / (MAX - MIN) * 270;

  dei("needle").style.transform = `rotate(${angle}deg)`;
}

async function updateASI-live() {
  try {
    const res = await fetch("http://10.0.0.216:5000/data");
    const d = await res.json();

    const kts = d.airspeed;
    const MIN = 0;
    const MAX = 160;

    const angle = -135 + (kts - MIN) / (MAX - MIN) * 270;

    document.getElementById("needle").style.transform =
      `rotate(${angle}deg)`;

  } catch (e) {
    console.log("Error:", e);
  }
}


if (testMode) {
    setInterval(updateASI-test, 200);
    else {
    setInterval(updateASI-live, 200);
    }

    
// **** TOP BAR SELECT ****

// Panel selection
document.querySelectorAll(".panel-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".panel-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const panel = btn.dataset.panel;
    console.log("Selected panel:", panel);

    // later: load different gauges here
  });
});

document.getElementById("testToggle").addEventListener("click", () => {
  testMode = !testMode;
  document.getElementById("testToggle").textContent =
    `Test Mode: ${testMode ? "ON" : "OFF"}`;

  console.log("Test mode:", testMode);
});
