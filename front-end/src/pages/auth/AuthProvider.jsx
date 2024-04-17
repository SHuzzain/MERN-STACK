import React from "react";
import {
  useFetcher,
  Link,
  useSearchParams,
  json,
  redirect,
} from "react-router-dom";
import { Button, ButtonGroup, TextInput } from "flowbite-react";
import TextHeading from "../components/ui/TextHeading";
import axios from "axios";
import { handleFetchError } from "../../../lib/errorFetch";
function AuthProvider() {
  const fetcher = useFetcher();
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "signUp";

  console.log(fetcher.data, fetcher.json, "", fetcher.text);

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
                <TextInput id="text" name="username" />
              </label>
            )}

            <label htmlFor="email" className="[&>div]:my-2">
              Email
              <TextInput id="email" name="email" />
            </label>
            <label htmlFor="password">
              Password
              <TextInput id="password" name="password" />
            </label>

            <div className="flex justify-center mt-4">
              <ButtonGroup className="gap-2">
                <Button color={"gray"} type="submit" className="rounded-md">
                  {isLogin ? "Sign Up" : "Sign In"}
                </Button>
                <Button className="rounded-md">Continue with Google</Button>
              </ButtonGroup>
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
    const { method } = await request;
    const data = await request.formData();
    const authData = {
      email: data.get("email"),
      password: data.get("password"),
    };
    if (method === "POST") {
      authData.username = data.get("username");
    }
    const res = await axios.post("api/auth/signup", {
      data: authData,
    });

    if (!res.data) {
      throw json({ message: "Could not save email" }, { status: 500 });
    }
    redirect("/");
    return res;
  } catch (error) {
    return json(handleFetchError(error.response.data.message), {
      status: error.response.status,
    });
  }
}
