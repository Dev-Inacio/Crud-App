const apiUrl = "http://localhost:8080/users";

function loadUsers() {
  fetch(apiUrl)
    .then((response) => response.json())
    .then((users) => {
      const tableBody = document.querySelector("#userTable tbody");
      tableBody.innerHTML = "";

      users.forEach((user) => {
        const row = document.createElement("tr");
        row.innerHTML = `
                    <td>${user.id}</td>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>
                        <button onclick="editUser(${user.id})">Editar</button>
                        <button onclick="deleteUser(${user.id})">Deletar</button>
                    </td>
                `;
        tableBody.appendChild(row);
      });
    })
    .catch((error) => console.error("Erro ao carregar usuários:", error));
}

document.getElementById("userForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const id = document.getElementById("userId").value;
  const name = document.getElementById("userName").value;
  const email = document.getElementById("userEmail").value;

  const user = { name, email };

  if (id) {
    fetch(`${apiUrl}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then(() => {
        loadUsers();
        resetForm();
      })
      .catch((error) => console.error("Erro ao atualizar usuário:", error));
  } else {
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then(() => {
        loadUsers();
        resetForm();
      })
      .catch((error) => console.error("Erro ao criar usuário:", error));
  }
});

function editUser(id) {
  fetch(`${apiUrl}/${id}`)
    .then((response) => response.json())
    .then((user) => {
      document.getElementById("userId").value = user.id;
      document.getElementById("userName").value = user.name;
      document.getElementById("userEmail").value = user.email;
    })
    .catch((error) => console.error("Erro ao carregar usuário:", error));
}

function deleteUser(id) {
  if (confirm("Tem certeza que deseja excluir este usuário?")) {
    fetch(`${apiUrl}/${id}`, {
      method: "DELETE",
    })
      .then(() => loadUsers())
      .catch((error) => console.error("Erro ao deletar usuário:", error));
  }
}

function resetForm() {
  document.getElementById("userForm").reset();
  document.getElementById("userId").value = "";
}
loadUsers();
