/// <reference types="gapi.calendar" />
/// <reference types="gapi" />
/// <reference types="gapi.auth2" />
declare type Config = Parameters<typeof gapi.client.init>[number];
declare type EventsListParameters = gapi.client.calendar.EventsListParameters;
declare type EventsInsertParameters = gapi.client.calendar.EventsInsertParameters;
declare type EventsUpdateParameters = gapi.client.calendar.EventsUpdateParameters;
declare type EventsGetParameters = gapi.client.calendar.EventsGetParameters;
declare type EventsDeleteParameters = gapi.client.calendar.EventsDeleteParameters;
declare type HttpRequest<T> = gapi.client.HttpRequest<T>;
declare type GoogleUser = gapi.auth2.GoogleUser;
declare type Events = gapi.client.calendar.Events;
declare type Event = gapi.client.calendar.Event;
declare class CalendarApiClient {
    private config;
    private gapi;
    constructor(config: Config);
    /**
     * Load google api script
     */
    private loadScript;
    /**
     * Init google api client
     */
    private initClient;
    /**
     * Sign in google account
     */
    handleSignIn(): Promise<GoogleUser | null>;
    /**
     * Sign out google account
     */
    handleSignOut(): void;
    /**
     * Check is signed in
     */
    checkIsSignedIn(): boolean;
    /**
     * List all events in the calendar queried by custom query options
     * See all available options here https://developers.google.com/calendar/v3/reference/events/list
     */
    listEvents(queryOptions: Omit<EventsListParameters, "calendarId">, calendarId?: string): HttpRequest<Events> | null;
    /**
     * Create calendar event
     * See all available options here https://developers.google.com/calendar/api/v3/reference/events/insert
     */
    createEvent(queryOptions: Omit<EventsInsertParameters, "calendarId">, calendarId?: string): HttpRequest<Event> | null;
    /**
     * Update calendar event
     * See all available options here https://developers.google.com/calendar/api/v3/reference/events/update
     */
    updateEvent(queryOptions: Omit<EventsUpdateParameters, "calendarId">, calendarId?: string): HttpRequest<Event> | null;
    /**
     * Get calendar event
     * See all available options here https://developers.google.com/calendar/api/v3/reference/events/get
     */
    getEvent(queryOptions: Omit<EventsGetParameters, "calendarId">, calendarId?: string): HttpRequest<Event> | null;
    /**
     * Delete calendar event
     * See all available options here https://developers.google.com/calendar/api/v3/reference/events/delete
     */
    deleteEvent(queryOptions: Omit<EventsDeleteParameters, "calendarId">, calendarId?: string): HttpRequest<Event> | null;
}
export type { GoogleUser, Events, Event };
export { CalendarApiClient };
