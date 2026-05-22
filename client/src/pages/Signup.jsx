import { useState } from "react";
import api from "../services/api";

function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSignup(e) {
    e.preventDefault();

    try {
      const res = await api.post("/auth/signup", form);

      alert(res.data.message);

      window.location.href = "/";
    } catch (err) {
      console.log(err);

      alert(
        err.response?.data?.message ||
          err.message ||
          "Signup failed"
      );
    }
  }

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSignup}>
        <h1>Create Account</h1>

        <p>Signup as normal user</p>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          type="text"
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />

        <button type="submit">
          Signup
        </button>

        <a href="/">
          Already have account? Login
        </a>
      </form>
    </div>
  );
}

export default Signup;