import { XCircleIcon } from '@heroicons/react/20/solid'

export default function ErrorAlert({ title, description, closeAction }: { title: string, description: string, closeAction: any }) {
    return (
        <div className="rounded-md bg-red-50 p-4 mt-8 mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="flex">
                <div className="flex-shrink-0">
                    <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                </div>
                <div className="ml-3" style={{ wordWrap: 'break-word', overflow: 'hidden' }}>
                    <h3 className="text-sm font-medium text-red-800">{title + ":"}</h3>
                    <div className="mt-2 text-sm text-red-700">
                        {description}
                    </div>
                    <button
                            type="button"
                            className="mt-5 rounded-md bg-red-100 px-2 py-1.5 text-sm font-medium text-red-800 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-50"
                            onClick={closeAction}
                        >
                            Close
                        </button>                    
                </div>
            </div>
        </div>
    )
}
