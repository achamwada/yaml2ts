export type BackendService = {
  service?: Service;
  "datadog-resources"?: DatadogResources;
};

export interface JELO {
  enabled: boolean;
}

export interface Service {
  JELO: JELO;
}

export interface DatadogResources {
  "enable-synthetics": boolean;
  "synthetic-block": boolean;
}