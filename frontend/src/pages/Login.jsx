
import React, { useState } from "react";

const Login = () => {
  const [state, setState] = useState("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Name:", name);
  };

  return (
    <form 
      onSubmit={onSubmit} 
      className="flex items-center justify-center min-h-screen p-4"
    >
      <div className="flex flex-col gap-4 p-6 w-full max-w-md border rounded-xl text-sm text-zinc-700 shadow-xl bg-white">
        <p className="text-2xl font-semibold text-center">
          {state === "signup" ? "Create Account" : "Login"}
        </p>
        <p className="text-center text-gray-600">
          Please {state === "signup" ? "create an account" : "log in"} to book an appointment.
        </p>
        {state === "signup" && (
          <div className="w-full">
            <label className="block text-sm font-medium">Full Name</label>
            <input
              className="border border-zinc-300 rounded w-full p-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Enter Full Name"
              required
            />
          </div>
        )}
        <div className="w-full">
          <label className="block text-sm font-medium">E-mail</label>
          <input
            type="email"
            className="border border-zinc-300 rounded w-full p-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="example@gmail.com"
            required
          />
        </div>
        <div className="w-full">
          <label className="block text-sm font-medium">Password</label>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>
        <button 
          type="submit" 
          className="bg-blue-700 text-white w-full py-2 rounded-md text-base hover:bg-blue-800 transition"
        >
          {state === "signup" ? "Create Account" : "login"}
        </button>
        {
          state === "signup"?
          <p>
          Already have an account? <span className="text-blue-700 hover:text-blue-800
          underline cursor-pointer
          " onClick={() => setState("login")}>Login</span>
          </p>
            :  
            <p>
            create an account? <span className="text-blue-700 hover:text-blue-800 underline cursor-pointer" onClick={() => setState("signup")}>Sign Up</span>
        </p>
          
            
          
        }
      </div>
    </form>
  );
};

export default Login;
