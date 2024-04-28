import accountApiRequest from '@/apiRequests/account'
import { cookies } from 'next/headers'
import React from 'react'
import type { Metadata } from 'next'
import ProfileForm from './profile-form'

export const metadata: Metadata = {
  title: 'Hồ sơ người dùng'
}
export default async function MePage() {
  const cookieStore = cookies()
  const sessionToken = cookieStore.get('sessionToken')
  const result = await accountApiRequest.me(sessionToken?.value ?? '')

  return (
    <div className='mt-3'>
      <h1 className='scroll-m-20 text-3xl font-bold tracking-tight'>Profile</h1>
      <ProfileForm profile={result.payload.data} />
    </div>
  )
}
