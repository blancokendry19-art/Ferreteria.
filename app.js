// ===============================
// CARRITO DE COMPRAS CONSTRUMAX
// ===============================

// Obtener carrito guardado
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Actualizar contador
function actualizarContador() {

    const contador = document.getElementById("contador-carrito");

    if (contador) {
        contador.textContent = carrito.length;
    }
}

// Guardar carrito
function guardarCarrito() {

    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );

    actualizarContador();
}

// ===============================
// AGREGAR PRODUCTOS
// ===============================

const botones = document.querySelectorAll(".card-producto button");

botones.forEach(boton => {

    boton.addEventListener("click", () => {

        const card = boton.parentElement;

        const nombre =
            card.querySelector("h3").textContent;

        const precio =
            card.querySelector(".precio").textContent;

        const imagen =
            card.querySelector("img").src;

        const producto = {
            nombre,
            precio,
            imagen
        };

        carrito.push(producto);

        guardarCarrito();

        alert(
            nombre +
            " agregado al carrito"
        );
    });

});

// ===============================
// MOSTRAR CARRITO
// ===============================

function mostrarCarrito() {

    const contenedor =
        document.getElementById("productos-carrito");

    const totalHTML =
        document.getElementById("total");

    if (!contenedor) return;

    contenedor.innerHTML = "";

    let total = 0;

    carrito.forEach((producto, index) => {

        total += parseFloat(
            producto.precio.replace("$", "")
        );

        contenedor.innerHTML += `
        
        <div class="item-carrito">

            <img src="${producto.imagen}" alt="">

            <div>

                <h3>${producto.nombre}</h3>

                <p>${producto.precio}</p>

            </div>

            <button onclick="eliminarProducto(${index})">
                Eliminar
            </button>

        </div>

        `;
    });

    if (totalHTML) {
        totalHTML.textContent =
            "Total: $" + total;
    }
}

// ===============================
// ELIMINAR PRODUCTO
// ===============================

function eliminarProducto(index) {

    carrito.splice(index, 1);

    guardarCarrito();

    mostrarCarrito();
}

// ===============================
// VACIAR CARRITO
// ===============================

const btnVaciar =
    document.getElementById("vaciar-carrito");

if (btnVaciar) {

    btnVaciar.addEventListener("click", () => {

        carrito = [];

        guardarCarrito();

        mostrarCarrito();

        alert("Carrito vaciado");

    });

}

// ===============================
// OPINIONES
// ===============================

const btnOpinion =
    document.getElementById("btnOpinion");

if (btnOpinion) {

    btnOpinion.addEventListener("click", () => {

        const nombre =
            document.getElementById("nombre").value;

        const mensaje =
            document.getElementById("mensaje").value;

        if (
            nombre.trim() === "" ||
            mensaje.trim() === ""
        ) {

            alert(
                "Completa todos los campos"
            );

            return;
        }

        const contenedor =
            document.getElementById(
                "contenedor-opiniones"
            );

        const nuevo =
            document.createElement("div");

        nuevo.classList.add(
            "testimonio"
        );

        nuevo.innerHTML = `
            <p>${mensaje}</p>
            <h4>- ${nombre}</h4>
        `;

        contenedor.appendChild(nuevo);

        document.getElementById("nombre").value = "";
        document.getElementById("mensaje").value = "";

    });

}

// ===============================
// FORMULARIO CONTACTO
// ===============================

const formulario =
    document.getElementById("formContacto");

if (formulario) {

    formulario.addEventListener(
        "submit",
        (e) => {

            e.preventDefault();

            alert(
                "Mensaje enviado correctamente."
            );

            formulario.reset();
        }
    );
}

// ===============================
// INICIO
// ===============================

actualizarContador();
mostrarCarrito();