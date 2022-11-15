import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { Switch } from '@headlessui/react';
import { Web3Storage } from 'web3.storage';

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

const preferencesValues = [
  {
    title: 'Popups',
    description:
      'Let websites know if you accept popups, or if you want them gone',
    exceptionsDefault: 'facebook.com, google.com',
    key: 'popUps',
  },
  {
    title: 'Dark Mode',
    description: 'Do you prefer your websites to have dark mode on?.',
    exceptionsDefault: '',
    key: 'darkMode',
  },
  {
    title: 'Session Cookies',
    description: 'Do you accept the usage of session cookies?',
    exceptionsDefault: '',
    key: 'sessionCookies',
  },
  {
    title: 'Persistent Cookies',
    description: 'Do you accept the usage of persistent cookies?',
    exceptionsDefault: '',
    key: 'persistentCookies',
  },
  {
    title: 'Third Party Cookies',
    description: 'Do you accept the usage of persistent third party cookies?',
    exceptionsDefault: '',
    key: 'thirdPartyCookies',
  },
];

export default function Form({
  register,
  preferences,
  changePreferencesToggle,
  changePreferencesExceptions,
  onImageUpload,
  avatar,
}: {
  register: any;
  preferences: any;
  changePreferencesToggle: any;
  changePreferencesExceptions: any;
  onImageUpload: any;
  avatar: string;
}) {
  const [showProfile, setShowProfile] = useState(true);
  const [showPersonal, setShowPersonal] = useState(true);
  const [showPreferences, setShowPreferences] = useState(true);

  return (
    <form className="space-y-8 divide-y divide-gray-200">
      <div className="space-y-8 divide-y divide-gray-200">
        <div>
          <div>
            <h3
              className="text-lg font-medium leading-6 text-gray-900 flex gap-2 cursor-pointer"
              onClick={() => setShowProfile(!showProfile)}
            >
              {showProfile ? (
                <ChevronDownIcon className="h-6" />
              ) : (
                <ChevronRightIcon className="h-6" />
              )}
              <span>Profile</span>
            </h3>
          </div>
          {showProfile && (
            <div className="mt-6 grid grid-cols-2 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="col-span-6">
                <div className="sm:col-span-6">
                  <label
                    htmlFor="photo"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Avatar
                  </label>
                  <div className="flex gap-4 items-center">
                    <div className="mt-1 flex items-center">
                      <span className="h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                        {avatar ? (
                          <img src={avatar} alt=""></img>
                        ) : (
                          <svg
                            className="h-full w-full text-gray-300"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                        )}
                      </span>
                    </div>
                    <input
                      type="file"
                      accept=".jpg, .jpeg, .png"
                      className=""
                      onChange={onImageUpload}
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-6 grid grid-cols-6 gap-6 items-center">
                <div className="col-span-6">
                  <label
                    htmlFor="displayName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Display name
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <input
                      {...register('displayName')}
                      type="text"
                      name="displayName"
                      id="displayName"
                      autoComplete="displayName"
                      className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-6 flex flex-col gap-2">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Social
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="mt-1 flex rounded-md shadow-sm col-span-1">
                    <span className="inline-flex gap-2 items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
                      <img src="/twitter.png" alt="" className="h-5" />{' '}
                      <span>twitter @</span>{' '}
                    </span>
                    <input
                      {...register('twitter')}
                      type="text"
                      name="twitter"
                      id="twitter"
                      autoComplete="twitter"
                      className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div className="mt-1 flex rounded-md shadow-sm col-span-1">
                    <span className="inline-flex gap-2 items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
                      <img src="/github.png" alt="" className="h-5" />{' '}
                      <span>github @</span>
                    </span>
                    <input
                      {...register('github')}
                      type="text"
                      name="github"
                      id="github"
                      autoComplete="github"
                      className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div className="mt-1 flex rounded-md shadow-sm col-span-1">
                    <span className="inline-flex gap-2 items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
                      <img src="/reddit.png" alt="" className="h-5" />{' '}
                      <span>reddit @</span>
                    </span>
                    <input
                      {...register('reddit')}
                      type="text"
                      name="reddit"
                      id="reddit"
                      autoComplete="reddit"
                      className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div className="mt-1 flex rounded-md shadow-sm col-span-1">
                    <span className="inline-flex gap-2 items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
                      <img src="/ens.svg" alt="" className="h-5" />{' '}
                      <span>ENS @</span>
                    </span>
                    <input
                      {...register('ens')}
                      type="text"
                      name="ens"
                      id="ens"
                      autoComplete="ens"
                      className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="pt-8">
            <div>
              <h3
                className="text-lg font-medium leading-6 text-gray-900 flex gap-2 cursor-pointer"
                onClick={() => setShowPersonal(!showPersonal)}
              >
                {showPersonal ? (
                  <ChevronDownIcon className="h-6" />
                ) : (
                  <ChevronRightIcon className="h-6" />
                )}
                <span>Personal Information</span>
              </h3>
            </div>
            {showPersonal && (
              <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First name
                  </label>
                  <div className="mt-1">
                    <input
                      {...register('firstName')}
                      type="text"
                      name="firstName"
                      id="firstName"
                      autoComplete="given-name"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last name
                  </label>
                  <div className="mt-1">
                    <input
                      {...register('lastName')}
                      type="text"
                      name="lastName"
                      id="lastName"
                      autoComplete="family-name"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      {...register('email')}
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="number"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone number
                  </label>
                  <div className="mt-1">
                    <input
                      {...register('number')}
                      type="text"
                      name="number"
                      id="number"
                      autoComplete="number"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="pt-8">
            <div>
              <h3
                className="text-lg font-medium leading-6 text-gray-900 flex gap-2 cursor-pointer"
                onClick={() => setShowPreferences(!showPreferences)}
              >
                {showPreferences ? (
                  <ChevronDownIcon className="h-6" />
                ) : (
                  <ChevronRightIcon className="h-6" />
                )}
                <span>Preferences</span>
              </h3>
            </div>
            {showPreferences && (
              <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                {preferencesValues.map((pref) => (
                  <div
                    key={pref.key}
                    className=" border p-4 rounded-md col-span-6 flex flex-col gap-2"
                  >
                    <Switch.Group
                      as="div"
                      className="flex items-center justify-between col-span-6"
                    >
                      <span className="flex flex-grow flex-col">
                        <Switch.Label
                          as="span"
                          className="text-sm font-medium text-gray-900"
                          passive
                        >
                          {pref.title}
                        </Switch.Label>
                        <Switch.Description
                          as="span"
                          className="text-sm text-gray-500"
                        >
                          {pref.description}
                        </Switch.Description>
                      </span>
                      <Switch
                        checked={preferences[pref.key].allow}
                        onChange={() => changePreferencesToggle(pref.key)}
                        className={classNames(
                          preferences[pref.key].allow
                            ? 'bg-indigo-600'
                            : 'bg-gray-200',
                          'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                        )}
                      >
                        <span
                          aria-hidden="true"
                          className={classNames(
                            preferences[pref.key].allow
                              ? 'translate-x-5'
                              : 'translate-x-0',
                            'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                          )}
                        />
                      </Switch>
                    </Switch.Group>
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Exceptions
                      </label>
                      <div className="mt-2">
                        <input
                          onChange={(e: any) =>
                            changePreferencesExceptions(e, pref.key)
                          }
                          value={preferences[pref.key].exceptions}
                          placeholder={pref.exceptionsDefault}
                          type="text"
                          name="first-name"
                          id="first-name"
                          autoComplete="given-name"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
