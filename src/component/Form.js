import { useState } from "react";
import axios from 'axios';
const Form = () => {
    const [user, setUser] = useState();

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    // const handleName = (e) => {
    //     console.log(e)
    //     const data = { id: Date.now(), name: e.target.value };
    //     setUser(data)
    // }

    // const handleSubmit = e => {
    //     e.preventDefault();
    //     console.log(user)
    //     fetch("https://jsonplaceholder.typicode.com/users", {
    //         method: "POST",
    //         headers: {
    //             Accept: "application/json",
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify(user)
    //     }).then(res => res.json())
    //         .then(res => console.log(res))
    //         .catch(err => console.log(err));
    // };

    // const handleLogin = e => {
    //     e.preventDefault();
    //     axios.post("http://localhost:9050/login", {
    //         method: "POST",
    //         headers: {
    //             Accept: "application/json",
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify({email: email, password: password})
    //     }).then(res => res.json())
    //         .then(res => console.log(res))
    //         .catch(err => console.log(err));
    // };

    const handleLogin = e => {
        e.preventDefault();
        axios.post("http://localhost:9001/login",
            {email: email, password: password},
        ).then(res => console.log('Data', res.data))
        .catch(err => {
            if(err?.response?.data){
                console.log(err.response.data.message)
            }else{
                console.log('Error', err)
            }
        });
    };

    return (
        <form>
            {/* <label>
                First Name:
                <input type="text" name="first_name" onChange={handleFirstName} />
            </label>
            <label>
                Last Name:
                <input type="text" name="last_name" onChange={handleLastName} />
            </label> */}
            {/* <label>
                Person Name:
                <input type="text" name="name" maxLength={100} onChange={handleName} />
            </label>
            <button type="submit" onClick={handleSubmit}>Add</button> */}
            <label>
                Email:
                <input type="text" name="email" onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label>
                Password:
                <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} />
            </label>

            <button type="submit" onClick={handleLogin}>Login</button>
        </form>
    );
}

export default Form;