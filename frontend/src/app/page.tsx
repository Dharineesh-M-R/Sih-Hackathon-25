"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import axios from "axios";

export default function SignupPage() {
  const [role, setRole] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const response = await axios.post(`${API_URL}/api/signup`, {
        name,
        email,
        phonenumber: phone,
        password,
        role,
      });

      console.log("Signup successful:", response.data);
      setSuccess(true);
      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
    } catch (err: any) {
      console.error("Signup failed:", err.response?.data || err.message);
      setError(err.response?.data?.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-200 p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full"
      >
        {!role ? (
          <>
            <h2 className="text-2xl font-bold text-green-700 text-center mb-6">
              Choose Your Role 🌍
            </h2>
            <div className="space-y-4">
              <button
                onClick={() => setRole("Donor")}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-all"
              >
                I am a Donor
              </button>
              <button
                onClick={() => setRole("Volunteer")}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-all"
              >
                I am a Volunteer
              </button>
            </div>
            <p className="text-sm text-gray-600 text-center mt-4">
              Already have an account?{" "}
              <Link href="/login" className="text-green-600 font-semibold hover:underline">
                Login here
              </Link>
            </p>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-green-700 text-center mb-6">
              {role} Signup 🌍
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {success && (
                <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-4">
                  ✅ Account created successfully! You can now log in.
                </div>
              )}
              {error && (
                <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4">
                  ❌ {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-600">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 w-full rounded-lg border-gray-300 p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full rounded-lg border-gray-300 p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Phone</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-1 w-full rounded-lg border-gray-300 p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 w-full rounded-lg border-gray-300 p-2"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-all"
                disabled={loading}
              >
                {loading ? "Signing up..." : `Sign Up as ${role}`}
              </button>
            </form>
            <p className="text-sm text-gray-600 text-center mt-4">
              Already have an account?{" "}
              <Link href="/login" className="text-green-600 font-semibold hover:underline">
                Login here
              </Link>
            </p>
            <button
              onClick={() => setRole(null)}
              className="w-full mt-4 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-1 px-4 rounded-lg"
            >
              Back to Role Selection
            </button>
          </>
        )}
      </motion.div>
    </div>
  );
}
