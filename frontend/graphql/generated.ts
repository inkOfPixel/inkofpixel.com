export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: any;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
  /** Input type for dynamic zone blocks of FeaturesSections */
  FeaturesSectionsBlocksDynamicZoneInput: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** The `Long` scalar type represents 52-bit integers */
  Long: any;
  /** Input type for dynamic zone items of Navigation */
  NavigationItemsDynamicZoneInput: any;
  /** Input type for dynamic zone blocks of Section */
  SectionBlocksDynamicZoneInput: any;
  /** A time string with format: HH:mm:ss.SSS */
  Time: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type AdminUser = {
  __typename?: 'AdminUser';
  id: Scalars['ID'];
  username?: Maybe<Scalars['String']>;
  firstname: Scalars['String'];
  lastname: Scalars['String'];
};

export type ComponentBlocksCard = {
  __typename?: 'ComponentBlocksCard';
  id: Scalars['ID'];
  title: Scalars['String'];
  description: Scalars['String'];
  image?: Maybe<UploadFile>;
  projectLink?: Maybe<Scalars['String']>;
};

export type ComponentBlocksCardInput = {
  title: Scalars['String'];
  description: Scalars['String'];
  image?: Maybe<Scalars['ID']>;
  projectLink?: Maybe<Scalars['String']>;
};

export type ComponentBlocksFeature = {
  __typename?: 'ComponentBlocksFeature';
  id: Scalars['ID'];
  featureTitle: Scalars['String'];
  featureDescription?: Maybe<Scalars['String']>;
  feat?: Maybe<Array<Maybe<ComponentFeatFeat>>>;
};

export type ComponentBlocksFeatureInput = {
  featureTitle: Scalars['String'];
  featureDescription?: Maybe<Scalars['String']>;
  feat?: Maybe<Array<Maybe<ComponentFeatFeatInput>>>;
};

export type ComponentBlocksHero = {
  __typename?: 'ComponentBlocksHero';
  id: Scalars['ID'];
  title: Scalars['String'];
  subtitle?: Maybe<Scalars['String']>;
};

export type ComponentBlocksHeroInput = {
  title?: Maybe<Scalars['String']>;
  subtitle?: Maybe<Scalars['String']>;
};

export type ComponentBlocksSingleFeature = {
  __typename?: 'ComponentBlocksSingleFeature';
  id: Scalars['ID'];
  description: Scalars['String'];
  title: Scalars['String'];
  image?: Maybe<UploadFile>;
  serviceLink?: Maybe<Scalars['String']>;
};

export type ComponentBlocksSingleFeatureInput = {
  description: Scalars['String'];
  title: Scalars['String'];
  image?: Maybe<Scalars['ID']>;
  serviceLink?: Maybe<Scalars['String']>;
};

export type ComponentFeatFeat = {
  __typename?: 'ComponentFeatFeat';
  id: Scalars['ID'];
  featDescription?: Maybe<Scalars['String']>;
};

export type ComponentFeatFeatInput = {
  featDescription?: Maybe<Scalars['String']>;
};

export type ComponentMenuLink = {
  __typename?: 'ComponentMenuLink';
  id: Scalars['ID'];
  linkName: Scalars['String'];
  path?: Maybe<Pages>;
};

export type ComponentMenuLinkInput = {
  linkName: Scalars['String'];
  path?: Maybe<Scalars['ID']>;
};

export type ComponentMenuPageLink = {
  __typename?: 'ComponentMenuPageLink';
  id: Scalars['ID'];
  pageLinkName: Scalars['String'];
  path?: Maybe<Pages>;
};

export type ComponentMenuPageLinkInput = {
  pageLinkName: Scalars['String'];
  path?: Maybe<Scalars['ID']>;
};



export type FeaturesSectionInput = {
  blocks?: Maybe<Array<Scalars['FeaturesSectionsBlocksDynamicZoneInput']>>;
  localizations?: Maybe<Array<Maybe<Scalars['ID']>>>;
  locale?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type FeaturesSections = {
  __typename?: 'FeaturesSections';
  id: Scalars['ID'];
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
  blocks?: Maybe<Array<Maybe<FeaturesSectionsBlocksDynamicZone>>>;
  locale?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  localizations?: Maybe<Array<Maybe<FeaturesSections>>>;
};


export type FeaturesSectionsLocalizationsArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};

