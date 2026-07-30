import React from 'react'

const RegistrationForm = () => {


  return (
    <div >
      <h2 className='text-3xl'>Registration Form</h2>
        <div className='h-full  bg-blue-200 p-4'>
            <form>
                
                <div>
                <label htmlFor="name">Name: </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                />
                </div>

                <div>
                <label htmlFor="registrationNumber">Registration Number: </label>
                <input
                    type="text"
                    id="registrationNumber"
                    name="registrationNumber"
                    placeholder="Enter registration number"
                />
                </div>

                <div>
                <label htmlFor="email">Email: </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                />
                </div>

                <div>
                <label htmlFor="password">Password: </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                />
                </div>


                <div>
                <label htmlFor="age">Age: </label>
                <input
                    type="number"
                    id="age"
                    name="age"
                    placeholder="Enter your age"
                />
                </div>

                <button type="submit" className='h-full bg-blue-400 rounded-xl'>Submit</button>
            </form>
        </div>
     
    </div>
  )
}

export default RegistrationForm