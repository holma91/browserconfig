/*global chrome*/
import Head from 'next/head';
import { Fragment, useEffect, useState } from 'react';
import clsx from 'clsx';
import { Web3Storage } from 'web3.storage';
import Highlight, { defaultProps } from 'prism-react-renderer';
import { CheckCircleIcon } from '@heroicons/react/20/solid';
import nightOwl from 'prism-react-renderer/themes/nightOwl';
import Form from '../components/Form';
import { useForm } from 'react-hook-form';
import { useBrowserConfig } from 'browserconfig.xyz';

const extensionId = 'kpligipbcoljickbajicdcdbdefgkfnj';

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

type PreferencesType = {
  popUps: {
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
  popUps: {
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
  const { data: browserConfig, refetch: refetchBrowserConfig } =
    useBrowserConfig('google.com');
  const [avatar, setAvatar] = useState('');
  const [avatarHash, setAvatarHash] = useState('');
  const [configCid, setConfigCid] = useState('');
  const [uploadedConfig, setUploadedConfig] = useState('');
  const [activatedConfig, setActivatedConfig] = useState('');
  const [activatedConfigCid, setActivatedConfigCid] = useState('');
  const [isPinning, setIsPinning] = useState(false);
  const [preferences, setPreferences] =
    useState<PreferencesType>(preferenceDefaults);
  const { register, watch } = useForm<Inputs>();

  const changePreferencesToggle = (
    key:
      | 'popUps'
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
      | 'popUps'
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
    try {
      chrome.runtime.sendMessage(extensionId, {
        type: 'set',
        cid: configCid,
      });
    } catch (e) {
      console.log(
        'you need to use a chromium browser and download the browserconfig extension!'
      );
    }

    setActivatedConfig(config);
    setActivatedConfigCid(configCid);

    // update UI
    refetchBrowserConfig();
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
      "popUps": {
        "allow": ${preferences.popUps.allow},
        "exceptions": ${formatExceptions(preferences.popUps.exceptions)}
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

  useEffect(() => {
    if (!browserConfig) return;
    setActivatedConfigCid(browserConfig.cid);
  }, [browserConfig]);

  return (
    <div>
      <Head>
        <title>browserconfig</title>
        <meta name="browserconfig.xyz" content="browser profiles" />
        <link rel="icon" href="/icon-128.png" />
      </Head>
      <div className="p-5 flex justify-center sticky top-[4rem] z-10 w-full bg-white border-b ">
        <div>
          <div className="flex items-center font-medium">
            <p className="mr-3">active config:</p>
            <nav className="flex space-x-4 mr-5" aria-label="Tabs">
              <a
                href={
                  activatedConfigCid
                    ? `https://${activatedConfigCid}.ipfs.w3s.link`
                    : '#'
                }
                className="bg-green-100 text-gray-700 hover:text-gray-700 px-3 py-2 font-medium text-sm rounded-md"
                target="_blank"
                rel="noreferrer"
              >
                {activatedConfigCid
                  ? activatedConfigCid
                  : browserConfig?.cid
                  ? browserConfig.cid
                  : 'none'}
              </a>
            </nav>
          </div>
        </div>
      </div>
      <div className="py-6 top-24">
        <div className="top-24 mx-auto max-w-3xl sm:px-6 lg:grid lg:max-w-screen-2xl lg:grid-cols-12 lg:gap-8 lg:px-8">
          <div className="col-span-9 lg:col-span-6 block">
            <div className="top-40 p-2 h-[40rem] tall:h-[41rem] tall2:h-[43rem] tall3:h-[45rem] tall4:h-[47rem] overflow-y-scroll">
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
            <div className="hidden lg:block h-[29rem] overflow-y-scroll rounded-xl bg-[#011627] ring-1 ring-white/10">
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
                        language="javascript"
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
                  <div className="rounded-md bg-green-50 px-4 py-5 flex flex-col gap-2">
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
                        <div className="mt-1 text-sm text-green-700">
                          <p>
                            CID: <strong>{configCid}</strong>
                          </p>
                        </div>
                      </div>
                    </div>
                    {activatedConfig === config ? (
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <CheckCircleIcon
                            className="h-5 w-5 text-green-400"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-green-800">
                            Config activated
                          </h3>
                          <div className="mt-1 text-sm text-green-700">
                            <p>
                              Every website that integrates browserconfig.xyz
                              will now use this config.
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-5 ml-8 flex items-center gap-4">
                        <button
                          onClick={activateConfig}
                          type="button"
                          className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 font-medium text-black hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                        >
                          Activate config
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Your new config
                    {uploadedConfig === config ? configCid : ''}
                  </h3>
                  <div className="mt-2 max-w-xl text-sm text-gray-500">
                    <p>
                      To activate your config, you first need to pin it on ipfs.
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