export type FeaturesSectionsAggregator = {
  __typename?: 'FeaturesSectionsAggregator';
  count?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type FeaturesSectionsBlocksDynamicZone = ComponentBlocksFeature;


export type FeaturesSectionsConnection = {
  __typename?: 'FeaturesSectionsConnection';
  values?: Maybe<Array<Maybe<FeaturesSections>>>;
  groupBy?: Maybe<FeaturesSectionsGroupBy>;
  aggregate?: Maybe<FeaturesSectionsAggregator>;
};

export type FeaturesSectionsConnectionCreated_At = {
  __typename?: 'FeaturesSectionsConnectionCreated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<FeaturesSectionsConnection>;
};

export type FeaturesSectionsConnectionId = {
  __typename?: 'FeaturesSectionsConnectionId';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<FeaturesSectionsConnection>;
};

export type FeaturesSectionsConnectionLocale = {
  __typename?: 'FeaturesSectionsConnectionLocale';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<FeaturesSectionsConnection>;
};

export type FeaturesSectionsConnectionPublished_At = {
  __typename?: 'FeaturesSectionsConnectionPublished_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<FeaturesSectionsConnection>;
};

export type FeaturesSectionsConnectionUpdated_At = {
  __typename?: 'FeaturesSectionsConnectionUpdated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<FeaturesSectionsConnection>;
};

export type FeaturesSectionsGroupBy = {
  __typename?: 'FeaturesSectionsGroupBy';
  id?: Maybe<Array<Maybe<FeaturesSectionsConnectionId>>>;
  created_at?: Maybe<Array<Maybe<FeaturesSectionsConnectionCreated_At>>>;
  updated_at?: Maybe<Array<Maybe<FeaturesSectionsConnectionUpdated_At>>>;
  locale?: Maybe<Array<Maybe<FeaturesSectionsConnectionLocale>>>;
  published_at?: Maybe<Array<Maybe<FeaturesSectionsConnectionPublished_At>>>;
};

export type FileInfoInput = {
  name?: Maybe<Scalars['String']>;
  alternativeText?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
};

export type FileInput = {
  name: Scalars['String'];
  alternativeText?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Int']>;
  height?: Maybe<Scalars['Int']>;
  formats?: Maybe<Scalars['JSON']>;
  hash: Scalars['String'];
  ext?: Maybe<Scalars['String']>;
  mime: Scalars['String'];
  size: Scalars['Float'];
  url: Scalars['String'];
  previewUrl?: Maybe<Scalars['String']>;
  provider: Scalars['String'];
  provider_metadata?: Maybe<Scalars['JSON']>;
  related?: Maybe<Array<Maybe<Scalars['ID']>>>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type I18NLocale = {
  __typename?: 'I18NLocale';
  id: Scalars['ID'];
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
  name?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
};

export type InputId = {
  id: Scalars['ID'];
};


export type LocaleInput = {
  name?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};


export type Morph = UsersPermissionsMe | UsersPermissionsMeRole | UsersPermissionsLoginPayload | UserPermissionsPasswordPayload | FeaturesSections | FeaturesSectionsConnection | FeaturesSectionsAggregator | FeaturesSectionsGroupBy | FeaturesSectionsConnectionId | FeaturesSectionsConnectionCreated_At | FeaturesSectionsConnectionUpdated_At | FeaturesSectionsConnectionLocale | FeaturesSectionsConnectionPublished_At | CreateFeaturesSectionPayload | UpdateFeaturesSectionPayload | DeleteFeaturesSectionPayload | Navigation | NavigationConnection | NavigationAggregator | NavigationGroupBy | NavigationConnectionId | NavigationConnectionCreated_At | NavigationConnectionUpdated_At | NavigationConnectionNavigationName | NavigationConnectionLocale | NavigationConnectionPublished_At | CreateNavigationPayload | UpdateNavigationPayload | DeleteNavigationPayload | Pages | PagesConnection | PagesAggregator | PagesGroupBy | PagesConnectionId | PagesConnectionCreated_At | PagesConnectionUpdated_At | PagesConnectionPageName | PagesConnectionPath | PagesConnectionLocale | PagesConnectionPublished_At | CreatePagePayload | UpdatePagePayload | DeletePagePayload | Section | SectionConnection | SectionAggregator | SectionGroupBy | SectionConnectionId | SectionConnectionCreated_At | SectionConnectionUpdated_At | SectionConnectionTitle | SectionConnectionSubtitle | SectionConnectionPath | SectionConnectionLocale | SectionConnectionPublished_At | CreateSectionPayload | UpdateSectionPayload | DeleteSectionPayload | I18NLocale | UploadFile | UploadFileConnection | UploadFileAggregator | UploadFileAggregatorSum | UploadFileAggregatorAvg | UploadFileAggregatorMin | UploadFileAggregatorMax | UploadFileGroupBy | UploadFileConnectionId | UploadFileConnectionCreated_At | UploadFileConnectionUpdated_At | UploadFileConnectionName | UploadFileConnectionAlternativeText | UploadFileConnectionCaption | UploadFileConnectionWidth | UploadFileConnectionHeight | UploadFileConnectionFormats | UploadFileConnectionHash | UploadFileConnectionExt | UploadFileConnectionMime | UploadFileConnectionSize | UploadFileConnectionUrl | UploadFileConnectionPreviewUrl | UploadFileConnectionProvider | UploadFileConnectionProvider_Metadata | DeleteFilePayload | UsersPermissionsPermission | UsersPermissionsRole | UsersPermissionsRoleConnection | UsersPermissionsRoleAggregator | UsersPermissionsRoleGroupBy | UsersPermissionsRoleConnectionId | UsersPermissionsRoleConnectionName | UsersPermissionsRoleConnectionDescription | UsersPermissionsRoleConnectionType | CreateRolePayload | UpdateRolePayload | DeleteRolePayload | UsersPermissionsUser | UsersPermissionsUserConnection | UsersPermissionsUserAggregator | UsersPermissionsUserGroupBy | UsersPermissionsUserConnectionId | UsersPermissionsUserConnectionCreated_At | UsersPermissionsUserConnectionUpdated_At | UsersPermissionsUserConnectionUsername | UsersPermissionsUserConnectionEmail | UsersPermissionsUserConnectionProvider | UsersPermissionsUserConnectionConfirmed | UsersPermissionsUserConnectionBlocked | UsersPermissionsUserConnectionRole | CreateUserPayload | UpdateUserPayload | DeleteUserPayload | ComponentBlocksCard | ComponentBlocksFeature | ComponentBlocksHero | ComponentBlocksSingleFeature | ComponentFeatFeat | ComponentMenuLink | ComponentMenuPageLink;

export type Mutation = {
  __typename?: 'Mutation';
  createFeaturesSection?: Maybe<CreateFeaturesSectionPayload>;
  updateFeaturesSection?: Maybe<UpdateFeaturesSectionPayload>;
  deleteFeaturesSection?: Maybe<DeleteFeaturesSectionPayload>;
  createNavigation?: Maybe<CreateNavigationPayload>;
  updateNavigation?: Maybe<UpdateNavigationPayload>;
  deleteNavigation?: Maybe<DeleteNavigationPayload>;
  createPage?: Maybe<CreatePagePayload>;
  updatePage?: Maybe<UpdatePagePayload>;
  deletePage?: Maybe<DeletePagePayload>;
  createSection?: Maybe<CreateSectionPayload>;
  updateSection?: Maybe<UpdateSectionPayload>;
  deleteSection?: Maybe<DeleteSectionPayload>;
  /** Delete one file */
  deleteFile?: Maybe<DeleteFilePayload>;
  /** Create a new role */
  createRole?: Maybe<CreateRolePayload>;
  /** Update an existing role */
  updateRole?: Maybe<UpdateRolePayload>;
  /** Delete an existing role */
  deleteRole?: Maybe<DeleteRolePayload>;
  /** Create a new user */
  createUser?: Maybe<CreateUserPayload>;
  /** Update an existing user */
  updateUser?: Maybe<UpdateUserPayload>;
  /** Delete an existing user */
  deleteUser?: Maybe<DeleteUserPayload>;
  createFeaturesSectionLocalization: FeaturesSections;
  createNavigationLocalization: Navigation;
  createPageLocalization: Pages;
  createSectionLocalization: Section;
  upload: UploadFile;
  multipleUpload: Array<Maybe<UploadFile>>;
  updateFileInfo: UploadFile;
  login: UsersPermissionsLoginPayload;
  register: UsersPermissionsLoginPayload;
  forgotPassword?: Maybe<UserPermissionsPasswordPayload>;
  resetPassword?: Maybe<UsersPermissionsLoginPayload>;
  emailConfirmation?: Maybe<UsersPermissionsLoginPayload>;
};


export type MutationCreateFeaturesSectionArgs = {
  input?: Maybe<CreateFeaturesSectionInput>;
};


export type MutationUpdateFeaturesSectionArgs = {
  input?: Maybe<UpdateFeaturesSectionInput>;
};


export type MutationDeleteFeaturesSectionArgs = {
  input?: Maybe<DeleteFeaturesSectionInput>;
};


export type MutationCreateNavigationArgs = {
  input?: Maybe<CreateNavigationInput>;
};


export type MutationUpdateNavigationArgs = {
  input?: Maybe<UpdateNavigationInput>;
};


export type MutationDeleteNavigationArgs = {
  input?: Maybe<DeleteNavigationInput>;
};


export type MutationCreatePageArgs = {
  input?: Maybe<CreatePageInput>;
};


export type MutationUpdatePageArgs = {
  input?: Maybe<UpdatePageInput>;
};


export type MutationDeletePageArgs = {
  input?: Maybe<DeletePageInput>;
};


export type MutationCreateSectionArgs = {
  input?: Maybe<CreateSectionInput>;
};


export type MutationUpdateSectionArgs = {
  input?: Maybe<UpdateSectionInput>;
};


export type MutationDeleteSectionArgs = {
  input?: Maybe<DeleteSectionInput>;
};


export type MutationDeleteFileArgs = {
  input?: Maybe<DeleteFileInput>;
};


export type MutationCreateRoleArgs = {
  input?: Maybe<CreateRoleInput>;
};


export type MutationUpdateRoleArgs = {
  input?: Maybe<UpdateRoleInput>;
};


export type MutationDeleteRoleArgs = {
  input?: Maybe<DeleteRoleInput>;
};


export type MutationCreateUserArgs = {
  input?: Maybe<CreateUserInput>;
};


export type MutationUpdateUserArgs = {
  input?: Maybe<UpdateUserInput>;
};


export type MutationDeleteUserArgs = {
  input?: Maybe<DeleteUserInput>;
};


export type MutationCreateFeaturesSectionLocalizationArgs = {
  input: UpdateFeaturesSectionInput;
};


export type MutationCreateNavigationLocalizationArgs = {
  input: UpdateNavigationInput;
};


export type MutationCreatePageLocalizationArgs = {
  input: UpdatePageInput;
};


export type MutationCreateSectionLocalizationArgs = {
  input: UpdateSectionInput;
};


export type MutationUploadArgs = {
  refId?: Maybe<Scalars['ID']>;
  ref?: Maybe<Scalars['String']>;
  field?: Maybe<Scalars['String']>;
  source?: Maybe<Scalars['String']>;
  info?: Maybe<FileInfoInput>;
  file: Scalars['Upload'];
};


export type MutationMultipleUploadArgs = {
  refId?: Maybe<Scalars['ID']>;
  ref?: Maybe<Scalars['String']>;
  field?: Maybe<Scalars['String']>;
  source?: Maybe<Scalars['String']>;
  files: Array<Maybe<Scalars['Upload']>>;
};


export type MutationUpdateFileInfoArgs = {
  id: Scalars['ID'];
  info: FileInfoInput;
};


export type MutationLoginArgs = {
  input: UsersPermissionsLoginInput;
};


export type MutationRegisterArgs = {
  input: UsersPermissionsRegisterInput;
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationResetPasswordArgs = {
  password: Scalars['String'];
  passwordConfirmation: Scalars['String'];
  code: Scalars['String'];
};


export type MutationEmailConfirmationArgs = {
  confirmation: Scalars['String'];
};

export type Navigation = {
  __typename?: 'Navigation';
  id: Scalars['ID'];
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
  navigationName: Scalars['String'];
  items?: Maybe<Array<Maybe<NavigationItemsDynamicZone>>>;
  locale?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  localizations?: Maybe<Array<Maybe<Navigation>>>;
};


export type NavigationLocalizationsArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};

export type NavigationAggregator = {
  __typename?: 'NavigationAggregator';
  count?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type NavigationConnection = {
  __typename?: 'NavigationConnection';
  values?: Maybe<Array<Maybe<Navigation>>>;
  groupBy?: Maybe<NavigationGroupBy>;
  aggregate?: Maybe<NavigationAggregator>;
};

export type NavigationConnectionCreated_At = {
  __typename?: 'NavigationConnectionCreated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<NavigationConnection>;
};

export type NavigationConnectionId = {
  __typename?: 'NavigationConnectionId';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<NavigationConnection>;
};

export type NavigationConnectionLocale = {
  __typename?: 'NavigationConnectionLocale';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<NavigationConnection>;
};

export type NavigationConnectionNavigationName = {
  __typename?: 'NavigationConnectionNavigationName';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<NavigationConnection>;
};

export type NavigationConnectionPublished_At = {
  __typename?: 'NavigationConnectionPublished_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<NavigationConnection>;
};

export type NavigationConnectionUpdated_At = {
  __typename?: 'NavigationConnectionUpdated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<NavigationConnection>;
};

export type NavigationGroupBy = {
  __typename?: 'NavigationGroupBy';
  id?: Maybe<Array<Maybe<NavigationConnectionId>>>;
  created_at?: Maybe<Array<Maybe<NavigationConnectionCreated_At>>>;
  updated_at?: Maybe<Array<Maybe<NavigationConnectionUpdated_At>>>;
  navigationName?: Maybe<Array<Maybe<NavigationConnectionNavigationName>>>;
  locale?: Maybe<Array<Maybe<NavigationConnectionLocale>>>;
  published_at?: Maybe<Array<Maybe<NavigationConnectionPublished_At>>>;
};

export type NavigationInput = {
  navigationName: Scalars['String'];
  items?: Maybe<Array<Scalars['NavigationItemsDynamicZoneInput']>>;
  localizations?: Maybe<Array<Maybe<Scalars['ID']>>>;
  locale?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type NavigationItemsDynamicZone = ComponentMenuLink | ComponentMenuPageLink;


export type PageInput = {
  pageName: Scalars['String'];
  path?: Maybe<Scalars['String']>;
  sections?: Maybe<Array<Maybe<Scalars['ID']>>>;
  localizations?: Maybe<Array<Maybe<Scalars['ID']>>>;
  locale?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type Pages = {
  __typename?: 'Pages';
  id: Scalars['ID'];
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
  pageName: Scalars['String'];
  path?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  sections?: Maybe<Array<Maybe<Section>>>;
  localizations?: Maybe<Array<Maybe<Pages>>>;
};


export type PagesSectionsArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type PagesLocalizationsArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};

export type PagesAggregator = {
  __typename?: 'PagesAggregator';
  count?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type PagesConnection = {
  __typename?: 'PagesConnection';
  values?: Maybe<Array<Maybe<Pages>>>;
  groupBy?: Maybe<PagesGroupBy>;
  aggregate?: Maybe<PagesAggregator>;
};

export type PagesConnectionCreated_At = {
  __typename?: 'PagesConnectionCreated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<PagesConnection>;
};

export type PagesConnectionId = {
  __typename?: 'PagesConnectionId';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<PagesConnection>;
};

export type PagesConnectionLocale = {
  __typename?: 'PagesConnectionLocale';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<PagesConnection>;
};

export type PagesConnectionPageName = {
  __typename?: 'PagesConnectionPageName';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<PagesConnection>;
};

export type PagesConnectionPath = {
  __typename?: 'PagesConnectionPath';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<PagesConnection>;
};

export type PagesConnectionPublished_At = {
  __typename?: 'PagesConnectionPublished_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<PagesConnection>;
};

export type PagesConnectionUpdated_At = {
  __typename?: 'PagesConnectionUpdated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<PagesConnection>;
};

export type PagesGroupBy = {
  __typename?: 'PagesGroupBy';
  id?: Maybe<Array<Maybe<PagesConnectionId>>>;
  created_at?: Maybe<Array<Maybe<PagesConnectionCreated_At>>>;
  updated_at?: Maybe<Array<Maybe<PagesConnectionUpdated_At>>>;
  pageName?: Maybe<Array<Maybe<PagesConnectionPageName>>>;
  path?: Maybe<Array<Maybe<PagesConnectionPath>>>;
  locale?: Maybe<Array<Maybe<PagesConnectionLocale>>>;
  published_at?: Maybe<Array<Maybe<PagesConnectionPublished_At>>>;
};

export enum PublicationState {
  Live = 'LIVE',
  Preview = 'PREVIEW'
}

export type Query = {
  __typename?: 'Query';
  featuresSection?: Maybe<FeaturesSections>;
  featuresSections?: Maybe<Array<Maybe<FeaturesSections>>>;
  featuresSectionsConnection?: Maybe<FeaturesSectionsConnection>;
  navigation?: Maybe<Navigation>;
  navigations?: Maybe<Array<Maybe<Navigation>>>;
  navigationsConnection?: Maybe<NavigationConnection>;
  page?: Maybe<Pages>;
  pages?: Maybe<Array<Maybe<Pages>>>;
  pagesConnection?: Maybe<PagesConnection>;
  section?: Maybe<Section>;
  sections?: Maybe<Array<Maybe<Section>>>;
  sectionsConnection?: Maybe<SectionConnection>;
  files?: Maybe<Array<Maybe<UploadFile>>>;
  filesConnection?: Maybe<UploadFileConnection>;
  role?: Maybe<UsersPermissionsRole>;
  /** Retrieve all the existing roles. You can't apply filters on this query. */
  roles?: Maybe<Array<Maybe<UsersPermissionsRole>>>;
  rolesConnection?: Maybe<UsersPermissionsRoleConnection>;
  user?: Maybe<UsersPermissionsUser>;
  users?: Maybe<Array<Maybe<UsersPermissionsUser>>>;
  usersConnection?: Maybe<UsersPermissionsUserConnection>;
  me?: Maybe<UsersPermissionsMe>;
};


export type QueryFeaturesSectionArgs = {
  id: Scalars['ID'];
  publicationState?: Maybe<PublicationState>;
};


export type QueryFeaturesSectionsArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
  publicationState?: Maybe<PublicationState>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryFeaturesSectionsConnectionArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryNavigationArgs = {
  id: Scalars['ID'];
  publicationState?: Maybe<PublicationState>;
};


export type QueryNavigationsArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
  publicationState?: Maybe<PublicationState>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryNavigationsConnectionArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryPageArgs = {
  id: Scalars['ID'];
  publicationState?: Maybe<PublicationState>;
};


export type QueryPagesArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
  publicationState?: Maybe<PublicationState>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryPagesConnectionArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
  locale?: Maybe<Scalars['String']>;
};


export type QuerySectionArgs = {
  id: Scalars['ID'];
  publicationState?: Maybe<PublicationState>;
};


export type QuerySectionsArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
  publicationState?: Maybe<PublicationState>;
  locale?: Maybe<Scalars['String']>;
};


export type QuerySectionsConnectionArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryFilesArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
  publicationState?: Maybe<PublicationState>;
};


export type QueryFilesConnectionArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type QueryRoleArgs = {
  id: Scalars['ID'];
  publicationState?: Maybe<PublicationState>;
};


export type QueryRolesArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
  publicationState?: Maybe<PublicationState>;
};


export type QueryRolesConnectionArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type QueryUserArgs = {
  id: Scalars['ID'];
  publicationState?: Maybe<PublicationState>;
};


export type QueryUsersArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
  publicationState?: Maybe<PublicationState>;
};


