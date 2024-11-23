<template>
    <div class="container">
      <h1>Listado de Usuarios
        <button @click="newUser()" class="btn btn-success mx-2">
          <font-awesome-icon icon="plus" />
        </button>
      </h1>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Email</th>
            <th scope="col">Rol</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in users" :key="user.id">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.role }}</td>
            <td>
              <button @click="editUser(user.id)" class="btn btn-warning mx-2">
                <font-awesome-icon icon="pencil" />
              </button>
              <button @click="deleteUser(user.id)" class="btn btn-danger mx-2">
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
    name: 'Users',
    data() {
      return {
        users: [], // Almacena la lista de usuarios
      };
    },
    methods: {
      // Redirige al formulario de creación de usuario
      newUser() {
        this.$router.push({ name: 'NewUser' });
      },
      // Redirige al formulario de edición de usuario
      editUser(id) {
        this.$router.push({ name: 'EditarUser', params: { id } });
      },
      // Elimina un usuario por ID
      deleteUser(id) {
        Swal.fire({
          title: `¿Estás seguro de que quieres eliminar el usuario con ID ${id}?`,
          showCancelButton: true,
          confirmButtonText: 'Eliminar',
        }).then((result) => {
          if (result.isConfirmed) {
            axios.delete(`http://127.0.0.1:8000/api/users/${id}`)
              .then((response) => {
                if (response.data.success) {
                  Swal.fire('¡Usuario eliminado!', '', 'success');
                  this.fetchUsers();
                }
              })
              .catch(() => {
                Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: 'No se pudo eliminar el usuario.',
                });
              });
          }
        });
      },
      // Carga la lista de usuarios desde la API
      fetchUsers() {
        axios.get('http://127.0.0.1:8000/api/users')
          .then((response) => {
            this.users = response.data.users;
          })
          .catch(() => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudieron cargar los usuarios.',
            });
          });
      },
    },
    mounted() {
      this.fetchUsers(); // Cargar los usuarios al montar el componente
    },
  };
  </script>
  
  <style>
  /* Estilos opcionales */
  </style>
  