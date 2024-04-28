'use client'

import accountApiRequest from "@/apiRequests/account";
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
import { toast } from "@/components/ui/use-toast";
import { handleErrorApi } from "@/lib/utils";
import {
  AccountResType,
  UpdateMeBody,
  UpdateMeBodyType,
} from "@/schemaValidations/account.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

type Profile = AccountResType["data"];

type Props = {
  profile: Profile;
};

export default function ProfileForm({ profile }: Props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter()

  const form = useForm<UpdateMeBodyType>({
    resolver: zodResolver(UpdateMeBody),
    defaultValues: {
      name: profile.name,
    },
  });

  const onSubmit = async (values: UpdateMeBodyType)=>{
    if (loading) return
    setLoading(true);
     try {
      const result = await accountApiRequest.updateMe(values)
      toast({
        description: result.payload.message
      })
      router.refresh()
    } catch (error:any) {
        handleErrorApi({
            error,
            setError: form.setError,
          });
    } finally {
        setLoading(false);
    }
  }

  return (
    <div>
      <Form {...form}>
        <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-2 max-w-[600 px] flex-shrink-0 w-full'
        noValidate
        >
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input
              placeholder="email"
              type="email"
              value={profile.email}
              readOnly
            />
          </FormControl>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên</FormLabel>
                <FormControl>
                  <Input placeholder="Tên" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="!mt-8 w-full">
            Cập nhật
          </Button>
        </form>
      </Form>
    </div>
  );
}
