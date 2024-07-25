import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useSignUp } from "@/hooks/useSignUp";
import { Link } from "react-router-dom";

const schema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  userType: z.enum(["Student", "Employer"], {
    message: "User type is required",
  }),
});

const userTypes = ["Student", "Employer"];

const Signup = () => {
  const { signUp } = useSignUp();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    try {
      await signUp(data);
      // Optionally, redirect the user to a dashboard or home page
      // navigate('/dashboard'); // Assuming you have a navigate function from useNavigate hook
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError("_general", {
          type: "manual",
          message: error.response.data.message,
        });
      } else if (error.request) {
        setError("_general", {
          type: "manual",
          message: "No response from the server",
        });
      } else {
        setError("_general", {
          type: "manual",
          message: error.message,
        });
      }
    }
  };

  return (
    <div
      className="signupbackground bg-cover h-full flex flex-row pt-4 pr-8 pb-4 pl-8 lg:pt-8 lg:pr-20 lg:pb-8 lg:pl-20 md:pt-8 md:pr-12 md:pb-8 md:pl-12"
      style={{ backgroundImage: `url(/images/signupandloginbackground.png)` }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="bg-Neutral400 w-full lg:w-55 flex flex-col rounded-tl rounded-bl"
      >
        <div className="form-header bg-Neutral100_Base_Background flex flex-col pt-4 pr-4 pb-4 pl-4 lg:pt-6 lg:pr-8 lg:pb-6 lg:pl-8 ">
          <div className="image-subtitle flex flex-col items-center gap-y-2">
            <Link to="/">
              <img
                src="\images\SkillBridge.svg"
                alt="Skill Bridge logo"
                className="w-56 md:w-72 lg:w-96"
              />
            </Link>
            <p className="subtitle text-center text-b1 text-text_dark">
              Welcome to the largest platform for finding internships in the UK
            </p>
          </div>
        </div>
        <div className="main-form bg-Neutral400 flex flex-col">
          <div className="title-and-inputs-and-button flex flex-col pr-6 pl-6 gap-y-4 md:pr-8 md:pl-8 md:gap-y-4">
            <p className="title text-t1 font-medium text-text_dark">
              Sign Up for Free with your email
            </p>
            <div className="inputs flex flex-col gap-y-4">
              <div className="email-input-and-error flex flex-col gap-y-2">
                <input
                  {...register("email")}
                  type="email"
                  placeholder="email"
                  className={`email-input h-12 w-full rounded border border-Neutral300_Border border-solid focus:outline text-Neutral900_Text_main pl-4 ${
                    errors.email ? "error-class border-destructive" : ""
                  }`}
                />
                {errors.email && (
                  <p className="error-response text-b4 text-destructive_light">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="userTypeanddropdown flex flex-col gap-y-2">
                <select
                  {...register("userType")}
                  placeholder="Select userType"
                  className={`title-input h-12 w-full rounded border border-Neutral300_Border border-solid focus:outline text-Neutral900_Text_main pr-4 pl-4 ${
                    errors.userType ? "error-class border-destructive" : ""
                  }`}
                >
                  <option value="">Select userType</option>
                  {userTypes.map((userType) => (
                    <option key={userType} value={userType}>
                      {userType}
                    </option>
                  ))}
                </select>

                {errors.userType && (
                  <p className="error-response text-destructive_light text-b4">
                    {errors.userType.message}
                  </p>
                )}
              </div>

              <div className="input-and-error flex flex-col gap-y-2">
                <input
                  {...register("password")}
                  type="password"
                  placeholder="password"
                  className={`password-input h-12 w-full rounded border border-Neutral300_Border border-solid focus:outline text-Neutral900_Text_main pl-4 ${
                    errors.password ? "error-class border-destructive" : ""
                  }`}
                />
                {errors.password && (
                  <p className="error-response text-destructive_light text-b4">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`button-class ${
                isSubmitting
                  ? "bg-primary_light bg-opacity-70 w-fit text-text_light pt-4 pr-6 pb-4 pl-6 rounded text-lg font-medium"
                  : "bg-primary_light w-fit text-text_light pt-3 pr-4 pb-3 pl-4 md:pt-4 md:pr-6 md:pb-4 md:pl-6 rounded font-medium text-sm md:text-lg"
              }`}
            >
              Sign Up for free
            </button>

            {/* Render general error message */}
            {errors._general && (
              <p className="error-response text-destructive_light text-b4 mt-2">
                {errors._general.message}
              </p>
            )}

            <div className="login-container flex gap-x-2">
              <p className="login-text text-sm md:text-lg text-text_dark">
                Already have an account?
              </p>
              <Link to="/login">
                <p className="login-text-button underline text-sm md:text-lg font-medium text-text_dark">
                  Log In
                </p>
              </Link>
            </div>
          </div>
        </div>
      </form>
      <div className="flex w-55 h-full rounded-tr rounded-br hidden lg:block">
        <img
          src="\images\signupImage.png"
          alt="a girl with a laptop"
          className="w-full h-full object-cover rounded-tr rounded-br"
        />
      </div>
    </div>
  );
};

export default Signup;
