module.exports = {
    devServer: {
      proxy: {
        '/api': {
          target: 'http://localhost:8080/supermarketapi/', // Dirección de tu backend
          changeOrigin: true,
        },
      },
    },
  };
  