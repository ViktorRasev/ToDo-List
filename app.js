const mainForm = document.querySelector(".main-form");
const resultsDiv = document.querySelector(".results-div");
const deleteButtonsDiv = document.querySelector(".div-for-delete-buttons");
// MODAL  
const areYouSureModal = document.querySelector(".delete-modal")
const closeModalXBtn = document.querySelector(".close-modal-btn")
const cancelModalBtn = document.querySelector(".cancelbtn-modal")
const deleteAllModalBtn = document.querySelector(".deleteallbtn-modal")

let count = 0;
let myArray = [];

mainForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let inputTextResult = e.target.elements[0].value;

  if (e.target.elements[0].value !== "") {
    count++;

    // Form created
    let newForm = document.createElement("form");
    newForm.className = "results-form";

    // Add form to the empty Array (myArray)
    myArray.push(newForm);

    // Label + checkbox created
    let newLabel = document.createElement("label");
    newLabel.textContent = inputTextResult;
    newLabel.htmlFor = "task" + count;
    newLabel.className = "label-text";

    let newCheckbox = document.createElement("input");
    newCheckbox.type = "checkbox";
    newCheckbox.id = "task" + count;
    newCheckbox.className = "checkbox";

    // Closing button + EventListener for closing form created
    let closingButton = document.createElement("button");
    closingButton.className = "closing-btn";
    closingButton.type = "button";
    closingButton.innerHTML = "&Cross;";

    // Button for delete completed tasks created
    const deleteCompleted = document.createElement("button");
    deleteCompleted.textContent = "Delete completed tasks";
    deleteCompleted.className = "delete-completed-btn";
    deleteCompleted.type = "button";

    // Button for delete all tasks created
    const deleteAll = document.createElement("button");
    deleteAll.textContent = "Delete all tasks";
    deleteAll.className = "delete-all-btn";
    deleteAll.type = "button";

    // label text in results form = left div
    let leftDiv = document.createElement("div");
    leftDiv.className = "left-div";
    leftDiv.appendChild(newLabel);

    // buttons in results form = right div
    let rightDiv = document.createElement("div");
    rightDiv.classList = "right-div";
    rightDiv.appendChild(newCheckbox);
    rightDiv.appendChild(closingButton);

    //  Adding leftDiv(label) + rightDiv(buttons) to the newForm
    newForm.appendChild(leftDiv);
    newForm.appendChild(rightDiv);

    // Adding forms to the div
    resultsDiv.appendChild(newForm);

    // Adding Delete completed + Delete all buttons to the div (only once)
    if (myArray.length === 1) {
      deleteButtonsDiv.appendChild(deleteCompleted);
    }
    if (myArray.length === 1) {
      deleteButtonsDiv.appendChild(deleteAll);
    }

    // EVENT LISTENER FOR CLOSING SINGLE TASK BUTTON
    closingButton.addEventListener("click", (e) => {
      deleteTask();

      // Remove form from Array (myArray)
      let buttonIndex = myArray.indexOf(newForm);
      myArray.splice(buttonIndex, 1);
      if (myArray.length === 0) {
        deleteButtons();
      }
    }); 

    // EVENT LISTENER FOR CLOSING COMPLETED TASKS BUTTON
    deleteCompleted.addEventListener("click", (e) => {
      // Removing checked tasks
      let newArray = myArray.filter(function (oneTask) {
        if (oneTask.querySelector("input").checked) {
          return oneTask.remove();
        }
      });

      // Remaining tasks after deleting checked
      let remainingTasks = myArray.filter((oneTask) => {
        if (oneTask.querySelector("input").checked === false) {
          return oneTask;
        }
      });

      myArray = remainingTasks;

      // Deleting both buttons if there is no task left
      if (myArray.length === 0) {
        deleteButtons();
      }
    });

    // EVENT LISTENER FOR CLOSING ALL TASKS BUTTON
    deleteAll.addEventListener("click", () => {

      //  MODAL  
      areYouSureModal.style.display = "block"
      // When the user clicks on close X button, close it
      closeModalXBtn.addEventListener('click', () => {
        areYouSureModal.style.display = "none"
      })
      // When the user clicks on cancel button, close it
      cancelModalBtn.addEventListener('click', () => {
        areYouSureModal.style.display = "none"
      })
      // When the user clicks anywhere outside of the modal, close it
      window.addEventListener("click", (e) => {
        if(e.target === areYouSureModal) {
          areYouSureModal.style.display = "none"
        }
      })

      deleteAllModalBtn.addEventListener('click', () => {
        areYouSureModal.style.display = "none"

        resultsDiv.innerHTML = "";
        myArray = [];
  
        // Deleting both buttons if there is no task left
        if (myArray.length === 0) {
          deleteButtons();
        }
      })      
    });

    function deleteButtons() {
      deleteButtonsDiv.innerHTML = "";
    }

    function deleteTask() {
      resultsDiv.removeChild(newForm);
    }

    e.target.elements[0].value = "";
  }
});

