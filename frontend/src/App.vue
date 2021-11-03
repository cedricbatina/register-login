<template>
  <div id="app">
    <header class="container modal-header">
      <nav class="navbar bg-dark col-sm-12 navbar-expand-xl navbar-dark">
        <!--<a href class="navbar-brand col-sm-12" @click.prevent>-->
        <img
          alt="logo"
          src="./assets/logo_kemshare_grey.png"
          class="navbar-brand col-sm-5"
        />
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarContent"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse col-sm-7" id="navbarContent">
          <div>
            <ul class="navbar-nav mr-auto">
              <li class="nav-item">
                <router-link to="/home" class="nav-link">
                  <font-awesome-icon icon="home" /> Home
                </router-link>
              </li>
            </ul>
          </div>
          <div
            v-if="!currentUser"
            class="collapse navbar-collapse"
            id="navbarContent"
          >
            <ul class="navbar-nav ml-auto">
              <li class="nav-item">
                <router-link to="/register" class="nav-link">
                  <font-awesome-icon icon="user-plus" /> Register
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/login" class="nav-link">
                  <font-awesome-icon icon="sign-in-alt" /> Login
                </router-link>
              </li>
            </ul>
          </div>

          <div
            v-if="currentUser"
            class="collapse navbar-collapse"
            id="navbarContent"
          >
            <ul class="navbar-nav ml-auto">
              <li class="nav-item">
                <router-link to="/profile" class="nav-link">
                  <font-awesome-icon icon="user" />
                  {{ currentUser.userName }}
                </router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/articles"
                  >Tous les articles</router-link
                >
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/add">Ajouter</router-link>
              </li>
              <li class="nav-item">
                <a class="nav-link" href @click.prevent="logOut">
                  <font-awesome-icon icon="sign-out-alt" /> LogOut
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/");
    },
  },
};
</script>

