import Head from 'next/head';
import { Fragment, useState } from 'react';
import clsx from 'clsx';
import Tabs from '../components/Tabs';
import { PlusIcon as PlusIconMini } from '@heroicons/react/20/solid';
import Highlight, { defaultProps } from 'prism-react-renderer';
import dracula from 'prism-react-renderer/themes/dracula';
import nightOwl from 'prism-react-renderer/themes/nightOwl';
import palenight from 'prism-react-renderer/themes/palenight';
import Form from '../components/Form';
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
  displayName: string;
  avatar: string;
  twitter: string;
  github: string;
  reddit: string;
  ens: string;
  firstName: string;
  lastName: string;
  email: string;
  number: string;
};

const codeLanguage = 'javascript';

function TrafficLightsIcon(props: any) {
  return (
    <svg aria-hidden="true" viewBox="0 0 42 10" fill="none" {...props}>
      <circle cx="5" cy="5" r="4.5" />
      <circle cx="21" cy="5" r="4.5" />
      <circle cx="37" cy="5" r="4.5" />
    </svg>
  );
}

const tabs = [
  {
    name: 'mtwi...p46a',
    href: '#',
    current: false,
  },
  { name: 'qsfd...pp22', href: '#', current: false },
  { name: 'aqqs...fdg2', href: '#', current: false },
  { name: 'lksa...hyuu', href: '#', current: false },
  { name: 'fsdg...ffgq', href: '#', current: true },
  { name: 'bb12...ggsq', href: '#', current: false },
];

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

type PreferencesType = {
  popups: {
    allow: boolean;
    exceptions: string[];
  };
  darkMode: {
    allow: boolean;
    exceptions: string[];
  };
  sessionCookies: {
    allow: boolean;
    exceptions: string[];
  };
  persistentCookies: {
    allow: boolean;
    exceptions: string[];
  };
  thirdPartyCookies: {
    allow: boolean;
    exceptions: string[];
  };
};

const preferenceDefaults = {
  popups: {
    allow: true,
    exceptions: [],
  },
  darkMode: {
    allow: false,
    exceptions: [],
  },
  sessionCookies: {
    allow: false,
    exceptions: [],
  },
  persistentCookies: {
    allow: false,
    exceptions: [],
  },
  thirdPartyCookies: {
    allow: false,
    exceptions: [],
  },
};

