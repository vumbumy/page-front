import axios from 'axios';

export function searchTerm () {
    // using JSONPlaceholder
    axios.get(`${process.env.VUE_APP_API_BASE_URL}/posts`)
        .then((result) => {
            console.log(result)
            this.posts = result.data
        })
}

export function join (email, password) {
    let data = {
        userName: email,
        password: password
    }
    console.log(data)
    // using JSONPlaceholder
    axios.post(`${process.env.VUE_APP_API_BASE_URL}/sign/up`,data,
        {headers: {'Content-Type': 'application/json'}}
        )
      .then(result => console.log(result))
      .catch((err) => console.log(err))
}
