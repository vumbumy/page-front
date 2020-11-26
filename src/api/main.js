import axios from 'axios';

import {resourceHost} from "@/store";

export function searchTerm () {
    // using JSONPlaceholder
    axios.get(`${resourceHost}/posts`)
        .then((result) => {
            console.log(result)
            this.posts = result.data
        })
}

export function join (email, password) {
    let data = {
        email: email,
        password: password
    }
    console.log(data)
    // using JSONPlaceholder
    axios.post(`${resourceHost}/join`,data,
        {headers: {'Content-Type': 'application/json'}}
        )
        .then((result) => {
            console.log(result)
        }).catch((err) => console.log(err))
}