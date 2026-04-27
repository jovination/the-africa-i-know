"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters.")
    .max(50, "Name must be at most 50 characters."),
  email: z
    .string()
    .email("Please enter a valid email address."),
})

export default function JoinForm(){
    return(
        <div className="w-full  mx-auto">
            <Card className="w-full bg-transparent shadow-none">
                <CardHeader>
                    <CardTitle className="text-3xl text-white text-center font-semibold">Join The Movement</CardTitle>
                    <CardDescription className="text-sm text-center text-white">
Be part of the story. Subscribe to receive updates on new city films, podcast episodes, builder spotlights, and ways to contribute to the movement.                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <JoinFormComponent />
                </CardContent>
            </Card>
        </div>
    )
}

function JoinFormComponent() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      // Debug: Log the data being sent
      console.log('Submitting data:', { name: data.name, email: data.email });
      
      // Use FormData for Google Sheets integration
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('email', data.email);
      
      // Debug: Log FormData contents
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }

      await fetch(
        'https://script.google.com/macros/s/AKfycbwriNEJLrPAvKnWEEgWxoQ5pULelmo4ZGX97Kc5IJrKYfwe8BS7wjNZQKgYes4EAsAL/exec',
        {
          method: 'POST',
          body: formData,
          mode: 'no-cors', // This is critical for Google Scripts
        }
      );

      // Because 'no-cors' returns an opaque response, 
      // we manually trigger success if fetch doesn't throw.
      toast("Successfully joined!", {
        description: "Welcome to The Africa I Know community. You're now subscribed.",
        position: "bottom-right",
        classNames: {
          content: "flex flex-col gap-2",
        },
        style: {
          "--border-radius": "calc(var(--radius)  + 4px)",
        } as React.CSSProperties,
      });
      
      form.reset();
      
    } catch (error) {
      console.error("Subscription error:", error);
      toast("Could not subscribe", {
        description: "There was an error subscribing. Please check your connection and try again.",
        position: "bottom-right",
        classNames: {
          content: "flex flex-col gap-2",
        },
        style: {
          "--border-radius": "calc(var(--radius)  + 4px)",
        } as React.CSSProperties,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <form id="join-form" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="join-form-name" className="text-white">
                  Your Name
                </FieldLabel>
                <Input
                  {...field}
                  id="join-form-name"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your full name"
                  autoComplete="name"
                  className="h-11 bg-transparent border-white/10 text-white placeholder:text-gray-400"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="join-form-email" className="text-white">
                  Email Address
                </FieldLabel>
                <Input
                  {...field}
                  id="join-form-email"
                  type="email"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your email"
                  autoComplete="email"
                  className="h-11 bg-transparent border-white/10 text-white placeholder:text-gray-400"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </form>
      <CardFooter className="px-0 mt-10">
        <Button 
          type="submit" 
          form="join-form" 
          className="w-full h-11 bg-white text-black hover:bg-white  transition-colors duration-200 font-semibold"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
              Subscribing...
            </div>
          ) : (
            "Subscribe Now"
          )}
        </Button>
      </CardFooter>
    </>
  )
}