export default function Home() {
  const [preferences, setPreferences] =
    useState<PreferencesType>(preferenceDefaults);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  const active = 'aqqs...fdg2';
  const avatar = 'ipfs://famdsfnasdfcdsafsadfasdcsdsdcdcad.png';

  const changePreferencesToggle = (
    key:
      | 'popups'
      | 'darkMode'
      | 'sessionCookies'
      | 'persistentCookies'
      | 'thirdPartyCookies'
  ) => {
    let prevAllow = preferences[key].allow;
    let prevExceptions = preferences[key].exceptions;

    setPreferences((prevPreferences) => {
      return {
        ...prevPreferences,
        [key]: {
          allow: !prevAllow,
          exceptions: prevExceptions,
        },
      };
    });
  };

  const changePreferencesExceptions = (
    e: any,
    key:
      | 'popups'
      | 'darkMode'
      | 'sessionCookies'
      | 'persistentCookies'
      | 'thirdPartyCookies'
  ) => {
    console.log(e.target.value);
    let prevAllow = preferences[key].allow;
    let exceptions = e.target.value;

    setPreferences((prevPreferences) => {
      return {
        ...prevPreferences,
        [key]: {
          allow: prevAllow,
          exceptions: exceptions,
        },
      };
    });
  };

  const code = `{ 
    "profile": {
      "avatar": "${avatar}",
      "displayName": "${watch('displayName')}",
      "social": {
        "twitter": "${watch('twitter')}",
        "github": "${watch('github')}",
        "reddit": "${watch('reddit')}",
        "ens": "${watch('ens')}"
      }
    },
    "personal": {
      "firstName": "${watch('firstName')}",
      "lastName": "${watch('lastName')}",
      "email": "${watch('email')}",
      "phoneNumber": "${watch('number')}"
    },
    "preferences": {
      "popups": {
        "allow": ${preferences.popups.allow},
        "exceptions": "${preferences.popups.exceptions}"
      },
      "darkMode": {
        "allow": ${preferences.darkMode.allow},
        "exceptions": "${preferences.darkMode.exceptions}"
      },
      "cookies": {
        "sessionCookies": {
          "allow": ${preferences.sessionCookies.allow},
          "exceptions": "${preferences.sessionCookies.exceptions}"
        },
        "persistentCookies": {
          "allow": ${preferences.persistentCookies.allow},
          "exceptions": "${preferences.persistentCookies.exceptions}"
        },
        "thirdPartyCookies": {
          "allow": ${preferences.thirdPartyCookies.allow},
          "exceptions": "${preferences.thirdPartyCookies.exceptions}"
        }
      }
    }
  }
  
  `;

  return (
    <div>
      <Head>
        <title>browserconfig</title>
        <meta name="browserconfig.xyz" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="p-5 flex justify-center sticky top-[4rem] z-10 w-full bg-white border-b ">
        <div>
          <div className="flex items-center font-medium">
            <p className="mr-3">active config:</p>
            <nav className="flex space-x-4 mr-5" aria-label="Tabs">
              {tabs.slice(0, 1).map((tab) => (
                <a
                  key={tabs[2].name}
                  href={tabs[2].href}
                  className={classNames(
                    tabs[2].name === active
                      ? 'bg-green-100 text-gray-700'
                      : tabs[2].current
                      ? 'bg-gray-100 text-gray-700'
                      : 'text-gray-500 hover:text-gray-700',
                    'px-3 py-2 font-medium text-sm rounded-md'
                  )}
                  aria-current={tabs[2].current ? 'page' : undefined}
                >
                  {tabs[2].name}
                </a>
              ))}
            </nav>
            <p>default configs:</p>
            <nav className="flex space-x-4" aria-label="Tabs">
              {tabs.map((tab) => (
                <a
                  key={tab.name}
                  href={tab.href}
                  className={classNames(
                    tab.current
                      ? 'bg-gray-100 text-gray-700'
                      : 'text-gray-500 hover:text-gray-700',
                    'px-3 py-2 font-medium text-sm rounded-md'
                  )}
                  aria-current={tab.current ? 'page' : undefined}
                >
                  {tab.name}
                </a>
              ))}
            </nav>
            {/* <button
              type="button"
              className="inline-flex items-center rounded-full border border-transparent bg-indigo-600 p-1 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 h-7 w-7 ml-2"
            >
              <PlusIconMini className="h-5 w-5" aria-hidden="true" />
            </button> */}
          </div>
        </div>
      </div>
      <div className="py-6 top-24">
        <div className="top-24 mx-auto max-w-3xl sm:px-6 lg:grid lg:max-w-screen-2xl lg:grid-cols-12 lg:gap-8 lg:px-8">
          <div className="col-span-9 lg:col-span-6 block">
            <div className="top-40 p-2 h-[40rem] overflow-y-scroll">
              <Form
                register={register}
                preferences={preferences}
                changePreferencesToggle={changePreferencesToggle}
                changePreferencesExceptions={changePreferencesExceptions}
              />
            </div>
          </div>
          <div className="col-span-3 lg:col-span-6 block h-[36rem] overflow-y-scroll rounded-2xl bg-[#011627] ring-1 ring-white/10">
            <div className="sticky top-40 p-2">
              <div className="relative rounded-2xl bg-[#011627]  backdrop-blur p-1">
                {/* <div className="absolute -top-px left-20 right-11 h-px bg-gradient-to-r from-sky-300/0 via-sky-300/70 to-sky-300/0" /> */}
                {/* <div className="absolute -bottom-px left-11 right-20 h-px bg-gradient-to-r from-blue-400/0 via-blue-400 to-blue-400/0" /> */}
                <div className="pl-4">
                  {/* <TrafficLightsIcon className="h-2.5 w-auto stroke-slate-500/30" /> */}
                  <div className="mt-6 flex items-start px-1 text-sm">
                    {/* Line numbers below */}
                    <div
                      aria-hidden="true"
                      className="select-none border-r border-slate-300/5 pr-4 font-mono text-slate-600"
                    >
                      {Array.from({
                        length: code.split('\n').length,
                      }).map((_, index) => (
                        <Fragment key={index}>
                          {(index + 1).toString().padStart(2, '0')}
                          <br />
                        </Fragment>
                      ))}
                    </div>
                    <Highlight
                      {...defaultProps}
                      code={code}
                      language={codeLanguage}
                      theme={nightOwl}
                    >
                      {({
                        className,
                        style,
                        tokens,
                        getLineProps,
                        getTokenProps,
                      }) => (
                        <pre
                          className={clsx(
                            className,
                            'flex overflow-x-auto pb-6'
                          )}
                          style={style}
                        >
                          <code className="px-4">
                            {tokens.map((line, lineIndex) => (
                              <div key={lineIndex} {...getLineProps({ line })}>
                                {line.map((token, tokenIndex) => (
                                  <span
                                    key={tokenIndex}
                                    {...getTokenProps({ token })}
                                  />
                                ))}
                              </div>
                            ))}
                          </code>
                        </pre>
                      )}
                    </Highlight>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
