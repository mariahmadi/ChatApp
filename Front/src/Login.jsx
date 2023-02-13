import React from "react";
import { useForm } from 'react-hook-form'
import axios from "axios";


const Login = () => {
    const { register, formState, reset, handleSubmit } = useForm()

    const onsubmit = async (data) => {
        try {
            if (data) {
                await axios.post('http://localhost:4000/api/Login', data)
                    .then((res) => {
                        const resp = res.json()
                        console.log(resp)
                    })
            }
        } catch (error) {
            console.log(error)
        }
        console.log(data)
    }
    return (

        <>
            <div>
                <form onSubmit={handleSubmit(onsubmit)}>
                    <div>
                        <label>Email</label>
                        <input name="email" {...register("email", { required: true })} type="text" />
                    </div>
                    <div>
                        <label>Password</label>
                        <input name="password" {...register("password", { required: true })} type="text" />
                    </div>

                    <button type="submit">Login</button>
                </form>
            </div>
        </>
    )
}
export default Login