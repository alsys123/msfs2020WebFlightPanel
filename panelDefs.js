/* ------------------------------
   Panel Defintions
   ------------------------------ */

function setupPanelBasic4() {
    const gaugePositions = {
	asi:         { x: 70,  y: 150, size: 300 },
	alt:         { x: 520, y: 150, size: 300 },
	hdg:         { x: 70,  y: 450, size: 300 },
	timerCanvas: { x: 520, y: 450, size: 300 }
    };
    
    for (const id in gaugePositions) {
	const pos = gaugePositions[id];
	setGauge(id, pos.x, pos.y, pos.size);
    }

}
function setupPanelSixPack() {
    const gaugePositions = {
	asi:            { x: 40,   y: 150, size: 200 },
	attitudeDivID:  { x: 340,  y: 150, size: 200 },
	alt:            { x: 620,  y: 150, size: 200 },

	hdgTypeB:        { x: 40,  y: 450, size: 200 }
	
    };
    
    for (const id in gaugePositions) {
	const pos = gaugePositions[id];
	setGauge(id, pos.x, pos.y, pos.size);
    }

}


// ******* UTILS *****
function setGauge(id, x, y, size = 300) {
    const el = dei(id);
    
    el.style.position = "absolute";
    el.style.width = size + "px";
    el.style.height = size + "px";
    el.style.visibility = "visible";
    
    el.style.left = x + "px";
    el.style.top = y + "px";
}

function hideAllGauges() {
    // make sure to hide the entire container - ie the div
    const gauges =
	  ["asi", "alt", "hdg", "timerCanvas", "hdgTypeB",
	   "attitudeDivID"];

  gauges.forEach(id => {
    const el = dei(id);
    if (el) {
      el.style.visibility = "hidden";
      el.style.position = "absolute";  // keep layout consistent
      el.style.width = "300px";
      el.style.height = "300px";
    }
  });
}
