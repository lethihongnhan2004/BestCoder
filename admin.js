// Get modal element
var modal = document.getElementById("editModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// Function to open the modal and fill data
function editProduct(id) {
  // Open modal
  modal.style.display = "block";

  // Here you would typically fetch product data using the id and prefill the form
  // For example, using a static product name for now
  document.getElementById("edit-product-name").value =
    id === 1 ? "Cây Hoa Lan" : "Cây Xương Rồng";
  document.getElementById("edit-description").value =
    id === 1 ? "Hoa lan đẹp" : "Cây xương rồng mini";
  document.getElementById("edit-price").value =
    id === 1 ? "200 điểm" : "200 điểm";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

// Handle the form submission and show success pop-up
document
  .getElementById("edit-product-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    // Show success alert
    alert("Chỉnh sửa thành công");

    // Close the modal after success
    modal.style.display = "none";
  });

// Open the edit modal and populate it with existing task data

let currentTaskId; // Variable to keep track of the currently edited task

function editTask(taskId) {
  // Get the row of the task being edited
  const taskRow = document.querySelector(`tr[data-id="${taskId}"]`);

  // Populate the modal fields
  document.getElementById("edit-task-title").value =
    taskRow.cells[1].textContent;
  document.getElementById("edit-description").value =
    taskRow.cells[2].textContent;
  document.getElementById("edit-deadline").value = taskRow.cells[3].textContent;
  document.getElementById("edit-status").value = taskRow.cells[4].textContent;

  // Show the modal
  document.getElementById("editModal").style.display = "block";

  currentTaskId = taskId; // Set the currentTaskId for later use
}

// Close the modal
function closeEditModal() {
  document.getElementById("editModal").style.display = "none";
}

// Handle form submission for editing task
document.getElementById("edit-task-form").onsubmit = function (event) {
  event.preventDefault(); // Prevent the form from submitting

  // Logic to update the task data in your task list
  const taskRow = document.querySelector(`tr[data-id="${currentTaskId}"]`);
  taskRow.cells[1].textContent =
    document.getElementById("edit-task-title").value;
  taskRow.cells[2].textContent =
    document.getElementById("edit-description").value;
  taskRow.cells[3].textContent = document.getElementById("edit-deadline").value;
  taskRow.cells[4].textContent = document.getElementById("edit-status").value;

  // Show an alert to indicate success
  alert("Thay đổi thành công!");

  closeEditModal(); // Close the modal
};

// Close modal when clicking the close button
document.querySelectorAll(".close").forEach((btn) => {
  btn.addEventListener("click", closeEditModal);
});

// Close modal when clicking outside of it
window.onclick = function (event) {
  const modal = document.getElementById("editModal");
  if (event.target === modal) {
    closeEditModal();
  }
};

// Function to handle delete action
function deleteUser(rank) {
  // Select the table body
  const tableBody = document.querySelector(".ranking-table tbody");

  // Find the row to delete based on rank
  const rowToDelete = Array.from(tableBody.rows).find(
    (row) => row.cells[0].innerText == rank
  );

  // If the row is found, remove it from the table
  if (rowToDelete) {
    tableBody.removeChild(rowToDelete);

    // Display success message
    alert("Xóa thành công");
  } else {
    alert("Không tìm thấy người dùng để xóa");
  }
}

// Attach event listeners to delete buttons after DOM content is loaded
document.addEventListener("DOMContentLoaded", () => {
  const deleteButtons = document.querySelectorAll(".delete-btn");

  deleteButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Get the rank from the row
      const rank = this.closest("tr").cells[0].innerText;
      deleteUser(rank);
    });
  });
});

function deleteUser(id) {
  // Display the delete success message
  const deleteMessageElement = document.getElementById("deleteMessage");
  deleteMessageElement.style.display = "block";

  // Optionally hide the message after 3 seconds
  setTimeout(function () {
    deleteMessageElement.style.display = "none";
  }, 3000);

  // Optionally, you can hide the user row from the table
  const row = document.querySelector(
    `tr td:first-child:contains('${id}')`
  ).parentElement;
  if (row) {
    row.remove();
  }
}
