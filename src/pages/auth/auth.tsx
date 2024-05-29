import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogPortal } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import Register from "./register";
import ForgotPassword from "./forgot-password";
import { useLogin } from "@/store/server/auth/mutation";

interface authProp {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const formLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Password must contain at least 6 character(s) ",
  }),
});

const Auth = ({ open, setOpen }: authProp) => {
  const [authState, setAuthState] = useState<
    "login" | "register" | "forgot" | "reset"
  >("login");

  const loginForm = useForm<z.infer<typeof formLoginSchema>>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const login = useLogin();

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        setOpen(value);
        setAuthState("login");
      }}
    >
      <DialogPortal>
        <DialogContent className=" bg-white">
          {authState === "login" && (
            <Form {...loginForm}>
              <h4 className=" font-bold">Login Your Account</h4>
              <form
                onSubmit={loginForm.handleSubmit((value) =>
                  login.mutate(value, {
                    onSuccess: () => setOpen(false),
                  })
                )}
              >
                <div className=" space-y-2 ">
                  <div className="">
                    <FormField
                      control={loginForm.control}
                      name="email"
                      render={({ field }) => {
                        return (
                          <>
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input type="email" {...field} />
                              </FormControl>
                              <FormMessage className=" text-red-500" />
                            </FormItem>
                          </>
                        );
                      }}
                    />
                  </div>
                  <div className="">
                    <FormField
                      control={loginForm.control}
                      name="password"
                      render={({ field }) => {
                        return (
                          <>
                            <FormItem>
                              <FormLabel>Password</FormLabel>
                              <FormControl>
                                <Input type="password" {...field} />
                              </FormControl>
                              <FormMessage className=" text-red-500" />
                            </FormItem>
                          </>
                        );
                      }}
                    />
                  </div>
                  <div className=" flex items-center justify-between">
                    {/* forgot password */}
                    {/* <div className="">
                      <a
                        className=" text-[12px] text-blue-600 cursor-pointer "
                        onClick={() => setAuthState("forgot")}
                      >
                        Forgot password?
                      </a>
                    </div> */}
                    <div className=" justify-end gap-2 flex items-center text-[12px]">
                      <span>If you don't have acc?</span>
                      <a
                        className=" cursor-pointer underline text-red-500"
                        onClick={() => setAuthState("register")}
                      >
                        Register
                      </a>
                    </div>
                  </div>
                  <div className=" text-end">
                    <Button
                      style={{ borderRadius: 5 }}
                      size={"sm"}
                      type="submit"
                      className=" px-5 hover:bg-red-700  text-white bg-red-600 py-2 "
                    >
                      Login
                    </Button>
                  </div>
                </div>
              </form>
            </Form>
          )}

          {authState === "register" && <Register setAuthState={setAuthState} />}

          {authState === "forgot" && (
            <ForgotPassword setAuthState={setAuthState} />
          )}
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default Auth;
