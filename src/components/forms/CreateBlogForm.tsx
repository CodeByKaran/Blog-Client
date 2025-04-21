"use client";
import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "title must be at least 2 characters.",
  }),
  description: z.string().min(20, {
    message: "description must be at least 20 characters.",
  }),
  content: z.string().min(50, {
    message: "content must be at least 50 characters.",
  }),
  images: z.string(),
  tags: z.string().min(4, {
    message: "tags must be at least 4 characters.",
  }),
});

const CreateBlogForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      content: "",
      images: "",
      tags: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pt-9">
        {/* Title Field */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Title <span className="text-xs text-red-400/45">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Coding Ui Problems" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description Field */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Description <span className="text-xs text-red-400/45">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="talking about ui flex, grid learning curves.."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Content Field */}
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Content <span className="text-xs text-red-400/45">*</span>
              </FormLabel>
              <FormControl>
                <textarea
                  placeholder="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore alias necessitatibus eveniet optio. Assumenda voluptas dignissimos, suscipit a adipisci placeat!"
                  {...field}
                  className="w-full resize-none rounded-md border p-2 outline-none focus-within:border-gray-500/50"
                  rows={6}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Images Field */}
        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Images{" "}
                <span className="text-xs text-gray-400/45">optional</span>
              </FormLabel>
              <FormControl>
                <Input type="file" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Tags Field */}
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Tags <span className="text-xs text-red-400/45">*</span>
              </FormLabel>
              <FormControl>
                <Input type="text" placeholder="react, ui, design" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex w-full justify-center">
          <Button type="submit" className="mx-auto my-9 w-1/2">
            Publish
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateBlogForm;
