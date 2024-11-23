<template>
    <div class="container">
      <h1>Editar Usuario</h1>
      <form @submit.prevent="updateUser">
        <div class="mb-3">
          <label for="name" class="form-label">Nombre</label>
          <input
            type="text"
            id="name"
            v-model="user.name"
            class="form-control"
            required
          />
        </div>
  
        <div class="mb-3">
          <label for="email" class="form-label">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            v-model="user.email"
            class="form-control"
            required
          />
        </div>
  
        <div class="mb-3">
          <label for="role" class="form-label">Rol</label>
          <select
            id="role"
            v-model="user.role"
            class="form-select"
            required
          >
            <option value="admin">Administrador</option>
            <option value="cajero">Cajero</option>
            <option value="cocinero">Cocinero</option>
            <option value="mensajero">Mensajero</option>
            <option value="cliente">Cliente</option>
          </select>
        </div>
  
        <button type="submit" class="btn btn-primary">Guardar Cambios</button>
        <button
          type="button"
          @click="cancelar"
          class="btn btn-secondary ms-2"
        >
          Cancelar
        </button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import Swal from "sweetalert2";
  
  export default {
    name: "EditarUser",
    data() {
      return {
        user: {
          name: "",
          email: "",
          role: "",
        },
      };
    },
    methods: {
      fetchUser() {
        const userId = this.$route.params.id;
        axios
          .get(`http://127.0.0.1:8000/api/users/${userId}`)
          .then((response) => {
            this.user = response.data.user;
          })
          .catch((error) => {
            console.error(error);
            Swal.fire("Error", "No se pudo cargar el usuario", "error");
          });
      },
      updateUser() {
        const userId = this.$route.params.id;
        axios
          .put(`http://127.0.0.1:8000/api/users/${userId}`, this.user)
          .then(() => {
            Swal.fire("Éxito", "Usuario actualizado correctamente", "success");
            this.$router.push({ name: "Users" });
          })
          .catch((error) => {
            console.error(error);
            Swal.fire("Error", "No se pudo actualizar el usuario", "error");
          });
      },
      cancelar() {
        this.$router.push({ name: "user" });
      },
    },
    mounted() {
      this.fetchUser();
    },
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 600px;
    margin: 0 auto;
  }
  </style>
  