import http from "../http-common";

class PersonService {
  getAll() {
    return http.get('/person');
  }
  get(id) {
    return http.get('/person/' + id);
  }
  getByName(name) {
    return http.get('/person/name/' + name);
  }
  save(data) {
    return http.post('/person', data);
  }
  delete(id) {
    return http.delete("/person/" + id);
  }
} 
export default new PersonService();