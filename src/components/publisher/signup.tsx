"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { Select } from "@/components/ui/select";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { useRouter } from "next/navigation";

type FormData = {
  login: string;
  fullName: string;
  email: string;
  password: string;
  password_repeat: string;
  website: string;
  websiteDescription: string;
  skype_id: string;
  phone: string;
  country: string;
  status: string;
};

export function PublisherSignup({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FormData>();

  const [country, setCountry] = useState("");
  const router = useRouter();
  const onSubmit = async (data: FormData) => {
    if (data.password !== data.password_repeat) {
      setError("password_repeat", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    }

    if (!country) {
      setError("country", {
        type: "manual",
        message: "Country is required",
      });
      return;
    }

    const abc = {
      login: data.login,
      name: data.fullName,
      email: data.email,
      password: data.password,
      password_repeat: data.password_repeat,
      website: data.website,
      website_descr: data.websiteDescription,
      skype_id: data.skype_id,
      phone: data.phone,
      address_country: data.country,
      status: "NEW",
    };

    try {
      const response = await fetch("/api/publishersignup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: abc,
        }),
      });
      const result = await response.json();

      console.log("aabiresult", result);
      if (result?.status == "Error") {
        console.log("object", result?.message);

        if (
          result?.message ==
          "Validation error: login=Duplicate entry is caused by this field value"
        ) {
          setError("login", {
            type: "custom",
            message: "Username Already Exists",
          });
        }
        if (
          result?.message ==
          "Validation error: email=Duplicate entry is caused by this field value"
        ) {
          setError("email", {
            type: "custom",
            message: "Email Already Exists",
          });
        }
        if (
          result?.message ==
          "Validation error: website=Must be a well-formed domain name"
        ) {
          setError("website", {
            type: "custom",
            message: "Website Must be a well-formed domain name",
          });
        }
      }
      if (result?.status == "OK") {
        router.push("/publisher/login");
      }
    } catch (err) {
      console.error("Error updating data", err);
    }
  };

  return (
    <div className={cn("", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription>Create your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              {/* Username + Full Name */}
              <div className="flex gap-4">
                <div className="grid w-1/2 gap-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    placeholder="username"
                    {...register("login", { required: "Username is required" })}
                  />
                  {errors.login && (
                    <p className="text-sm text-red-500">
                      {errors.login.message}
                    </p>
                  )}
                </div>
                <div className="grid w-1/2 gap-2">
                  <Label htmlFor="fullName">First and Last Name</Label>
                  <Input
                    id="fullName"
                    placeholder="First and Last Name"
                    {...register("fullName", {
                      required: "Full name is required",
                    })}
                  />
                  {errors.fullName && (
                    <p className="text-sm text-red-500">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Email + Phone */}
              <div className="flex gap-4">
                <div className="grid w-1/2 gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    {...register("email", { required: "Email is required" })}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="grid w-1/2 gap-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 234 567 890"
                    {...register("phone")}
                  />
                  {errors.phone && (
                    <p className="text-sm text-red-500">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Password + Confirm */}
              <div className="flex gap-4">
                <div className="grid w-1/2 gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters long",
                      },
                      pattern: {
                        value:
                          /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/,
                        message:
                          "Password must include one uppercase letter and one special character",
                      },
                    })}
                  />
                  {errors.password && (
                    <p className="text-sm text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <div className="grid w-1/2 gap-2">
                  <Label htmlFor="password_repeat">Confirm Password</Label>
                  <Input
                    id="password_repeat"
                    type="password"
                    {...register("password_repeat", {
                      required: "Please confirm password",
                      validate: (value) =>
                        value === getValues("password") ||
                        "Passwords do not match",
                    })}
                  />
                  {errors.password_repeat && (
                    <p className="text-sm text-red-500">
                      {errors.password_repeat.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Website + Description */}
              <div className="flex gap-4">
                <div className="grid w-1/2 gap-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    placeholder="https://yourwebsite.com"
                    {...register("website")}
                  />
                  {errors.website && (
                    <p className="text-sm text-red-500">
                      {errors.website.message}
                    </p>
                  )}
                </div>
                <div className="grid w-1/2 gap-2">
                  <Label htmlFor="websiteDescription">
                    Website Description
                  </Label>
                  <Textarea
                    id="websiteDescription"
                    placeholder="Brief description"
                    {...register("websiteDescription")}
                  />
                  {errors.websiteDescription && (
                    <p className="text-sm text-red-500">
                      {errors.websiteDescription.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Skype + Country */}
              <div className="flex gap-4">
                <div className="grid w-1/2 gap-2">
                  <Label htmlFor="skype">Skype</Label>
                  <Input
                    id="skype"
                    placeholder="Skype ID"
                    {...register("skype_id")}
                  />
                  {errors.skype_id && (
                    <p className="text-sm text-red-500">
                      {errors.skype_id.message}
                    </p>
                  )}
                </div>
                <div className="grid w-1/2 gap-2">
                  <Label htmlFor="country">Country</Label>
                  <Select
                    onValueChange={(val) => {
                      setCountry(val);
                      setValue("country", val);
                    }}
                    defaultValue=""
                  >
                    <SelectTrigger id="country">
                      <SelectValue placeholder="Select a country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="in">India</SelectItem>
                      <SelectItem value="au">Australia</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.country && (
                    <p className="text-sm text-red-500">
                      {errors.country.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Submit */}
              <Button type="submit" className="w-full">
                Sign Up
              </Button>
            </div>
            <div className="mt-4 text-sm text-center">
              Already have an account?{" "}
              <div
                onClick={() => router.push("/publisher/login")}
                className="underline cursor-pointer underline-offset-4"
              >
                Log in
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
