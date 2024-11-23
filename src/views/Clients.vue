<template>
    <div class="container">
      <h1>Listado de Clientes
      <button @click="newClient" class="btn btn-success mx-2">
        <font-awesome-icon icon="plus" />
      </button>
    </h1>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Telefono</th>
            <th scope="col">Dirección</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(clients, index) in clients" :key="clients.id">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ clients.phone }}</td>
            <td>{{ clients.address }}</td>
            <td>
              <button @click="editClient(clients.id)" class="btn btn-warning mx-2">
                <font-awesome-icon icon="pencil" />
              </button>
              <button @click="deleteClient(clients.id)" class="btn btn-danger mx-2">
                <font-awesome-icon icon="trash" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import Swal from 'sweetalert2';
  
  export default {
    name: 'Clients',
    data() {
      return {
        clients: [],
      };
    },
    methods: {
      fetchClients() {
        axios
          .get('http://127.0.0.1:8000/api/clients')
          .then((response) => {
            this.clients = response.data.clients;
          })
          .catch((error) => {
            console.error(error);
            Swal.fire('Error', 'No se pudo cargar la lista de clientes', 'error');
          });
      },
      newClient() {
        this.$router.push({ name: 'NewClients' });
      },
      editClient(id) {
        this.$router.push({ name: 'EditClients', params: { id } });
      },
      deleteClient(id) {
        Swal.fire({
          title: '¿Estás seguro?',
          text: `Se eliminará el cliente con ID ${id}.`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Eliminar',
        }).then((result) => {
          if (result.isConfirmed) {
            axios
              .delete(`http://127.0.0.1:8000/api/clients/${id}`)
              .then(() => {
                Swal.fire('¡Eliminado!', 'El cliente ha sido eliminado', 'success');
                this.fetchClients(); // Refrescar la lista de clientes
              })
              .catch((error) => {
                console.error(error);
                Swal.fire('Error', 'No se pudo eliminar el cliente', 'error');
              });
          }
        });
      },
    },
    mounted() {
      this.fetchClients(); // Cargar los clientes al montar el componente
    },
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 800px;
    margin: 0 auto;
  }
  </style>
  