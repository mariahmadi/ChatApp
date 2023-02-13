import React from "react";
import { useForm } from 'react-hook-form'
import axios from 'axios'

const Register = () => {
    const { register, formState, reset, handleSubmit } = useForm()

    const onsubmit = async (data) => {
        try {
            // if (data.password == data.confirmpassword) {

            const res = await axios.post('http://localhost:4000/api/SignUp', data)
                .then((res1) => {

                    console.log(res1)
                    reset()
                })
            //  }
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
                        <label>Username</label>
                        <input name="username" {...register("username", { required: true })} type="text" />
                    </div>
                    <div>
                        <label>Email</label>
                        <input name="email" {...register("email", { required: true })} type="text" />
                    </div>
                    <div>
                        <label>Password</label>
                        <input name="password" {...register("password", { required: true })} type="text" />
                    </div>
                    <div>
                        <input name="confirmpassword" {...register("confirmpassword", { required: true })} type="text" />
                    </div>
                    <button type="submit">Send</button>
                </form>
            </div>
        </>
    )
}
export default Register