import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

export default function Header() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:divide-y lg:divide-gray-200 lg:px-8 border-b">
        <div className="relative flex h-16 justify-between">
          <div className="relative z-10 flex px-2 lg:px-0">
            <div className="flex flex-shrink-0 items-center">
              <span className="text-xl font-medium">browserconfig.xyz</span>
            </div>
          </div>
          <div className="hidden md:flex z-0 flex-1 items-center justify-center px-2 sm:absolute sm:inset-0">
            <div className="w-full sm:max-w-xs">
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <MagnifyingGlassIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <input
                  id="search"
                  name="search"
                  className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-indigo-500 focus:text-gray-900 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Search config..."
                  type="search"
                />
              </div>
            </div>
          </div>
          <div className=" relative z-10 ml-4 flex items-center">
            <a
              href="#"
              className="ml-8 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-1.5 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              <span>NPM</span>
              <ArrowTopRightOnSquareIcon className="h-5 w-5 text-white" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
