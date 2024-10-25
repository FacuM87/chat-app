const SignUp = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-200">
      <div className="w-full max-w-3xl p-8 space-y-6 bg-[#1D232A] shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-white">Sign Up</h2>
        <form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-300">Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="input input-bordered w-full bg-gray-800 text-gray-100 border-gray-600"
            />
          </div>
          
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-300">Surname</span>
            </label>
            <input
              type="text"
              placeholder="Enter your surname"
              className="input input-bordered w-full bg-gray-800 text-gray-100 border-gray-600"
            />
          </div>
          
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-300">Email</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full bg-gray-800 text-gray-100 border-gray-600"
            />
          </div>
          
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
              <span className="label-text text-gray-300">Gender</span>
            </label>
            <select className="select select-bordered w-full bg-gray-800 text-gray-100 border-gray-600">
              <option disabled selected>
                Select your gender
              </option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
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
        </form>
        
        <div className="form-control mt-6">
          <button className="btn btn-primary w-full sm:w-1/2 mx-auto">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
