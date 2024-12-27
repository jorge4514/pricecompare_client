<template>
    <div class="cart">
      <div class="cart-header d-flex justify-content-between align-items-center mb-3">
        <h3>🛒 Carrito de compras</h3>
        <button 
          class="btn btn-close" 
          @click="closeCart" 
          aria-label="Cerrar carrito"
        ></button>
      </div>
      <ul class="list-group">
        <li 
          v-for="item in cartItems" 
          :key="item.id" 
          class="list-group-item d-flex justify-content-between align-items-center"
        >
          <span>{{ item.name }} (x{{ item.quantity }})</span>
          <span>{{ item.price * item.quantity }} €</span>
        </li>
      </ul>
      <div class="mt-3">
        <button class="btn btn-danger" @click="clearCart">Vaciar carrito</button>
        <button class="btn btn-success ms-2" @click="checkout">Finalizar compra</button>
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
    methods: {
      clearCart() {
        this.$emit('clear-cart');
      },
      checkout() {
        alert('¡Compra realizada con éxito!');
        this.$emit('clear-cart');
      },
      closeCart() {
        this.$emit('close-cart'); // Evento para notificar al padre
      },
    },
  };
  </script>
  
  <style scoped>
  .cart {
    background: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  .cart-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .btn-close {
    font-size: 1.2rem;
    color: #333;
    border: none;
    cursor: pointer;
  }
  
  .btn-close:hover {
    color: #ff0000;
    transform: scale(1.2);
    transition: all 0.2s ease-in-out;
  }
  </style>
  