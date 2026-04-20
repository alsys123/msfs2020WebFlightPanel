/* ------------------------------
   Utils
   ------------------------------ */

function dei(Element) {
    const Id = document.getElementById(Element);
    return Id;
} //dei


function cLog(...text) {
    console.log(...text);
}

function moveGauge(id, x, y) {
  const el = dei(id);
  el.style.left = x + "px";
  el.style.top = y + "px";
}
