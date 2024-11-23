<template>
    <div class="container">
      <h1>Nuevo Cliente</h1>
      <form @submit.prevent="createClient">
        <div class="mb-3">
          <label for="phone" class="form-label">Teléfono</label>
          <input
            type="text"
            class="form-control"
            id="phone"
            v-model="client.phone"
            required
          />
        </div>
        <div class="mb-3">
          <label for="address" class="form-label">Dirección</label>
          <input
            type="text"
            class="form-control"
            id="address"
            v-model="client.address"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary">Guardar Cliente</button>
        <button
          type="button"
          class="btn btn-secondary mx-2"
          @click="cancel"
        >
          Cancelar
        </button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import Swal from 'sweetalert2';
  
  export default {
    name: 'NewClient',
    data() {
      return {
        client: {
          name: '',
          email: '',
          phone: '',
          address: '',
        },
      };
    },
    methods: {
      createClient() {
        axios
          .post('http://127.0.0.1:8000/api/clients', this.clients)
          .then((response) => {
            Swal.fire('¡Cliente Creado!', 'El cliente se ha creado exitosamente', 'success');
            this.$router.push({ name: 'Clients' }); // Redirige a la vista de clientes
          })
          .catch((error) => {
            console.error(error);
            Swal.fire('Error', 'Hubo un problema al crear el cliente', 'error');
          });
      },
      cancel() {
        this.$router.push({ name: 'Clients' }); // Redirige a la vista de clientes si el usuario cancela
      },
    },
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 800px;
    margin: 0 auto;
  }
  .form-label {
    font-weight: bold;
  }
  </style>
  