export type Character = {
  id: number;
  name: string;
  description: string;
  modified: Date;
  resourceURI: string;
  urls: Url[];
  thumbnail: Image;
  comics: ResourceList;
  stories: ResourceList;
  events: ResourceList;
  series: ResourceList;
};

export type MarvelApiResponse<T> = {
  data: {
    count: number;
    limit: number;
    offset: number;
    results: T[];
    total: number;
  };
};

export type Series = {
  id: number;
  title: string;
  description: string;
  resourceURI: string;
  urls: Url[];
  startYear: number;
  endYear: number;
  rating: string;
  modified: Date;
  thumbnail: Image;
  comics: ResourceList;
  stories: ResourceList;
  events: ResourceList;
  characters: ResourceList;
  creators: ResourceList;
  next: Summary<Series>;
  previous: Summary<Series>;
};

export type Stories = {
  id: number;
  title: string;
  description: string;
  resourceURI: string;
  type: string;
  modified: Date;
  thumbnail: Image;
  comics: List<Comic>;
  series: List<Series>;
  events: List<Event>;
  characters: List<Character>;
  creators: List<Creator>;
  originalissue: Summary<Comic>;
};

type Comic = {
  id: number;
  digitalId: number;
  title: string;
  issueNumber: number;
  variantDescription: string;
  description: string;
  modified: Date;
  isbn: string;
  upc: string;
  diamondCode: string;
  ean: string;
  issn: string;
  format: string;
  pageCount: number;
  textObjects: TextObject[];
  resourceURI: string;
  urls: Url[];
  series: Summary<Series>;
  variants: Summary<Comic>[];
  collections: Summary<Comic>[];
  collectedIssues: Summary<Comic>[];
  thumbnail: Image;
  images: Image[];
  creators: ResourceList;
  characters: ResourceList;
  stories: ResourceList;
  events: ResourceList;
};

type Creator = {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  suffix: string;
  fullName: string;
  modified: Date;
  resourceURI: string;
  urls: Url[];
  thumbnail: Image;
  series: ResourceList;
  stories: ResourceList;
  comics: ResourceList;
  events: ResourceList;
};
type List<T> = {
  available: number;
  collectionURI: string;
  items: T[];
  returned: number;
};

type Summary<T> = {
  name: string;
  resourceURI: string;
};

type Url = {
  type: string;
  url: string;
};

type Image = {
  path: string;
  extension: string;
};

type TextObject = {
  type: string;
  language: string;
  text: string;
};

export type ResourceList = {
  available: number;
  returned: number;
  collectionURI: string;
  items: { [key: string]: string }[];
};
