# @authyo/auth-react

React wrapper for the Authyo passwordless SDK. Depends on `@authyo/auth-js` and exposes a simple context/provider plus a `useAuthyo` hook.

## Install

```bash
npm install @authyo/auth-js @authyo/auth-react
# or
yarn add @authyo/auth-js @authyo/auth-react
```

Peer dependencies: `react` (^17|^18|^19).

## Setup

```tsx
import React from "react";
import { AuthyoProvider } from "@authyo/auth-react";

function App() {
  return (
    <AuthyoProvider
      clientId="YOUR_CLIENT_ID"
      clientSecret="YOUR_CLIENT_SECRET"
      baseUrl="https://app.authyo.io" // optional, defaults to this
    >
      <YourApp />
    </AuthyoProvider>
  );
}
```

You can also pass an existing `AuthyoClient` via `client` prop if you manage it yourself.

## Use in components

```tsx
import { useAuthyo } from "@authyo/auth-react";

function SendOtpButton() {
  const authyo = useAuthyo();

  const handleClick = async () => {
    await authyo.sendOtp({ to: "user@example.com", authWay: "Email", otpLength: 6 });
  };

  return <button onClick={handleClick}>Send OTP</button>;
}
```

## API (via useAuthyo -> AuthyoClient)
- `getConfiguration()`
- `sendOtp({ to, authWay, otpLength, expiry, deviceInfo })`
- `verifyOtp(otp, maskId)`
- `verifyToken(token)`
- `revokeSession(token)`

All requests include `clientId` / `clientSecret` in headers (configured in the provider or prebuilt client).

## Notes
- Context-based; ensure components using `useAuthyo` are wrapped by `AuthyoProvider`.
- Keep `clientSecret` server-side where possible; avoid shipping secrets into public bundles you don't control.

## Build
- `npm run build` emits ESM + d.ts to `dist/`

## License
MIT

