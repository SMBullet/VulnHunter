import { login } from '@/State/Auth/Action';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useNavigate } from 'react-router-dom';

const SigninForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const form = useForm({
        resolver: "",  // Add appropriate resolver if needed
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (data) => {
        dispatch(login({ data, navigate }));
        console.log(data);
    };

    return (
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg max-w-md mx-auto h-full flex flex-col justify-center">
            <h1 className='text-2xl font-bold text-center text-white mb-4'>Login</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-white">Email</FormLabel>
                                <FormControl>
                                    <Input
                                        className="border border-gray-600 bg-gray-800 text-gray-100 p-3 rounded-md w-full"
                                        placeholder="email@example.com"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
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
                    <Button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                        Submit
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default SigninForm;
