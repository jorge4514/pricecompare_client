<template>
    <div class="product-list container mt-5">
      <h1 class="text-center mb-4">Productos</h1>
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
              <h5 class="card-title">{{ product.name }}</h5>
              <p class="card-text">
                <strong>Precio:</strong> {{ product.price }} €
              </p>
              <button 
                class="btn btn-success" 
                @click="$emit('add-to-cart', product)"
              >
                Añadir al carrito 🛒
              </button>
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
  /* Similar al estilo que ya tienes */
  </style>
  