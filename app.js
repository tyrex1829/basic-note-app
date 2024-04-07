const addBtn = document.querySelector("#addBtn");
const main = document.querySelector("#main");

const saveNotes = () => {
    const notes = document.querySelectorAll(".note Textarea");
    console.log(notes);
    const data = [];
    notes.forEach( note => data.push(note.value) )
    if(data.length == 0){
        localStorage.removeItem("notes");
    }
    else{
        localStorage.setItem("notes", JSON.stringify(data));
    }
}

addBtn.addEventListener("click", () => {
    addNote()
});

const addNote = (text = "") => {
    const note = document.createElement("div");
    note.classList.add("note");
    note.innerHTML = `
        <div class="tool">
            <i class="save fas fa-save"></i>
            <i class="trash fas fa-trash"></i>
        </div>
        <textarea>${text}</textarea>
    `;

    note.querySelector(".trash").addEventListener("click", () => {
        note.remove();
        saveNotes();
    })

    note.querySelector(".save").addEventListener("click", () => {
        saveNotes();
    })

    note.querySelector("textarea").addEventListener("focusout", () => {
        saveNotes();
    })

    main.appendChild(note);
    saveNotes();
}

(
    () => {
        const lsNotes = JSON.parse(localStorage.getItem("notes"));
        if(lsNotes == null){
            addNote();
        }
        else{
            lsNotes.forEach( lsNote => addNote(lsNote) );
        }
    }
)()