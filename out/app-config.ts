export type AppConfig = {
  app?: App;
  organization?: Organization;
  backend?: Backend;
  integrations?: Integrations;
  techdocs?: Techdocs;
  auth?: Auth;
  catalog?: Catalog;
};

export interface App {
  title: string;
  baseUrl: string;
}

export interface Organization {
  name: string;
}

export interface Listen {
  port: number;
}

export interface Csp {
  "connect-src": string[];
}

export interface Cors {
  origin: string;
  methods: string[];
  credentials: boolean;
}

export interface Database {
  client: string;
  connection: string;
}

export interface Backend {
  baseUrl: string;
  listen: Listen;
  csp: Csp;
  cors: Cors;
  database: Database;
}

export interface Credential {
  personalAccessToken: string;
}

export interface Azure {
  host: string;
  credentials: Credential[];
}

export interface Integrations {
  azure: Azure[];
}

export interface Generator {
  runIn: string;
}

export interface Publisher {
  type: string;
}

export interface Techdocs {
  builder: string;
  generator: Generator;
  publisher: Publisher;
}

export interface Guest {
}

export interface Providers {
  guest: Guest;
}

export interface Auth {
  providers: Providers;
}

export interface Import {
  entityFilename: string;
  pullRequestBranchName: string;
}

export interface Rule {
  allow: string[];
}

export interface Location {
  type: string;
  target: string;
}

export interface Catalog {
  import: Import;
  rules: Rule[];
  locations: Location[];
}