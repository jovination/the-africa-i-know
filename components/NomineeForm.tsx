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
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"

const formSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters.")
    .max(50, "Name must be at most 50 characters."),
  email: z
    .string()
    .email("Please enter a valid email address."),
  subject: z
    .string()
    .optional(),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters.")
    .max(500, "Message must be at most 500 characters."),
})

export default function NomineeForm(){
    return(
        <div className="w-full ">
            <div className="md:p-10">
                <Card className="w-full rounded-3xl">
                    <CardHeader>
                        <CardTitle>Nominate a Builder</CardTitle>
                        <CardDescription>
                        Know an everyday builder who deserves to be celebrated?
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <NomineeFormComponent />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

function NomineeFormComponent() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      // Use FormData instead of URLSearchParams for better compatibility
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('subject', data.subject || '');
      formData.append('message', data.message);

      await fetch(
        'https://script.google.com/macros/s/AKfycbxUh03v75-jyHm-KUPVO20cQnzvuJ4ttRiUlabtIWzkku4IqiHxVqENmS7D7ltulfZHnw/exec',
        {
          method: 'POST',
          body: formData,
          mode: 'no-cors', // This is critical for Google Scripts
        }
      );

      // Because 'no-cors' returns an opaque response, 
      // we manually trigger success if fetch doesn't throw.
      toast("Nomination submitted successfully!", {
        description: "Thank you for nominating an Everyday Builder. Your submission has been received.",
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
      console.error("Submission error:", error);
      toast("Could not submit nomination", {
        description: "There was an error submitting your nomination. Please check your connection and try again.",
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
      <form id="nominee-form" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-name">
                  Your Name(required)
                </FieldLabel>
                <Input
                  {...field}
                  id="form-name"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your full name"
                  autoComplete="name"
                  className="h-13"
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
                <FieldLabel htmlFor="form-email">
                 Your Email Address
                </FieldLabel>
                <Input
                  {...field}
                  id="form-email"
                  type="email"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your email"
                  autoComplete="email"
                  className="h-13"

                  
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          </div>
          <Controller
            name="subject"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-subject">
                  Subject
                </FieldLabel>
                <Input
                  {...field}
                  id="form-subject"
                  aria-invalid={fieldState.invalid}
                  placeholder="Nominating an Everyday Builder or Builder Spotlight [City/Country]"
                  className="h-13"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="message"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-message">
                  Your Message
                </FieldLabel>
                <InputGroup>
                  <InputGroupTextarea
                    {...field}
                    id="form-message"
                    placeholder="| Eg.I want to nominate Grace Mwangi from Nairobi. She runs a small urban farm that feeds 200 families weekly and trains young women in sustainable agriculture. She does it quietly, with no funding or fanfare — just pure dedication. She is the Africa I Know."
                    rows={6}
                    className="min-h-24 "
                    aria-invalid={fieldState.invalid}

                  />
                  <InputGroupAddon align="block-end">
                    <InputGroupText className="tabular-nums">
                      {field.value.length}/500 characters
                    </InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </form>
      <CardFooter>
        <Button 
          type="submit" 
          form="nominee-form" 
          className="w-fit mt-10 h-13 px-6"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Submitting...
            </div>
          ) : (
            "Nominate Now!"
          )}
        </Button>
      </CardFooter>
    </>
  )
}
