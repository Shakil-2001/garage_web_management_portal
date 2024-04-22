"use client"

import React, {useEffect} from "react";
import { useState } from 'react';
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useUserStore } from "../../hooks/userStore"
import IntroCard from "../Cards/IntroCard";




const LoginForm = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { data: session } = useSession(); 
  const router = useRouter();

  useEffect(() => {
    if (session?.user) {
      router.push("/dashboard");

      if (session?.user.email){
        fetch( "http://localhost:3000/api/employee?" + new URLSearchParams({ email: session?.user.email}))
        .then((response) => response.json())
        .then(data => {
            router.push("/dashboard");
            useUserStore.getState().updateUser(data.employee);
        });
      }
    }
  }, [session, router]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    
    if (!email && !password){
        setError("No email or password provided.")
    } else if (!email) {
        setError("No email provided.")
    } else if (!password) {
        setError("No password provided.")
    }

    try {
        const res = await signIn("credentials", {
            email,
            password, 
            redirect: false,
        });

        // @ts-ignore
        if (res.error){
            setError("Invalid Credentials.")
            return;
        } else {

            fetch( "http://localhost:3000/api/employee?" + new URLSearchParams({ email: email }))
            .then((response) => response.json())
            .then(data => {
                router.push("/dashboard");
                useUserStore.getState().updateUser(data.employee);
            });
        }
    } catch(error){
        console.log(error);
    }
  }

    return (

    <>
        <IntroCard title={"Please Login To Access Garage Portal"} text={"No Login? Please contact your administrator to create an account"} icon={"lucide:log-in"} />
        
        <div className="grid place-items-center mt-10">
        <div className="shadow-lg p-5 rounded-lg border-t-3 border-indigo-950">
            <h1 className="text-xl font-bold my-4">Enter your login details here:</h1>

            <form className="flex flex-col gap-3" id="login-form" onSubmit={handleSubmit}>
                <input type="text" placeholder="Email: " id="login-form-email"
                    onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" placeholder="Password: " id="login-form-password" 
                    onChange={(e) => setPassword(e.target.value)}/>
                <button className="bg-indigo-950 text-white font-bold cursor-pointer px-6 py-2">
                    Login
                </button>

                    { error && (
                        <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md    mt-2">
                            {error}
                        </div>
                    )
                    }
            </form>
        </div>
    </div>
  </>
  );
}

export default LoginForm;


