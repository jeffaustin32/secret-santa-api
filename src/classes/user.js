class User {
    constructor(json) {
        this.id = json.id;
        this.username = json.username;
        this.firstName = json.first_name;
        this.lastName = json.last_name;
        this.email = json.email;
    }
}

module.exports = User;