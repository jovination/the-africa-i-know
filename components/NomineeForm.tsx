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
            <div className="p-10">
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
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    toast("Nomination submitted successfully!", {
      description: (
        <pre className="mt-2 w-[320px] overflow-x-auto rounded-md bg-code p-4 text-code-foreground">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      position: "bottom-right",
      classNames: {
        content: "flex flex-col gap-2",
      },
      style: {
        "--border-radius": "calc(var(--radius)  + 4px)",
      } as React.CSSProperties,
    })
  }

  return (
    <>
      <form id="nominee-form" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
            <div className="grid grid-cols-1 grid-cols-2 gap-5">
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
                  className="h-11"
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
                  className="h-11"

                  
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
                  className="h-11"
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
        <Button type="submit" form="nominee-form" className="w-fit mt-10 h-11 px-6">
Nominate Now!        
</Button>
      </CardFooter>
    </>
  )
}
