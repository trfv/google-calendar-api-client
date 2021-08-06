type Config = Parameters<typeof gapi.client.init>[number];
type GoogleAuth = gapi.auth2.GoogleAuth;
type EventsListParameters = gapi.client.calendar.EventsListParameters;
type EventsInsertParameters = gapi.client.calendar.EventsInsertParameters;
type EventsUpdateParameters = gapi.client.calendar.EventsUpdateParameters;
type EventsGetParameters = gapi.client.calendar.EventsGetParameters;
type EventsDeleteParameters = gapi.client.calendar.EventsDeleteParameters;
type HttpRequest<T> = gapi.client.HttpRequest<T>;

type GoogleUser = gapi.auth2.GoogleUser;
type Events = gapi.client.calendar.Events;
type Event = gapi.client.calendar.Event;

type GAPI = {
  load(apiName: string, callback: gapi.CallbackOrConfig): void;
  auth2: {
    getAuthInstance(): GoogleAuth;
  };
  client: {
    init(config: Config): Promise<void>;
    calendar: {
      events: {
        list(parameters: EventsListParameters): HttpRequest<Events>;
        insert(parameters: EventsInsertParameters): HttpRequest<Event>;
        update(parameters: EventsUpdateParameters): HttpRequest<Event>;
        get(parameters: EventsGetParameters): HttpRequest<Event>;
        delete(parameters: EventsDeleteParameters): HttpRequest<Event>;
      };
    };
  };
};

const scriptSrc = "https://apis.google.com/js/api.js";
const defaultCalendarId = "primary";

class CalendarApiClient {
  private gapi: GAPI | null = null;

  constructor(private config: Config) {
    this.initClient = this.initClient.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
    this.checkIsSignedIn = this.checkIsSignedIn.bind(this);
    this.listEvents = this.listEvents.bind(this);
    this.createEvent = this.createEvent.bind(this);
    this.updateEvent = this.updateEvent.bind(this);
    this.getEvent = this.getEvent.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
    try {
      this.loadScript();
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Load google api script
   */
  private loadScript(): void {
    const script = document.createElement("script");
    script.src = scriptSrc;
    document.body.appendChild(script);
    script.onload = () => this.initClient();
  }

  /**
   * Init google api client
   */
  private initClient(): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.gapi = (window as any)["gapi"];
    if (!this.gapi) {
      throw new Error("Error: this.gapi not loaded.");
    }
    this.gapi.load("client:auth2", async () => await this.gapi?.client.init(this.config));
  }

  /**
   * Sign in google account
   */
  public async handleSignIn(): Promise<GoogleUser | null> {
    if (this.gapi) {
      return this.gapi.auth2.getAuthInstance().signIn();
    } else {
      console.log("Error: this.gapi not loaded");
      return null;
    }
  }

  /**
   * Sign out google account
   */
  public handleSignOut(): void {
    if (this.gapi) {
      this.gapi.auth2.getAuthInstance().signOut();
    } else {
      console.log("Error: this.gapi not loaded");
    }
  }

  /**
   * Check is signed in
   */
  public checkIsSignedIn(): boolean {
    if (this.gapi) {
      return this.gapi.auth2.getAuthInstance().isSignedIn.get();
    } else {
      console.log("Error: this.gapi not loaded");
      return false;
    }
  }

  /**
   * List all events in the calendar queried by custom query options
   * See all available options here https://developers.google.com/calendar/v3/reference/events/list
   */
  public listEvents(
    queryOptions: Omit<EventsListParameters, "calendarId">,
    calendarId: string = defaultCalendarId
  ): HttpRequest<Events> | null {
    if (this.gapi) {
      return this.gapi.client.calendar.events.list({
        calendarId: calendarId,
        ...queryOptions,
      });
    } else {
      console.log("Error: this.gapi not loaded");
      return null;
    }
  }

  /**
   * Create calendar event
   * See all available options here https://developers.google.com/calendar/api/v3/reference/events/insert
   */
  public createEvent(
    queryOptions: Omit<EventsInsertParameters, "calendarId">,
    calendarId: string = defaultCalendarId
  ): HttpRequest<Event> | null {
    if (this.gapi) {
      return this.gapi.client.calendar.events.insert({
        calendarId: calendarId,
        ...queryOptions,
      });
    } else {
      console.log("Error: this.gapi not loaded");
      return null;
    }
  }

  /**
   * Update calendar event
   * See all available options here https://developers.google.com/calendar/api/v3/reference/events/update
   */
  public updateEvent(
    queryOptions: Omit<EventsUpdateParameters, "calendarId">,
    calendarId: string = defaultCalendarId
  ): HttpRequest<Event> | null {
    if (this.gapi) {
      return this.gapi.client.calendar.events.update({
        calendarId: calendarId,
        ...queryOptions,
      });
    } else {
      console.log("Error: gapi is not loaded");
      return null;
    }
  }

  /**
   * Get calendar event
   * See all available options here https://developers.google.com/calendar/api/v3/reference/events/get
   */
  public getEvent(
    queryOptions: Omit<EventsGetParameters, "calendarId">,
    calendarId: string = defaultCalendarId
  ): HttpRequest<Event> | null {
    if (this.gapi) {
      return this.gapi.client.calendar.events.get({
        calendarId: calendarId,
        ...queryOptions,
      });
    } else {
      console.log("Error: gapi is not loaded");
      return null;
    }
  }

  /**
   * Delete calendar event
   * See all available options here https://developers.google.com/calendar/api/v3/reference/events/delete
   */
  public deleteEvent(
    queryOptions: Omit<EventsDeleteParameters, "calendarId">,
    calendarId: string = defaultCalendarId
  ): HttpRequest<Event> | null {
    if (this.gapi) {
      return this.gapi.client.calendar.events.delete({
        calendarId: calendarId,
        ...queryOptions,
      });
    } else {
      console.log("Error: gapi is not loaded");
      return null;
    }
  }
}

export type { GoogleUser, Events, Event };
export { CalendarApiClient };