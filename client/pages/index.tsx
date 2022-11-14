import Head from 'next/head';
import { Fragment, useState } from 'react';
import clsx from 'clsx';
import { Switch } from '@headlessui/react';
import { Web3Storage } from 'web3.storage';
import Highlight, { defaultProps } from 'prism-react-renderer';
import { CheckCircleIcon } from '@heroicons/react/20/solid';
import nightOwl from 'prism-react-renderer/themes/nightOwl';
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
    exceptions: string;
  };
  darkMode: {
    allow: boolean;
    exceptions: string;
  };
  sessionCookies: {
    allow: boolean;
    exceptions: string;
  };
  persistentCookies: {
    allow: boolean;
    exceptions: string;
  };
  thirdPartyCookies: {
    allow: boolean;
    exceptions: string;
  };
};

const preferenceDefaults = {
  popups: {
    allow: true,
    exceptions: '',
  },
  darkMode: {
    allow: false,
    exceptions: '',
  },
  sessionCookies: {
    allow: false,
    exceptions: '',
  },
  persistentCookies: {
    allow: false,
    exceptions: '',
  },
  thirdPartyCookies: {
    allow: false,
    exceptions: '',
  },
};

const formatExceptions = (exceptions: string) => {
  let list = exceptions.replace(/\s+/g, '').split(',');
  return JSON.stringify(list);
};

export default function Home() {
  const [avatar, setAvatar] = useState('');
  const [avatarHash, setAvatarHash] = useState('');
  const [configCid, setConfigCid] = useState('');
  const [uploadedConfig, setUploadedConfig] = useState('');
  const [isPinning, setIsPinning] = useState(false);
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

  const onImageUpload = async (e: any) => {
    const image = URL.createObjectURL(e.target.files[0]);
    setAvatar(image);

    console.log(image);
    console.log(e.target.files[0]);

    // upload image to IPFS
    const client = new Web3Storage({
      token: process.env.NEXT_PUBLIC_web3storage_api_key as string,
    });

    const rootCid = await client.put(e.target.files, {
      name: 'avatar',
      maxRetries: 3,
      wrapWithDirectory: false,
    });

    console.log(rootCid);
    setAvatarHash(rootCid);
  };

  const config = `{ 
    "profile": {
      "avatar": "${avatarHash && 'ipfs://'}${avatarHash}",
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
        "exceptions": ${formatExceptions(preferences.popups.exceptions)}
      },
      "darkMode": {
        "allow": ${preferences.darkMode.allow},
        "exceptions": ${formatExceptions(preferences.darkMode.exceptions)}
      },
      "cookies": {
        "sessionCookies": {
          "allow": ${preferences.sessionCookies.allow},
          "exceptions": ${formatExceptions(
            preferences.sessionCookies.exceptions
          )}
        },
        "persistentCookies": {
          "allow": ${preferences.persistentCookies.allow},
          "exceptions": ${formatExceptions(
            preferences.persistentCookies.exceptions
          )}
        },
        "thirdPartyCookies": {
          "allow": ${preferences.thirdPartyCookies.allow},
          "exceptions": ${formatExceptions(
            preferences.thirdPartyCookies.exceptions
          )}
        }
      }
    }
  }
  
  `;

  const pinOnIpfs = async () => {
    setIsPinning(true);

    const client = new Web3Storage({
      token: process.env.NEXT_PUBLIC_web3storage_api_key as string,
    });
    const blob = new Blob([config], {
      type: 'application/json',
    });
    const files = [
      new File(['contents-of-file-1'], 'plain-utf8.txt'),
      new File([blob], 'config.json'),
    ];
    const rootCid = await client.put(files, {
      name: 'config',
      maxRetries: 3,
      wrapWithDirectory: false,
    });

    setConfigCid(rootCid);
    setUploadedConfig(config);
    setIsPinning(false);
  };

  const activateConfig = () => {
    // check if uploaded to ipfs
    // save hash in local storage
    console.log('activating....');
    // if localstorage cid === configCid, then it's activated. otherwise not
    window.localStorage.setItem('browserconfigCID', configCid);
    const localConfig = window.localStorage.getItem('browserconfigCID');
    console.log(localConfig);
  };

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
                onImageUpload={onImageUpload}
                avatar={avatar}
              />
            </div>
          </div>
          <div className="col-span-3 lg:col-span-6 flex flex-col gap-3">
            <div className=" block h-[29rem] overflow-y-scroll rounded-xl bg-[#011627] ring-1 ring-white/10">
              <div className="sticky top-40 p-2">
                <div className="relative rounded-xl bg-[#011627]  backdrop-blur p-1">
                  <div className="pl-4">
                    <div className="mt-6 flex items-start px-1 text-sm">
                      {/* Line numbers below */}
                      <div
                        aria-hidden="true"
                        className="select-none border-r border-slate-300/5 pr-4 font-mono text-slate-600"
                      >
                        {Array.from({
                          length: config.split('\n').length,
                        }).map((_, index) => (
                          <Fragment key={index}>
                            {(index + 1).toString().padStart(2, '0')}
                            <br />
                          </Fragment>
                        ))}
                      </div>
                      <Highlight
                        {...defaultProps}
                        code={config}
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
                                <div
                                  key={lineIndex}
                                  {...getLineProps({ line })}
                                >
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
            <div className="bg-white border rounded-lg">
              {uploadedConfig === config ? (
                <>
                  <div className="rounded-md bg-green-50 px-4 py-5">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <CheckCircleIcon
                          className="h-5 w-5 text-green-400"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-green-800">
                          Config pinned on ipfs
                        </h3>
                        <div className="mt-2 text-sm text-green-700">
                          <p>
                            CID: <strong>{configCid}</strong>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 ml-8 flex items-center gap-4">
                      <button
                        onClick={activateConfig}
                        type="button"
                        className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 font-medium text-black hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                      >
                        Activate config
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    IPFS Content ID:{' '}
                    {uploadedConfig === config ? configCid : ''}
                  </h3>
                  <div className="mt-2 max-w-xl text-sm text-gray-500">
                    <p>
                      Once you delete your account, you will lose all data
                      associated with it.
                    </p>
                  </div>
                  <div className="mt-5 flex items-center gap-4">
                    <button
                      onClick={pinOnIpfs}
                      type="button"
                      className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 font-medium text-black hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                    >
                      {isPinning ? 'Pinning' : 'Pin on IPFS'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
