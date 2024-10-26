
const Login = () => {

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        const loginData = {
            nickname: e.target.nickname.value,
            password: e.target.password.value
        }

        try {
            const serverResponse = await fetch(`${import.meta.env.VITE_AUTH_URL}/login`, {
                headers: {"Content-Type": "application/json"},
                method: "POST",
                body: JSON.stringify(loginData),
                credentials: "include",
            })

            const data = await serverResponse.json();
            console.log(data);

        } catch (error) {
            console.log("Login error at handleOnSubmit",error);   
        }

    }
  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-sm p-8 space-y-6 bg-[#1D232A] shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-white">Login</h2>
        <form className="space-y-4" onSubmit={handleOnSubmit}>
          <div className="form-control">
            <label className="label" htmlFor="nickname">
              <span className="label-text text-gray-300">Nickname</span>
            </label>
            <input
              id="nickname"
              type="text"
              name="nickname"
              placeholder="Enter your nickname"
              className="input input-bordered w-full bg-gray-800 text-gray-100 border-gray-600" autoComplete="on"
            />
          </div>
          <div className="form-control">
            <label className="label" htmlFor="password">
              <span className="label-text text-gray-300">Password</span>
            </label>
            <input
              id="password"
              type="password"
              name="password"
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
