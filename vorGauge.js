// ==================== VOR 1 / VOR 2 INDICATOR (CDI) ====================
// Same dark-bezel, vibrant aviation style as your other gauges

function drawVorFace(canvas, vorNumber = 1, course = 0, deviation = 0, toFrom = "TO", signalValid = true) {
  const ctx = canvas.getContext("2d");
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  const r = canvas.width / 2 - 22;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // === Outer dark bezel ===
  ctx.beginPath();
  ctx.arc(cx, cy, r + 20, 0, Math.PI * 2);
  ctx.fillStyle = "#111111";
  ctx.fill();
  ctx.lineWidth = 18;
  ctx.strokeStyle = "#555555";
  ctx.stroke();

  // === Inner background ===
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fillStyle = "#0a0a0a";
  ctx.fill();

  const normDev = Math.max(Math.min(deviation, 10), -10) / 10;   // ±10° full scale

  // === Compass rose (rotated to selected course) ===
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(-course * Math.PI / 180);
  ctx.translate(-cx, -cy);

  ctx.strokeStyle = "#ffffff";
  ctx.fillStyle = "#ffffff";
  ctx.lineWidth = 2.5;
  ctx.font = "bold 16px monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  for (let deg = 0; deg < 360; deg += 10) {
    const angle = (deg - 90) * Math.PI / 180;
    const inner = r - 38;
    const outer = r - 12;

    ctx.beginPath();
    ctx.moveTo(cx + inner * Math.cos(angle), cy + inner * Math.sin(angle));
    ctx.lineTo(cx + outer * Math.cos(angle), cy + outer * Math.sin(angle));
    ctx.stroke();

    if (deg % 30 === 0) {
      const tx = cx + (r - 58) * Math.cos(angle);
      const ty = cy + (r - 58) * Math.sin(angle);
      const label = (deg % 360 === 0) ? "N" : String(deg).padStart(2, "0");
      ctx.fillText(label, tx, ty);
    }
  }
  ctx.restore();

  // === CDI Vertical Needle (deviation) ===
  const needleX = cx + normDev * (r * 0.68);

  ctx.strokeStyle = "#00ffcc";           // bright cyan needle
  ctx.lineWidth = 7;
  ctx.lineCap = "round";
  ctx.shadowColor = "#00ffcc";
  ctx.shadowBlur = 12;

  ctx.beginPath();
  ctx.moveTo(needleX, cy - r + 48);
  ctx.lineTo(needleX, cy + r - 48);
  ctx.stroke();

  ctx.shadowBlur = 0;

  // CDI center box + dots
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 3;
  for (let i = -2; i <= 2; i++) {
    const x = cx + (i * 0.25) * (r * 0.68);
    ctx.beginPath();
    ctx.moveTo(x, cy - 28);
    ctx.lineTo(x, cy + 28);
    ctx.stroke();
  }

  // === TO / FROM Flag ===
  ctx.fillStyle = signalValid ? (toFrom === "TO" ? "#22ff88" : "#ff8844") : "#888888";
  ctx.font = "bold 28px monospace";
  ctx.textAlign = "center";
  ctx.fillText(toFrom, cx + 92, cy - 72);

  // === Selected Course (OBS) Digital ===
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 42px monospace";
  ctx.textAlign = "center";
  ctx.fillText(course.toString().padStart(3, "0"), cx, cy + 105);

  ctx.font = "bold 18px sans-serif";
  ctx.fillStyle = "#aaaaaa";
  ctx.fillText("°", cx + 72, cy + 98);

  // VOR Identifier
  ctx.fillStyle = "#00ccff";
  ctx.font = "bold 22px sans-serif";
  ctx.fillText(`VOR ${vorNumber}`, cx, cy - 125);

  // NAV Flag (red when no signal)
  if (!signalValid) {
    ctx.fillStyle = "#ff2222";
    ctx.font = "bold 26px sans-serif";
    ctx.fillText("NAV", cx - 88, cy - 72);
  }

  // === Aircraft Symbol (fixed at center) ===
  ctx.strokeStyle = "#ffff00";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(cx - 38, cy);   // left wing
  ctx.lineTo(cx + 38, cy);   // right wing
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(cx, cy - 18);
  ctx.lineTo(cx, cy + 22);
  ctx.stroke();
}

// ==================== UPDATE FUNCTION ====================
async function updateVor(vorNumber = 1) {
  let course = 0;
  let deviation = 0;
  let toFrom = "TO";
  let signalValid = true;

  if (testMode === "on") {
    course = Math.floor( (Date.now() / 40) % 360 );
    deviation = Math.sin(Date.now() / 800) * 9.5;
    toFrom = (Math.sin(Date.now() / 1200) > 0) ? "TO" : "FROM";
    signalValid = Math.random() > 0.05;
  } else {
    try {
      const res = await fetch("http://10.0.0.216:5000/data");
      const d = await res.json();
      // Adjust these property names to match your backend
      course = d[`vor${vorNumber}_course`] || d.course || 0;
      deviation = d[`vor${vorNumber}_dev`] || d.deviation || 0;
      toFrom = (d[`vor${vorNumber}_tofrom`] || "TO").toUpperCase();
      signalValid = d[`vor${vorNumber}_valid`] !== false;
    } catch (e) {
      console.log(`VOR${vorNumber} fetch error:`, e);
    }
  }

  const canvas = document.getElementById(`vor${vorNumber}Canvas`);
  if (canvas) drawVorFace(canvas, vorNumber, course, deviation, toFrom, signalValid);
}

// ==================== INIT (for VOR 1) ====================
const vorCanvas = document.getElementById("vor1Canvas");
vorCanvas.width = 360;
vorCanvas.height = 360;

drawVorFace(vorCanvas, 1, 42, 3.5, "TO", true);
setInterval(() => updateVor(1), 80);   // smooth updates
