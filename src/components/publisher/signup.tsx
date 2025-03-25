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
import axios from "axios";

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
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const [country, setCountry] = useState("");

  const onSubmit = async (data: FormData) => {
    const abc = {
      login: data.login,
      fullName: data.fullName,
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
    

    const publisherpost = axios.post(
      "https://panel.adsaro.com/admin/api/Publisher/?version=4&userToken=1wDtEkEz2ykyOdyx",
      abc,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    console.log("publisherpost",publisherpost)

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
    data.country = country;
    console.log(data);
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
              <a href="#" className="underline underline-offset-4">
                Log in
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
