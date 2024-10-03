document.addEventListener("DOMContentLoaded", function() {
    // obtener referencias a los elementos en HTML
    let formularioDeContacto = document.getElementById("contactForm");
    let listaDeContactos = document.getElementById("contactList");
    let botonBorrarTodos = document.getElementById("clearAll");
    
    mostrarContactos(); // llamar para mostrar los contactos guardados al cargar la página

    // cuando el formulario se envía
    formularioDeContacto.addEventListener("submit", function(evento) {
        evento.preventDefault(); // evitar que la página se recargue
        
        // obtener los valores que el usuario escribió
        let nombre = document.getElementById("nombre").value;
        let email = document.getElementById("email").value;
        let mensaje = document.getElementById("mensaje").value;
        let urlImagen = document.getElementById("imageUrl").value;
        /*
        // crear un objeto con los datos del contacto
        let contacto = {
            nombre: nombre,
            email: email,
            mensaje: mensaje,
            urlImagen: urlImagen
        };
        */
       //// array con los objetos
        const contacto = { nombre, email, mensaje, urlImagen };
        guardarContacto(contacto);
        formularioDeContacto.reset(); // reiniciar el formulario
        mostrarContactos(); // actualizar la lista
    });
        
    // función para guardar el contacto en el almacenamiento local
    function guardarContacto(contacto) {
        let contactosGuardados = obtenerContactos();
        contactosGuardados.push(contacto); // añadir el nuevo contacto al array
        localStorage.setItem("contactos", JSON.stringify(contactosGuardados)); // guardar el array en localStorage
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

            // crear el contenido del contacto
            let contenidoContacto = "<strong>" + contacto.nombre + "</strong> (" + contacto.email + ")<br>" + contacto.mensaje;
            
            // mostrar la imagen si hay una URL
            if (contacto.urlImagen !== "") {
                contenidoContacto += "<br><img src='" + contacto.urlImagen + "' alt='Imagen de contacto' width='50'>";
            }
            
            elementoLista.innerHTML = contenidoContacto;

            // este es el botón para borrar
            let botonBorrar = document.createElement("button");
            botonBorrar.textContent = "Borrar";
            botonBorrar.dataset.indice = i; // guardar el índice del contacto en el botón

            // cuando se hace clic en el botón de borrar
            botonBorrar.addEventListener("click", function() {
                let indice = this.dataset.indice;
                borrarContacto(indice);
            });

            // añadir el botón al elemento de la lista
            elementoLista.appendChild(botonBorrar);

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

    // evento para borrar todos los contactos
    botonBorrarTodos.addEventListener("click", function() {
        localStorage.removeItem("contactos"); // quitar todos los contactos del almacenamiento local
        mostrarContactos(); // limpiar la lista en la pantalla
    });
});
