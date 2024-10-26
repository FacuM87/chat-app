const Login = () => {

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        const loginData = {
            nickname: e.target[0].value,
            password: e.target[1].value
        }

        console.log(loginData); 

        try {
            const serverResponse = await fetch('http://localhost:8000/api/auth/login', {
                headers: {"Content-Type": "application/json"},
                method: "POST",
                body: JSON.stringify(loginData),
                credentials: "include",
            })

            const data = await serverResponse.json();
            console.log(data);

        } catch (error) {
            console.log(error);   
        }

    }
  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-sm p-8 space-y-6 bg-[#1D232A] shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-white">Login</h2>
        <form className="space-y-4" onSubmit={handleOnSubmit}>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-300">Nickname</span>
            </label>
            <input
              type="text"
              placeholder="Enter your nickname"
              className="input input-bordered w-full bg-gray-800 text-gray-100 border-gray-600"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-300">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="input input-bordered w-full bg-gray-800 text-gray-100 border-gray-600"
            />
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary w-full">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
