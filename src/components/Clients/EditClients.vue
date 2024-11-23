<template>
    <div class="container">
      <h1>Editar Cliente</h1>
      <form @submit.prevent="updateClient">
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
        <button type="submit" class="btn btn-primary">Actualizar Cliente</button>
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
    name: 'EditClient',
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
      // Método para obtener el cliente por su ID
      fetchClient() {
        const clientId = this.$route.params.id; // Obtener el ID desde los parámetros de la ruta
        axios
          .get(`http://127.0.0.1:8000/api/clients/${clientId}`)
          .then((response) => {
            this.client = response.data.client; // Llenar los datos del cliente
          })
          .catch((error) => {
            console.error(error);
            Swal.fire('Error', 'No se pudo cargar el cliente', 'error');
          });
      },
  
      // Método para actualizar el cliente
      updateClient() {
        const clientId = this.$route.params.id; // Obtener el ID desde los parámetros de la ruta
        axios
          .put(`http://127.0.0.1:8000/api/clients/${clientId}`, this.client)
          .then((response) => {
            Swal.fire('¡Cliente Actualizado!', 'El cliente ha sido actualizado correctamente', 'success');
            this.$router.push({ name: 'Clients' }); // Redirigir a la vista de clientes
          })
          .catch((error) => {
            console.error(error);
            Swal.fire('Error', 'Hubo un problema al actualizar el cliente', 'error');
          });
      },
  
      // Método para cancelar la edición y volver a la lista de clientes
      cancel() {
        this.$router.push({ name: 'Clients' }); // Redirige a la vista de clientes
      },
    },
    mounted() {
      this.fetchClient(); // Cargar los datos del cliente al montar el componente
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
  