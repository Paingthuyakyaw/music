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
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
  email: z.string().email(),
});

const ForgotPassword = ({
  setAuthState,
}: {
  setAuthState: React.Dispatch<
    React.SetStateAction<"login" | "register" | "forgot" | "reset">
  >;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  return (
    <Form {...form}>
      <h4 className=" font-bold">Create Your Account</h4>
      <form onSubmit={form.handleSubmit((value) => console.log(value))}>
        <div className="  gap-4 ">
          <div className="">
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

          <div className=" mt-5 text-end">
            <Button
              onClick={() => setAuthState("reset")}
              style={{ borderRadius: 5 }}
              size={"sm"}
              type="submit"
              className=" px-5 hover:bg-red-700  text-white bg-red-600 py-2 "
            >
              Forgot Password
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default ForgotPassword;
