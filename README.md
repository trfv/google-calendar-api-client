# google-calendar-api-client

![npm](https://img.shields.io/npm/v/google-calendar-api-client)
![npm bundle size](https://img.shields.io/bundlephobia/min/google-calendar-api-client)
![npm (downloads)](https://img.shields.io/npm/dy/google-calendar-api-client.svg)

Google Calendar API client for JavaScript.
This is created with great influence from those repositories.
- https://github.com/Kubessandra/react-google-calendar-api
- https://github.com/googleapis/google-api-nodejs-client


## Installation
```sh
// with npm
npm install google-calendar-api-client

// with yarn
yarn add google-calendar-api-client
```

## Usage
1. Prepare client id and api key.
https://console.cloud.google.com/apis/credentials

2. Init api client with those params.
```js
import { CalendarApiClient } from "google-calendar-api-client";

const apiClient = new CalendarApiClient({
  clientId: process.env.CLIENT_ID,
  apiKey: process.env.API_KEY,
  scope: "https://www.googleapis.com/auth/calendar.events",
  discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
});
```

3. Use this.
```js
const listEvents = async () => {
  const day = dayjs();
  await apiClient.listEvents({
    timeMin: day.toISOString(),
    timeMax: day.add(1, "month").toISOString(),
    maxResults: 20,
    singleEvents: true,
    orderBy: "startTime",
  });
};
```


