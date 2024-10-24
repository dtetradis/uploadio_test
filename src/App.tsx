import React, { useState, useEffect } from "react";
import axios from "axios";

interface User {
  name: { first: string; last: string; title: string };
  gender: string;
  picture: { large: string; medium: string; thumbnail: string };
  email: string;
  title: string;
}

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [gender, setGender] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchUser = async (event: any) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.get(
        `http://127.0.0.1:5000/user${gender ? `?gender=${gender}` : ""}`
      );
      console.log(response);
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-6xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600  bg-gray-100 shadow-md tracking-wide">
        Uplodio
      </h2>

      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="max-w-md w-full bg-white shadow-md rounded-lg overflow-hidden">
          <form onSubmit={fetchUser} className="flex flex-col items-center p-6">
            <h2 className="text-xl font-bold mb-4">Select Gender</h2>
            <div className="mb-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={gender === "male"}
                  onChange={() => setGender("male")}
                  className="form-radio text-blue-500"
                />
                <span className="ml-2">Male</span>
              </label>
            </div>
            <div className="mb-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={gender === "female"}
                  onChange={() => setGender("female")}
                  className="form-radio text-pink-500"
                />
                <span className="ml-2">Female</span>
              </label>
            </div>
            <div className="mb-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value=""
                  checked={gender === ""}
                  onChange={() => setGender("")}
                  className="form-radio text-gray-500"
                />
                <span className="ml-2">Random (No Selection)</span>
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 rounded"
            >
              Fetch User
            </button>
          </form>
          {loading && <div className="p-6 text-center">Loading...</div>}
          {user && (
            <div className="flex flex-col justify-center items-center p-6">
              <img
                src={user?.picture.large}
                alt="User Profile"
                className="w-fit h-48 object-contain mb-4 rounded-lg shadow-lg"
              />
              <h2 className="text-2xl font-bold mb-2">
                {user?.name.title} {user?.name.first} {user?.name.last}
              </h2>
              <p className="text-gray-700 mb-4">{user.email}</p>
              <p className="text-gray-500">{user.gender}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
