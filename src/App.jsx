import { useState, useCallback, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FiCopy } from "react-icons/fi";

function App() {
  const [length, setLength] = useState(12);
  const [numberAllowed, setNumberAllowed] = useState(true);
  const [charAllowed, setCharAllowed] = useState(true);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 3000);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  const handleManualLengthChange = (e) => {
    const value = e.target.value === "" ? "" : Math.max(6, Math.min(100, e.target.value));
    setLength(value);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-600 opacity-50 animate-pulse"></div>
      <motion.div
        className="relative z-10 w-full max-w-md sm:max-w-lg lg:max-w-xl mx-auto shadow-lg rounded-3xl p-6 sm:p-8 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg text-white"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h1
          className="text-3xl sm:text-4xl lg:text-4xl font-extrabold text-center mb-6 sm:mb-8 tracking-wider"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          Password Generator
        </motion.h1>

        <motion.div
          className="flex flex-col sm:flex-row shadow rounded-lg overflow-hidden mb-4 sm:mb-6 bg-gray-800 bg-opacity-30"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          whileHover={{ scale: 1.05 }}
        >
          <input
            type="text"
            value={password}
            className="outline-none w-full py-2 sm:py-3 px-4 sm:px-5 bg-transparent text-white text-md sm:text-lg rounded-t-lg sm:rounded-l-lg sm:rounded-t-none tracking-wider"
            placeholder="Generated Password"
            readOnly
            ref={passwordRef}
          />
          <motion.button
            onClick={copyPasswordToClipboard}
            className="outline-none bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-pink-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-b-lg sm:rounded-r-lg sm:rounded-b-none flex items-center justify-center transition duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FiCopy className="text-xl sm:text-2xl" />
          </motion.button>
        </motion.div>

        {copied && (
          <motion.div
            className="absolute top-[-3rem] left-1/2 transform -translate-x-1/2 bg-blue-700 text-white text-sm sm:text-lg py-2 px-4 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            Password copied to clipboard!
          </motion.div>
        )}

        <motion.div
          className="flex flex-col space-y-4 sm:space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-between"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <label className="flex flex-row space-x-1 sm:flex-row items-center space-y-2 sm:space-x-2 sm:space-y-0 w-full">
              <span className="text-md sm:text-lg flex-shrink-0">
                Length: <span className="font-bold">{length}</span>
              </span>
              <input
                type="range"
                min={6}
                max={100}
                value={length || 6} // Default to 6 when length is empty
                className="cursor-pointer w-full accent-blue-500"
                onChange={(e) => setLength(e.target.value)}
              />
              <input
                type="number"
                min={6}
                max={100}
                value={length}
                onChange={handleManualLengthChange}
                className="w-16 px-2 py-1 text-black bg-white rounded-lg"
              />
            </label>
          </motion.div>

          <motion.div
            className="flex items-center justify-between"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <label
              htmlFor="numberInput"
              className="flex items-center space-x-2"
            >
              <input
                type="checkbox"
                defaultChecked={numberAllowed}
                id="numberInput"
                onChange={() => setNumberAllowed((prev) => !prev)}
                className="cursor-pointer accent-blue-500"
              />
              <span className="text-md sm:text-lg">Include Numbers</span>
            </label>
            <label
              htmlFor="characterInput"
              className="flex items-center space-x-2"
            >
              <input
                type="checkbox"
                defaultChecked={charAllowed}
                id="characterInput"
                onChange={() => setCharAllowed((prev) => !prev)}
                className="cursor-pointer accent-blue-500"
              />
              <span className="text-md sm:text-lg">Include Characters</span>
            </label>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default App;
