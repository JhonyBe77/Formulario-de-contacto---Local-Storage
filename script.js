document.addEventListener("DOMContentLoaded", function() {
    // obtener referencias a los elementos en HTML
    let formularioDeContacto = document.getElementById("contactForm");
    let listaDeContactos = document.getElementById("contactList");
    let botonBorrarTodos = document.getElementById("clearAll");
    let indiceEdicion = null; // para almacenar el índice del contacto que se está editando

    mostrarContactos(); // llamar para mostrar los contactos guardados al cargar la página

    // cuando el formulario se envía
    formularioDeContacto.addEventListener("submit", function(evento) {
        evento.preventDefault(); // evitar que la página se recargue
        
        // obtener los valores que el usuario escribió
        let nombre = document.getElementById("nombre").value;
        let email = document.getElementById("email").value;
        let mensaje = document.getElementById("mensaje").value;
        let urlImagen = document.getElementById("imageUrl").value;

        // Crear el objeto contacto con los datos del formulario
        const contacto = { nombre, email, mensaje, urlImagen };

        if (indiceEdicion === null) {
            // Si no estamos editando, agregar un nuevo contacto
            guardarContacto(contacto);
        } else {
            // Si estamos editando, actualizar el contacto existente
            actualizarContacto(contacto, indiceEdicion);
            indiceEdicion = null; // resetear el índice de edición
            formularioDeContacto.querySelector("button[type='submit']").textContent = "Agregar Contacto"; // cambiar el texto del botón
        }

        formularioDeContacto.reset(); // reiniciar el formulario
        mostrarContactos(); // actualizar la lista
    });
        
    // función para guardar el contacto en el almacenamiento local
    function guardarContacto(contacto) {
        let contactosGuardados = obtenerContactos();
        contactosGuardados.push(contacto); // añadir el nuevo contacto al array
        localStorage.setItem("contactos", JSON.stringify(contactosGuardados)); // guardar el array en localStorage
        mostrarContactos(); // Actualizar el DOM inmediatamente después de guardar
    }

    // función para obtener los contactos guardados del almacenamiento local
    function obtenerContactos() {
        let contactosEnStorage = localStorage.getItem("contactos");
        if (contactosEnStorage === null) {
            return []; // si no hay contactos, devolver un array vacío
        } else {
            return JSON.parse(contactosEnStorage); // convertir los contactos de texto a un array
        }
    }

    // función para mostrar los contactos guardados
    function mostrarContactos() {
        let contactos = obtenerContactos();
        listaDeContactos.innerHTML = ""; // limpia la lista de contactos antes de mostrar los nuevos

        // recorrer todos los contactos y mostrarlos
        for (let i = 0; i < contactos.length; i++) {
            let contacto = contactos[i];
            let elementoLista = document.createElement("li");
            
            // añadir la clase contact-item
            elementoLista.classList.add("contact-item");

            // crear el contenido del contacto
            let contenidoContacto = "<strong>" + contacto.nombre + "</strong> (" + contacto.email + ")<br>" + contacto.mensaje;
            
            // mostrar la imagen si hay una URL
            if (contacto.urlImagen !== "") {
                contenidoContacto += "<br><img src='" + contacto.urlImagen + "' alt='Imagen de contacto' width='50'>";
            }
            
            elementoLista.innerHTML = contenidoContacto;

            // Botón para borrar
            let botonBorrar = document.createElement("button");
            botonBorrar.textContent = "Borrar";
            botonBorrar.dataset.indice = i; // guardar el índice del contacto en el botón
            botonBorrar.classList.add("btn-borrar");

            // cuando se hace clic en el botón de borrar
            botonBorrar.addEventListener("click", function() {
                let indice = this.dataset.indice;
                borrarContacto(indice);
            });

            // BOTON EDITAR
            let botonEditar = document.createElement("button");
            botonEditar.textContent = "Editar";
            botonEditar.dataset.indice = i; // guardar el índice del contacto en el botón
            botonEditar.classList.add("btn-editar");

            // cuando se hace clic en el botón de editar
            botonEditar.addEventListener("click", function() {
                let indice = this.dataset.indice;
                cargarContactoEnFormulario(indice);
            });

            // añadir los botones al elemento de la lista
            elementoLista.appendChild(botonBorrar);
            elementoLista.appendChild(botonEditar);

            // añadir el contacto a la lista
            listaDeContactos.appendChild(elementoLista);
        }
    }

    // función para borrar un contacto
    function borrarContacto(indice) {
        let contactos = obtenerContactos();
        contactos.splice(indice, 1); // quitar el contacto de la lista
        localStorage.setItem("contactos", JSON.stringify(contactos)); // guardar la nueva lista en el almacenamiento local
        mostrarContactos(); // volver a mostrar la lista de contactos actualizada
    }

    // función para cargar los datos de un contacto en el formulario
    function cargarContactoEnFormulario(indice) {
        let contactos = obtenerContactos();
        let contacto = contactos[indice];

        // cargar los datos del contacto en el formulario
        document.getElementById("nombre").value = contacto.nombre;
        document.getElementById("email").value = contacto.email;
        document.getElementById("mensaje").value = contacto.mensaje;
        document.getElementById("imageUrl").value = contacto.urlImagen;

        // cambiar el texto del botón de enviar a "Actualizar"
        let botonEnviar = document.querySelector("#contactForm button[type='submit']");
        botonEnviar.textContent = "Actualizar";

        // guardar el índice del contacto que se está editando
        indiceEdicion = indice;
    }

    // Fstunción para actualizar un contacto
    function actualizarContacto(contacto, indice) {
        let contactos = obtenerContactos();
        contactos[indice] = contacto; // actualizar el contacto en la posición correspondiente
        localStorage.setItem("contactos", JSON.stringify(contactos)); // guardar los contactos actualizados en localStorage
        mostrarContactos(); // Mostrar inmediatamente los cambios en el DOM
    }

    // evento para borrar todos los contactos
    botonBorrarTodos.addEventListener("click", function() {
        localStorage.removeItem("contactos"); // quitar todos los contactos del almacenamiento local
        mostrarContactos(); // limpiar la lista en la pantalla
    });
});
