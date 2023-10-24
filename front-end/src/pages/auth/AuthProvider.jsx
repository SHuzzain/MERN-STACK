import React from "react";
import { Form, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
function AuthProvider() {
  const { handleSubmit, setValue, register, getValues, control } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    shouldUnregister: false,
  });

  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "signUp";

  return (
    <main className="h-screen bg-shadeClr py-5 flex justify-center items-center">
      <div className="max-w-xl  flex-1 flex flex-col items-center bg-[#f1f3f6] justify-center border-slate-200 border shadow-loginPage">
        <h1 className="text-primary font-bold text-4xl p-6">
          De<span className="text-[#1d1d1d]">sign</span>
        </h1>
        <Form control={control}>
          <section className="flex items-center flex-col gap-7 ">
            <label
              htmlFor="userName"
              className="py-2 px-4 bg-[#f1f3f6] shadow-inner  rounded-md"
            >
              <input
                placeholder="User Name"
                type="text"
                name="userName"
                className="bg-transparent focus:outline-0  placeholder:text-[#9ea4b0] caret-[#9ea4b0]"
                id="userName"
                {...register("userName")}
              />
            </label>

            <label
              htmlFor="password"
              className="p-2  px-4 bg-[#e3e9f2] shadow-inner  rounded-md "
            >
              <input
                type="text"
                placeholder="Password"
                className="bg-transparent focus:outline-0 placeholder:text-[#9ea4b0] caret-[#9ea4b0]"
                name="password"
                id="password"
                {...register("password")}
              />
            </label>
          </section>
          <p className="text-gray-400 text-sm text-end my-3">
            Forget password?
          </p>
          <button className="bg-[#5193f2] text-white w-full p-3 rounded-md mb-4">
            {isLogin ? "Sign In" : "Login"}
          </button>
        </Form>
      </div>
    </main>
  );
}

export default AuthProvider;
