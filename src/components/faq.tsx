'use client';

import { useTemplate } from "@/providers/DynamicTemplate";
import { IFaq } from "@/types/promotion";
import { Disclosure } from '@headlessui/react'
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline'

const faqs = [


    {
        question: "Is this an NFT?",
        answer:
            "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
    },
    {
        question: "What's the best thing about Switzerland?",
        answer:
            "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
    }
    // More questions...
]


export default function Faq({faqs}:{faqs : IFaq[]}) {
    const { template } = useTemplate();

    return (
        <div>
            <div className="mx-auto max-w-7xl py-24 sm:py-32 lg:py-40">
                <div className="mx-auto max-w-4xl divide-y" style={{ borderColor: `${template.primaryColor}` }}>
                    <h2 className="text-2xl font-bold leading-10 tracking-tight flex justify-center" style={{ color: `${template.primaryColor}` }}>Frequently asked questions</h2>
                    <dl className="mt-10 space-y-6 divide-y ">
                        {faqs.map((faq) => (
                            <Disclosure as="div" key={faq.question} className="pt-6">
                                {({ open }) => (
                                    <>
                                        <dt>
                                            <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                                                <span className="text-base font-semibold leading-7" style={{ color: `${template.fontColor}` }}>{faq.question}</span>
                                                <span className="ml-6 flex h-7 items-center">
                                                    {open ? (
                                                        <MinusSmallIcon className="h-6 w-6" aria-hidden="true" style={{ color: `${template.fontColor}` }} />
                                                    ) : (
                                                        <PlusSmallIcon className="h-6 w-6" aria-hidden="true" style={{ color: `${template.primaryColor}` }} />
                                                    )}
                                                </span>
                                            </Disclosure.Button>
                                        </dt>
                                        <Disclosure.Panel as="dd" className="mt-2 pr-12">
                                            <p className="text-base leading-7" style={{ color: `${template.fontColor}` }}>{faq.response}</p>
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    )
}
