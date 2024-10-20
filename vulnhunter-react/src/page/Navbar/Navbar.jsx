import { Button } from '@/components/ui/button'
import { DragHandleHorizontalIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons'
import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import Sidebar from './Sidebar'
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useSelector } from 'react-redux'

const Navbar = () => {
    // Directly select the 'auth' slice of the state
    const auth = useSelector(state => state.auth);

    return (
        <div className='px-2 py-3 border-b z-50 bg-background bg-opacity-0 sticky top-0 left-0 right-0 flex justify-between items-center'>
            <div className='flex items-center gap-3'>
                <Sheet>
                    <SheetTrigger>
                        <Button variant="ghost" size="icon" className="rounded-full h-11 w-11">
                            <DragHandleHorizontalIcon className='h-7 w-7'/>
                        </Button>
                    </SheetTrigger>
                    <SheetContent className="w-72 border-r-0 flex-col justify-center" side="left">
                        <SheetHeader>
                            <SheetTitle className="text-2xl gap-1 font-bold">VulnHunter</SheetTitle>
                        </SheetHeader>
                        <Sidebar/>
                    </SheetContent>
                </Sheet>
                <p className='text-sm lg:text-base cursor-pointer'>
                    VulnHunter
                </p>
            </div>
            <div className='mr-5'>
                <Avatar>
                    <AvatarFallback>
                        {auth.user?.name[0].toUpperCase()}
                        {auth.user?.lastName[0].toUpperCase()}
                    </AvatarFallback>
                </Avatar>
            </div>
        </div>
    );
}

export default Navbar
