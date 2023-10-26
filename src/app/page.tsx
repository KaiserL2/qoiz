"use client"
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useRouter } from 'next/navigation'

const FormSchema = z.object({
  category: z
    .string({
      required_error: "Please select an category to display.",
    })
})

export default function Home() {


  const router = useRouter()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("ok")
    router.push(`/domande/0?category=${data.category}`)
  }


  return (
    <div className='h-screen w-screen grid items-center justify-center'>

        <Card className='m-auto flex-1 w-[400px] border-[2px] border-black'>

        <CardHeader>
          <CardTitle className='text-6xl text-green-300'>QUOIZ</CardTitle>
        </CardHeader>
        <CardContent className='flex flex-col gap-4'>
           <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField control={form.control} name='category' render={({field})=>(
                    <FormItem>
                      <FormLabel>Scegli una categoria</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Scegli una categoria" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                          <SelectItem  value="0">Tech</SelectItem>
                          <SelectItem value="1">Cultura generale</SelectItem>
                          <SelectItem value="2">Ai</SelectItem>
                          <SelectItem value="3">Lingue</SelectItem>
                          <SelectItem value="4">Capitali</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage  />
                    </FormItem>
                )}/>
                <Button className='w-full bg-white border-[2px] mt-4 border-black hover:bg-black hover:text-white transition-colors duration-500 text-black font-semibold'>Enter</Button>
              </form>
           </Form>

        </CardContent>






      </Card>

    </div>
  )
}
