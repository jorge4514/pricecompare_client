<template>
  <div class="product-list container mt-5">
    <h1 class="text-center mb-4">Productos</h1>

    <!-- Barra de búsqueda y selector de ordenamiento -->
    <div class="row mb-4 justify-content-center">
      <div class="col-md-4">
        <div class="input-group mx-auto shadow-sm rounded">
          <input type="text" class="form-control border-0 rounded-start px-4" placeholder="Busca un producto..."
            v-model="searchQuery" @keyup.enter="searchProducts" />
          <button class="btn btn-primary rounded-end px-4" @click="searchProducts">
            <i class="fas fa-search"></i>
          </button>
        </div>
      </div>
      <div class="col-md-3">
        <select class="form-select border-0 rounded px-3 shadow-sm" v-model="sortOption" @change="sortProducts">
          <option value="priceAsc">Ordenar por Precio (Ascendente)</option>
          <option value="priceDesc">Ordenar por Precio (Descendente)</option>
          <option value="unitPriceAsc">Ordenar Precio por Unidad Medida (Ascendente)</option>
          <option value="unitPriceDesc">Ordenar Precio por Unidad Medida (Descendente)</option>
          <option value="nameAsc">Ordenar por Descripción (Ascendente)</option>
          <option value="nameDesc">Ordenar por Descripción (Descendente)</option>
        </select>
      </div>
    </div>

    <!-- Lista de productos -->
    <div class="row">
      <div v-for="product in products" :key="product.id" class="col-md-3 mb-4">
        <div class="card product-card">
          <img :src="product.picture" class="product-img" alt="Imagen del producto" />
          <div class="card-body">
            <div class="logo-container">
              <img class="market" width="30px" height="30px"
                :src="'https://mercastic.es/supermarket-logos/' + product.market + '-logo.svg'" />
            </div>
            <h5 class="card-title">{{ product.name }}</h5>
            <div class="price-container">
              <span class="card-text-price">
                {{ product.price }} €/ud
              </span>
              <span class="card-text-unit-price">
                {{ product.price_unit }} €/{{ product.unit }}
              </span>
            </div>

            <button class="btn btn-add-to-cart" @click="$emit('add-to-cart', product)">
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
      sortOption: 'priceAsc', // Opción de ordenamiento por defecto
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
        this.sortProducts(); // Ordenar los productos después de buscarlos
      } catch (error) {
        console.error('Error buscando productos:', error);
        alert('Hubo un error buscando los productos.');
      }
    },
    sortProducts() {
      switch (this.sortOption) {
        case 'priceAsc':
          this.products.sort((a, b) => a.price - b.price);
          break;
        case 'priceDesc':
          this.products.sort((a, b) => b.price - a.price);
          break;
        case 'unitPriceAsc':
          this.products.sort((a, b) => a.price_unit - b.price_unit);
          break;
        case 'unitPriceDesc':
          this.products.sort((a, b) => b.price_unit - a.price_unit);
          break;
        case 'nameAsc':
          this.products.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'nameDesc':
          this.products.sort((a, b) => b.name.localeCompare(a.name));
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style scoped>
/* Ajustes generales */
.product-card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease, transform-origin 0.3s ease;
  overflow: hidden;
  cursor: pointer;
}

.product-card:hover {
  transform: scale(1.05); /* Hace que la card se agrande un poco */
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1); /* Sombra más pronunciada */
  transform-origin: center center; /* Asegura que el zoom sea desde el centro */
}

.product-img {
  width: 100%;
  height: 225px;
  object-fit: contain;
  border-bottom: 1px solid #eee;
}

.card-body {
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
  margin-right: 30px;
}

.price-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}

.card-text-price {
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.card-text-unit-price {
  font-size: 14px;
  color: #777;
}

.btn-add-to-cart {
  background-color: #28a745;
  border: none;
  padding: 8px 16px;
  font-size: 14px;
  color: white;
  border-radius: 25px;
  margin-top: 15px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-add-to-cart:hover {
  background-color: #218838;
}

.input-group, .form-select {
  background-color: #f9f9f9;
  color: #495057;
  border-radius: 8px;
  font-size: 16px;
  border: 1px solid #ddd;
}

.input-group:focus-within, .form-select:focus {
  border-color: #007bff;
}

.logo-container {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 35px;
  height: 35px;
  background-color: white;
  border-radius: 50%;
  padding: 5px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
}

.card-body {
  position: relative;
}

/* Responsividad */
@media (max-width: 768px) {
  .col-md-3 {
    flex: 0 0 48%;
    max-width: 48%;
  }
}

@media (max-width: 576px) {
  .col-md-3 {
    flex: 0 0 100%;
    max-width: 100%;
  }
}
</style>
