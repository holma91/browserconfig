![](browserconfig.png)

Hooks for getting the browser config of a visitor of your website. A user can set it's config at https://browserconfig.xyz, and by using this package you have an easy hook for accesing the user's config.

# Installation

Install browserconfig and it's dependencies

```
npm install browserconfig.xyz react-query
```

Then you need to set up react-query, like this

```js
import { QueryClient, QueryClientProvider } from 'react-query';
const queryClient = new QueryClient();
```

And wrap your app like this

```jsx
<QueryClientProvider client={queryClient}>{your app}</QueryClientProvider>
```

# Documentation

```js
const yourDomain = 'google.com';
const { data: browserConfig } = useBrowserConfig(yourDomain);
```

the variable browserConfig now contains the value that the user configured on browserconfig.xyz!
