<template>
  <div>
    <HeaderComponent 
      :cartCount="cart.length" 
      @toggle-cart="toggleCart"
    />
    <div class="presentation" ref="presentation">
      <div class="presentation-content">
        <h1>¡Bienvenido a <b>AhorraYa</b>! <img 
          src="https://investmentgold.es/wp-content/uploads/2019/03/money-growh-1.gif" 
          alt="Money Growth"
          class="presentation-img"
        /></h1>        
        <p>Compara precios entre supermercados y ahorra en tus compras</p>
      </div>
    </div>
    <ProductList 
      @add-to-cart="addToCart"
    />
    <div v-if="showCart" class="cart-overlay">
      <CartComponent 
        :cartItems="cart" 
        @clear-cart="clearCart"
        @close-cart="closeCart"
        @update-quantity="updateCartItemQuantity"
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
      cart: [], // Lista de productos en el carrito
      showCart: false, // Bandera para mostrar/ocultar el carrito
      searchQuery: '', // Consulta de búsqueda
      autoScrolled: false, // Bandera para controlar el desplazamiento automático
    };
  },
  methods: {
    addToCart(product) {
      const existingItem = this.cart.find((item) => item.name === product.name);
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
    closeCart() {
      this.showCart = false;
    },
    updateCartItemQuantity({ name, quantity }) {
      // Actualiza la cantidad de un producto en el carrito
      const item = this.cart.find((product) => product.name === name);
      if (item) {
        item.quantity = quantity;
        // Elimina el producto si la cantidad es 0
        if (quantity === 0) {
          this.cart = this.cart.filter((product) => product.name !== name);
        }
      }
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

<style scoped>
/* Estilos de presentación */
.presentation {
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url('https://cdn.businessinsider.es/sites/navi.axelspringer.es/public/media/image/2020/07/hombre-comprando-supermercado-2013939.jpg?tf=3000x') no-repeat center center/cover;
  color: white;
  text-align: center;
  font-family: "Afacad Flux", serif;
  font-weight: 500;
  padding: 0 20px;
}

.presentation-content {
  margin-top: 100px;
  background: rgba(0, 0, 0, 0.6);
  padding: 20px 30px;
  border-radius: 15px;
  max-width: 80%;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
}

.presentation h1 {
  font-size: 2.5rem;
  margin-bottom: 15px;
}

.presentation p {
  font-size: 1.2rem;
  margin-top: 10px;
}

.presentation-img {
  margin-top: 10px;
  width: 80px;
  height: auto;
}

.cart-overlay {
  position: fixed;
  top: 0;
  right: 0;
  background: transparent;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}

.btn-primary:hover {
  background-color: #0056b3;
  border-color: #0056b3;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}
</style>
