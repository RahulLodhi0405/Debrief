import { useState } from "react";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);

      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      localStorage.setItem("user", JSON.stringify(user));

      await API.post("/api/auth/google-login", {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      });

      localStorage.setItem("token", "user_logged_in");

      navigate("/dashboard");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // LOADER
  if (loading) {
    return (
      <div className="h-screen w-full bg-[#050816] flex flex-col items-center justify-center gap-5">
        
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 1,
            ease: "linear",
          }}
          className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full"
        />

        <p className="text-purple-400 text-lg font-medium text-center">
          Redirecting to Debrief Dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-[#050816] text-white flex overflow-hidden">

      {/* LEFT */}
      <div className="w-1/2 hidden md:flex flex-col justify-center px-16 relative">

        <div className="absolute w-[500px] h-[500px] bg-purple-500/10 blur-3xl rounded-full -top-24 -left-24" />

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold leading-tight"
        >
          Master DSA <br />

          <span className="text-purple-400">
            the smart way.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-6 text-lg max-w-lg text-gray-300 leading-relaxed"
        >
          <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent font-semibold">
            Debrief
          </span>{" "}
          helps students master{" "}
          <span className="text-white font-medium">
            Data Structures & Algorithms
          </span>{" "}
          through structured learning, coding practice,
          resume building, interview preparation, and
          AI-powered guidance.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 space-y-3 text-sm text-gray-300"
        >
          <p>✔ Structured DSA Roadmap</p>
          <p>✔ AI Powered Learning</p>
          <p>✔ Coding Practice Arena</p>
          <p>✔ Resume Builder Pro</p>
          <p>✔ Progress Tracking</p>
        </motion.div>
      </div>

      {/* RIGHT */}
      <div className="w-full md:w-1/2 flex items-center justify-center relative">

        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{
            repeat: Infinity,
            duration: 6,
          }}
          className="absolute w-[400px] h-[400px] bg-purple-500/20 blur-3xl rounded-full"
        />

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.9,
            y: 40,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          transition={{ duration: 0.5 }}
          className="relative bg-[#0b0f19]/80 backdrop-blur-xl border border-purple-500/20 p-10 rounded-3xl shadow-2xl w-[380px]"
        >

          {/* LOGO */}
          <div className="mb-3 flex justify-center items-center">
            <img
              src="/logo.png"
              alt="logo"
              className="w-40 sm:w-52 md:w-56 h-auto object-contain drop-shadow-xl"
            />
          </div>

          {/* TITLE */}
          <h2 className="text-xl font-bold text-center">
            Welcome to{" "}

            <span className="text-purple-400">
              Debrief
            </span>
          </h2>

          {/* SUBTITLE */}
          <p className="text-gray-400 text-sm text-center mt-2 mb-8 leading-relaxed">
            AI Powered DSA Learning Platform for coding interviews,
            structured learning, and placement preparation.
          </p>

          {/* LOGIN BUTTON */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-purple-500 to-purple-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-purple-500/30 transition cursor-pointer"
          >
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white">
              <svg
                viewBox="0 0 533.5 544.3"
                className="w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M533.5 278.4c0-18.3-1.6-36-4.7-53.1H272v100.7h146.9c-6.3 34-25.4 62.8-54.3 82.1v68.1h87.8c51.4-47.4 81.1-117.1 81.1-197.8z"
                  fill="#4285F4"
                />

                <path
                  d="M272 544.3c73.5 0 135.3-24.5 180.4-66.6l-87.8-68.1c-24.4 16.4-55.6 26-92.6 26-71.2 0-131.5-48.1-153.1-112.9H28.5v70.9C73.5 482.8 167.8 544.3 272 544.3z"
                  fill="#34A853"
                />

                <path
                  d="M118.9 324.7c-10.8-32.4-10.8-67.4 0-99.8V154c-44.6 27.8-74.1 70.6-74.1 122.9s29.5 95.1 74.1 122.9l93.3-75.1z"
                  fill="#FBBC05"
                />

                <path
                  d="M272 107.7c39.7 0 75.3 13.6 103.4 40.3l77.6-77.6C405 24 344.9 0 272 0 167.8 0 73.5 61.5 28.5 154l93.3 70.9C140.5 155.8 200.8 107.7 272 107.7z"
                  fill="#EA4335"
                />
              </svg>
            </span>

            Continue with Google
          </motion.button>

          {/* FOOTER */}
          <p className="text-gray-500 text-xs text-center mt-6 leading-relaxed">
            Learn • Practice • Build • Crack Interviews
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;