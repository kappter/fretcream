const notes = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];

const chakraColors = {
  "A": "indigo",
  "A#": "indigo",
  "B": "violet",
  "C": "red",
  "C#": "red",
  "D": "orange",
  "D#": "orange",
  "E": "yellow",
  "F": "green",
  "F#": "green",
  "G": "blue",
  "G#": "blue"
};

// Modes: semitone intervals from tonic
const modes = {
  "Ionian":    [0,2,4,5,7,9,11],
  "Dorian":    [0,2,3,5,7,9,10],
  "Phrygian":  [0,1,3,5,7,8,10],
  "Lydian":    [0,2,4,6,7,9,11],
  "Mixolydian":[0,2,4,5,7,9,10],
  "Aeolian":   [0,2,3,5,7,8,10],
  "Locrian":   [0,1,3,5,6,8,10]
};

// Strings (high E → low E)
const standardTuning = ["E","B","G","D","A","E"];
const dropDTuning    = ["E","B","G","D","A","D"];

const keySelect   = document.getElementById("key");
const modeSelect  = document.getElementById("mode");
const dropDCheck  = document.getElementById("dropD");
const fretboard   = document.getElementById("fretboard");

// Fill key dropdown
notes.forEach(n => {
  let opt = document.createElement("option");
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

  // lowest string at bottom
  [...tuning].reverse().forEach((openNote, stringIndex) => {
    let row = `<tr><th>Str ${6-stringIndex}</th>`;
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
  const key = keySelect.value;
  const mode = modeSelect.value;
  const keyIndex = notes.indexOf(key);
  const scale = modes[mode].map(i => notes[(keyIndex + i) % 12]);

  [...fretboard.querySelectorAll("td")].forEach(td => {
    const n = td.dataset.note;
    if (scale.includes(n)) {
      td.style.background = chakraColors[n];
      td.textContent = n;
      td.classList.add("note");
    }
  });
}

// Event listeners
[keySelect, modeSelect, dropDCheck].forEach(el =>
  el.addEventListener("change", updateFretboard)
);

// Initialize
buildFretboard();
updateFretboard();
