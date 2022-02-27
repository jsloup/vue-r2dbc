<template>
  <div v-if="currentPerson" class="edit-form">
    <h4>Person</h4>
    <form>
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" class="form-control" id="name" v-model="currentPerson.name" />
      </div>
      <div class="form-group">
        <label for="description">Age</label>
        <input type="text" class="form-control" id="age" v-model="currentPerson.age" />
      </div>
    </form>
    
    <button class="badge badge-danger mr-2" @click="deletePerson" >
      Delete
    </button>
    <button type="submit" class="badge badge-success" @click="updatePerson" >
      Update
    </button>
    <p>{{ message }}</p>
  </div>
  <div v-else>
    <br />
    <p>Please click on a Person...</p>
  </div>
</template>
<script>
import PersonService from "../services/PersonService";
export default {
  name: "person",
  data() {
    return {
      currentPerson: null,
      message: ''
    };
  },
  methods: {
    getPerson(id) {
      PersonService.get(id)
        .then(response => {
          this.currentPerson = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    updatePerson() {
      PersonService.save(this.currentPerson)
        .then(response => {
          console.log(response.data);
          this.message = 'The person was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },
    deletePerson() {
      PersonService.delete(this.currentPerson.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "persons" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = '';
    this.getPerson(this.$route.params.id);
  }
};
</script>
<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>