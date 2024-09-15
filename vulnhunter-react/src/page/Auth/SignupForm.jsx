import React from 'react';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select'; // Import Select components
import { useDispatch } from 'react-redux';
import { register } from '@/State/Auth/Action';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';

// Define validation schema with Zod
const formSchema = z.object({
    name: z.string().nonempty("Name is required"),
    lastName: z.string().nonempty("Last name is required"),
    title: z.string().nonempty("Title is required"), // Add title validation
    phone: z.string()
        .regex(/^0\d{9}$/, "Phone number must be in the format '0123456789' (10 digits starting with 0)"),
    email: z.string().email("Invalid email format"),
    password: z.string()
        .min(8, "Password must be at least 8 characters long")
        .max(100, "Password cannot exceed 100 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[@$!%*?&#]/, "Password must contain at least one special character")
        .regex(/^(?!.*\s).+$/, "Password cannot contain spaces"),
    confirmPassword: z.string()
        .nonempty("Confirm Password is required"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

const SignupForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            lastName: "",
            title: "",
            phone: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
    });

    const onSubmit = (data) => {
        const { confirmPassword, ...userData } = data; // Remove confirmPassword before dispatch
        dispatch(register(userData, navigate));
        console.log(data);
    };

    return (
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg max-w-md mx-auto h-full flex flex-col justify-center">
            <h1 className='text-2xl font-bold text-center text-white mb-4'>Register</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    {/* Name and Last Name Fields */}
                    <div className="flex space-x-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormLabel className="text-white">Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="border border-gray-600 bg-gray-800 text-gray-100 p-3 rounded-md"
                                            placeholder="John"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormLabel className="text-white">Last Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="border border-gray-600 bg-gray-800 text-gray-100 p-3 rounded-md"
                                            placeholder="Doe"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Title Field (Dropdown) */}
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-white">Title</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger className="border border-gray-600 bg-gray-800 text-gray-100 p-3 rounded-md w-full">
                                            <SelectValue placeholder="Select a title" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Software Developer">Software Developer</SelectItem>
                                            <SelectItem value="Cybersecurity Consultant">Cybersecurity Consultant</SelectItem>
                                            <SelectItem value="Data Analyst">Data Analyst</SelectItem>
                                            <SelectItem value="Project Manager">Project Manager</SelectItem>
                                            <SelectItem value="DevOps Engineer">DevOps Engineer</SelectItem>
                                            {/* Add more options as needed */}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Phone and Email Fields */}
                    <div className="flex space-x-4">
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormLabel className="text-white">Phone</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="border border-gray-600 bg-gray-800 text-gray-100 p-3 rounded-md"
                                            placeholder="0123456789"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormLabel className="text-white">Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="border border-gray-600 bg-gray-800 text-gray-100 p-3 rounded-md"
                                            placeholder="email@example.com"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Password and Confirm Password Fields */}
                    <div className="flex flex-col space-y-4">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-white">Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="border border-gray-600 bg-gray-800 text-gray-100 p-3 rounded-md w-full"
                                            type="password"
                                            placeholder="************"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-white">Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="border border-gray-600 bg-gray-800 text-gray-100 p-3 rounded-md w-full"
                                            type="password"
                                            placeholder="************"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="text-xs text-gray-400 mt-2">
                            Password must be at least 8 characters long and include:
                            <ul className="list-disc ml-5 mt-1">
                                <li>At least one uppercase letter</li>
                                <li>At least one lowercase letter</li>
                                <li>At least one number</li>
                                <li>At least one special character (e.g., @$!%*?&#)</li>
                                <li>No spaces</li>
                            </ul>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <Button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                        Register
                    </Button>
                </form>
            </Form>
        </div>
    );
}

export default SignupForm;