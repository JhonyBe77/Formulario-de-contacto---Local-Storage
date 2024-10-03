document.addEventListener("DOMContentLoaded", function() {
    // Obtener referencias a los elementos en HTML
    let formularioDeContacto = document.getElementById("contactForm");
    let listaDeContactos = document.getElementById("contactList");
    let botonBorrarTodos = document.getElementById("clearAll");
    
    mostrarContactos(); // Llamar para mostrar los contactos guardados al cargar la página

    // Cuando el formulario se envía
    formularioDeContacto.addEventListener("submit", function(evento) {
        evento.preventDefault(); // Evitar que la página se recargue
        
        // Obtener los valores que el usuario escribió
        let nombre = document.getElementById("nombre").value;
        let email = document.getElementById("email").value;
        let mensaje = document.getElementById("mensaje").value;
        let urlImagen = document.getElementById("imageUrl").value;
        /*
        // Crear un objeto con los datos del contacto
        let contacto = {
            nombre: nombre,
            email: email,
            mensaje: mensaje,
            urlImagen: urlImagen
        };
        */
       //// Array con los objetos
        const contacto = { nombre, email, mensaje, urlImagen };
        guardarContacto(contacto);
        formularioDeContacto.reset(); // Reiniciar el formulario
        mostrarContactos(); // Actualizar la lista
    });
        
    // Función para guardar el contacto en el almacenamiento local
    function guardarContacto(contacto) {
        let contactosGuardados = obtenerContactos();
        contactosGuardados.push(contacto); // Añadir el nuevo contacto al array
        localStorage.setItem("contactos", JSON.stringify(contactosGuardados)); // Guardar el array en localStorage
    }

    // Función para obtener los contactos guardados del almacenamiento local
    function obtenerContactos() {
        let contactosEnStorage = localStorage.getItem("contactos");
        if (contactosEnStorage === null) {
            return []; // Si no hay contactos, devolver un array vacío
        } else {
            return JSON.parse(contactosEnStorage); // Convertir los contactos de texto a un array
        }
    }

    // Función para mostrar los contactos guardados
    function mostrarContactos() {
        let contactos = obtenerContactos();
        listaDeContactos.innerHTML = ""; // Limpiar la lista de contactos antes de mostrar los nuevos

        // Recorrer todos los contactos y mostrarlos
        for (let i = 0; i < contactos.length; i++) {
            let contacto = contactos[i];
            let elementoLista = document.createElement("li");

            // Crear el contenido del contacto
            let contenidoContacto = "<strong>" + contacto.nombre + "</strong> (" + contacto.email + ")<br>" + contacto.mensaje;
            
            // Mostrar la imagen si hay una URL
            if (contacto.urlImagen !== "") {
                contenidoContacto += "<br><img src='" + contacto.urlImagen + "' alt='Imagen de contacto' width='50'>";
            }
            
            elementoLista.innerHTML = contenidoContacto;

            // Este es el botón para borrar
            let botonBorrar = document.createElement("button");
            botonBorrar.textContent = "Borrar";
            botonBorrar.dataset.indice = i; // Guardar el índice del contacto en el botón

            // Cuando se hace clic en el botón de borrar
            botonBorrar.addEventListener("click", function() {
                let indice = this.dataset.indice;
                borrarContacto(indice);
            });

            // Añadir el botón al elemento de la lista
            elementoLista.appendChild(botonBorrar);

            // Añadir el contacto a la lista
            listaDeContactos.appendChild(elementoLista);
        }
    }

    // Función para borrar un contacto
    function borrarContacto(indice) {
        let contactos = obtenerContactos();
        contactos.splice(indice, 1); // Quitar el contacto de la lista
        localStorage.setItem("contactos", JSON.stringify(contactos)); // Guardar la nueva lista en el almacenamiento local
        mostrarContactos(); // Volver a mostrar la lista de contactos actualizada
    }

    // Evento para borrar todos los contactos
    botonBorrarTodos.addEventListener("click", function() {
        localStorage.removeItem("contactos"); // Quitar todos los contactos del almacenamiento local
        mostrarContactos(); // Limpiar la lista en la pantalla
    });
});
