const STORAGE_KEY = 'quick-notes';

const noteForm = document.querySelector('#note-form');
const noteInput = document.querySelector('#note-input');
const notesCount = document.querySelector('#notes-count');
const noteList = document.querySelector('#note-list');

function getStoredNotes() {
  try {
    const storedValue = localStorage.getItem(STORAGE_KEY);
    const parsedNotes = storedValue ? JSON.parse(storedValue) : [];
    return Array.isArray(parsedNotes) ? parsedNotes : [];
  } catch (error) {
    console.error('Unable to read saved notes:', error);
    return [];
  }
}

function saveNotes(notes) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

function updateNotesHeading(totalNotes) {
  if (!notesCount) return;

  if (totalNotes === 0) {
    notesCount.textContent = 'You have no notes saved yet.';
    return;
  }

  notesCount.textContent = `You have ${totalNotes} note${totalNotes === 1 ? '' : 's'} saved:`;
}

function renderNotes() {
  if (!noteList) return;

  const notes = getStoredNotes();
  noteList.innerHTML = '';

  if (notes.length === 0) {
    const emptyItem = document.createElement('li');
    emptyItem.textContent = 'No notes yet. Add your first idea.';
    noteList.appendChild(emptyItem);
    updateNotesHeading(0);
    return;
  }

  notes.forEach((note, index) => {
    const listItem = document.createElement('li');
    listItem.className = 'note-item';

    const noteText = document.createElement('span');
    noteText.textContent = note;

    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.className = 'remove-note-btn';
    removeButton.textContent = 'Remove';
    removeButton.setAttribute('aria-label', `Remove note: ${note}`);
    removeButton.addEventListener('click', () => {
      const updatedNotes = [...getStoredNotes()];
      updatedNotes.splice(index, 1);
      saveNotes(updatedNotes);
      renderNotes();
    });

    listItem.appendChild(noteText);
    listItem.appendChild(removeButton);
    noteList.appendChild(listItem);
  });

  updateNotesHeading(notes.length);
}

if (noteForm && noteInput) {
  noteForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const newNote = noteInput.value.trim();

    if (!newNote) {
      noteInput.focus();
      return;
    }

    const notes = getStoredNotes();
    notes.unshift(newNote);
    saveNotes(notes);
    noteInput.value = '';
    renderNotes();
    noteInput.focus();
  });
}

renderNotes();
