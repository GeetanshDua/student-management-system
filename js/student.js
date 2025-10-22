const tableBody = document.querySelector(".student-table tbody");
const addBtn = document.querySelector(".topbar-right button");
const searchInput = document.getElementById("search-student");
const filterSelect = document.getElementById("filter-class");

const modal = document.getElementById("student-modal");
const modalTitle = document.getElementById("modal-title");
const rollInput = document.getElementById("modal-roll");
const nameInput = document.getElementById("modal-name");
const classInput = document.getElementById("modal-class");
const marksInput = document.getElementById("modal-marks");
const saveBtn = document.getElementById("modal-save");
const cancelBtn = document.getElementById("modal-cancel");

let students = JSON.parse(localStorage.getItem("students")) || [
  { roll: 1, name: "Geetansh Dua", class: "BCA", marks: 100 },
  { roll: 420, name: "Jagnoor", class: "BCA", marks: 33.3 },
  { roll: 421, name: "Money", class: "BCA", marks: 33.3 },
];

let editingIndex = null;

function saveStudents() {
  localStorage.setItem("students", JSON.stringify(students));
}

function renderStudents() {
  tableBody.innerHTML = "";
  const search = searchInput.value.toLowerCase();
  const filter = filterSelect.value.toLowerCase();

  students.forEach((s, index) => {
    if (
      (s.name.toLowerCase().includes(search) ||
        s.roll.toString().includes(search)) &&
      (filter === "" || s.class.toLowerCase() === filter)
    ) {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${s.roll}</td>
        <td>${s.name}</td>
        <td>${s.class}</td>
        <td>${s.marks}</td>
        <td>
          <button class="student-edit">Edit</button>
          <button class="student-delete">Delete</button>
        </td>
      `;
      tableBody.appendChild(row);

      row.querySelector(".student-edit").onclick = () => editStudent(index);
      row.querySelector(".student-delete").onclick = () => deleteStudent(index);
    }
  });
}

function editStudent(index) {
  const s = students[index];
  editingIndex = index;
  modalTitle.textContent = "Edit Student";
  rollInput.value = s.roll;
  nameInput.value = s.name;
  classInput.value = s.class;
  marksInput.value = s.marks;
  rollInput.disabled = true;
  modal.style.display = "flex";
}

function deleteStudent(index) {
  if (confirm(`Delete ${students[index].name}?`)) {
    students.splice(index, 1);
    saveStudents();
    renderStudents();
  }
}

// Open modal for adding new student
addBtn.onclick = () => {
  editingIndex = null;
  modalTitle.textContent = "Add Student";
  nameInput.value = "";
  classInput.value = "";
  marksInput.value = "";
  rollInput.disabled = true;
  const nextRoll = students.length
    ? Math.max(...students.map((s) => s.roll)) + 1
    : 1;
  rollInput.value = nextRoll;
  modal.style.display = "flex";
};

// Save from modal
saveBtn.onclick = () => {
  const roll = Number(rollInput.value);
  const name = nameInput.value.trim();
  const cls = classInput.value.trim();
  const marks = parseFloat(marksInput.value);

  if (!name || !cls || isNaN(marks)) {
    alert("Please fill all fields correctly!");
    return;
  }

  if (editingIndex !== null) {
    students[editingIndex] = { roll, name, class: cls, marks };
  } else {
    students.push({ roll, name, class: cls, marks });
  }

  saveStudents();
  renderStudents();
  modal.style.display = "none";
};

// Cancel modal
cancelBtn.onclick = () => (modal.style.display = "none");

// Search and filter
searchInput.oninput = renderStudents;
filterSelect.onchange = renderStudents;

// Initial render
renderStudents();
