const input = document.getElementById("todo-input");
    const addBtn = document.getElementById("add-btn");
    const list = document.getElementById("todo-list");

    // Add new todo
    addBtn.addEventListener("click", () => {
      const text = input.value.trim();
      if (!text) return;

      const li = document.createElement("li");

      const span = document.createElement("span");
      span.className = "todo-text";
      span.textContent = text;

      const actions = document.createElement("div");
      actions.className = "actions";

      const editBtn = document.createElement("button");
      editBtn.className = "edit-btn";
      editBtn.textContent = "Edit";

      const deleteBtn = document.createElement("button");
      deleteBtn.className = "delete-btn";
      deleteBtn.textContent = "Delete";

      actions.appendChild(editBtn);
      actions.appendChild(deleteBtn);

      li.appendChild(span);
      li.appendChild(actions);
      list.appendChild(li);

      input.value = "";
    });

    // Handle Edit / Save / Delete using event delegation
    list.addEventListener("click", (e) => {
      const target = e.target;
      const li = target.closest("li");
      if (!li) return;

      // Delete
      if (target.classList.contains("delete-btn")) {
        li.remove();
      }

      // Edit
      if (target.classList.contains("edit-btn")) {
        const span = li.querySelector(".todo-text");
        const currentText = span.textContent;

        // Replace span with input
        const editInput = document.createElement("input");
        editInput.type = "text";
        editInput.value = currentText;
        editInput.className = "todo-input-edit";

        li.replaceChild(editInput, span);

        // Change Edit button to Save
        target.textContent = "Save";
        target.classList.remove("edit-btn");
        target.classList.add("save-btn");

        editInput.focus();
        editInput.setSelectionRange(currentText.length, currentText.length);
      }

      // Save
      else if (target.classList.contains("save-btn")) {
        const editInput = li.querySelector(".todo-input-edit");
        const newText = editInput.value.trim();
        if (!newText) return;

        const newSpan = document.createElement("span");
        newSpan.className = "todo-text";
        newSpan.textContent = newText;

        li.replaceChild(newSpan, editInput);

        target.textContent = "Edit";
        target.classList.remove("save-btn");
        target.classList.add("edit-btn");
      }
    });

    // Optional: Add todo on Enter key
    input.addEventListener("keyup", (e) => {
      if (e.key === "Enter") {
        addBtn.click();
      }
    });