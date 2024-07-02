'use client';
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { ConnectWallet, darkTheme } from "@thirdweb-dev/react";
import { useTemplate } from '@/providers/DynamicTemplate';


export default function NavBar() {
    const [open, setOpen] = useState(false)
    const { template, setTemplate } = useTemplate();

    return (
        <>
            {/* Mobile menu */}
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-40 flex">
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                                <div className="flex px-4 pb-2 pt-5">
                                    <button
                                        type="button"
                                        className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                                        onClick={() => setOpen(false)}
                                    >
                                        <span className="sr-only">Close menu</span>
                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>

                                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                                    <ConnectWallet />
                                </div>

                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

            <header className="relative" style={{ 'backgroundColor': `${template.backgroundColor}` }}>
                <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div>
                        <div className="flex h-20 items-center justify-between">
                            <div className="flex flex-1 items-center lg:hidden">
                                <button
                                    type="button"
                                    className="-ml-2 rounded-md bg-white p-2 text-gray-400"
                                    onClick={() => setOpen(true)}
                                >
                                    <span className="sr-only">Open menu</span>
                                    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                                </button>
                            </div>

                            {/* Logo */}
                            <a href="#" className="flex">
                                <span className="sr-only">LowCoding</span>
                                <img
                                    className="h-14 w-auto object-contain"
                                    src={template.navbarLogo}
                                    alt="Brand Logo"
                                />
                            </a>
                            {/* Left Section */}
                            <div className="hidden lg:block lg:flex-1 lg:self-stretch">
                            </div>
                            {/* Right Section */}
                            <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end">
                                <ConnectWallet
                                    theme={darkTheme({
                                        colors: {
                                            primaryButtonBg: template.primaryColor,
                                            primaryButtonText: '#000000',
                                            accentText: template.primaryColor,
                                            accentButtonBg: template.primaryColor,
                                            modalBg: template.backgroundColor,
                                            dropdownBg: template.backgroundColor,
                                            borderColor: template.primaryColor,
                                            separatorLine: template.primaryColor,
                                            primaryText: template.fontColor,                                          
                                        },
                                    })}
                                    switchToActiveChain={true}
                                    btnTitle={"Connect"}
                                    modalTitle={"Connect your Account"}
                                    modalSize={"compact"}
                                    modalTitleIconUrl={
                                        "https://prezanospace.sfo3.cdn.digitaloceanspaces.com/lowcoding/LC-Stickers-03.png"
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    )
}
