import Cookies from "js-cookie";

class local
{
    users = [];
    campus_id = parseInt(Cookies.get("current_campus_id"));
    cursus_id = parseInt(Cookies.get("current_cursus_id"));

    constructor()
    {
        this.updateUsers()
    }

    updateUsers()
    {
        if (localStorage.getItem("users"))
            this.users = (JSON.parse(localStorage.getItem("users")) || [])
                .filter(user => this.campus_id ? (user.campus_id === this.campus_id && user.cursus_id === this.cursus_id) : true);
        else
            localStorage.setItem("users", "[]");
    }

    saveUsers()
    {
        localStorage.setItem("users", JSON.stringify(this.users));
        this.updateUsers();
    }

    addUser(user)
    {
        if (!this.users)
            this.users = [];
        this.users.push(user);
        this.saveUsers();
    }

    addUsers(users)
    {
        if (!this.users)
            this.users = [];
        this.users = users;
        this.saveUsers();
    }

    setCursusId(cursus_id){
        this.cursus_id = cursus_id;
        Cookies.set("current_cursus_id", cursus_id, { expires: 1 / 48});
        this.updateUsers();
    }
    
    setCampusId(campus_id){
        this.campus_id = campus_id;
        Cookies.set("current_campus_id", campus_id, { expires: 1 / 48});
        this.updateUsers();
    }

    clearStorage()
    {
         localStorage.clear();
    }
}

export default local = new local();