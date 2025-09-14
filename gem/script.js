document.addEventListener('DOMContentLoaded', () => {
    const keySelect = document.getElementById('key-select');
    const modeSelect = document.getElementById('mode-select');
    const dropDCheckbox = document.getElementById('drop-d-checkbox');
    const fretboardTableBody = document.querySelector('#fretboard tbody');

    // Define all 12 notes and their order
    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

    // Define the intervals for each scale/mode
    const scales = {
        'major': [0, 2, 4, 5, 7, 9, 11],
        'minor': [0, 2, 3, 5, 7, 8, 10],
        'dorian': [0, 2, 3, 5, 7, 9, 10],
        // ... add more scales as needed
    };

    // The open strings (standard tuning)
    let tuning = ['E', 'A', 'D', 'G', 'B', 'E'];

    function renderFretboard() {
        // Clear the table first
        fretboardTableBody.innerHTML = '';

        const selectedKey = keySelect.value;
        const selectedMode = modeSelect.value;
        const isDropD = dropDCheckbox.checked;

        // Adjust tuning for Drop D
        if (isDropD) {
            tuning = ['D', 'A', 'D', 'G', 'B', 'E'];
        } else {
            tuning = ['E', 'A', 'D', 'G', 'B', 'E'];
        }

        const keyIndex = notes.indexOf(selectedKey);
        const scaleIntervals = scales[selectedMode];
        
        // Build the scale notes array based on the key and mode
        const scaleNotes = scaleIntervals.map(interval => notes[(keyIndex + interval) % 12]);
        
        // Loop through each string
        tuning.forEach(openStringNote => {
            const row = document.createElement('tr');
            
            // Add the string name cell
            const stringNameCell = document.createElement('td');
            stringNameCell.textContent = openStringNote;
            row.appendChild(stringNameCell);

            // Loop through each fret (0 to 13)
            for (let fret = 0; fret <= 13; fret++) {
                const cell = document.createElement('td');
                
                // Calculate the note for the current fret
                const openStringIndex = notes.indexOf(openStringNote);
                const noteIndex = (openStringIndex + fret) % 12;
                const note = notes[noteIndex];
                
                // Check if the note is in the selected scale
                if (scaleNotes.includes(note)) {
                    cell.textContent = note;
                    
                    // Add the CSS class for chakra color
                    const noteClass = `note-${note.replace('#', '-sharp')}`;
                    cell.classList.add(noteClass);
                }

                row.appendChild(cell);
            }
            fretboardTableBody.appendChild(row);
        });
    }

    // Add event listeners to trigger the function
    keySelect.addEventListener('change', renderFretboard);
    modeSelect.addEventListener('change', renderFretboard);
    dropDCheckbox.addEventListener('change', renderFretboard);

    // Initial render
    renderFretboard();
});
