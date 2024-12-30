<template>
  <div class="cart">
    <div class="cart-header">
      <h3>🛒 Tu Carrito</h3>
      <button class="btn btn-close" @click="closeCart" aria-label="Cerrar carrito"></button>
    </div>

    <ul class="list-group">
      <li v-for="item in cartItems" :key="item.id" class="list-group-item">
        <div class="logo-container">
          <img class="market" width="30px" height="30px"
                :src="'https://mercastic.es/supermarket-logos/' + item.market + '-logo.svg'" />
        </div>
        <img :src="item.picture" alt="Imagen del producto" class="cart-item-image" />
        <div class="cart-item-details">
          <span class="cart-item-name">{{ item.name }} <small>({{ item.brand }})</small></span>
          <span class="cart-item-unit">{{ item.price_unit }} €/{{ item.unit }}</span>
          <div class="price-and-quantity">
            <div class="quantity-controls">
              <button class="btn-quantity" :disabled="item.quantity <= 0"
                @click="updateQuantity(item, item.quantity - 1)">-</button>
              <span>{{ item.quantity }}</span>
              <button class="btn-quantity" @click="updateQuantity(item, item.quantity + 1)">+</button>
            </div>
            <span class="cart-item-total">{{ (item.price * item.quantity).toFixed(2) }} €</span>
          </div>
        </div>
      </li>
    </ul>

    <div class="cart-footer">
      <div class="cart-total">
        <span>Total:</span>
        <span class="total-amount">{{ cartTotal.toFixed(2) }} €</span>
      </div>
      <div>
        <button class="btn btn-danger" @click="clearCart">Vaciar</button>
        <button class="btn btn-success ms-2" @click="checkout">Comprar</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cartItems: {
      type: Array,
      required: true,
    },
  },
  computed: {
    cartTotal() {
      // Calcula el total del carrito
      return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    },
  },
  methods: {
    clearCart() {
      this.$emit("clear-cart");
    },
    checkout() {
      alert("¡Compra realizada con éxito!");
      this.$emit("clear-cart");
    },
    closeCart() {
      this.$emit("close-cart");
    },
    updateQuantity(item, newQuantity) {
      if (newQuantity >= 0) {
        this.$emit("update-quantity", { name: item.name, quantity: newQuantity });
      }
    },
  },
};
</script>

<style scoped>
/* Contenedor principal del carrito */
.cart {
  position: fixed;
  top: 98px;
  right: 20px;
  width: 400px;
  background: #f8f9fa;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

/* Cabecera del carrito */
.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.btn-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #333;
  cursor: pointer;
  transition: transform 0.2s, color 0.2s;
}

.btn-close:hover {
  color: #e74c3c;
  transform: scale(1.1);
}

/* Lista de productos */
.list-group {
  flex: 1;
  max-height: 400px;
  overflow-y: auto;
  margin: 0;
  padding: 0;
  list-style: none;
}

.list-group-item {
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
  background-color: transparent;
  gap: 15px;
}

/* Imagen del producto */
.cart-item-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #ddd;
  margin-left: 5px;
}

/* Detalles del producto */
.cart-item-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.cart-item-name {
  font-weight: 600;
  font-size: 15px;
  color: #343a40;
}

.cart-item-unit {
  font-size: 12px;
  color: #6c757d;
}

.price-and-quantity {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cart-item-total {
  margin-right: 5px;
  font-weight: bold;
  font-size: 14px;
  color: #212529;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 10px;
}

.btn-quantity {
  background-color: #ddd;
  border: none;
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-quantity:hover {
  background-color: #ccc;
}

.btn-quantity:disabled {
  cursor: not-allowed;
  background-color: #f5f5f5;
}

/* Pie del carrito */
.cart-footer {
  border-top: 1px solid #ddd;
  padding-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cart-total {
  font-size: 16px;
  font-weight: bold;
  display: flex;
  gap: 5px;
}

.total-amount {
  color: #007bff;
}

.btn {
  border-radius: 8px;
  font-size: 14px;
  padding: 8px 16px;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.btn-danger {
  background-color: #e74c3c;
  color: #fff;
}

.btn-danger:hover {
  background-color: #c0392b;
}

.btn-success {
  background-color: #28a745;
  color: #fff;
}

.btn-success:hover {
  background-color: #218838;
}
</style>
