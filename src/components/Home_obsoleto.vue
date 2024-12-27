<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">Buscador de productos <i class="fa fa-shopping-bag" aria-hidden="true"></i></h1>
    <div class="input-group mb-4">
      <input 
        type="text" 
        class="form-control" 
        placeholder="Busca un producto..." 
        v-model="searchQuery" 
        @keyup.enter="searchProducts"
      />
      <button class="btn btn-primary" @click="searchProducts">Buscar</button>
    </div>
    <div class="row">
      <div 
        v-for="product in products" 
        :key="product.id" 
        class="col-md-3 mb-3" 
      >
        <div class="card product-card">
          <img 
            :src="product.picture" 
            class="product-img" 
            alt="Imagen del producto"
          />
          <div class="card-body">
            <h5 class="card-title">
              {{ product.name }} 
            </h5>
            <p class="card-text">
              <strong>Precio:</strong> {{ product.price }} €
            </p>
            <div class="product-footer">
              <button class="btn shopping-cart">Añadir al carrito 🛒</button>
            </div>
            <div class="logo-container">
                <img class="market" :src="'https://mercastic.es/supermarket-logos/'+product.market+'-logo.svg'"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      searchQuery: '',
      products: [],
    };
  },
  methods: {
    async searchProducts() {
      if (!this.searchQuery.trim()) {
        alert('Por favor, ingresa un término de búsqueda.');
        return;
      }

      try {
        const response = await axios.get('/api/products/search-products', {
          params: { query: this.searchQuery },
        });
        this.products = response.data;
      } catch (error) {
        console.error('Error buscando productos:', error);
        alert('Hubo un error buscando los productos.');
      }
    },
  },
};
</script>

<style scoped>
.product-card {
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
}

.product-img {
  height: 220px;
  width: 220px;
  object-fit: cover;
  border-radius: 5px;
  align-self: center;
}

.card-body {
  padding: 15px;
}

.card-title {
  font-size: 1.2em;
  font-weight: bold;
}

.product-footer {
  margin-top: 10px;
}

.badge-success {
  background-color: #28a745; /* Puedes usar otros colores */
  font-size: 1.2em;
}

button {
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #4aa74d;
  color: white;
}

.market{
    width: 29px;
    height: 29px;
}

.logo-container {
  position: absolute; /* Posicionar en relación con el contenedor de la tarjeta */
  top: 10px;  /* Ajusta según sea necesario */
  right: 10px; /* Ajusta según sea necesario */
  width: 40px; /* Tamaño del logo */
  height: 40px; /* Tamaño del logo */
}

.shopping-cart {
  background-color: #71be74; 
  color: white; 
  border: none; 
  padding: 10px 20px; 
  border-radius: 5px; 
  font-size: 16px;
  cursor: pointer;
}
</style>
