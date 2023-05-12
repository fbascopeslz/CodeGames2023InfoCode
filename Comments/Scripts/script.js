import { writeCommentDB } from "../Scripts/database.js";

const dataTableJson = {
  head: [
    "Assessment Title[edit",
    "Audit Plan Title-edit",
    "Project Name__$%&1",
    "Entity",
    "Procedure Title__$%",
    "Issue Title__$7",
    "Recommendation Title",
    "Recommendation State",
    "Business Contact",
    "Due Date[edit]",
    "Days Overdue",
    "Recommendation Created Date",
  ],
  body: [
    [
      "{RHA-RCM}",
      "Scheduling AP - w/phase",
      "[Project 1]-RHA-Sub Process L3",
      "Sub Process L3",
      "(Procedure 1)",
      "Issue 1__",
      "Recommendation 1.1{test}",
      "Implemented++1",
      "mjs observer; Managers",
      "3/4/2019",
      "1091",
      "3/13/2020",
    ],
    [
      "{RHA-RCM}",
      "Scheduling AP - w/phase",
      "[Project 1]-RHA-Sub Process L3",
      "Sub Process L3",
      "Procedure 2",
      "Issue 2",
      "Recommendation 2.2",
      "Not Started",
      "aabc Business Contact; mjs observer; Roxana Honor; Managers",
      "3/16/2020",
      "821",
      "3/13/2020",
    ],
    [
      "{RHA-RCM}",
      "Scheduling AP - w/phase",
      "[Project 1]-RHA-Sub Process L3",
      "Sub Process L3",
      "Procedure 2",
      "Issue 2",
      "Recommendation 2",
      "Not Started",
      "Bert Ulrich; mjs observer; Roxana Honor; Managers",
      "3/18/2020",
      "819",
      "3/13/2020<",
    ],
    [
      "{RHA-RCM}",
      "Scheduling AP - w/phase",
      "[Project 1]-RHA-Sub Process L3",
      "Sub Process L3",
      "Procedure 2",
      "Issue 2",
      "Recommendation 2.3",
      "Not Started",
      "aatm Test Manager; mjs observer; Roxana Honor; Managers",
      "9/8/2020",
      "695",
      "3/13/2020",
    ],
    [
      "{RHA-RCM}",
      "Scheduling AP - w/phase",
      "[Project 1]-RHA-Sub Process L3",
      "Sub Process L3",
      "Procedure C1",
      "Issue C1 MC",
      "Recommendation C1",
      "Not Started",
      "mjs observer; Managers",
      "",
      "",
      "4/29/2020",
    ],
    [
      "Assessment S01",
      "Scheduling AP - w/phase",
      "SProject 03",
      "Assessment2",
      "Procedure[1-CTR]",
      "Ichu I1",
      "Ichu Rec 01",
      "Management Response-Accepted",
      "Sil Business Contact",
      "9/22/2020",
      "685",
      "1/6/2021",
    ],
    [
      "Assessment S01",
      "Scheduling AP - w/phase",
      "SProject 03",
      "Assessment2",
      "(Procedure 1)",
      "IS 01",
      "IS 01 - RS 02",
      "Not Started",
      "aabc Business Contact; Alejandro Admin; Berto Zenhna; Sil Business Contact; Sil Business Contact1",
      "1/3/2021",
      "613",
      "1/6/2021",
    ],
    [
      "Assessment S01",
      "Scheduling AP - w/phase",
      "SProject 01",
      "Corporate",
      "P2",
      "I1",
      "I1 - R2",
      "Management Response-Accepted",
      "Sil Business Contact",
      "1/09/2021",
      "600",
      "1/6/2021",
    ],
  ],
};

export async function sendEmailAjax(url) {
    writeCommentDB();
    var comment = document.getElementById("textAreaComment");
    var user = document.getElementById("userComment");
    const response = await fetch(url + "?message=" + comment.value + "&user=" + user.value);
    
}

function putAudioToComponent(idTd, src) {
  var newAudio = document.getElementById(`audio${idTd}`);
  newAudio.controls = true;
  //newAudio.autoplay = true;

  if (src) {
    newAudio.src = src.url;
  }  
}

export async function processTdsFromDatabase(element, idTd) {
  var td = document.getElementById(idTd);
  

  if (!element.isVoiceNote) {
    const comment = ` 
    <div class="popMenuComment">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">FROM: ${element.from}</h5>            
            <textarea class="form-control" readonly>${element.comment}</textarea>
          </div>
        </div>
    </div>
    `;

    // const badge = ` 
    //   <span class="badge badge-danger badgePosition">Comment</span>
    // `;
    // td.innerHTML += badge;

    td.classList.add("hoverBackgroundColorComment");
    td.innerHTML += comment;
  } else {
    const commentVoice = ` 
    <div class="popMenuComment">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">FROM: ${element.from}</h5>            
            <div><audio id="audio${idTd}" controls playsinline></audio></div>
          </div>
        </div>
    </div>
    `;

    // const badge = ` 
    //   <span class="badge badge-warning badgePosition">Voice Note</span>
    // `;
    // td.innerHTML += badge;

    td.classList.add("hoverBackgroundColorVoice");
    td.innerHTML += commentVoice;

    const base64Data = element.voice;
    const blob = await fetch(base64Data);
    putAudioToComponent(idTd, blob);
  }
}

export function addComment(idTd) {
  var input = document.getElementById("inputHiddenIdTd");
  input.value = idTd;
  $("#modalAddComment").modal("toggle");
}

export function addVoiceNote(idTd) {
  var input = document.getElementById("inputHiddenIdTd");
  input.value = idTd;
  $("#modalAddVoiceNote").modal("toggle");
}

function addHtmlToTd(td) {
  const popMenu = `      
    <div id="popupMenu${td.id}" class="dropdown-menu details">
        <button class="dropdown-item" type="button" onclick="addComment(${td.id})">Add comment</button>
        <div class="dropdown-divider"></div>
        <button class="dropdown-item" type="button" onclick="addVoiceNote(${td.id})">Add voice note</button>
      </div>
    `;
  td.innerHTML += popMenu;
}

function generateTableHead(table, data) {
  let thead = table.createTHead();
  let row = thead.insertRow();
  for (let key of data) {
    let th = document.createElement("th");
    let text = document.createTextNode(key);
    th.appendChild(text);
    row.appendChild(th);
  }
}

function generateTable(table, data) {
  let count = 1;
  for (let element of data) {
    let row = table.insertRow();
    for (let key in element) {
      let cell = row.insertCell();
      cell.setAttribute("id", count);
      cell.classList.add("has-details");
      addHtmlToTd(cell);
      let text = document.createTextNode(element[key]);
      cell.appendChild(text);
      count++;
    }
  }
}

function loadDataTable() {
  let table = document.querySelector("#tableData");
  generateTableHead(table, dataTableJson.head);
  generateTable(table, dataTableJson.body);
}

$(document).ready(function () {
  loadDataTable();
});
