var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var scriptSrc = "https://apis.google.com/js/api.js";
var defaultCalendarId = "primary";
var CalendarApiClient = /** @class */ (function () {
    function CalendarApiClient(config) {
        this.config = config;
        this.gapi = null;
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
        }
        catch (error) {
            console.log(error);
        }
    }
    /**
     * Load google api script
     */
    CalendarApiClient.prototype.loadScript = function () {
        var _this = this;
        var script = document.createElement("script");
        script.src = scriptSrc;
        document.body.appendChild(script);
        script.onload = function () { return _this.initClient(); };
    };
    /**
     * Init google api client
     */
    CalendarApiClient.prototype.initClient = function () {
        var _this = this;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.gapi = window["gapi"];
        if (!this.gapi) {
            throw new Error("Error: this.gapi not loaded.");
        }
        this.gapi.load("client:auth2", function () { return __awaiter(_this, void 0, void 0, function () { var _a; return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, ((_a = this.gapi) === null || _a === void 0 ? void 0 : _a.client.init(this.config))];
                case 1: return [2 /*return*/, _b.sent()];
            }
        }); }); });
    };
    /**
     * Sign in google account
     */
    CalendarApiClient.prototype.handleSignIn = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.gapi) {
                    return [2 /*return*/, this.gapi.auth2.getAuthInstance().signIn()];
                }
                else {
                    console.log("Error: this.gapi not loaded");
                    return [2 /*return*/, null];
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * Sign out google account
     */
    CalendarApiClient.prototype.handleSignOut = function () {
        if (this.gapi) {
            this.gapi.auth2.getAuthInstance().signOut();
        }
        else {
            console.log("Error: this.gapi not loaded");
        }
    };
    /**
     * Check is signed in
     */
    CalendarApiClient.prototype.checkIsSignedIn = function () {
        if (this.gapi) {
            return this.gapi.auth2.getAuthInstance().isSignedIn.get();
        }
        else {
            console.log("Error: this.gapi not loaded");
            return false;
        }
    };
    /**
     * List all events in the calendar queried by custom query options
     * See all available options here https://developers.google.com/calendar/v3/reference/events/list
     */
    CalendarApiClient.prototype.listEvents = function (queryOptions, calendarId) {
        if (calendarId === void 0) { calendarId = defaultCalendarId; }
        if (this.gapi) {
            return this.gapi.client.calendar.events.list(__assign({ calendarId: calendarId }, queryOptions));
        }
        else {
            console.log("Error: this.gapi not loaded");
            return null;
        }
    };
    /**
     * Create calendar event
     * See all available options here https://developers.google.com/calendar/api/v3/reference/events/insert
     */
    CalendarApiClient.prototype.createEvent = function (queryOptions, calendarId) {
        if (calendarId === void 0) { calendarId = defaultCalendarId; }
        if (this.gapi) {
            return this.gapi.client.calendar.events.insert(__assign({ calendarId: calendarId }, queryOptions));
        }
        else {
            console.log("Error: this.gapi not loaded");
            return null;
        }
    };
    /**
     * Update calendar event
     * See all available options here https://developers.google.com/calendar/api/v3/reference/events/update
     */
    CalendarApiClient.prototype.updateEvent = function (queryOptions, calendarId) {
        if (calendarId === void 0) { calendarId = defaultCalendarId; }
        if (this.gapi) {
            return this.gapi.client.calendar.events.update(__assign({ calendarId: calendarId }, queryOptions));
        }
        else {
            console.log("Error: gapi is not loaded");
            return null;
        }
    };
    /**
     * Get calendar event
     * See all available options here https://developers.google.com/calendar/api/v3/reference/events/get
     */
    CalendarApiClient.prototype.getEvent = function (queryOptions, calendarId) {
        if (calendarId === void 0) { calendarId = defaultCalendarId; }
        if (this.gapi) {
            return this.gapi.client.calendar.events.get(__assign({ calendarId: calendarId }, queryOptions));
        }
        else {
            console.log("Error: gapi is not loaded");
            return null;
        }
    };
    /**
     * Delete calendar event
     * See all available options here https://developers.google.com/calendar/api/v3/reference/events/delete
     */
    CalendarApiClient.prototype.deleteEvent = function (queryOptions, calendarId) {
        if (calendarId === void 0) { calendarId = defaultCalendarId; }
        if (this.gapi) {
            return this.gapi.client.calendar.events.delete(__assign({ calendarId: calendarId }, queryOptions));
        }
        else {
            console.log("Error: gapi is not loaded");
            return null;
        }
    };
    return CalendarApiClient;
}());
export { CalendarApiClient };
//# sourceMappingURL=index.js.map