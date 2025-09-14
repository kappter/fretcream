const notes = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
const modes = {
  "Ionian": [0,2,4,5,7,9,11],
  "Dorian": [0,2,3,5,7,9,10],
  "Phrygian": [0,1,3,5,7,8,10],
  "Lydian": [0,2,4,6,7,9,11],
  "Mixolydian": [0,2,4,5,7,9,10],
  "Aeolian": [0,2,3,5,7,8,10],
  "Locrian": [0,1,3,5,6,8,10]
};

const standardTuning = ["E","A","D","G","B","E"];
const dropDTuning = ["D","A","D","G","B","E"];

const keySelect = document.getElementById("key");
const modeSelect = document.getElementById("mode");
const dropDCheck = document.getElementById("dropD");
const fretboard = document.getElementById("fretboard");
const themeToggle = document.getElementById("themeToggle");
const flipToggle = document.getElementById("flipToggle");

let reversed = true; // low string at bottom by default

// Fill key dropdown
notes.forEach(n => {
  const opt = document.createElement("option");
  opt.value = n;
  opt.textContent = n;
  keySelect.appendChild(opt);
});

function buildFretboard() {
  fretboard.innerHTML = "";
  let header = "<tr><th></th>";
  for (let f=0; f<=13; f++) header += `<th>${f}</th>`;
  header += "</tr>";
  fretboard.innerHTML += header;

  const tuning = dropDCheck.checked ? dropDTuning : standardTuning;
  const strings = reversed ? [...tuning].reverse() : [...tuning];

  strings.forEach((openNote, i) => {
    let row = `<tr><th>${openNote}</th>`;
    let startIndex = notes.indexOf(openNote);
    for (let f=0; f<=13; f++) {
      let note = notes[(startIndex + f) % 12];
      let fretClass = `fret-${f}`;
      row += `<td class="${fretClass}" data-note="${note}"></td>`;
    }
    row += "</tr>";
    fretboard.innerHTML += row;
  });
}

function updateFretboard() {
  buildFretboard();
  const root = keySelect.value;
  const mode = modeSelect.value;
  const rootIndex = notes.indexOf(root);
  const scale = modes[mode].map(interval => notes[(rootIndex + interval) % 12]);

  document.querySelectorAll("#fretboard td").forEach(cell => {
    const note = cell.dataset.note;
    if (scale.includes(note)) {
      cell.textContent = note;
      cell.classList.add(`note-${note[0]}`);
    }
  });
}

// Theme toggle
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Flip toggle
flipToggle.addEventListener("click", () => {
  reversed = !reversed;
  updateFretboard();
});

// Reactivity
[keySelect, modeSelect, dropDCheck].forEach(el =>
  el.addEventListener("change", updateFretboard)
);

buildFretboard();
