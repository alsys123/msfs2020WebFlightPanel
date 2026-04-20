/* ------------------------------
   Mainline
   ------------------------------ */

// Test mode toggle
let testMode = "pause"; // "off", "on", "pause" .. if off, then we are LIVE
let updateTimer = null;

// for testing only!!!
let currentKts = 0;




function startUpdateLoop(testMode) {
    setupTestButton(testMode);

    //default
    setupPanelBasic4();
    
    if (updateTimer) clearInterval(updateTimer);
    
    updateTimer = setInterval(() => {
	updateASI();      // your ASI unified version
	updateAltimeter();      // new unified altimeter
	updateHeading();
    }, 200);
}

// Start immediately
startUpdateLoop("pause");  // start up in pause mode

/* ------------------------------
   TOP BAR SELECT
   ------------------------------ */

// Panel selection
document.querySelectorAll(".panel-btn").forEach(btn => {
    btn.addEventListener("click", () => {
	document.querySelectorAll(".panel-btn").forEach(b => b.classList.remove("active"));
	btn.classList.add("active");
	
	const panel = btn.dataset.panel;
	cLog("Selected panel:", panel);

	if (panel === "basic4") {
	    setupPanelBasic4();
	}
	if (panel === "c172Six") {
	    setupPanelC172Six();
	}
	
    });

});


document.getElementById("testToggle").addEventListener("click", () => {
    
    if (testMode === "off") {
	testMode = "on";
    } else if (testMode === "on") {
    testMode = "pause";
    } else {
	testMode = "off";
    }

//    setupTestButton(testMode);

    startUpdateLoop(testMode);
});

// set label and colours
function setupTestButton(testMode) {

    if (testMode === "pause" || testMode === "on") {
	dei("testToggle").textContent = `Test Mode: ${testMode.toUpperCase()}`;
    }
    if (testMode === "off") {
	dei("testToggle").textContent = "Live!";
    }

    // remove old classes
    dei("testToggle").classList.remove("off", "on", "pause");

  // add new class
	dei("testToggle").classList.add(testMode);
    
    console.log("Test mode:", testMode);
    
}
