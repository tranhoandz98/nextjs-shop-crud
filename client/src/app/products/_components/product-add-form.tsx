"use client";
import productApiRequest from "@/apiRequests/product";
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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import envConfig from "@/config";
import { routerMain } from "@/constants/router-main";
import { handleErrorApi } from "@/lib/utils";
import {
  CreateProductBody,
  CreateProductBodyType,
  ProductResType,
  UpdateProductBodyType,
} from "@/schemaValidations/product.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";

type Product = ProductResType["data"];

type Props = {
  product?: Product;
};
const ProductAddForm =({ product }: Props) =>{
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const form = useForm<CreateProductBodyType>({
    resolver: zodResolver(CreateProductBody),
    defaultValues: {
      name: product?.name ?? "",
      price: product?.price ?? 0,
      description: product?.description ?? "",
      image: product?.image ?? "",
    },
  });

  
  const image = form.watch('image')

  const createProduct = async (values: CreateProductBodyType) => {
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('file', file as Blob)
      const uploadImageResult = await productApiRequest.uploadImage(formData)
      const imageUrl = uploadImageResult.payload.data
      const result = await productApiRequest.create({
        ...values,
        image: imageUrl
      })

      toast({
        description: result.payload.message
      })
      router.push(routerMain.PRODUCTS)
      router.refresh()
    } catch (error: any) {
      handleErrorApi({
        error,
        setError: form.setError
      })
    } finally {
      setLoading(false)
    }
  }

  const updateProduct = async (_values: UpdateProductBodyType) => {
    if (!product) return
    setLoading(true)
    let values = _values
    try {
      if (file) {
        const formData = new FormData()
        formData.append('file', file as Blob)
        const uploadImageResult = await productApiRequest.uploadImage(formData)
        const imageUrl = uploadImageResult.payload.data
        values = {
          ...values,
          image: imageUrl
        }
      }

      const result = await productApiRequest.update(product.id, values)
      toast({
        description: result.payload.message
      })
      router.push(routerMain.PRODUCTS)
      router.refresh()
    } catch (error: any) {
      handleErrorApi({
        error,
        setError: form.setError
      })
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async (values: CreateProductBodyType) => {
    if (loading) return
    if (product) {
      await updateProduct(values)
    } else {
      await createProduct(values)
    }
  };

  const onChangeUploadFile =(e: React.ChangeEvent<HTMLInputElement>)=>{

  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, (error) => {
          console.warn(error);
        })}
        className="space-y-2 max-w-[600px] mx-auto flex-shrink-0 w-full"
        noValidate
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên</FormLabel>
              <FormControl>
                <Input placeholder="tên" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Giá</FormLabel>
              <FormControl>
                <Input placeholder="Giá" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mô tả</FormLabel>
              <FormControl>
                <Textarea placeholder='mô tả' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hình ảnh</FormLabel>
              <FormControl>
                <Input type="file" accept="image/*" ref={inputRef} 
                onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      setFile(file)
                      field.onChange(envConfig.NEXT_PUBLIC_URL+'/' + file.name)
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {(file || image) && (
          <div>
            <Image
              src={file ? URL.createObjectURL(file) : image}
              width={128}
              height={128}
              alt='preview'
              className='w-32 h-32 object-cover'
            />
            <Button
              type='button'
              variant={'destructive'}
              size={'sm'}
              onClick={() => {
                setFile(null)
                form.setValue('image', '')
                if (inputRef.current) {
                  inputRef.current.value = ''
                }
              }}
            >
              Xóa hình ảnh
            </Button>
          </div>
        )}
        <Button type="submit" className="!mt-8 w-full">
          {product?
        'Cập nhật'
        :
        'Thêm'
        }
        </Button>
      </form>
    </Form>
  );
}

export default ProductAddForm
