// This file is auto-generated by @hey-api/openapi-ts

export type PostLocationsData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/locations/';
};

export type PostLocationsResponses = {
    /**
     * Default Response
     */
    200: unknown;
};

export type GetLocationsByLocationIdData = {
    body?: never;
    path: {
        locationId: string;
    };
    query?: never;
    url: '/locations/{locationId}';
};

export type GetLocationsByLocationIdResponses = {
    /**
     * Default Response
     */
    200: unknown;
};

export type ClientOptions = {
    baseURL: string;
};