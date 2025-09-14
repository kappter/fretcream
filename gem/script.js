document.addEventListener('DOMContentLoaded', () => {
    const keySelect = document.getElementById('key-select');
    const modeSelect = document.getElementById('mode-select');
    const dropDCheckbox = document.getElementById('drop-d-checkbox');
    const lowStringToggle = document.getElementById('low-string-toggle'); // Get the new toggle
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const fretboardTableBody = document.querySelector('#fretboard tbody');

    // Define all 12 notes in the chromatic scale
    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

    // Define the intervals for each scale/mode
    const scales = {
        'major': [0, 2, 4, 5, 7, 9, 11],
        'minor': [0, 2, 3, 5, 7, 8, 10],
        'dorian': [0, 2, 3, 5, 7, 9, 10],
        'phrygian': [0, 1, 3, 5, 7, 8, 10],
        'lydian': [0, 2, 4, 6, 7, 9, 11],
        'mixolydian': [0, 2, 4, 5, 7, 9, 10],
        'aeolian': [0, 2, 3, 5, 7, 8, 10],
        'locrian': [0, 1, 3, 5, 6, 8, 10]
    };

    function renderFretboard() {
        fretboardTableBody.innerHTML = '';

        const selectedKey = keySelect.value;
        const selectedMode = modeSelect.value;
        const isDropD = dropDCheckbox.checked;
        const isLowStringOnBottom = lowStringToggle.checked; // Check the state of the new toggle

        // Define tuning based on checkbox state
        const standardTuning = isDropD ? ['D', 'A', 'D', 'G', 'B', 'E'] : ['E', 'A', 'D', 'G', 'B', 'E'];
        
        // Choose the correct tuning array based on the toggle
        const displayedTuning = isLowStringOnBottom ? [...standardTuning].reverse() : standardTuning;

        const keyIndex = notes.indexOf(selectedKey);
        const scaleIntervals = scales[selectedMode];
        
        // Build the scale notes array based on the key and mode
        const scaleNotes = scaleIntervals.map(interval => notes[(keyIndex + interval) % 12]);
        
        displayedTuning.forEach(openStringNote => {
            const row = document.createElement('tr');
            
            const stringNameCell = document.createElement('td');
            stringNameCell.textContent = openStringNote;
            row.appendChild(stringNameCell);

            for (let fret = 0; fret <= 13; fret++) {
                const cell = document.createElement('td');
                
                const openStringIndex = notes.indexOf(openStringNote);
                const noteIndex = (openStringIndex + fret) % 12;
                const note = notes[noteIndex];
                
                if (scaleNotes.includes(note)) {
                    cell.textContent = note;
                    const noteClass = `note-${note.replace('#', '-sharp')}`;
                    cell.classList.add(noteClass);
                }

                row.appendChild(cell);
            }
            fretboardTableBody.appendChild(row);
        });
    }

    // Function for Dark/Light mode
    function setTheme(isDark) {
        const body = document.body;
        if (isDark) {
            body.classList.add('dark-mode');
        } else {
            body.classList.remove('dark-mode');
        }
    }

    // Check for saved preference or system preference for dark mode
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
    const savedDarkMode = localStorage.getItem('darkMode');

    if (savedDarkMode !== null) {
        darkModeToggle.checked = (savedDarkMode === 'true');
    } else {
        darkModeToggle.checked = prefersDarkScheme.matches;
    }
    setTheme(darkModeToggle.checked);

    // Add event listeners to trigger the function
    keySelect.addEventListener('change', renderFretboard);
    modeSelect.addEventListener('change', renderFretboard);
    dropDCheckbox.addEventListener('change', renderFretboard);
    lowStringToggle.addEventListener('change', renderFretboard); // New listener for the layout toggle
    darkModeToggle.addEventListener('change', () => {
        const isDark = darkModeToggle.checked;
        localStorage.setItem('darkMode', isDark);
        setTheme(isDark);
        renderFretboard();
    });

    // Initial render
    renderFretboard();
});
