import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

export default function Header() {
  return (
    <div className="border-b sticky top-0 z-50 bg-white">
      <div className="mx-auto max-w-screen-2xl px-2 sm:px-4 lg:divide-y lg:divide-gray-200 lg:px-8">
        <div className="relative flex h-16 justify-between">
          <div className="relative z-10 flex px-2 lg:px-0">
            <div className="flex flex-shrink-0 gap-2 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-7 h-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
                />
              </svg>

              <span className="text-xl font-medium">browserconfig.xyz</span>
            </div>
          </div>
          <div className="hidden md:flex z-0 flex-1 items-center justify-center px-2 sm:absolute sm:inset-0"></div>
          <div className=" relative z-10 ml-4 flex items-center">
            <a
              href="https://www.npmjs.com/package/browserconfig.xyz"
              target="_blank"
              rel="noreferrer"
              className="ml-8 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-1.5 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              <span>NPM</span>
              <ArrowTopRightOnSquareIcon className="h-5 w-5 text-white" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