export type QueryUsersConnectionArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};

export type RoleInput = {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  permissions?: Maybe<Array<Maybe<Scalars['ID']>>>;
  users?: Maybe<Array<Maybe<Scalars['ID']>>>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type Section = {
  __typename?: 'Section';
  id: Scalars['ID'];
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
  title?: Maybe<Scalars['String']>;
  subtitle?: Maybe<Scalars['String']>;
  blocks?: Maybe<Array<Maybe<SectionBlocksDynamicZone>>>;
  path?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  localizations?: Maybe<Array<Maybe<Section>>>;
};


export type SectionLocalizationsArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};

export type SectionAggregator = {
  __typename?: 'SectionAggregator';
  count?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type SectionBlocksDynamicZone = ComponentBlocksCard | ComponentBlocksHero | ComponentBlocksSingleFeature;


export type SectionConnection = {
  __typename?: 'SectionConnection';
  values?: Maybe<Array<Maybe<Section>>>;
  groupBy?: Maybe<SectionGroupBy>;
  aggregate?: Maybe<SectionAggregator>;
};

export type SectionConnectionCreated_At = {
  __typename?: 'SectionConnectionCreated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<SectionConnection>;
};

export type SectionConnectionId = {
  __typename?: 'SectionConnectionId';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<SectionConnection>;
};

export type SectionConnectionLocale = {
  __typename?: 'SectionConnectionLocale';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<SectionConnection>;
};

export type SectionConnectionPath = {
  __typename?: 'SectionConnectionPath';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<SectionConnection>;
};

export type SectionConnectionPublished_At = {
  __typename?: 'SectionConnectionPublished_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<SectionConnection>;
};

export type SectionConnectionSubtitle = {
  __typename?: 'SectionConnectionSubtitle';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<SectionConnection>;
};

export type SectionConnectionTitle = {
  __typename?: 'SectionConnectionTitle';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<SectionConnection>;
};

export type SectionConnectionUpdated_At = {
  __typename?: 'SectionConnectionUpdated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<SectionConnection>;
};

export type SectionGroupBy = {
  __typename?: 'SectionGroupBy';
  id?: Maybe<Array<Maybe<SectionConnectionId>>>;
  created_at?: Maybe<Array<Maybe<SectionConnectionCreated_At>>>;
  updated_at?: Maybe<Array<Maybe<SectionConnectionUpdated_At>>>;
  title?: Maybe<Array<Maybe<SectionConnectionTitle>>>;
  subtitle?: Maybe<Array<Maybe<SectionConnectionSubtitle>>>;
  path?: Maybe<Array<Maybe<SectionConnectionPath>>>;
  locale?: Maybe<Array<Maybe<SectionConnectionLocale>>>;
  published_at?: Maybe<Array<Maybe<SectionConnectionPublished_At>>>;
};

export type SectionInput = {
  title?: Maybe<Scalars['String']>;
  subtitle?: Maybe<Scalars['String']>;
  blocks?: Maybe<Array<Scalars['SectionBlocksDynamicZoneInput']>>;
  path?: Maybe<Scalars['String']>;
  localizations?: Maybe<Array<Maybe<Scalars['ID']>>>;
  locale?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};



export type UploadFile = {
  __typename?: 'UploadFile';
  id: Scalars['ID'];
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
  name: Scalars['String'];
  alternativeText?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Int']>;
  height?: Maybe<Scalars['Int']>;
  formats?: Maybe<Scalars['JSON']>;
  hash: Scalars['String'];
  ext?: Maybe<Scalars['String']>;
  mime: Scalars['String'];
  size: Scalars['Float'];
  url: Scalars['String'];
  previewUrl?: Maybe<Scalars['String']>;
  provider: Scalars['String'];
  provider_metadata?: Maybe<Scalars['JSON']>;
  related?: Maybe<Array<Maybe<Morph>>>;
};


export type UploadFileRelatedArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};

