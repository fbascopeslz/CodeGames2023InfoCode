import { processTdsFromDatabase } from "../Scripts/script.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import {
    getDatabase,
    ref,
    onValue,
    set,
} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";

const firebaseConfig = {
    databaseURL: "https://codegames2023-default-rtdb.firebaseio.com",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const starCountRef = ref(database, "comments");

onValue(starCountRef, (snapshot) => {
    console.log(snapshot.val());

    $("td").removeClass("hoverBackgroundColorComment");
    $("td").removeClass("hoverBackgroundColorVoice");

    $(".popMenuComment").remove();

    const ids = snapshot.val();
    for (let id in ids) {
        processTdsFromDatabase(ids[id], id);
    }
});

export function writeCommentDB() {
    var textArea = document.getElementById('textAreaComment');   
    var input = document.getElementById('inputHiddenIdTd'); 

    set(ref(database, `comments/${input.value}`), {        
        comment: textArea.value,
        from: "Paul McLeod",
        isVoiceNote: false
    });
}

export function writeVoiceNoteDB(voice) {
    // var textArea = document.getElementById('textAreaComment');   
    var input = document.getElementById('inputHiddenIdTd'); 

    set(ref(database, `comments/${input.value}`), {        
        voice: voice,
        from: "Paul McLeod",
        isVoiceNote: true
    });
}