import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

export default function Big() {
  return (
    <div className="flex justify-center items-center h-96">
      <div className="relative flex justify-between">
        <div className="relative z-10 flex px-2 lg:px-0">
          <div className="flex flex-shrink-0 gap-4 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-16 h-16"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
              />
            </svg>

            <span className="text-4xl font-medium">browserconfig.xyz</span>
          </div>
        </div>
      </div>
    </div>
  );
}
