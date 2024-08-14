const productos = [
    { nombre: 'Manzana', precio: 100, id: 'Manzana' },
    { nombre: 'Banana', precio: 150, id: 'Banana' },
    { nombre: 'Naranja', precio: 175, id: 'Naranja' },
    { nombre: 'Papaya', precio: 275, id: 'Papaya' },
    { nombre: 'Frutilla', precio: 375, id: 'Frutilla' }
];

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function agregarAlCarrito(nombreProducto, precioProducto, idProducto) {
    const cantidad = document.getElementById(`cantidad${idProducto}`).value;
    const cantidadNumerica = parseInt(cantidad, 10);

    if (isNaN(cantidadNumerica) || cantidadNumerica <= 0) {
        alert('Cantidad inválida');
        return;
    }

    const productoExistente = carrito.find(item => item.nombre === nombreProducto);

    if (productoExistente) {
        productoExistente.cantidad += cantidadNumerica;
    } else {
        carrito.push({ nombre: nombreProducto, precio: precioProducto, cantidad: cantidadNumerica });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito();
}

function actualizarCarrito() {
    const itemsDelCarrito = document.getElementById('items-del-carrito');
    const totalElemento = document.getElementById('total');

    itemsDelCarrito.innerHTML = '';
    let total = 0;

    carrito.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.cantidad} x ${item.nombre} - $${(item.precio * item.cantidad).toFixed(2)}`;
        itemsDelCarrito.appendChild(listItem);
        total += item.precio * item.cantidad;
    });

    totalElemento.textContent = total.toFixed(2);
}

function borrarTodosLosItems() {
    const confirmado = confirm('¿Borrar todos los items del carrito?');
    if (confirmado) {
        carrito = [];
        localStorage.removeItem('carrito');
        actualizarCarrito();
    }
}

function seleccionarMetodoEnvio() {
    const envioSeleccionado = document.querySelector('input[name="envio"]:checked').value;
    const direccionEnvio = document.getElementById('direccionEnvio');

    if (envioSeleccionado === 'envio') {
        direccionEnvio.style.display = 'block';
    } else {
        direccionEnvio.style.display = 'none';
    }
}

function pagar() {
    if (carrito.length > 0) {
        const envioSeleccionado = document.querySelector('input[name="envio"]:checked');
        if (!envioSeleccionado) {
            alert('Por favor, selecciona un método de entrega.');
            return;
        }

        let mensaje = `Tu total es $${document.getElementById('total').textContent}. `;
        if (envioSeleccionado.value === 'envio') {
            const direccion = document.getElementById('direccion').value;
            if (!direccion) {
                alert('Por favor, ingresa una dirección para el envío.');
                return;
            }
            mensaje += `Se enviará a la dirección: ${direccion}. `;
        } else {
            mensaje += 'Recogerás en tienda. ';
        }

        const confirmado = confirm(`${mensaje}¿Continuar con el pago?`);
        if (confirmado) {
            alert('¡Gracias por la compra!');
            carrito = [];
            localStorage.removeItem('carrito');
            actualizarCarrito();
        }
    } else {
        alert('¡El carrito está vacío!');
    }
}

document.addEventListener('DOMContentLoaded', actualizarCarrito);