export type UploadFileAggregator = {
  __typename?: 'UploadFileAggregator';
  count?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
  sum?: Maybe<UploadFileAggregatorSum>;
  avg?: Maybe<UploadFileAggregatorAvg>;
  min?: Maybe<UploadFileAggregatorMin>;
  max?: Maybe<UploadFileAggregatorMax>;
};

export type UploadFileAggregatorAvg = {
  __typename?: 'UploadFileAggregatorAvg';
  width?: Maybe<Scalars['Float']>;
  height?: Maybe<Scalars['Float']>;
  size?: Maybe<Scalars['Float']>;
};

export type UploadFileAggregatorMax = {
  __typename?: 'UploadFileAggregatorMax';
  width?: Maybe<Scalars['Float']>;
  height?: Maybe<Scalars['Float']>;
  size?: Maybe<Scalars['Float']>;
};

export type UploadFileAggregatorMin = {
  __typename?: 'UploadFileAggregatorMin';
  width?: Maybe<Scalars['Float']>;
  height?: Maybe<Scalars['Float']>;
  size?: Maybe<Scalars['Float']>;
};

export type UploadFileAggregatorSum = {
  __typename?: 'UploadFileAggregatorSum';
  width?: Maybe<Scalars['Float']>;
  height?: Maybe<Scalars['Float']>;
  size?: Maybe<Scalars['Float']>;
};

