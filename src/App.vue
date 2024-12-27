<template>
  <div>
    <HeaderComponent 
      :cartCount="cart.length" 
      @toggle-cart="toggleCart"
    />
    <div class="presentation" ref="presentation">
      <div class="presentation-content">
        <h1>¡Bienvenido a Mi Tienda! 🛍️</h1>
        <p>Encuentra los mejores productos al mejor precio.</p>
      </div>
    </div>
    <div class="search-container" ref="search">
      <div class="input-group container">
        <input 
          type="text" 
          class="form-control" 
          placeholder="Busca un producto..." 
          v-model="searchQuery" 
          @keyup.enter="searchProducts"
        />
        <button class="btn btn-primary" @click="searchProducts">Buscar</button>
      </div>
    </div>
    <ProductList 
      @add-to-cart="addToCart"
    />
    <div v-if="showCart" class="cart-overlay">
      <CartComponent 
        :cartItems="cart" 
        @clear-cart="clearCart"
      />
    </div>
  </div>
</template>

<script>
import HeaderComponent from './components/HeaderComponent.vue';
import ProductList from './components/ProductList.vue';
import CartComponent from './components/CartComponent.vue';

export default {
  data() {
    return {
      cart: [],
      showCart: false,
      searchQuery: '',
      autoScrolled: false, // Bandera para controlar si ya hizo scroll automático
    };
  },
  methods: {
    addToCart(product) {
      const existingItem = this.cart.find((item) => item.id === product.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.cart.push({ ...product, quantity: 1 });
      }
    },
    clearCart() {
      this.cart = [];
    },
    toggleCart() {
      this.showCart = !this.showCart;
    },
    handleScroll() {
      const scrollY = window.scrollY;
      const presentationHeight = this.$refs.presentation.offsetHeight;

      if (scrollY > 50 && !this.autoScrolled) {
        // Activar scroll automático cuando pasa un poco
        this.autoScrolled = true; // Evita que se dispare múltiples veces
        this.scrollToSearch();
      }
    },
    scrollToSearch() {
      const searchElement = this.$refs.search;
      const offsetTop = searchElement.offsetTop;

      window.scrollTo({
        top: offsetTop - 20, // Ajusta el desplazamiento
        behavior: 'smooth', // Animación suave
      });
    },
    searchProducts() {
      alert(`Buscando: ${this.searchQuery}`); // Simular búsqueda
    },
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  components: {
    HeaderComponent,
    ProductList,
    CartComponent,
  },
};
</script>

<style>
/* Sección de presentación */
.presentation {
  height: 100vh; /* Toma el 100% de la pantalla */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: url('https://via.placeholder.com/1920x1080') no-repeat center center/cover;
  color: white;
  text-align: center;
}

.presentation-content {
  background: rgba(0, 0, 0, 0.5); /* Fondo oscuro semitransparente */
  padding: 20px;
  border-radius: 10px;
}

.presentation h1 {
  font-size: 3rem;
  margin-bottom: 20px;
}

.presentation p {
  font-size: 1.5rem;
}

/* Contenedor del buscador */
.search-container {
  position: relative;
  background-color: white;
  padding: 20px 0;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.input-group {
  max-width: 800px;
  margin: 0 auto;
}

/* Ajustes generales */
body {
  margin: 0;
  font-family: Arial, sans-serif;
}

.cart-overlay {
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  height: 100%;
  background: white;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  padding: 20px;
}
</style>
