import { Navbar } from '@/components/navbar'
import React from 'react'
import Link from 'next/link'
const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Navbar />
            <main className="mx-auto">
                {children}
            </main>
            {/* <footer className="w-full flex items-center justify-center py-3">
                <Link
                    className="flex items-center gap-1 text-current"
                    href="https://heroui.com?utm_source=next-app-template"
                    title="heroui.com homepage"
                >
                    <span className="text-default-600">Powered by</span>
                    <p className="text-primary">HeroUI</p>
                </Link>
            </footer> */}
        </>
    )
}

export default layout
