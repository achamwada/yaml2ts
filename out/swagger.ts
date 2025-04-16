export type Swagger = {
  openapi: string;
  info?: Info;
  servers?: Server[];
  paths?: Paths;
};

export interface Info {
  title: string;
  description: string;
  version: string;
}

export interface Server {
  url: string;
  description: string;
}

export interface Items {
  type: string;
}

export interface Schema {
  type: string;
  items: Items;
}

export interface ApplicationJson {
  schema: Schema;
}

export interface Content {
  "application/json": ApplicationJson;
}

export interface Response200 {
  description: string;
  content: Content;
}

export interface Responses {
  "200": Response200;
}

export interface Get {
  summary: string;
  description: string;
  responses: Responses;
}

export interface EndpointUsers {
  get: Get;
}

export interface Paths {
  "/users": EndpointUsers;
}