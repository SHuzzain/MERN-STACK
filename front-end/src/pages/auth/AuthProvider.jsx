import React from "react";
import {
  useFetcher,
  Link,
  useSearchParams,
  json,
  redirect,
} from "react-router-dom";
import { Button, TextInput } from "flowbite-react";
import TextHeading from "../components/ui/TextHeading";
import axios from "axios";
import J from "joi";
import { handleFetchError } from "../../../lib/errorFetch";
import ErrorMassage from "../components/ui/error-messag";
import { cn } from "../../../lib/utils";

const loginSchema = J.object({
  username: J.string()
    .min(4)
    .max(10)
    .alter({
      POST: (schema) => schema.required(),
      PUT: (schema) => schema.forbidden(),
    }),
  email: J.string().email({ tlds: false }).min(4).required(),
  password: J.string().min(5).max(20).required(),
});

function AuthProvider() {
  const fetcher = useFetcher();
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "signUp";
  const errorMassages = fetcher.data?.fetchError ? fetcher.data : false;

  return (
    <main className="flex justify-center items-center bg-shadeClr py-5 h-screen">
      <div className="border-slate-200 bg-[#f1f3f6] shadow-loginPage px-5 py-2 border w-100 max-w-xl">
        {/* header */}
        <section>
          <TextHeading
            containerClassName={"text-center flex w-100 justify-center"}
          />
          <p className="font-semibold text-center text-gray-500">
            This is demo project. You can sign {isLogin ? "up" : "in"} with you
            email and password or with google account
          </p>
        </section>
        {/* form section */}
        <section className="flex justify-center mt-3">
          <fetcher.Form
            method={isLogin ? "POST" : "PUT"}
            className="flex-1 max-w-xs font-semibold text-sm"
          >
            {isLogin && (
              <label htmlFor="text" className="[&>div]:my-2">
                Username
                <TextInput
                  id="text"
                  name="username"
                  color={errorMassages?.username ? "failure" : "gray"}
                />
                {errorMassages?.username && (
                  <ErrorMassage message={errorMassages.username} />
                )}
              </label>
            )}

            <label htmlFor="email" className="[&>div]:my-2">
              Email
              <TextInput
                id="email"
                name="email"
                color={errorMassages?.email ? "failure" : "gray"}
              />
              {errorMassages?.email && (
                <ErrorMassage message={errorMassages.email} />
              )}
            </label>
            <label htmlFor="password">
              Password
              <TextInput
                id="password"
                name="password"
                color={errorMassages?.password ? "failure" : "gray"}
              />
              {errorMassages?.password && (
                <ErrorMassage message={errorMassages.password} />
              )}
            </label>

            <div className="flex flex-col justify-center gap-2 mt-4">
              <Button
                color={"gray"}
                type="submit"
                className={cn(
                  `rounded-md`,
                  fetcher.state === "submitting" && "animate-pulse"
                )}
                disabled={fetcher.state === "submitting"}
              >
                {isLogin ? "Sign Up" : "Sign In"}
              </Button>
              <Button
                disabled={fetcher.state === "submitting"}
                className="rounded-md"
              >
                Continue with Google
              </Button>
            </div>
          </fetcher.Form>
        </section>
        {/* login section */}
        <p className="flex justify-center items-center gap-1 mt-4">
          {isLogin ? "Have an account?" : "i dont't have account"}
          <Link to={`/auth?mode=${isLogin ? "signIn" : "signUp"}`}>
            <TextHeading
              containerClassName={"text-sm"}
              label={{
                1: "sign",
                2: isLogin ? "In" : "Up",
              }}
            />
          </Link>
        </p>
      </div>
    </main>
  );
}

export default AuthProvider;

export async function authAction({ request }) {
  try {
    // handle post method and put method same function
    const { method } = await request;
    const data = await request.formData();
    const URL = method === "POST" ? "signup" : "signin";
    const authData = {
      email: data.get("email"),
      password: data.get("password"),
    };

    if (method === "POST") {
      authData.username = data.get("username");
    }
    // joi error check
    const clietError = loginSchema.tailor(method).validate(authData);
    if (clietError?.error?.message) {
      throw { statusMassage: clietError.error.details, joi: true };
    }

    const res = await axios[method.toLowerCase()](`api/auth/${URL}`, authData);

    if (!res.data) {
      throw json({ message: "Could not save email" }, { status: 500 });
    }
    redirect("/");
    return res;
  } catch (error) {
    console.error(error);
    if (error?.joi) {
      return json(handleFetchError(error.statusMassage), {
        status: 400,
      });
    }
    return json(
      { message: "something wrong" },
      {
        status: 500,
      }
    );
  }
}
