import Head from 'next/head';
import { Fragment } from 'react';
import clsx from 'clsx';
import Tabs from '../components/Tabs';
import { PlusIcon as PlusIconMini } from '@heroicons/react/20/solid';
import Highlight, { defaultProps } from 'prism-react-renderer';
import dracula from 'prism-react-renderer/themes/dracula';
import nightOwl from 'prism-react-renderer/themes/nightOwl';
import palenight from 'prism-react-renderer/themes/palenight';

const codeLanguage = 'javascript';
const code = `export default {
  strategy: 'predictive',
  engine: {
    cpus: 12,
    backups: ['./storage/cache.wtf'],
  },
}`;

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

export default function Home() {
  const active = 'aqqs...fdg2';
  const allowPopups = true;

  const code2 = `{
    "profile": {
      "popups": ${allowPopups},
      "avatar": "ipfs://famdsfnasdfcdsafsadfasdcsdsdcdcad.png",
      "firstName": "Hasse",
      "lastName": "Backe",
      "displayName": "hassebacke",
      "email": "hassebacke@proton.me",
      "phoneNumber": "132214072394",
      "social": {
        "twitter": "",
        "github": "",
        "instagram": ""
      }
    },
    "cookies": {
      "sessionCookies": {
        "allow": true,
        "exceptions": []
      },
      "sessionCookies": {
        "allow": true,
        "exceptions": []
      },
      "sessionCookies": {
        "allow": true,
        "exceptions": []
      },
      "sessionCookies": {
        "allow": true,
        "exceptions": []
      },
      "persistentCookies": {
        "allow": true,
        "exceptions": ["https://facebook.com/*"]
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
            <p>default configs:</p>
            <nav className="flex space-x-4" aria-label="Tabs">
              {tabs.map((tab) => (
                <a
                  key={tab.name}
                  href={tab.href}
                  className={classNames(
                    tab.name === active
                      ? 'bg-green-100 text-gray-700'
                      : tab.current
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
            <div className="top-40 border p-2 h-[40rem] overflow-y-scroll">
              {[...new Array(75)].map((a) => (
                <p key={a}>ya</p>
              ))}
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
                        length: code2.split('\n').length,
                      }).map((_, index) => (
                        <Fragment key={index}>
                          {(index + 1).toString().padStart(2, '0')}
                          <br />
                        </Fragment>
                      ))}
                    </div>
                    <Highlight
                      {...defaultProps}
                      code={code2}
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
