'use client'

import { Id } from '@/convex/_generated/dataModel'

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/clerk-react'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { toast } from 'sonner'
import { MoreHorizontal, Trash } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

interface MenuProps {
  documentId: Id<'documents'>
}

export const Menu = ({ documentId }: MenuProps) => {
  const router = useRouter()
  const { user } = useUser()
  const archived = useMutation(api.documents.archive)

  const onArchived = () => {
    const promise = archived({ id: documentId })

    toast.promise(promise, {
      loading: 'Pindah ke tempat sampah...',
      success: 'Note telah pindah ke tempat sampah!',
      error: 'Note gagal pidah ke tempat sampah',
    })

    router.push('/documents')
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={'sm'} variant={'ghost'}>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-60"
        align="end"
        alignOffset={8}
        forceMount
      >
        <DropdownMenuItem onClick={onArchived}>
          <Trash className="w-4 h-4 mr-2" />
          Hapus
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <div className="text-xs text-muted-foreground ps-2">
          terakhir diedit oleh: {user?.fullName}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

Menu.Skleton = function MenuSkeleton() {
  return <Skeleton className="w-10 h-10" />
}
