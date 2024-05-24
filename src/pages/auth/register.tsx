import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRegister } from "@/store/server/auth/mutation";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
  username: z.string().min(5),
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Password must contain at least 6 character(s) ",
  }),
  password_confirmation: z.string().min(6, {
    message: "Password must contain at least 6 character(s) ",
  }),
});

const Register = ({
  setAuthState,
}: {
  setAuthState: React.Dispatch<
    React.SetStateAction<"login" | "register" | "forgot" | "reset">
  >;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  });
  const register = useRegister();

  return (
    <Form {...form}>
      <h4 className=" font-bold">Create Your Account</h4>
      <form
        onSubmit={form.handleSubmit((value) =>
          register.mutate(value, {
            onSuccess: () => setAuthState("login"),
          })
        )}
      >
        <div className=" grid grid-cols-12 gap-4 ">
          <div className=" col-span-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => {
                return (
                  <>
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage className=" text-[12px] text-red-500" />
                    </FormItem>
                  </>
                );
              }}
            />
          </div>
          <div className=" col-span-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => {
                return (
                  <>
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
                      </FormControl>
                      <FormMessage className=" text-[12px] text-red-500" />
                    </FormItem>
                  </>
                );
              }}
            />
          </div>
          <div className=" col-span-6">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => {
                return (
                  <>
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage className=" text-[12px] text-red-500" />
                    </FormItem>
                  </>
                );
              }}
            />
          </div>
          <div className=" col-span-6">
            <FormField
              control={form.control}
              name="password_confirmation"
              render={({ field }) => {
                return (
                  <>
                    <FormItem>
                      <FormLabel>Password Confirm</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage className=" text-[12px] text-red-500" />
                    </FormItem>
                  </>
                );
              }}
            />
          </div>
          <div className=" col-span-12 flex items-center justify-end text-[12px]">
            <span>If you have acc?</span>
            <a
              onClick={() => setAuthState("login")}
              className=" cursor-pointer underline text-red-500"
            >
              Log in
            </a>
          </div>
          <div className=" text-end">
            <Button
              style={{ borderRadius: 5 }}
              size={"sm"}
              type="submit"
              className=" px-5 hover:bg-red-700  text-white bg-red-600 py-2 "
            >
              Create Account
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default Register;
