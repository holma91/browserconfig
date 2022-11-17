import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

type CookieTypes = 'persistentCookies' | 'sessionCookies' | 'thirdPartyCookies';

type ConfigType = {
  profile: {
    avatar: string;
    displayName: string;
    social: {
      twitter: string;
      github: string;
      reddit: string;
      ens: string;
    };
  };
  personal: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
  };
  preferences: {
    darkMode: boolean;
    popUps: boolean;
    cookies: {
      sessionCookies: boolean;
      persistentCookies: boolean;
      thirdPartyCookies: boolean;
    };
  };
  cid: string;
};

const extensionId = 'kpligipbcoljickbajicdcdbdefgkfnj';

const fetcher = async (domain: string, cid: string) => {
  // use multiple gateways to minimize chance of getting rate limited
  const urls = [
    `https://${cid}.ipfs.w3s.link`,
    `https://ipfs.io/ipfs/${cid}`,
    `https://cloudflare-ipfs.com/ipfs/${cid}`,
  ];
  const response = await fetch(urls[Math.floor(Math.random()) * urls.length]);
  const config = await response.json();

  const processedConfig: ConfigType = {
    personal: config.personal,
    profile: config.profile,
    preferences: {
      popUps: false,
      darkMode: false,
      cookies: {
        persistentCookies: false,
        sessionCookies: false,
        thirdPartyCookies: false,
      },
    },
    cid: cid as string,
  };

  const preferenceKeys: ('popUps' | 'darkMode')[] = ['popUps', 'darkMode'];
  for (const preferenceKey of preferenceKeys) {
    if (config.preferences[preferenceKey].allow) {
      processedConfig.preferences[preferenceKey] = !config.preferences[preferenceKey].exceptions.includes(domain);
    } else {
      processedConfig.preferences[preferenceKey] = config.preferences[preferenceKey].exceptions.includes(domain);
    }
  }

  const cookieTypes: CookieTypes[] = ['persistentCookies', 'sessionCookies', 'thirdPartyCookies'];
  for (const cookieType of cookieTypes) {
    if (config.preferences.cookies[cookieType].allow) {
      processedConfig.preferences.cookies[cookieType] =
        !config.preferences.cookies[cookieType].exceptions.includes(domain);
    } else {
      processedConfig.preferences.cookies[cookieType] =
        config.preferences.cookies[cookieType].exceptions.includes(domain);
    }
  }

  return processedConfig;
};

export default function useBrowserConfig(domain: string) {
  const [cid, setCid] = useState('');

  useEffect(() => {
    try {
      chrome.runtime.sendMessage(
        extensionId,
        {
          type: 'get',
        },
        function (response: any) {
          setCid(response.cid || '');
        },
      );
    } catch (e) {
      console.log('you need to use a chromium browser and download the browserconfig extension!');
    }
  }, []);

  return useQuery([domain], () => fetcher(domain, cid), {
    enabled: !!cid,
  });
}
