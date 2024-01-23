'use client'

import Image from 'next/image'
import { useUser } from '@clerk/clerk-react'
import { PlusCircle } from 'lucide-react'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'

import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

const DocumentsPage = () => {
  const { user } = useUser()
  const create = useMutation(api.documents.create)

  const onCreate = () => {
    const promise = create({ title: 'Untitled' })

    toast.promise(promise, {
      loading: 'Buat note baru...',
      success: 'Note baru terbuat!',
      error: 'Gagal Membuat note baru.',
    })
  }

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <Image
        src={'/empty.png'}
        alt="empty"
        height={300}
        width={300}
        className="dark:hidden"
      />
      <Image
        src={'/empty-dark.png'}
        alt="empty"
        height={300}
        width={300}
        className="hidden dark:block"
      />
      <h2 className="text-lg font-medium">
        Selamat Datang {user?.firstName} di Notion
      </h2>
      <Button onClick={onCreate}>
        <PlusCircle className="h-4 w-4 mr-2" />
        Buat note
      </Button>
    </div>
  )
}
export default DocumentsPage
