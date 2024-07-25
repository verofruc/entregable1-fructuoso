const productos = [
    { nombre: 'Manzana', precio: 100 },
    { nombre: 'Banana', precio: 150 },
    { nombre: 'Naranja', precio: 175 },
    { nombre: 'Papaya', precio: 275 },
    { nombre: 'Frutilla', precio: 375}
];
let carrito = [];

function agregarAlCarrito(nombreProducto, precioProducto) {
    const cantidad = prompt(`Cuantas ${nombreProducto} deseas agregar?`, 1);
    
    const cantidadNumerica = parseInt(cantidad, 10);
    if (isNaN(cantidadNumerica) || cantidadNumerica <= 0) {
        alert('Cantidad invalida');
    }
    
    for (let i = 0; i < cantidadNumerica; i++) {
        const producto = { nombre: nombreProducto, precio: precioProducto };
        carrito.push(producto);
    }
    actualizarCarrito();
}

function actualizarCarrito() {
    const itemsDelCarrito = document.getElementById('items-del-carrito');
    const totalElemento = document.getElementById('total');

    itemsDelCarrito.innerHTML = '';
    let total = 0;

    carrito.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.nombre} - $${item.precio.toFixed(2)}`;
        itemsDelCarrito.appendChild(listItem);
        total += item.precio;
    });

    totalElemento.textContent = total.toFixed(2);
}

function borrarTodosLosItems() {
    const confirmado = confirm('Borrar todos los items del carrito?');
    if (confirmado) {
        carrito = [];
        actualizarCarrito();
    }
}

function pagar() {
    if (carrito.length > 0) {
        const confirmado = confirm(`Tu total es $${document.getElementById('total').textContent}. Continuar con el pago?`);
        if (confirmado) {
            alert('Gracias por la compra!');
            carrito = [];
            actualizarCarrito();
        }
    } else {
        alert('El carrito está vacio!');
    }
}
