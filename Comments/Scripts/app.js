import { addComment, sendEmailAjax, addVoiceNote } from "../Scripts/script.js";
import { writeVoiceNoteDB } from "../Scripts/database.js";

window.addComment = addComment;
window.addVoiceNote = addVoiceNote;
window.sendEmailAjax = sendEmailAjax;
window.writeVoiceNoteDB = writeVoiceNoteDB;