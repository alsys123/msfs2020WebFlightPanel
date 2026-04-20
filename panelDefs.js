/* ------------------------------
   Panel Defintions
   ------------------------------ */

function setupPanelBasic4() {
    const gaugePositions = {
	asi: { x: 50, y: 00 },
	alt: { x: 520, y: 150 },
	hdg: { x: 70, y: 450 }
    };
    
    for (const id in gaugePositions) {
	const pos = gaugePositions[id];
	moveGauge(id, pos.x, pos.y);
    }

}
function setupPanelC172Six() {
    const gaugePositions = {
	asi: { x: 550, y: 50 },
	alt: { x: 220, y: 150 }
//	hdg: { x: 840, y: 120 }
    };
    
    for (const id in gaugePositions) {
	const pos = gaugePositions[id];
	moveGauge(id, pos.x, pos.y);
    }

}
