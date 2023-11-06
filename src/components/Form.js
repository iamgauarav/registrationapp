import React from 'react';
import bgImg from '../assets/img1.jpg';
import { useForm } from 'react-hook-form';
import UsersList from './UsersList'; // Import the UsersList component
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAeMkGbhKcO-aSsQr3aeEi3dgqT-1RpgOw",
    authDomain: "registration-form-568ce.firebaseapp.com",
    projectId: "registration-form-568ce",
    storageBucket: "registration-form-568ce.appspot.com",
    messagingSenderId: "252241154880",
    appId: "1:252241154880:web:26e44f604a1001f84ba0a5",
    measurementId: "G-06KJD54FC9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default function Form() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const onSubmit = async (data) => {
        try {
            const response = await fetch('http://localhost:3001/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.status === 200) {
                const result = await response.json();
                console.log(result.message);
                alert('Registration successful');
                reset();
            } else {
                const errorData = await response.json();
                console.error(errorData.error);
            }
        } catch (error) {
            console.error('Error submitting the form:', error);
        }
    };

    

    return (
        <section>
            <div className="register">
                <div className="col-1">
                    <h2>Sign In</h2>
                    <span>Register and enjoy the service</span>

                    <form id="form" className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                        <input type="text" {...register('username', { required: true })} placeholder="Username" />
                        {errors.username && 'Username is required'}

                        <input type="password" {...register('password', { required: true })} placeholder="Password" />
                        {errors.password && 'Password is required'}

                        <input type="password" {...register('confirmpwd', { required: true })} placeholder="Confirm Password" />
                        {errors.confirmpwd && 'Confirm Password is required'}

                        <input type="email" {...register('email', { required: true })} placeholder="Email" />
                        {errors.email && 'Email is required'}

                        <input type="text" {...register('mobile', { required: true, maxLength: 10 })} placeholder="Mobile Number" />
                        {errors.mobile?.type === 'required' && 'Mobile Number is required'}
                        {errors.mobile?.type === 'maxLength' && 'Max Length Exceed'}

                        <button className="btn" type="submit">
                            Sign In
                        </button>
                    </form>

                </div>
                <div className="col-2">
                    <img src={bgImg} alt="" />
                </div>
            </div>
            <UsersList /> {/* Display the user data */}
        </section>
    );
}
