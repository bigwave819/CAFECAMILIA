import axios from 'axios';
import React, { useState } from 'react'

const useLogin = () => {
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(null);

    const login = async (email, password) => {
        setError(null);
        setLoading(true);

        try {
            const response = await axios.post("http://localhost:5000/api/v1/users/login",
                { email, password }
            )

            const data = response.data

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            setLoading(false);
            return { success: true }
        } catch (error) {
            setLoading(false)
            setError(error.response?.data?.error || "failed to log in. please try again?");
            return { success: false }
        }
    };

    return { login, loading, error }
}

export default useLogin