export type UploadFileConnection = {
  __typename?: 'UploadFileConnection';
  values?: Maybe<Array<Maybe<UploadFile>>>;
  groupBy?: Maybe<UploadFileGroupBy>;
  aggregate?: Maybe<UploadFileAggregator>;
};

export type UploadFileConnectionAlternativeText = {
  __typename?: 'UploadFileConnectionAlternativeText';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionCaption = {
  __typename?: 'UploadFileConnectionCaption';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionCreated_At = {
  __typename?: 'UploadFileConnectionCreated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionExt = {
  __typename?: 'UploadFileConnectionExt';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionFormats = {
  __typename?: 'UploadFileConnectionFormats';
  key?: Maybe<Scalars['JSON']>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionHash = {
  __typename?: 'UploadFileConnectionHash';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionHeight = {
  __typename?: 'UploadFileConnectionHeight';
  key?: Maybe<Scalars['Int']>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionId = {
  __typename?: 'UploadFileConnectionId';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionMime = {
  __typename?: 'UploadFileConnectionMime';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionName = {
  __typename?: 'UploadFileConnectionName';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionPreviewUrl = {
  __typename?: 'UploadFileConnectionPreviewUrl';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionProvider = {
  __typename?: 'UploadFileConnectionProvider';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionProvider_Metadata = {
  __typename?: 'UploadFileConnectionProvider_metadata';
  key?: Maybe<Scalars['JSON']>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionSize = {
  __typename?: 'UploadFileConnectionSize';
  key?: Maybe<Scalars['Float']>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionUpdated_At = {
  __typename?: 'UploadFileConnectionUpdated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionUrl = {
  __typename?: 'UploadFileConnectionUrl';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionWidth = {
  __typename?: 'UploadFileConnectionWidth';
  key?: Maybe<Scalars['Int']>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileGroupBy = {
  __typename?: 'UploadFileGroupBy';
  id?: Maybe<Array<Maybe<UploadFileConnectionId>>>;
  created_at?: Maybe<Array<Maybe<UploadFileConnectionCreated_At>>>;
  updated_at?: Maybe<Array<Maybe<UploadFileConnectionUpdated_At>>>;
  name?: Maybe<Array<Maybe<UploadFileConnectionName>>>;
  alternativeText?: Maybe<Array<Maybe<UploadFileConnectionAlternativeText>>>;
  caption?: Maybe<Array<Maybe<UploadFileConnectionCaption>>>;
  width?: Maybe<Array<Maybe<UploadFileConnectionWidth>>>;
  height?: Maybe<Array<Maybe<UploadFileConnectionHeight>>>;
  formats?: Maybe<Array<Maybe<UploadFileConnectionFormats>>>;
  hash?: Maybe<Array<Maybe<UploadFileConnectionHash>>>;
  ext?: Maybe<Array<Maybe<UploadFileConnectionExt>>>;
  mime?: Maybe<Array<Maybe<UploadFileConnectionMime>>>;
  size?: Maybe<Array<Maybe<UploadFileConnectionSize>>>;
  url?: Maybe<Array<Maybe<UploadFileConnectionUrl>>>;
  previewUrl?: Maybe<Array<Maybe<UploadFileConnectionPreviewUrl>>>;
  provider?: Maybe<Array<Maybe<UploadFileConnectionProvider>>>;
  provider_metadata?: Maybe<Array<Maybe<UploadFileConnectionProvider_Metadata>>>;
};

export type UserInput = {
  username: Scalars['String'];
  email: Scalars['String'];
  provider?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  resetPasswordToken?: Maybe<Scalars['String']>;
  confirmationToken?: Maybe<Scalars['String']>;
  confirmed?: Maybe<Scalars['Boolean']>;
  blocked?: Maybe<Scalars['Boolean']>;
  role?: Maybe<Scalars['ID']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type UserPermissionsPasswordPayload = {
  __typename?: 'UserPermissionsPasswordPayload';
  ok: Scalars['Boolean'];
};

export type UsersPermissionsLoginInput = {
  identifier: Scalars['String'];
  password: Scalars['String'];
  provider?: Maybe<Scalars['String']>;
};

export type UsersPermissionsLoginPayload = {
  __typename?: 'UsersPermissionsLoginPayload';
  jwt?: Maybe<Scalars['String']>;
  user: UsersPermissionsMe;
};

export type UsersPermissionsMe = {
  __typename?: 'UsersPermissionsMe';
  id: Scalars['ID'];
  username: Scalars['String'];
  email: Scalars['String'];
  confirmed?: Maybe<Scalars['Boolean']>;
  blocked?: Maybe<Scalars['Boolean']>;
  role?: Maybe<UsersPermissionsMeRole>;
};

export type UsersPermissionsMeRole = {
  __typename?: 'UsersPermissionsMeRole';
  id: Scalars['ID'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type UsersPermissionsPermission = {
  __typename?: 'UsersPermissionsPermission';
  id: Scalars['ID'];
  type: Scalars['String'];
  controller: Scalars['String'];
  action: Scalars['String'];
  enabled: Scalars['Boolean'];
  policy?: Maybe<Scalars['String']>;
  role?: Maybe<UsersPermissionsRole>;
};

export type UsersPermissionsRegisterInput = {
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type UsersPermissionsRole = {
  __typename?: 'UsersPermissionsRole';
  id: Scalars['ID'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  permissions?: Maybe<Array<Maybe<UsersPermissionsPermission>>>;
  users?: Maybe<Array<Maybe<UsersPermissionsUser>>>;
};


export type UsersPermissionsRolePermissionsArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type UsersPermissionsRoleUsersArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};

export type UsersPermissionsRoleAggregator = {
  __typename?: 'UsersPermissionsRoleAggregator';
  count?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type UsersPermissionsRoleConnection = {
  __typename?: 'UsersPermissionsRoleConnection';
  values?: Maybe<Array<Maybe<UsersPermissionsRole>>>;
  groupBy?: Maybe<UsersPermissionsRoleGroupBy>;
  aggregate?: Maybe<UsersPermissionsRoleAggregator>;
};

export type UsersPermissionsRoleConnectionDescription = {
  __typename?: 'UsersPermissionsRoleConnectionDescription';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<UsersPermissionsRoleConnection>;
};

export type UsersPermissionsRoleConnectionId = {
  __typename?: 'UsersPermissionsRoleConnectionId';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<UsersPermissionsRoleConnection>;
};

export type UsersPermissionsRoleConnectionName = {
  __typename?: 'UsersPermissionsRoleConnectionName';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<UsersPermissionsRoleConnection>;
};

export type UsersPermissionsRoleConnectionType = {
  __typename?: 'UsersPermissionsRoleConnectionType';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<UsersPermissionsRoleConnection>;
};

export type UsersPermissionsRoleGroupBy = {
  __typename?: 'UsersPermissionsRoleGroupBy';
  id?: Maybe<Array<Maybe<UsersPermissionsRoleConnectionId>>>;
  name?: Maybe<Array<Maybe<UsersPermissionsRoleConnectionName>>>;
  description?: Maybe<Array<Maybe<UsersPermissionsRoleConnectionDescription>>>;
  type?: Maybe<Array<Maybe<UsersPermissionsRoleConnectionType>>>;
};

export type UsersPermissionsUser = {
  __typename?: 'UsersPermissionsUser';
  id: Scalars['ID'];
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
  username: Scalars['String'];
  email: Scalars['String'];
  provider?: Maybe<Scalars['String']>;
  confirmed?: Maybe<Scalars['Boolean']>;
  blocked?: Maybe<Scalars['Boolean']>;
  role?: Maybe<UsersPermissionsRole>;
};

export type UsersPermissionsUserAggregator = {
  __typename?: 'UsersPermissionsUserAggregator';
  count?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type UsersPermissionsUserConnection = {
  __typename?: 'UsersPermissionsUserConnection';
  values?: Maybe<Array<Maybe<UsersPermissionsUser>>>;
  groupBy?: Maybe<UsersPermissionsUserGroupBy>;
  aggregate?: Maybe<UsersPermissionsUserAggregator>;
};

export type UsersPermissionsUserConnectionBlocked = {
  __typename?: 'UsersPermissionsUserConnectionBlocked';
  key?: Maybe<Scalars['Boolean']>;
  connection?: Maybe<UsersPermissionsUserConnection>;
};

export type UsersPermissionsUserConnectionConfirmed = {
  __typename?: 'UsersPermissionsUserConnectionConfirmed';
  key?: Maybe<Scalars['Boolean']>;
  connection?: Maybe<UsersPermissionsUserConnection>;
};

export type UsersPermissionsUserConnectionCreated_At = {
  __typename?: 'UsersPermissionsUserConnectionCreated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<UsersPermissionsUserConnection>;
};

export type UsersPermissionsUserConnectionEmail = {
  __typename?: 'UsersPermissionsUserConnectionEmail';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<UsersPermissionsUserConnection>;
};

export type UsersPermissionsUserConnectionId = {
  __typename?: 'UsersPermissionsUserConnectionId';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<UsersPermissionsUserConnection>;
};

export type UsersPermissionsUserConnectionProvider = {
  __typename?: 'UsersPermissionsUserConnectionProvider';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<UsersPermissionsUserConnection>;
};

export type UsersPermissionsUserConnectionRole = {
  __typename?: 'UsersPermissionsUserConnectionRole';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<UsersPermissionsUserConnection>;
};

export type UsersPermissionsUserConnectionUpdated_At = {
  __typename?: 'UsersPermissionsUserConnectionUpdated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<UsersPermissionsUserConnection>;
};

export type UsersPermissionsUserConnectionUsername = {
  __typename?: 'UsersPermissionsUserConnectionUsername';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<UsersPermissionsUserConnection>;
};

export type UsersPermissionsUserGroupBy = {
  __typename?: 'UsersPermissionsUserGroupBy';
  id?: Maybe<Array<Maybe<UsersPermissionsUserConnectionId>>>;
  created_at?: Maybe<Array<Maybe<UsersPermissionsUserConnectionCreated_At>>>;
  updated_at?: Maybe<Array<Maybe<UsersPermissionsUserConnectionUpdated_At>>>;
  username?: Maybe<Array<Maybe<UsersPermissionsUserConnectionUsername>>>;
  email?: Maybe<Array<Maybe<UsersPermissionsUserConnectionEmail>>>;
  provider?: Maybe<Array<Maybe<UsersPermissionsUserConnectionProvider>>>;
  confirmed?: Maybe<Array<Maybe<UsersPermissionsUserConnectionConfirmed>>>;
  blocked?: Maybe<Array<Maybe<UsersPermissionsUserConnectionBlocked>>>;
  role?: Maybe<Array<Maybe<UsersPermissionsUserConnectionRole>>>;
};

export type CreateFeaturesSectionInput = {
  data?: Maybe<FeaturesSectionInput>;
};

export type CreateFeaturesSectionPayload = {
  __typename?: 'createFeaturesSectionPayload';
  featuresSection?: Maybe<FeaturesSections>;
};

export type CreateNavigationInput = {
  data?: Maybe<NavigationInput>;
};

export type CreateNavigationPayload = {
  __typename?: 'createNavigationPayload';
  navigation?: Maybe<Navigation>;
};

export type CreatePageInput = {
  data?: Maybe<PageInput>;
};

export type CreatePagePayload = {
  __typename?: 'createPagePayload';
  page?: Maybe<Pages>;
};

export type CreateRoleInput = {
  data?: Maybe<RoleInput>;
};

export type CreateRolePayload = {
  __typename?: 'createRolePayload';
  role?: Maybe<UsersPermissionsRole>;
};

export type CreateSectionInput = {
  data?: Maybe<SectionInput>;
};

export type CreateSectionPayload = {
  __typename?: 'createSectionPayload';
  section?: Maybe<Section>;
};

export type CreateUserInput = {
  data?: Maybe<UserInput>;
};

export type CreateUserPayload = {
  __typename?: 'createUserPayload';
  user?: Maybe<UsersPermissionsUser>;
};

export type DeleteFeaturesSectionInput = {
  where?: Maybe<InputId>;
};

export type DeleteFeaturesSectionPayload = {
  __typename?: 'deleteFeaturesSectionPayload';
  featuresSection?: Maybe<FeaturesSections>;
};

export type DeleteFileInput = {
  where?: Maybe<InputId>;
};

export type DeleteFilePayload = {
  __typename?: 'deleteFilePayload';
  file?: Maybe<UploadFile>;
};

export type DeleteNavigationInput = {
  where?: Maybe<InputId>;
};

export type DeleteNavigationPayload = {
  __typename?: 'deleteNavigationPayload';
  navigation?: Maybe<Navigation>;
};

export type DeletePageInput = {
  where?: Maybe<InputId>;
};

export type DeletePagePayload = {
  __typename?: 'deletePagePayload';
  page?: Maybe<Pages>;
};

export type DeleteRoleInput = {
  where?: Maybe<InputId>;
};

export type DeleteRolePayload = {
  __typename?: 'deleteRolePayload';
  role?: Maybe<UsersPermissionsRole>;
};

export type DeleteSectionInput = {
  where?: Maybe<InputId>;
};

export type DeleteSectionPayload = {
  __typename?: 'deleteSectionPayload';
  section?: Maybe<Section>;
};

export type DeleteUserInput = {
  where?: Maybe<InputId>;
};

export type DeleteUserPayload = {
  __typename?: 'deleteUserPayload';
  user?: Maybe<UsersPermissionsUser>;
};

export type EditComponentBlocksCardInput = {
  id?: Maybe<Scalars['ID']>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['ID']>;
  projectLink?: Maybe<Scalars['String']>;
};

export type EditComponentBlocksFeatureInput = {
  id?: Maybe<Scalars['ID']>;
  featureTitle?: Maybe<Scalars['String']>;
  featureDescription?: Maybe<Scalars['String']>;
  feat?: Maybe<Array<Maybe<EditComponentFeatFeatInput>>>;
};

export type EditComponentBlocksHeroInput = {
  id?: Maybe<Scalars['ID']>;
  title?: Maybe<Scalars['String']>;
  subtitle?: Maybe<Scalars['String']>;
};

export type EditComponentBlocksSingleFeatureInput = {
  id?: Maybe<Scalars['ID']>;
  description?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['ID']>;
  serviceLink?: Maybe<Scalars['String']>;
};

export type EditComponentFeatFeatInput = {
  id?: Maybe<Scalars['ID']>;
  featDescription?: Maybe<Scalars['String']>;
};

export type EditComponentMenuLinkInput = {
  id?: Maybe<Scalars['ID']>;
  linkName?: Maybe<Scalars['String']>;
  path?: Maybe<Scalars['ID']>;
};

export type EditComponentMenuPageLinkInput = {
  id?: Maybe<Scalars['ID']>;
  pageLinkName?: Maybe<Scalars['String']>;
  path?: Maybe<Scalars['ID']>;
};

export type EditFeaturesSectionInput = {
  blocks?: Maybe<Array<Scalars['FeaturesSectionsBlocksDynamicZoneInput']>>;
  localizations?: Maybe<Array<Maybe<Scalars['ID']>>>;
  locale?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditFileInput = {
  name?: Maybe<Scalars['String']>;
  alternativeText?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Int']>;
  height?: Maybe<Scalars['Int']>;
  formats?: Maybe<Scalars['JSON']>;
  hash?: Maybe<Scalars['String']>;
  ext?: Maybe<Scalars['String']>;
  mime?: Maybe<Scalars['String']>;
  size?: Maybe<Scalars['Float']>;
  url?: Maybe<Scalars['String']>;
  previewUrl?: Maybe<Scalars['String']>;
  provider?: Maybe<Scalars['String']>;
  provider_metadata?: Maybe<Scalars['JSON']>;
  related?: Maybe<Array<Maybe<Scalars['ID']>>>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditLocaleInput = {
  name?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditNavigationInput = {
  navigationName?: Maybe<Scalars['String']>;
  items?: Maybe<Array<Scalars['NavigationItemsDynamicZoneInput']>>;
  localizations?: Maybe<Array<Maybe<Scalars['ID']>>>;
  locale?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditPageInput = {
  pageName?: Maybe<Scalars['String']>;
  path?: Maybe<Scalars['String']>;
  sections?: Maybe<Array<Maybe<Scalars['ID']>>>;
  localizations?: Maybe<Array<Maybe<Scalars['ID']>>>;
  locale?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditRoleInput = {
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  permissions?: Maybe<Array<Maybe<Scalars['ID']>>>;
  users?: Maybe<Array<Maybe<Scalars['ID']>>>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditSectionInput = {
  title?: Maybe<Scalars['String']>;
  subtitle?: Maybe<Scalars['String']>;
  blocks?: Maybe<Array<Scalars['SectionBlocksDynamicZoneInput']>>;
  path?: Maybe<Scalars['String']>;
  localizations?: Maybe<Array<Maybe<Scalars['ID']>>>;
  locale?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditUserInput = {
  username?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  provider?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  resetPasswordToken?: Maybe<Scalars['String']>;
  confirmationToken?: Maybe<Scalars['String']>;
  confirmed?: Maybe<Scalars['Boolean']>;
  blocked?: Maybe<Scalars['Boolean']>;
  role?: Maybe<Scalars['ID']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type UpdateFeaturesSectionInput = {
  where?: Maybe<InputId>;
  data?: Maybe<EditFeaturesSectionInput>;
};

export type UpdateFeaturesSectionPayload = {
  __typename?: 'updateFeaturesSectionPayload';
  featuresSection?: Maybe<FeaturesSections>;
};

export type UpdateNavigationInput = {
  where?: Maybe<InputId>;
  data?: Maybe<EditNavigationInput>;
};

export type UpdateNavigationPayload = {
  __typename?: 'updateNavigationPayload';
  navigation?: Maybe<Navigation>;
};

export type UpdatePageInput = {
  where?: Maybe<InputId>;
  data?: Maybe<EditPageInput>;
};

export type UpdatePagePayload = {
  __typename?: 'updatePagePayload';
  page?: Maybe<Pages>;
};

export type UpdateRoleInput = {
  where?: Maybe<InputId>;
  data?: Maybe<EditRoleInput>;
};

export type UpdateRolePayload = {
  __typename?: 'updateRolePayload';
  role?: Maybe<UsersPermissionsRole>;
};

export type UpdateSectionInput = {
  where?: Maybe<InputId>;
  data?: Maybe<EditSectionInput>;
};

export type UpdateSectionPayload = {
  __typename?: 'updateSectionPayload';
  section?: Maybe<Section>;
};

export type UpdateUserInput = {
  where?: Maybe<InputId>;
  data?: Maybe<EditUserInput>;
};

export type UpdateUserPayload = {
  __typename?: 'updateUserPayload';
  user?: Maybe<UsersPermissionsUser>;
};

export type GetNavItemsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetNavItemsQuery = (
  { __typename?: 'Query' }
  & { navigations?: Maybe<Array<Maybe<(
    { __typename?: 'Navigation' }
    & { items?: Maybe<Array<Maybe<(
      { __typename: 'ComponentMenuLink' }
      & Pick<ComponentMenuLink, 'linkName'>
      & { path?: Maybe<(
        { __typename?: 'Pages' }
        & Pick<Pages, 'pageName'>
      )> }
    ) | (
      { __typename: 'ComponentMenuPageLink' }
      & Pick<ComponentMenuPageLink, 'pageLinkName'>
      & { path?: Maybe<(
        { __typename?: 'Pages' }
        & Pick<Pages, 'pageName'>
      )> }
    )>>> }
  )>>> }
);

export type GetPageDataQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPageDataQuery = (
  { __typename?: 'Query' }
  & { pages?: Maybe<Array<Maybe<(
    { __typename?: 'Pages' }
    & Pick<Pages, 'id' | 'pageName' | 'created_at' | 'updated_at' | 'path' | 'locale'>
    & { sections?: Maybe<Array<Maybe<(
      { __typename?: 'Section' }
      & Pick<Section, 'title' | 'subtitle'>
      & { blocks?: Maybe<Array<Maybe<(
        { __typename?: 'ComponentBlocksCard' }
        & Pick<ComponentBlocksCard, 'id' | 'title' | 'description' | 'projectLink'>
        & { image?: Maybe<(
          { __typename?: 'UploadFile' }
          & Pick<UploadFile, 'url'>
        )> }
      ) | (
        { __typename?: 'ComponentBlocksHero' }
        & Pick<ComponentBlocksHero, 'id' | 'title' | 'subtitle'>
      ) | (
        { __typename?: 'ComponentBlocksSingleFeature' }
        & Pick<ComponentBlocksSingleFeature, 'id' | 'description' | 'title' | 'serviceLink'>
        & { image?: Maybe<(
          { __typename?: 'UploadFile' }
          & Pick<UploadFile, 'url'>
        )> }
      )>>> }
    )>>> }
  )>>> }
);

export type GetFeaturesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFeaturesQuery = (
  { __typename?: 'Query' }
  & { featuresSections?: Maybe<Array<Maybe<(
    { __typename?: 'FeaturesSections' }
    & { blocks?: Maybe<Array<Maybe<(
      { __typename?: 'ComponentBlocksFeature' }
      & Pick<ComponentBlocksFeature, 'featureTitle' | 'featureDescription'>
      & { feat?: Maybe<Array<Maybe<(
        { __typename?: 'ComponentFeatFeat' }
        & Pick<ComponentFeatFeat, 'featDescription'>
      )>>> }
    )>>> }
  )>>> }
);

export type GetPagesQueryVariables = Exact<{
  where?: Maybe<Scalars['JSON']>;
  locale?: Maybe<Scalars['String']>;
}>;


export type GetPagesQuery = (
  { __typename?: 'Query' }
  & { pages?: Maybe<Array<Maybe<(
    { __typename?: 'Pages' }
    & Pick<Pages, 'id' | 'locale' | 'pageName' | 'path'>
    & { sections?: Maybe<Array<Maybe<(
      { __typename?: 'Section' }
      & Pick<Section, 'title' | 'subtitle'>
      & { blocks?: Maybe<Array<Maybe<(
        { __typename?: 'ComponentBlocksCard' }
        & Pick<ComponentBlocksCard, 'id' | 'title' | 'description' | 'projectLink'>
        & { image?: Maybe<(
          { __typename?: 'UploadFile' }
          & Pick<UploadFile, 'url'>
        )> }
      ) | (
        { __typename?: 'ComponentBlocksHero' }
        & Pick<ComponentBlocksHero, 'id' | 'title' | 'subtitle'>
      ) | (
        { __typename?: 'ComponentBlocksSingleFeature' }
        & Pick<ComponentBlocksSingleFeature, 'id' | 'description' | 'title' | 'serviceLink'>
        & { image?: Maybe<(
          { __typename?: 'UploadFile' }
          & Pick<UploadFile, 'url'>
        )> }
      )>>> }
    )>>> }
  )>>> }
);

export type GetSectionsQueryVariables = Exact<{
  where?: Maybe<Scalars['JSON']>;
  locale?: Maybe<Scalars['String']>;
}>;


export type GetSectionsQuery = (
  { __typename?: 'Query' }
  & { sections?: Maybe<Array<Maybe<(
    { __typename?: 'Section' }
    & Pick<Section, 'id' | 'title' | 'subtitle' | 'locale' | 'path'>
    & { blocks?: Maybe<Array<Maybe<(
      { __typename?: 'ComponentBlocksCard' }
      & Pick<ComponentBlocksCard, 'id' | 'title' | 'description' | 'projectLink'>
      & { image?: Maybe<(
        { __typename?: 'UploadFile' }
        & Pick<UploadFile, 'url'>
      )> }
    ) | (
      { __typename?: 'ComponentBlocksHero' }
      & Pick<ComponentBlocksHero, 'id' | 'title' | 'subtitle'>
    ) | (
      { __typename?: 'ComponentBlocksSingleFeature' }
      & Pick<ComponentBlocksSingleFeature, 'id' | 'title' | 'description' | 'serviceLink'>
      & { image?: Maybe<(
        { __typename?: 'UploadFile' }
        & Pick<UploadFile, 'url'>
      )> }
    )>>> }
  )>>> }
);

export type UpdateSectionMutationVariables = Exact<{
  input?: Maybe<UpdateSectionInput>;
}>;


export type UpdateSectionMutation = (
  { __typename?: 'Mutation' }
  & { updateSection?: Maybe<(
    { __typename?: 'updateSectionPayload' }
    & { section?: Maybe<(
      { __typename?: 'Section' }
      & Pick<Section, 'id'>
    )> }
  )> }
);

export type CreatePageMutationVariables = Exact<{
  input?: Maybe<CreatePageInput>;
}>;


export type CreatePageMutation = (
  { __typename?: 'Mutation' }
  & { createPage?: Maybe<(
    { __typename?: 'createPagePayload' }
    & { page?: Maybe<(
      { __typename?: 'Pages' }
      & Pick<Pages, 'id'>
    )> }
  )> }
);

export type UpdatePageMutationVariables = Exact<{
  input?: Maybe<UpdatePageInput>;
}>;


export type UpdatePageMutation = (
  { __typename?: 'Mutation' }
  & { updatePage?: Maybe<(
    { __typename?: 'updatePagePayload' }
    & { page?: Maybe<(
      { __typename?: 'Pages' }
      & Pick<Pages, 'id'>
    )> }
  )> }
);


export const GetNavItems = `
    query GetNavItems {
  navigations {
    items {
      ... on ComponentMenuPageLink {
        pageLinkName
        __typename
        path {
          pageName
        }
      }
      ... on ComponentMenuLink {
        linkName
        __typename
        path {
          pageName
        }
      }
    }
  }
}
    `;
export const GetPageData = `
    query getPageData {
  pages {
    id
    pageName
    created_at
    updated_at
    path
    locale
    sections {
      title
      subtitle
      blocks {
        ... on ComponentBlocksHero {
          id
          title
          subtitle
        }
        ... on ComponentBlocksSingleFeature {
          id
          description
          title
          serviceLink
          image {
            url
          }
        }
        ... on ComponentBlocksCard {
          id
          title
          description
          projectLink
          image {
            url
          }
        }
      }
    }
  }
}
    `;
export const GetFeatures = `
    query GetFeatures {
  featuresSections {
    blocks {
      ... on ComponentBlocksFeature {
        featureTitle
        featureDescription
        feat {
          ... on ComponentFeatFeat {
            featDescription
          }
        }
      }
    }
  }
}
    `;
export const GetPages = `
    query getPages($where: JSON, $locale: String) {
  pages(where: $where, locale: $locale) {
    id
    locale
    pageName
    path
    sections {
      title
      subtitle
      blocks {
        ... on ComponentBlocksHero {
          id
          title
          subtitle
        }
        ... on ComponentBlocksSingleFeature {
          id
          description
          title
          serviceLink
          image {
            url
          }
        }
        ... on ComponentBlocksCard {
          id
          title
          description
          projectLink
          image {
            url
          }
        }
      }
    }
  }
}
    `;
export const GetSections = `
    query GetSections($where: JSON, $locale: String) {
  sections(where: $where, locale: $locale) {
    id
    title
    subtitle
    locale
    path
    blocks {
      ... on ComponentBlocksHero {
        id
        title
        subtitle
      }
      ... on ComponentBlocksSingleFeature {
        id
        title
        description
        serviceLink
        image {
          url
        }
      }
      ... on ComponentBlocksCard {
        id
        title
        description
        projectLink
        image {
          url
        }
      }
    }
  }
}
    `;
export const UpdateSection = `
    mutation UpdateSection($input: updateSectionInput) {
  updateSection(input: $input) {
    section {
      id
    }
  }
}
    `;
export const CreatePage = `
    mutation CreatePage($input: createPageInput) {
  createPage(input: $input) {
    page {
      id
    }
  }
}
    `;
export const UpdatePage = `
    mutation UpdatePage($input: updatePageInput) {
  updatePage(input: $input) {
    page {
      id
    }
  }
}
    `;