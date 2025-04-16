export type Template = {
  apiVersion: string;
  kind: string;
  metadata?: Metadata;
  spec?: Spec;
};

export interface Metadata {
  name: string;
  title: string;
  description: string;
  tags: string[];
}

export interface UiOptions {
  rows: number;
}

export interface Name {
  title: string;
  type: string;
  description: string;
  "ui:autofocus": boolean;
  "ui:options": UiOptions;
}

export interface Description {
  title: string;
  type: string;
  description: string;
  "ui:options": UiOptions;
}

export interface Owner {
  title: string;
  type: string;
  description: string;
  "ui:field": string;
  "ui:options": UiOptions;
}

export interface Properties {
  name: Name;
  description: Description;
  owner: Owner;
}

export interface Parameter {
  title: string;
  required: string[];
  properties: Properties;
}

export interface Values {
  name: string;
  description: string;
  destination: string;
  owner: string;
}

export interface Input {
  url: string;
  values: Values;
}

export interface Step {
  id: string;
  name: string;
  action: string;
  input: Input;
}

export interface Link {
  title: string;
  url: string;
}

export interface Output {
  links: Link[];
}

export interface Spec {
  owner: string;
  type: string;
  parameters: Parameter[];
  steps: Step[];
  output: Output;
}