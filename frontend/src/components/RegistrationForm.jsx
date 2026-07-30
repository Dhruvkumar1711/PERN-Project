import React, { useState } from 'react'

const RegistrationForm = () => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

    const [name, setName] = useState('');
    const [registrationNumber, setRegistrationNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [age, setAge] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            name,
            registration_no: registrationNumber,
            email,
            password,
            age: Number(age),
        };

        try {
            const response = await fetch(`${API_URL}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const result = await response.json().catch(() => ({}));

            if (response.ok) {
                alert('Registration Successful!');
                setName('');
                setRegistrationNumber('');
                setEmail('');
                setPassword('');
                setAge('');
            } else {
                alert(result.error || result.message || 'Registration Failed!');
            }
        } catch (error) {
            alert('Error connecting to backend: ' + error.message);
        }
    };

  return (
    <div>
      <h2 className='text-3xl'>Registration Form</h2>
        <div className='h-full  bg-blue-200 p-4'>
            <form onSubmit={handleSubmit}>
                
                <div>
                <label htmlFor="name">Name: </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                </div>

                <div>
                <label htmlFor="registrationNumber">Registration Number: </label>
                <input
                    type="text"
                    id="registrationNumber"
                    name="registrationNumber"
                    placeholder="Enter registration number"
                    value={registrationNumber}
                    onChange={(e) => setRegistrationNumber(e.target.value)}
                />
                </div>

                <div>
                <label htmlFor="email">Email: </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                </div>

                <div>
                <label htmlFor="password">Password: </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                </div>


                <div>
                <label htmlFor="age">Age: </label>
                <input
                    type="number"
                    id="age"
                    name="age"
                    placeholder="Enter your age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                />
                </div>

                <button type="submit" className='h-full bg-blue-400 rounded-xl p-2 mt-2'>Submit</button>
            </form>
        </div>
     
    </div>
  )
}

export default RegistrationForm