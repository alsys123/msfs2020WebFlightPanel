
//PARKING_BRAKE_POSITION


function updateBrakeLight() {
    const overlay = document.getElementById("brakeLightOverlay");

    if (gsdParkingBrake) {
        overlay.style.display = "block";   // show red overlay
    } else {
        overlay.style.display = "none";    // hide overlay
    }
}
