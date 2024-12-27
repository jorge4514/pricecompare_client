<template>
    <header class="header">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
          <a class="navbar-brand" href="#">🛒 Mi Tienda</a>
          <button 
            class="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
              <li class="nav-item">
                <a class="nav-link" href="#">Inicio</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Categorías</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Ofertas</a>
              </li>
            </ul>
            <button class="btn btn-primary ms-3" @click="$emit('toggle-cart')">
              🛒 Carrito ({{ cartCount }})
            </button>
          </div>
        </div>
      </nav>
    </header>
  </template>
  
  <script>
  export default {
    props: {
      cartCount: {
        type: Number,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  .header {
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  }
  </style>
  