const addCart = document.getElementById('addCart');

addCart.addEventListener('submit', (event) => {
    event.preventDefault();
    
    Swal.fire({
        position: "bottom-end",
        icon: "success",
        title: "El producto fue guardado en tu carrito",
        showConfirmButton: false,
        timer: 1500
      });
})