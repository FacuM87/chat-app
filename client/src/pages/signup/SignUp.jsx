const SignUp = () => {
  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      name: e.target.name.value,
      surname: e.target.surname.value,
      email: e.target.email.value,
      nickname: e.target.nickname.value,
      gender: e.target.gender.value,
      password: e.target.password.value,
    };

    try {
      const serverResponse = await fetch(
        `${import.meta.env.VITE_AUTH_URL}/signup`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(userData),
          credentials: "include",
        }
      );
      const data = await serverResponse.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-200">
      <div className="w-full max-w-3xl p-8 space-y-6 bg-[#1D232A] shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-white">Sign Up</h2>
        <form
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-center"
          onSubmit={handleOnSubmit}
        >
          <div className="form-control">
            <label className="label" htmlFor="name">
              <span className="label-text text-gray-300">Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="input input-bordered w-full bg-gray-800 text-gray-100 border-gray-600"
              id="name"
              autoComplete="on"
            />
          </div>

          <div className="form-control">
            <label className="label" htmlFor="surname">
              <span className="label-text text-gray-300">Surname</span>
            </label>
            <input
              type="text"
              placeholder="Enter your surname"
              className="input input-bordered w-full bg-gray-800 text-gray-100 border-gray-600"
              id="surname"
              autoComplete="on"
            />
          </div>

          <div className="form-control">
            <label className="label" htmlFor="email">
              <span className="label-text text-gray-300">Email</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full bg-gray-800 text-gray-100 border-gray-600"
              id="email"
              autoComplete="on"
            />
          </div>

          <div className="form-control">
            <label className="label" htmlFor="nickname">
              <span className="label-text text-gray-300">Nickname</span>
            </label>
            <input
              type="text"
              placeholder="Enter your nickname"
              className="input input-bordered w-full bg-gray-800 text-gray-100 border-gray-600"
              id="nickname"
            />
          </div>

          <div className="form-control">
            <label className="label" htmlFor="gender">
              <span className="label-text text-gray-300">Gender</span>
            </label>
            <select
              className="select select-bordered w-full bg-gray-800 text-gray-100 border-gray-600"
              id="gender"
            >
              <option disabled defaultValue={true}>
                Select your gender
              </option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>

          <div className="form-control">
            <label className="label" htmlFor="password">
              <span className="label-text text-gray-300">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="input input-bordered w-full bg-gray-800 text-gray-100 border-gray-600"
              id="password"
            />
          </div>
          <div className="form-control mt-6 sm:col-span-2">
            <button className="btn btn-primary w-1/2 mx-auto" type="submit">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
