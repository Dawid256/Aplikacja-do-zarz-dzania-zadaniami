let zadania = JSON.parse(localStorage.getItem("zadania"));

if (zadania === null) {
    zadania = [
        { id: 1, title: "Przygotować strukturę HTML", completed: true },
        { id: 2, title: "Dodać style CSS", completed: true },
        { id: 3, title: "Zaimplementować filtry", completed: false },
        { id: 4, title: "Przetestować aplikację", completed: false }
    ];
}

let filtr = "wszystkie";

const lista = document.getElementById("lista");
const formularz = document.getElementById("formularz");
const pole = document.getElementById("zadanie");

function zapisz() {
    localStorage.setItem("zadania", JSON.stringify(zadania));
}

function pokaz() {
    lista.innerHTML = "";

    let widoczne = zadania.filter(function(zadanie) {
        if (filtr === "do-zrobienia") {
            return !zadanie.completed;
        }

        if (filtr === "wykonane") {
            return zadanie.completed;
        }

        return true;
    });

    widoczne.forEach(function(zadanie) {
        let element = document.createElement("li");
        let checkbox = document.createElement("input");
        let tekst = document.createElement("span");
        let usun = document.createElement("button");

        checkbox.type = "checkbox";
        checkbox.checked = zadanie.completed;
        tekst.textContent = zadanie.title;
        usun.textContent = "Usuń";
        usun.className = "usun";

        if (zadanie.completed) {
            element.classList.add("zrobione");
        }

        checkbox.addEventListener("change", function() {
            zadanie.completed = checkbox.checked;
            zapisz();
            pokaz();
        });

        usun.addEventListener("click", function() {
            zadania = zadania.filter(function(element) {
                return element.id !== zadanie.id;
            });

            zapisz();
            pokaz();
        });

        element.append(checkbox, tekst, usun);
        lista.appendChild(element);
    });

    document.getElementById("wszystkie").textContent = zadania.length;

    document.getElementById("wykonane").textContent =
        zadania.filter(function(z) {
            return z.completed;
        }).length;

    document.getElementById("pozostale").textContent =
        zadania.filter(function(z) {
            return !z.completed;
        }).length;
}

formularz.addEventListener("submit", function(event) {
    event.preventDefault();

    let tekst = pole.value.trim();

    if (tekst === "") {
        return;
    }

    zadania.push({
        id: Date.now(),
        title: tekst,
        completed: false
    });

    pole.value = "";
    filtr = "wszystkie";

    document.querySelectorAll(".filtr").forEach(function(przycisk) {
        przycisk.classList.remove("aktywny");

        if (przycisk.dataset.filtr === filtr) {
            przycisk.classList.add("aktywny");
        }
    });

    zapisz();
    pokaz();
});

document.querySelectorAll(".filtr").forEach(function(przycisk) {
    przycisk.addEventListener("click", function() {
        filtr = przycisk.dataset.filtr;

        document.querySelectorAll(".filtr").forEach(function(p) {
            p.classList.remove("aktywny");
        });

        przycisk.classList.add("aktywny");
        pokaz();
    });
});

zapisz();
pokaz();