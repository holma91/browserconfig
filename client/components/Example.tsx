import { Fragment } from 'react';
import { Menu, Popover, Transition } from '@headlessui/react';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function Example() {
  return (
    <div className="py-6">
      <div className="top-10 mx-auto max-w-3xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-8 lg:px-8">
        <div className="col-span-9 xl:col-span-8 overflow-y-scroll">
          {/* Your content */}
          {[...new Array(350)].map((a) => (
            <p key={a}>ya</p>
          ))}
        </div>
        <div className="col-span-3 lg:col-span-4 block ">
          <div className="sticky space-y-4 top-24">
            {/* Your content */}

            {[...new Array(15)].map((a) => (
              <p key={a}>ey</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
