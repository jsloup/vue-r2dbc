<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by name" v-model="name"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button" @click="searchName">
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Persons List</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(person, index) in persons"
          :key="index"
          @click="setActivePerson(person, index)"
        >
          {{ person.name }}
        </li>
      </ul>
    </div>
    <div class="col-md-6">
      <div v-if="currentPerson">
        <h4>Person</h4>
        <div>
          <label><strong>Name:</strong></label> {{ currentPerson.name }}
        </div>
        <div>
          <label><strong>Age:</strong></label> {{ currentPerson.age }}
        </div>
        <router-link :to="'/person/' + currentPerson.id" class="badge badge-warning">Edit</router-link>
      </div>
      <div v-else>
        <br />
        <p>Please click on a Person...</p>
      </div>
    </div>
  </div>
</template>
<script>
import PersonService from "../services/PersonService";
export default {
  name: "person-list",
  data() {
    return {
      persons: [],
      currentPerson: null,
      currentIndex: -1,
      name: ""
    };
  },
  methods: {
    retrievePersons() {
      PersonService.getAll()
        .then(response => {
          this.persons = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    refreshList() {
      this.retrievePersonss();
      this.currentPerson = null;
      this.currentIndex = -1;
    },
    setActivePerson(person, index) {
      this.currentPerson = person;
      this.currentIndex = person ? index : -1;
    },
    
    searchName() {
      PersonService.getByName(this.name)
        .then(response => {
          this.persons = response.data;
          this.setActivePersonl(null);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.retrievePersons();
  }
};
</script>
<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>