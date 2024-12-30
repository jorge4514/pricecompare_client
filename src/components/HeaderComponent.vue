<template>
  <header class="header">
    <nav class="navbar navbar-expand-lg navbar-light bg-light" style="background-color: white !important;">
      <div class="container">
        <!-- Logo y Título -->
        <a class="navbar-brand d-flex align-items-center" href="#">
          <b class="title">AhorraYa</b>
          <img 
            src="https://investmentgold.es/wp-content/uploads/2019/03/money-growh-1.gif" 
            width="40px" 
            alt="Money Growth"
          />
        </a>

        <!-- Toggler para pantallas pequeñas -->
        <button 
          class="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Menú de navegación -->
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <a class="nav-link" href="/">Inicio</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Categorías</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Ofertas</a>
            </li>
          </ul>

          <!-- Carrito -->
          <button class="btn btn-outline-primary ms-3" @click="$emit('toggle-cart')">
            🛒 ({{ cartCount }})
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
/* Header con posición fija */
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000; /* Asegura que el header esté por encima de otros elementos */
  background-color: #fff;
  padding: 10px 0;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
}

/* Estilo del logo */
.navbar-brand {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

/* Estilo del logo animado */
.navbar-brand img {
  margin-left: 10px;
}

/* Estilo del menú de navegación */
.navbar-nav .nav-item .nav-link {
  color: #333;
  font-size: 16px;
}

.navbar-nav .nav-item .nav-link:hover {
  color: #007bff;
}

/* Estilo del botón del carrito */
.btn-outline-primary {
  font-size: 16px;
  padding: 8px 12px;
  border-radius: 50px;
}

.navbar-toggler {
  border-color: transparent;
}

/* Ajustes para dispositivos pequeños */
@media (max-width: 768px) {
  .navbar-nav {
    text-align: center;
  }
}

/* Espaciado para evitar que el contenido quede debajo del header */
body {
  padding-top: 60px; /* Ajusta este valor si es necesario */
}
</style>
