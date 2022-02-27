<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="name">Name</label>
        <input
          type="text"
          class="form-control"
          id="name"
          required
          v-model="person.name"
          name="name"
        />
      </div>
      <div class="form-group">
        <label for="Age">Age</label>
        <input
          class="form-control"
          id="age"
          required
          v-model="person.age"
          name="age"
        />
      </div>
      <button @click="savePerson" class="btn btn-success">Submit</button>
    </div>
    <div v-else>
      <h4>You submitted successfully!</h4>
      <button @click="newPerson" class="btn btn-success">Add</button>
    </div>
  </div>
</template>
<script>
import PersonService from "../services/PersonService";
export default {
  name: "add-person",
  data() {
    return {
      person: {
        id: null,
        name: "",
        age: 21
      },
      submitted: false
    };
  },
  methods: {
    savePerson() {
      var data = {
        name: this.person.name,
        age: this.person.age
      };
      PersonService.save(data)
        .then(response => {
          this.person.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newPerson() {
      this.submitted = false;
      this.person = {};
    }
  }
};
</script>
<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>