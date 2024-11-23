<template>
    <div class="container">
        <h1 class="text-primary fw-bold">Crear Usuario</h1>
        <div class="card">
            <div class="card-header fw-bold">
                Nuevo Usuario
            </div>
            <div class="card-body">
                <form @submit.prevent="createUser">
                    <div class="row mb-3">
                        <label for="name" class="form-label">Nombre:</label>
                        <div class="input-group">
                            <div class="input-group-text">
                                <font-awesome-icon icon="user" />
                            </div>
                            <input 
                                type="text" 
                                class="form-control" 
                                id="name" 
                                placeholder="Nombre del usuario" 
                                v-model="user.name" 
                                required
                            >
                        </div>
                    </div>

                    <div class="row mb-3">
                        <label for="email" class="form-label">Correo Electrónico:</label>
                        <div class="input-group">
                            <div class="input-group-text">
                                <font-awesome-icon icon="envelope" />
                            </div>
                            <input 
                                type="email" 
                                class="form-control" 
                                id="email" 
                                placeholder="Correo Electrónico" 
                                v-model="user.email" 
                                required
                            >
                        </div>
                    </div>

                    <div class="row mb-3">
                        <label for="password" class="form-label">Contraseña:</label>
                        <div class="input-group">
                            <div class="input-group-text">
                                <font-awesome-icon icon="lock" />
                            </div>
                            <input 
                                type="password" 
                                class="form-control" 
                                id="password" 
                                placeholder="Contraseña" 
                                v-model="user.password" 
                                required
                            >
                        </div>
                    </div>

                    <div class="row mb-3">
                        <label for="role" class="form-label">Rol:</label>
                        <div class="input-group">
                            <div class="input-group-text">
                                <font-awesome-icon icon="user-tag" />
                            </div>
                            <select 
                                class="form-select" 
                                id="role" 
                                v-model="user.role" 
                                required
                            >
                                <option disabled value="">Seleccione un rol</option>
                                <option value="admin">Administrador</option>
                                <option value="cajero">Cajero</option>
                                <option value="cocinero">Cocinero</option>
                                <option value="mensajero">Mensajero</option>
                                <option value="cliente">Cliente</option>
                            </select>
                        </div>
                    </div>

                    <button class="btn btn-primary" type="submit">Crear Usuario</button>
                    <button class="btn btn-secondary mx-2" @click="cancelar">Cancelar</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
    name: 'NewUser',
    data() {
        return {
            user: {
                name: '',
                email: '',
                password: '',
                role: '',
            },
        };
    },
    methods: {
        async createUser() {
            try {
                const res = await axios.post('http://127.0.0.1:8000/api/users', this.user);
                if (res.status === 201) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Usuario creado con éxito',
                        showConfirmButton: false,
                        timer: 2000,
                    });
                    this.$router.push({ name: 'Users' });
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Hubo un problema al crear el usuario.',
                });
            }
        },
        cancelar() {
            this.$router.push({ name: 'user' });
        },
    },
};
</script>

<style scoped>
/* Estilos opcionales */
.container {
    padding: 20px;
}

.card {
    margin-top: 20px;
}
</style>
