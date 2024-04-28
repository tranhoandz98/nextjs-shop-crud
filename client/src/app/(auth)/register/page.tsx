import RegisterForm from '@/app/(auth)/register/register-form'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Đăng ký'
}

export default function RegisterPage() {

  return (
    <div className='mt-3'>
      <h1 className='scroll-m-20 text-3xl font-bold tracking-tight text-center'>Đăng ký</h1>
      <div className='flex justify-center'>
      <RegisterForm />
      </div>
    </div>
  );
}
