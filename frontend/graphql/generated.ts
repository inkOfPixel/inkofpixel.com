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
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** The `Long` scalar type represents 52-bit integers */
  Long: any;
  /** Input type for dynamic zone sections of Page */
  PageSectionsDynamicZoneInput: any;
  /** Input type for dynamic zone blocks of Project */
  ProjectBlocksDynamicZoneInput: any;
  /** A time string with format: HH:mm:ss.SSS */
  Time: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type AdminUser = {
  __typename?: 'AdminUser';
  firstname: Scalars['String'];
  id: Scalars['ID'];
  lastname: Scalars['String'];
  username?: Maybe<Scalars['String']>;
};

export type ComponentBlocksCard = {
  __typename?: 'ComponentBlocksCard';
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  image?: Maybe<UploadFile>;
  label: Scalars['String'];
  title?: Maybe<Scalars['String']>;
  url: Scalars['String'];
};

export type ComponentBlocksCardInput = {
  description?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['ID']>;
  label: Scalars['String'];
  title?: Maybe<Scalars['String']>;
  url: Scalars['String'];
};

export type ComponentBlocksLink = {
  __typename?: 'ComponentBlocksLink';
  id: Scalars['ID'];
  label?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type ComponentBlocksLinkInput = {
  label?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type ComponentBlocksSingleFeature = {
  __typename?: 'ComponentBlocksSingleFeature';
  bubbleColor?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  image?: Maybe<UploadFile>;
  label: Scalars['String'];
  title?: Maybe<Scalars['String']>;
  url: Scalars['String'];
};

export type ComponentBlocksSingleFeatureInput = {
  bubbleColor?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['ID']>;
  label: Scalars['String'];
  title?: Maybe<Scalars['String']>;
  url: Scalars['String'];
};

export type ComponentBlocksSocialBubble = {
  __typename?: 'ComponentBlocksSocialBubble';
  bubbleColor?: Maybe<Scalars['String']>;
  bubbleHoverColor?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  image?: Maybe<UploadFile>;
  url?: Maybe<Scalars['String']>;
};

export type ComponentBlocksSocialBubbleInput = {
  bubbleColor?: Maybe<Scalars['String']>;
  bubbleHoverColor?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['ID']>;
  url?: Maybe<Scalars['String']>;
};

export type ComponentGlobalCompanyData = {
  __typename?: 'ComponentGlobalCompanyData';
  additionalLegalInfo?: Maybe<Scalars['String']>;
  capital?: Maybe<Scalars['Long']>;
  companyName?: Maybe<Scalars['String']>;
  copyright?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  legalCompanyName?: Maybe<Scalars['String']>;
  locations?: Maybe<Array<Maybe<ComponentGlobalHeadquarter>>>;
  primaryEmail?: Maybe<Scalars['String']>;
  vatId?: Maybe<Scalars['String']>;
};

export type ComponentGlobalCompanyDatumInput = {
  additionalLegalInfo?: Maybe<Scalars['String']>;
  capital?: Maybe<Scalars['Long']>;
  companyName?: Maybe<Scalars['String']>;
  copyright?: Maybe<Scalars['String']>;
  legalCompanyName?: Maybe<Scalars['String']>;
  locations?: Maybe<Array<Maybe<ComponentGlobalHeadquarterInput>>>;
  primaryEmail?: Maybe<Scalars['String']>;
  vatId?: Maybe<Scalars['String']>;
};

export type ComponentGlobalFooter = {
  __typename?: 'ComponentGlobalFooter';
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
};

export type ComponentGlobalFooterInput = {
  description?: Maybe<Scalars['String']>;
};

export type ComponentGlobalHeadquarter = {
  __typename?: 'ComponentGlobalHeadquarter';
  cap?: Maybe<Scalars['Long']>;
  city?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  province?: Maybe<Scalars['String']>;
  provinceInitials?: Maybe<Scalars['String']>;
  street?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type ComponentGlobalHeadquarterInput = {
  cap?: Maybe<Scalars['Long']>;
  city?: Maybe<Scalars['String']>;
  province?: Maybe<Scalars['String']>;
  provinceInitials?: Maybe<Scalars['String']>;
  street?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type ComponentGlobalTopbar = {
  __typename?: 'ComponentGlobalTopbar';
  id: Scalars['ID'];
  menu?: Maybe<Menu>;
};

export type ComponentGlobalTopbarInput = {
  menu?: Maybe<Scalars['ID']>;
};

export type ComponentProjectBlockquoteBlock = {
  __typename?: 'ComponentProjectBlockquoteBlock';
  author?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  text?: Maybe<Scalars['String']>;
};

export type ComponentProjectBlockquoteBlockInput = {
  author?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
};

export type ComponentProjectImageBlock = {
  __typename?: 'ComponentProjectImageBlock';
  id: Scalars['ID'];
  image?: Maybe<UploadFile>;
};

export type ComponentProjectImageBlockInput = {
  image?: Maybe<Scalars['ID']>;
};

export type ComponentProjectParagraphBlock = {
  __typename?: 'ComponentProjectParagraphBlock';
  id: Scalars['ID'];
  text?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type ComponentProjectParagraphBlockInput = {
  text?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type ComponentSectionCardSection = {
  __typename?: 'ComponentSectionCardSection';
  id: Scalars['ID'];
  sectionTitle?: Maybe<Scalars['String']>;
  sections?: Maybe<Array<Maybe<ComponentBlocksCard>>>;
  subtitle?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type ComponentSectionCardSectionInput = {
  sectionTitle?: Maybe<Scalars['String']>;
  sections?: Maybe<Array<Maybe<ComponentBlocksCardInput>>>;
  subtitle?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type ComponentSectionContactsSection = {
  __typename?: 'ComponentSectionContactsSection';
  email?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  sectionTitle?: Maybe<Scalars['String']>;
  socialBubbles?: Maybe<Array<Maybe<ComponentBlocksSocialBubble>>>;
  subtitle?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type ComponentSectionContactsSectionInput = {
  email?: Maybe<Scalars['String']>;
  sectionTitle?: Maybe<Scalars['String']>;
  socialBubbles?: Maybe<Array<Maybe<ComponentBlocksSocialBubbleInput>>>;
  subtitle?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type ComponentSectionHeroSection = {
  __typename?: 'ComponentSectionHeroSection';
  areBubblesActive?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  subtitle?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type ComponentSectionHeroSectionInput = {
  areBubblesActive?: Maybe<Scalars['Boolean']>;
  subtitle?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type ComponentSectionSimpleSection = {
  __typename?: 'ComponentSectionSimpleSection';
  id: Scalars['ID'];
  sectionTitle?: Maybe<Scalars['String']>;
  sectionTitleColor?: Maybe<Scalars['String']>;
  subtitle?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type ComponentSectionSimpleSectionInput = {
  sectionTitle?: Maybe<Scalars['String']>;
  sectionTitleColor?: Maybe<Scalars['String']>;
  subtitle?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type ComponentSectionSingleFeatureSection = {
  __typename?: 'ComponentSectionSingleFeatureSection';
  id: Scalars['ID'];
  sectionTitle?: Maybe<Scalars['String']>;
  sections?: Maybe<Array<Maybe<ComponentBlocksSingleFeature>>>;
  subtitle?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type ComponentSectionSingleFeatureSectionInput = {
  sectionTitle?: Maybe<Scalars['String']>;
  sections?: Maybe<Array<Maybe<ComponentBlocksSingleFeatureInput>>>;
  subtitle?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};



export type FileInfoInput = {
  alternativeText?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type FileInput = {
  alternativeText?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
  created_by?: Maybe<Scalars['ID']>;
  ext?: Maybe<Scalars['String']>;
  formats?: Maybe<Scalars['JSON']>;
  hash: Scalars['String'];
  height?: Maybe<Scalars['Int']>;
  mime: Scalars['String'];
  name: Scalars['String'];
  previewUrl?: Maybe<Scalars['String']>;
  provider: Scalars['String'];
  provider_metadata?: Maybe<Scalars['JSON']>;
  related?: Maybe<Array<Maybe<Scalars['ID']>>>;
  size: Scalars['Float'];
  updated_by?: Maybe<Scalars['ID']>;
  url: Scalars['String'];
  width?: Maybe<Scalars['Int']>;
};

export type FormMessageInput = {
  created_by?: Maybe<Scalars['ID']>;
  email?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type FormMessages = {
  __typename?: 'FormMessages';
  created_at: Scalars['DateTime'];
  email?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  message?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  updated_at: Scalars['DateTime'];
};

export type FormMessagesAggregator = {
  __typename?: 'FormMessagesAggregator';
  count?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type FormMessagesConnection = {
  __typename?: 'FormMessagesConnection';
  aggregate?: Maybe<FormMessagesAggregator>;
  groupBy?: Maybe<FormMessagesGroupBy>;
  values?: Maybe<Array<Maybe<FormMessages>>>;
};

export type FormMessagesConnectionCreated_At = {
  __typename?: 'FormMessagesConnectionCreated_at';
  connection?: Maybe<FormMessagesConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type FormMessagesConnectionEmail = {
  __typename?: 'FormMessagesConnectionEmail';
  connection?: Maybe<FormMessagesConnection>;
  key?: Maybe<Scalars['String']>;
};

export type FormMessagesConnectionId = {
  __typename?: 'FormMessagesConnectionId';
  connection?: Maybe<FormMessagesConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type FormMessagesConnectionMessage = {
  __typename?: 'FormMessagesConnectionMessage';
  connection?: Maybe<FormMessagesConnection>;
  key?: Maybe<Scalars['String']>;
};

export type FormMessagesConnectionName = {
  __typename?: 'FormMessagesConnectionName';
  connection?: Maybe<FormMessagesConnection>;
  key?: Maybe<Scalars['String']>;
};

export type FormMessagesConnectionPublished_At = {
  __typename?: 'FormMessagesConnectionPublished_at';
  connection?: Maybe<FormMessagesConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type FormMessagesConnectionUpdated_At = {
  __typename?: 'FormMessagesConnectionUpdated_at';
  connection?: Maybe<FormMessagesConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type FormMessagesGroupBy = {
  __typename?: 'FormMessagesGroupBy';
  created_at?: Maybe<Array<Maybe<FormMessagesConnectionCreated_At>>>;
  email?: Maybe<Array<Maybe<FormMessagesConnectionEmail>>>;
  id?: Maybe<Array<Maybe<FormMessagesConnectionId>>>;
  message?: Maybe<Array<Maybe<FormMessagesConnectionMessage>>>;
  name?: Maybe<Array<Maybe<FormMessagesConnectionName>>>;
  published_at?: Maybe<Array<Maybe<FormMessagesConnectionPublished_At>>>;
  updated_at?: Maybe<Array<Maybe<FormMessagesConnectionUpdated_At>>>;
};

export type Global = {
  __typename?: 'Global';
  companyData?: Maybe<ComponentGlobalCompanyData>;
  created_at: Scalars['DateTime'];
  footer?: Maybe<ComponentGlobalFooter>;
  id: Scalars['ID'];
  published_at?: Maybe<Scalars['DateTime']>;
  topbar?: Maybe<ComponentGlobalTopbar>;
  updated_at: Scalars['DateTime'];
};

export type GlobalInput = {
  companyData?: Maybe<ComponentGlobalCompanyDatumInput>;
  created_by?: Maybe<Scalars['ID']>;
  footer?: Maybe<ComponentGlobalFooterInput>;
  published_at?: Maybe<Scalars['DateTime']>;
  topbar?: Maybe<ComponentGlobalTopbarInput>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type I18NLocale = {
  __typename?: 'I18NLocale';
  code?: Maybe<Scalars['String']>;
  created_at: Scalars['DateTime'];
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  updated_at: Scalars['DateTime'];
};

export type InputId = {
  id: Scalars['ID'];
};


export type LocaleInput = {
  code?: Maybe<Scalars['String']>;
  created_by?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  updated_by?: Maybe<Scalars['ID']>;
};


export type Menu = {
  __typename?: 'Menu';
  created_at: Scalars['DateTime'];
  id: Scalars['ID'];
  links?: Maybe<Array<Maybe<ComponentBlocksLink>>>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<Array<Maybe<Menu>>>;
  published_at?: Maybe<Scalars['DateTime']>;
  title: Scalars['String'];
  updated_at: Scalars['DateTime'];
};


export type MenuLocalizationsArgs = {
  limit?: Maybe<Scalars['Int']>;
  sort?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};

export type MenuAggregator = {
  __typename?: 'MenuAggregator';
  count?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type MenuConnection = {
  __typename?: 'MenuConnection';
  aggregate?: Maybe<MenuAggregator>;
  groupBy?: Maybe<MenuGroupBy>;
  values?: Maybe<Array<Maybe<Menu>>>;
};

export type MenuConnectionCreated_At = {
  __typename?: 'MenuConnectionCreated_at';
  connection?: Maybe<MenuConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type MenuConnectionId = {
  __typename?: 'MenuConnectionId';
  connection?: Maybe<MenuConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type MenuConnectionLocale = {
  __typename?: 'MenuConnectionLocale';
  connection?: Maybe<MenuConnection>;
  key?: Maybe<Scalars['String']>;
};

export type MenuConnectionPublished_At = {
  __typename?: 'MenuConnectionPublished_at';
  connection?: Maybe<MenuConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type MenuConnectionTitle = {
  __typename?: 'MenuConnectionTitle';
  connection?: Maybe<MenuConnection>;
  key?: Maybe<Scalars['String']>;
};

export type MenuConnectionUpdated_At = {
  __typename?: 'MenuConnectionUpdated_at';
  connection?: Maybe<MenuConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type MenuGroupBy = {
  __typename?: 'MenuGroupBy';
  created_at?: Maybe<Array<Maybe<MenuConnectionCreated_At>>>;
  id?: Maybe<Array<Maybe<MenuConnectionId>>>;
  locale?: Maybe<Array<Maybe<MenuConnectionLocale>>>;
  published_at?: Maybe<Array<Maybe<MenuConnectionPublished_At>>>;
  title?: Maybe<Array<Maybe<MenuConnectionTitle>>>;
  updated_at?: Maybe<Array<Maybe<MenuConnectionUpdated_At>>>;
};

export type MenuInput = {
  created_by?: Maybe<Scalars['ID']>;
  links?: Maybe<Array<Maybe<ComponentBlocksLinkInput>>>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<Array<Maybe<Scalars['ID']>>>;
  published_at?: Maybe<Scalars['DateTime']>;
  title: Scalars['String'];
  updated_by?: Maybe<Scalars['ID']>;
};

export type Morph = ComponentBlocksCard | ComponentBlocksLink | ComponentBlocksSingleFeature | ComponentBlocksSocialBubble | ComponentGlobalCompanyData | ComponentGlobalFooter | ComponentGlobalHeadquarter | ComponentGlobalTopbar | ComponentProjectBlockquoteBlock | ComponentProjectImageBlock | ComponentProjectParagraphBlock | ComponentSectionCardSection | ComponentSectionContactsSection | ComponentSectionHeroSection | ComponentSectionSimpleSection | ComponentSectionSingleFeatureSection | FormMessages | FormMessagesAggregator | FormMessagesConnection | FormMessagesConnectionCreated_At | FormMessagesConnectionEmail | FormMessagesConnectionId | FormMessagesConnectionMessage | FormMessagesConnectionName | FormMessagesConnectionPublished_At | FormMessagesConnectionUpdated_At | FormMessagesGroupBy | Global | I18NLocale | Menu | MenuAggregator | MenuConnection | MenuConnectionCreated_At | MenuConnectionId | MenuConnectionLocale | MenuConnectionPublished_At | MenuConnectionTitle | MenuConnectionUpdated_At | MenuGroupBy | Page | PageAggregator | PageConnection | PageConnectionCreated_At | PageConnectionId | PageConnectionLocale | PageConnectionPath | PageConnectionPublished_At | PageConnectionTitle | PageConnectionUpdated_At | PageGroupBy | Project | ProjectAggregator | ProjectConnection | ProjectConnectionCompanyName | ProjectConnectionCreated_At | ProjectConnectionDescription | ProjectConnectionId | ProjectConnectionImage | ProjectConnectionLinkLabel | ProjectConnectionLinkPath | ProjectConnectionLocale | ProjectConnectionPath | ProjectConnectionProjectType | ProjectConnectionPublished_At | ProjectConnectionUpdated_At | ProjectGroupBy | UploadFile | UploadFileAggregator | UploadFileAggregatorAvg | UploadFileAggregatorMax | UploadFileAggregatorMin | UploadFileAggregatorSum | UploadFileConnection | UploadFileConnectionAlternativeText | UploadFileConnectionCaption | UploadFileConnectionCreated_At | UploadFileConnectionExt | UploadFileConnectionFormats | UploadFileConnectionHash | UploadFileConnectionHeight | UploadFileConnectionId | UploadFileConnectionMime | UploadFileConnectionName | UploadFileConnectionPreviewUrl | UploadFileConnectionProvider | UploadFileConnectionProvider_Metadata | UploadFileConnectionSize | UploadFileConnectionUpdated_At | UploadFileConnectionUrl | UploadFileConnectionWidth | UploadFileGroupBy | UserPermissionsPasswordPayload | UsersPermissionsLoginPayload | UsersPermissionsMe | UsersPermissionsMeRole | UsersPermissionsPermission | UsersPermissionsRole | UsersPermissionsRoleAggregator | UsersPermissionsRoleConnection | UsersPermissionsRoleConnectionDescription | UsersPermissionsRoleConnectionId | UsersPermissionsRoleConnectionName | UsersPermissionsRoleConnectionType | UsersPermissionsRoleGroupBy | UsersPermissionsUser | UsersPermissionsUserAggregator | UsersPermissionsUserConnection | UsersPermissionsUserConnectionBlocked | UsersPermissionsUserConnectionConfirmed | UsersPermissionsUserConnectionCreated_At | UsersPermissionsUserConnectionEmail | UsersPermissionsUserConnectionId | UsersPermissionsUserConnectionProvider | UsersPermissionsUserConnectionRole | UsersPermissionsUserConnectionUpdated_At | UsersPermissionsUserConnectionUsername | UsersPermissionsUserGroupBy | CreateFormMessagePayload | CreateMenuPayload | CreatePagePayload | CreateProjectPayload | CreateRolePayload | CreateUserPayload | DeleteFilePayload | DeleteFormMessagePayload | DeleteGlobalPayload | DeleteMenuPayload | DeletePagePayload | DeleteProjectPayload | DeleteRolePayload | DeleteUserPayload | UpdateFormMessagePayload | UpdateGlobalPayload | UpdateMenuPayload | UpdatePagePayload | UpdateProjectPayload | UpdateRolePayload | UpdateUserPayload;

export type Mutation = {
  __typename?: 'Mutation';
  createFormMessage?: Maybe<CreateFormMessagePayload>;
  createMenu?: Maybe<CreateMenuPayload>;
  createMenuLocalization: Menu;
  createPage?: Maybe<CreatePagePayload>;
  createPageLocalization: Page;
  createProject?: Maybe<CreateProjectPayload>;
  createProjectLocalization: Project;
  /** Create a new role */
  createRole?: Maybe<CreateRolePayload>;
  /** Create a new user */
  createUser?: Maybe<CreateUserPayload>;
  /** Delete one file */
  deleteFile?: Maybe<DeleteFilePayload>;
  deleteFormMessage?: Maybe<DeleteFormMessagePayload>;
  deleteGlobal?: Maybe<DeleteGlobalPayload>;
  deleteMenu?: Maybe<DeleteMenuPayload>;
  deletePage?: Maybe<DeletePagePayload>;
  deleteProject?: Maybe<DeleteProjectPayload>;
  /** Delete an existing role */
  deleteRole?: Maybe<DeleteRolePayload>;
  /** Delete an existing user */
  deleteUser?: Maybe<DeleteUserPayload>;
  emailConfirmation?: Maybe<UsersPermissionsLoginPayload>;
  forgotPassword?: Maybe<UserPermissionsPasswordPayload>;
  login: UsersPermissionsLoginPayload;
  multipleUpload: Array<Maybe<UploadFile>>;
  register: UsersPermissionsLoginPayload;
  resetPassword?: Maybe<UsersPermissionsLoginPayload>;
  updateFileInfo: UploadFile;
  updateFormMessage?: Maybe<UpdateFormMessagePayload>;
  updateGlobal?: Maybe<UpdateGlobalPayload>;
  updateMenu?: Maybe<UpdateMenuPayload>;
  updatePage?: Maybe<UpdatePagePayload>;
  updateProject?: Maybe<UpdateProjectPayload>;
  /** Update an existing role */
  updateRole?: Maybe<UpdateRolePayload>;
  /** Update an existing user */
  updateUser?: Maybe<UpdateUserPayload>;
  upload: UploadFile;
};


export type MutationCreateFormMessageArgs = {
  input?: Maybe<CreateFormMessageInput>;
};


export type MutationCreateMenuArgs = {
  input?: Maybe<CreateMenuInput>;
};


export type MutationCreateMenuLocalizationArgs = {
  input: UpdateMenuInput;
};


export type MutationCreatePageArgs = {
  input?: Maybe<CreatePageInput>;
};


export type MutationCreatePageLocalizationArgs = {
  input: UpdatePageInput;
};


export type MutationCreateProjectArgs = {
  input?: Maybe<CreateProjectInput>;
};


export type MutationCreateProjectLocalizationArgs = {
  input: UpdateProjectInput;
};


export type MutationCreateRoleArgs = {
  input?: Maybe<CreateRoleInput>;
};


export type MutationCreateUserArgs = {
  input?: Maybe<CreateUserInput>;
};


export type MutationDeleteFileArgs = {
  input?: Maybe<DeleteFileInput>;
};


export type MutationDeleteFormMessageArgs = {
  input?: Maybe<DeleteFormMessageInput>;
};


export type MutationDeleteMenuArgs = {
  input?: Maybe<DeleteMenuInput>;
};


export type MutationDeletePageArgs = {
  input?: Maybe<DeletePageInput>;
};


export type MutationDeleteProjectArgs = {
  input?: Maybe<DeleteProjectInput>;
};


export type MutationDeleteRoleArgs = {
  input?: Maybe<DeleteRoleInput>;
};


export type MutationDeleteUserArgs = {
  input?: Maybe<DeleteUserInput>;
};


export type MutationEmailConfirmationArgs = {
  confirmation: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  input: UsersPermissionsLoginInput;
};


export type MutationMultipleUploadArgs = {
  field?: Maybe<Scalars['String']>;
  files: Array<Maybe<Scalars['Upload']>>;
  ref?: Maybe<Scalars['String']>;
  refId?: Maybe<Scalars['ID']>;
  source?: Maybe<Scalars['String']>;
};


export type MutationRegisterArgs = {
  input: UsersPermissionsRegisterInput;
};


export type MutationResetPasswordArgs = {
  code: Scalars['String'];
  password: Scalars['String'];
  passwordConfirmation: Scalars['String'];
};


export type MutationUpdateFileInfoArgs = {
  id: Scalars['ID'];
  info: FileInfoInput;
};


export type MutationUpdateFormMessageArgs = {
  input?: Maybe<UpdateFormMessageInput>;
};


export type MutationUpdateGlobalArgs = {
  input?: Maybe<UpdateGlobalInput>;
};


export type MutationUpdateMenuArgs = {
  input?: Maybe<UpdateMenuInput>;
};


export type MutationUpdatePageArgs = {
  input?: Maybe<UpdatePageInput>;
};


export type MutationUpdateProjectArgs = {
  input?: Maybe<UpdateProjectInput>;
};


export type MutationUpdateRoleArgs = {
  input?: Maybe<UpdateRoleInput>;
};


export type MutationUpdateUserArgs = {
  input?: Maybe<UpdateUserInput>;
};


export type MutationUploadArgs = {
  field?: Maybe<Scalars['String']>;
  file: Scalars['Upload'];
  info?: Maybe<FileInfoInput>;
  ref?: Maybe<Scalars['String']>;
  refId?: Maybe<Scalars['ID']>;
  source?: Maybe<Scalars['String']>;
};

export type Page = {
  __typename?: 'Page';
  created_at: Scalars['DateTime'];
  id: Scalars['ID'];
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<Array<Maybe<Page>>>;
  path?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  sections?: Maybe<Array<Maybe<PageSectionsDynamicZone>>>;
  title: Scalars['String'];
  updated_at: Scalars['DateTime'];
};


export type PageLocalizationsArgs = {
  limit?: Maybe<Scalars['Int']>;
  sort?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};

export type PageAggregator = {
  __typename?: 'PageAggregator';
  count?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type PageConnection = {
  __typename?: 'PageConnection';
  aggregate?: Maybe<PageAggregator>;
  groupBy?: Maybe<PageGroupBy>;
  values?: Maybe<Array<Maybe<Page>>>;
};

export type PageConnectionCreated_At = {
  __typename?: 'PageConnectionCreated_at';
  connection?: Maybe<PageConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type PageConnectionId = {
  __typename?: 'PageConnectionId';
  connection?: Maybe<PageConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type PageConnectionLocale = {
  __typename?: 'PageConnectionLocale';
  connection?: Maybe<PageConnection>;
  key?: Maybe<Scalars['String']>;
};

export type PageConnectionPath = {
  __typename?: 'PageConnectionPath';
  connection?: Maybe<PageConnection>;
  key?: Maybe<Scalars['String']>;
};

export type PageConnectionPublished_At = {
  __typename?: 'PageConnectionPublished_at';
  connection?: Maybe<PageConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type PageConnectionTitle = {
  __typename?: 'PageConnectionTitle';
  connection?: Maybe<PageConnection>;
  key?: Maybe<Scalars['String']>;
};

export type PageConnectionUpdated_At = {
  __typename?: 'PageConnectionUpdated_at';
  connection?: Maybe<PageConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type PageGroupBy = {
  __typename?: 'PageGroupBy';
  created_at?: Maybe<Array<Maybe<PageConnectionCreated_At>>>;
  id?: Maybe<Array<Maybe<PageConnectionId>>>;
  locale?: Maybe<Array<Maybe<PageConnectionLocale>>>;
  path?: Maybe<Array<Maybe<PageConnectionPath>>>;
  published_at?: Maybe<Array<Maybe<PageConnectionPublished_At>>>;
  title?: Maybe<Array<Maybe<PageConnectionTitle>>>;
  updated_at?: Maybe<Array<Maybe<PageConnectionUpdated_At>>>;
};

export type PageInput = {
  created_by?: Maybe<Scalars['ID']>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<Array<Maybe<Scalars['ID']>>>;
  path?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  sections?: Maybe<Array<Scalars['PageSectionsDynamicZoneInput']>>;
  title?: Maybe<Scalars['String']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type PageSectionsDynamicZone = ComponentSectionCardSection | ComponentSectionContactsSection | ComponentSectionHeroSection | ComponentSectionSimpleSection | ComponentSectionSingleFeatureSection;


export type Project = {
  __typename?: 'Project';
  blocks?: Maybe<Array<Maybe<ProjectBlocksDynamicZone>>>;
  companyName?: Maybe<Scalars['String']>;
  created_at: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  image?: Maybe<UploadFile>;
  linkLabel?: Maybe<Scalars['String']>;
  linkPath?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<Array<Maybe<Project>>>;
  path?: Maybe<Scalars['String']>;
  projectType?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  updated_at: Scalars['DateTime'];
};


export type ProjectLocalizationsArgs = {
  limit?: Maybe<Scalars['Int']>;
  sort?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};

export type ProjectAggregator = {
  __typename?: 'ProjectAggregator';
  count?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type ProjectBlocksDynamicZone = ComponentProjectBlockquoteBlock | ComponentProjectImageBlock | ComponentProjectParagraphBlock;


export type ProjectConnection = {
  __typename?: 'ProjectConnection';
  aggregate?: Maybe<ProjectAggregator>;
  groupBy?: Maybe<ProjectGroupBy>;
  values?: Maybe<Array<Maybe<Project>>>;
};

export type ProjectConnectionCompanyName = {
  __typename?: 'ProjectConnectionCompanyName';
  connection?: Maybe<ProjectConnection>;
  key?: Maybe<Scalars['String']>;
};

export type ProjectConnectionCreated_At = {
  __typename?: 'ProjectConnectionCreated_at';
  connection?: Maybe<ProjectConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type ProjectConnectionDescription = {
  __typename?: 'ProjectConnectionDescription';
  connection?: Maybe<ProjectConnection>;
  key?: Maybe<Scalars['String']>;
};

export type ProjectConnectionId = {
  __typename?: 'ProjectConnectionId';
  connection?: Maybe<ProjectConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type ProjectConnectionImage = {
  __typename?: 'ProjectConnectionImage';
  connection?: Maybe<ProjectConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type ProjectConnectionLinkLabel = {
  __typename?: 'ProjectConnectionLinkLabel';
  connection?: Maybe<ProjectConnection>;
  key?: Maybe<Scalars['String']>;
};

export type ProjectConnectionLinkPath = {
  __typename?: 'ProjectConnectionLinkPath';
  connection?: Maybe<ProjectConnection>;
  key?: Maybe<Scalars['String']>;
};

export type ProjectConnectionLocale = {
  __typename?: 'ProjectConnectionLocale';
  connection?: Maybe<ProjectConnection>;
  key?: Maybe<Scalars['String']>;
};

export type ProjectConnectionPath = {
  __typename?: 'ProjectConnectionPath';
  connection?: Maybe<ProjectConnection>;
  key?: Maybe<Scalars['String']>;
};

export type ProjectConnectionProjectType = {
  __typename?: 'ProjectConnectionProjectType';
  connection?: Maybe<ProjectConnection>;
  key?: Maybe<Scalars['String']>;
};

export type ProjectConnectionPublished_At = {
  __typename?: 'ProjectConnectionPublished_at';
  connection?: Maybe<ProjectConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type ProjectConnectionUpdated_At = {
  __typename?: 'ProjectConnectionUpdated_at';
  connection?: Maybe<ProjectConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type ProjectGroupBy = {
  __typename?: 'ProjectGroupBy';
  companyName?: Maybe<Array<Maybe<ProjectConnectionCompanyName>>>;
  created_at?: Maybe<Array<Maybe<ProjectConnectionCreated_At>>>;
  description?: Maybe<Array<Maybe<ProjectConnectionDescription>>>;
  id?: Maybe<Array<Maybe<ProjectConnectionId>>>;
  image?: Maybe<Array<Maybe<ProjectConnectionImage>>>;
  linkLabel?: Maybe<Array<Maybe<ProjectConnectionLinkLabel>>>;
  linkPath?: Maybe<Array<Maybe<ProjectConnectionLinkPath>>>;
  locale?: Maybe<Array<Maybe<ProjectConnectionLocale>>>;
  path?: Maybe<Array<Maybe<ProjectConnectionPath>>>;
  projectType?: Maybe<Array<Maybe<ProjectConnectionProjectType>>>;
  published_at?: Maybe<Array<Maybe<ProjectConnectionPublished_At>>>;
  updated_at?: Maybe<Array<Maybe<ProjectConnectionUpdated_At>>>;
};

export type ProjectInput = {
  blocks?: Maybe<Array<Scalars['ProjectBlocksDynamicZoneInput']>>;
  companyName?: Maybe<Scalars['String']>;
  created_by?: Maybe<Scalars['ID']>;
  description?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['ID']>;
  linkLabel?: Maybe<Scalars['String']>;
  linkPath?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<Array<Maybe<Scalars['ID']>>>;
  path?: Maybe<Scalars['String']>;
  projectType?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export enum PublicationState {
  Live = 'LIVE',
  Preview = 'PREVIEW'
}

export type Query = {
  __typename?: 'Query';
  files?: Maybe<Array<Maybe<UploadFile>>>;
  filesConnection?: Maybe<UploadFileConnection>;
  formMessage?: Maybe<FormMessages>;
  formMessages?: Maybe<Array<Maybe<FormMessages>>>;
  formMessagesConnection?: Maybe<FormMessagesConnection>;
  global?: Maybe<Global>;
  me?: Maybe<UsersPermissionsMe>;
  menu?: Maybe<Menu>;
  menus?: Maybe<Array<Maybe<Menu>>>;
  menusConnection?: Maybe<MenuConnection>;
  page?: Maybe<Page>;
  pages?: Maybe<Array<Maybe<Page>>>;
  pagesConnection?: Maybe<PageConnection>;
  project?: Maybe<Project>;
  projects?: Maybe<Array<Maybe<Project>>>;
  projectsConnection?: Maybe<ProjectConnection>;
  role?: Maybe<UsersPermissionsRole>;
  /** Retrieve all the existing roles. You can't apply filters on this query. */
  roles?: Maybe<Array<Maybe<UsersPermissionsRole>>>;
  rolesConnection?: Maybe<UsersPermissionsRoleConnection>;
  user?: Maybe<UsersPermissionsUser>;
  users?: Maybe<Array<Maybe<UsersPermissionsUser>>>;
  usersConnection?: Maybe<UsersPermissionsUserConnection>;
};


export type QueryFilesArgs = {
  limit?: Maybe<Scalars['Int']>;
  publicationState?: Maybe<PublicationState>;
  sort?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type QueryFilesConnectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  sort?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type QueryFormMessageArgs = {
  id: Scalars['ID'];
  publicationState?: Maybe<PublicationState>;
};


export type QueryFormMessagesArgs = {
  limit?: Maybe<Scalars['Int']>;
  publicationState?: Maybe<PublicationState>;
  sort?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type QueryFormMessagesConnectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  sort?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type QueryGlobalArgs = {
  publicationState?: Maybe<PublicationState>;
};


export type QueryMenuArgs = {
  id: Scalars['ID'];
  publicationState?: Maybe<PublicationState>;
};


export type QueryMenusArgs = {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  publicationState?: Maybe<PublicationState>;
  sort?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type QueryMenusConnectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  sort?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type QueryPageArgs = {
  id: Scalars['ID'];
  publicationState?: Maybe<PublicationState>;
};


export type QueryPagesArgs = {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  publicationState?: Maybe<PublicationState>;
  sort?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type QueryPagesConnectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  sort?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type QueryProjectArgs = {
  id: Scalars['ID'];
  publicationState?: Maybe<PublicationState>;
};


export type QueryProjectsArgs = {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  publicationState?: Maybe<PublicationState>;
  sort?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type QueryProjectsConnectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  sort?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type QueryRoleArgs = {
  id: Scalars['ID'];
  publicationState?: Maybe<PublicationState>;
};


export type QueryRolesArgs = {
  limit?: Maybe<Scalars['Int']>;
  publicationState?: Maybe<PublicationState>;
  sort?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type QueryRolesConnectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  sort?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type QueryUserArgs = {
  id: Scalars['ID'];
  publicationState?: Maybe<PublicationState>;
};


export type QueryUsersArgs = {
  limit?: Maybe<Scalars['Int']>;
  publicationState?: Maybe<PublicationState>;
  sort?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type QueryUsersConnectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  sort?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};

export type RoleInput = {
  created_by?: Maybe<Scalars['ID']>;
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  permissions?: Maybe<Array<Maybe<Scalars['ID']>>>;
  type?: Maybe<Scalars['String']>;
  updated_by?: Maybe<Scalars['ID']>;
  users?: Maybe<Array<Maybe<Scalars['ID']>>>;
};



export type UploadFile = {
  __typename?: 'UploadFile';
  alternativeText?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
  created_at: Scalars['DateTime'];
  ext?: Maybe<Scalars['String']>;
  formats?: Maybe<Scalars['JSON']>;
  hash: Scalars['String'];
  height?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  mime: Scalars['String'];
  name: Scalars['String'];
  previewUrl?: Maybe<Scalars['String']>;
  provider: Scalars['String'];
  provider_metadata?: Maybe<Scalars['JSON']>;
  related?: Maybe<Array<Maybe<Morph>>>;
  size: Scalars['Float'];
  updated_at: Scalars['DateTime'];
  url: Scalars['String'];
  width?: Maybe<Scalars['Int']>;
};


export type UploadFileRelatedArgs = {
  limit?: Maybe<Scalars['Int']>;
  sort?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};

export type UploadFileAggregator = {
  __typename?: 'UploadFileAggregator';
  avg?: Maybe<UploadFileAggregatorAvg>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<UploadFileAggregatorMax>;
  min?: Maybe<UploadFileAggregatorMin>;
  sum?: Maybe<UploadFileAggregatorSum>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type UploadFileAggregatorAvg = {
  __typename?: 'UploadFileAggregatorAvg';
  height?: Maybe<Scalars['Float']>;
  size?: Maybe<Scalars['Float']>;
  width?: Maybe<Scalars['Float']>;
};

export type UploadFileAggregatorMax = {
  __typename?: 'UploadFileAggregatorMax';
  height?: Maybe<Scalars['Float']>;
  size?: Maybe<Scalars['Float']>;
  width?: Maybe<Scalars['Float']>;
};

export type UploadFileAggregatorMin = {
  __typename?: 'UploadFileAggregatorMin';
  height?: Maybe<Scalars['Float']>;
  size?: Maybe<Scalars['Float']>;
  width?: Maybe<Scalars['Float']>;
};

export type UploadFileAggregatorSum = {
  __typename?: 'UploadFileAggregatorSum';
  height?: Maybe<Scalars['Float']>;
  size?: Maybe<Scalars['Float']>;
  width?: Maybe<Scalars['Float']>;
};

export type UploadFileConnection = {
  __typename?: 'UploadFileConnection';
  aggregate?: Maybe<UploadFileAggregator>;
  groupBy?: Maybe<UploadFileGroupBy>;
  values?: Maybe<Array<Maybe<UploadFile>>>;
};

export type UploadFileConnectionAlternativeText = {
  __typename?: 'UploadFileConnectionAlternativeText';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['String']>;
};

export type UploadFileConnectionCaption = {
  __typename?: 'UploadFileConnectionCaption';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['String']>;
};

export type UploadFileConnectionCreated_At = {
  __typename?: 'UploadFileConnectionCreated_at';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type UploadFileConnectionExt = {
  __typename?: 'UploadFileConnectionExt';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['String']>;
};

export type UploadFileConnectionFormats = {
  __typename?: 'UploadFileConnectionFormats';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['JSON']>;
};

export type UploadFileConnectionHash = {
  __typename?: 'UploadFileConnectionHash';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['String']>;
};

export type UploadFileConnectionHeight = {
  __typename?: 'UploadFileConnectionHeight';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['Int']>;
};

export type UploadFileConnectionId = {
  __typename?: 'UploadFileConnectionId';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type UploadFileConnectionMime = {
  __typename?: 'UploadFileConnectionMime';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['String']>;
};

export type UploadFileConnectionName = {
  __typename?: 'UploadFileConnectionName';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['String']>;
};

export type UploadFileConnectionPreviewUrl = {
  __typename?: 'UploadFileConnectionPreviewUrl';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['String']>;
};

export type UploadFileConnectionProvider = {
  __typename?: 'UploadFileConnectionProvider';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['String']>;
};

export type UploadFileConnectionProvider_Metadata = {
  __typename?: 'UploadFileConnectionProvider_metadata';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['JSON']>;
};

export type UploadFileConnectionSize = {
  __typename?: 'UploadFileConnectionSize';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['Float']>;
};

export type UploadFileConnectionUpdated_At = {
  __typename?: 'UploadFileConnectionUpdated_at';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type UploadFileConnectionUrl = {
  __typename?: 'UploadFileConnectionUrl';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['String']>;
};

export type UploadFileConnectionWidth = {
  __typename?: 'UploadFileConnectionWidth';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['Int']>;
};

export type UploadFileGroupBy = {
  __typename?: 'UploadFileGroupBy';
  alternativeText?: Maybe<Array<Maybe<UploadFileConnectionAlternativeText>>>;
  caption?: Maybe<Array<Maybe<UploadFileConnectionCaption>>>;
  created_at?: Maybe<Array<Maybe<UploadFileConnectionCreated_At>>>;
  ext?: Maybe<Array<Maybe<UploadFileConnectionExt>>>;
  formats?: Maybe<Array<Maybe<UploadFileConnectionFormats>>>;
  hash?: Maybe<Array<Maybe<UploadFileConnectionHash>>>;
  height?: Maybe<Array<Maybe<UploadFileConnectionHeight>>>;
  id?: Maybe<Array<Maybe<UploadFileConnectionId>>>;
  mime?: Maybe<Array<Maybe<UploadFileConnectionMime>>>;
  name?: Maybe<Array<Maybe<UploadFileConnectionName>>>;
  previewUrl?: Maybe<Array<Maybe<UploadFileConnectionPreviewUrl>>>;
  provider?: Maybe<Array<Maybe<UploadFileConnectionProvider>>>;
  provider_metadata?: Maybe<Array<Maybe<UploadFileConnectionProvider_Metadata>>>;
  size?: Maybe<Array<Maybe<UploadFileConnectionSize>>>;
  updated_at?: Maybe<Array<Maybe<UploadFileConnectionUpdated_At>>>;
  url?: Maybe<Array<Maybe<UploadFileConnectionUrl>>>;
  width?: Maybe<Array<Maybe<UploadFileConnectionWidth>>>;
};

export type UserInput = {
  blocked?: Maybe<Scalars['Boolean']>;
  confirmationToken?: Maybe<Scalars['String']>;
  confirmed?: Maybe<Scalars['Boolean']>;
  created_by?: Maybe<Scalars['ID']>;
  email: Scalars['String'];
  password?: Maybe<Scalars['String']>;
  provider?: Maybe<Scalars['String']>;
  resetPasswordToken?: Maybe<Scalars['String']>;
  role?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
  username: Scalars['String'];
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
  blocked?: Maybe<Scalars['Boolean']>;
  confirmed?: Maybe<Scalars['Boolean']>;
  email: Scalars['String'];
  id: Scalars['ID'];
  role?: Maybe<UsersPermissionsMeRole>;
  username: Scalars['String'];
};

export type UsersPermissionsMeRole = {
  __typename?: 'UsersPermissionsMeRole';
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  type?: Maybe<Scalars['String']>;
};

export type UsersPermissionsPermission = {
  __typename?: 'UsersPermissionsPermission';
  action: Scalars['String'];
  controller: Scalars['String'];
  enabled: Scalars['Boolean'];
  id: Scalars['ID'];
  policy?: Maybe<Scalars['String']>;
  role?: Maybe<UsersPermissionsRole>;
  type: Scalars['String'];
};

export type UsersPermissionsRegisterInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type UsersPermissionsRole = {
  __typename?: 'UsersPermissionsRole';
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  permissions?: Maybe<Array<Maybe<UsersPermissionsPermission>>>;
  type?: Maybe<Scalars['String']>;
  users?: Maybe<Array<Maybe<UsersPermissionsUser>>>;
};


export type UsersPermissionsRolePermissionsArgs = {
  limit?: Maybe<Scalars['Int']>;
  sort?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type UsersPermissionsRoleUsersArgs = {
  limit?: Maybe<Scalars['Int']>;
  sort?: Maybe<Scalars['String']>;
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
  aggregate?: Maybe<UsersPermissionsRoleAggregator>;
  groupBy?: Maybe<UsersPermissionsRoleGroupBy>;
  values?: Maybe<Array<Maybe<UsersPermissionsRole>>>;
};

export type UsersPermissionsRoleConnectionDescription = {
  __typename?: 'UsersPermissionsRoleConnectionDescription';
  connection?: Maybe<UsersPermissionsRoleConnection>;
  key?: Maybe<Scalars['String']>;
};

export type UsersPermissionsRoleConnectionId = {
  __typename?: 'UsersPermissionsRoleConnectionId';
  connection?: Maybe<UsersPermissionsRoleConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type UsersPermissionsRoleConnectionName = {
  __typename?: 'UsersPermissionsRoleConnectionName';
  connection?: Maybe<UsersPermissionsRoleConnection>;
  key?: Maybe<Scalars['String']>;
};

export type UsersPermissionsRoleConnectionType = {
  __typename?: 'UsersPermissionsRoleConnectionType';
  connection?: Maybe<UsersPermissionsRoleConnection>;
  key?: Maybe<Scalars['String']>;
};

export type UsersPermissionsRoleGroupBy = {
  __typename?: 'UsersPermissionsRoleGroupBy';
  description?: Maybe<Array<Maybe<UsersPermissionsRoleConnectionDescription>>>;
  id?: Maybe<Array<Maybe<UsersPermissionsRoleConnectionId>>>;
  name?: Maybe<Array<Maybe<UsersPermissionsRoleConnectionName>>>;
  type?: Maybe<Array<Maybe<UsersPermissionsRoleConnectionType>>>;
};

export type UsersPermissionsUser = {
  __typename?: 'UsersPermissionsUser';
  blocked?: Maybe<Scalars['Boolean']>;
  confirmed?: Maybe<Scalars['Boolean']>;
  created_at: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['ID'];
  provider?: Maybe<Scalars['String']>;
  role?: Maybe<UsersPermissionsRole>;
  updated_at: Scalars['DateTime'];
  username: Scalars['String'];
};

export type UsersPermissionsUserAggregator = {
  __typename?: 'UsersPermissionsUserAggregator';
  count?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type UsersPermissionsUserConnection = {
  __typename?: 'UsersPermissionsUserConnection';
  aggregate?: Maybe<UsersPermissionsUserAggregator>;
  groupBy?: Maybe<UsersPermissionsUserGroupBy>;
  values?: Maybe<Array<Maybe<UsersPermissionsUser>>>;
};

export type UsersPermissionsUserConnectionBlocked = {
  __typename?: 'UsersPermissionsUserConnectionBlocked';
  connection?: Maybe<UsersPermissionsUserConnection>;
  key?: Maybe<Scalars['Boolean']>;
};

export type UsersPermissionsUserConnectionConfirmed = {
  __typename?: 'UsersPermissionsUserConnectionConfirmed';
  connection?: Maybe<UsersPermissionsUserConnection>;
  key?: Maybe<Scalars['Boolean']>;
};

export type UsersPermissionsUserConnectionCreated_At = {
  __typename?: 'UsersPermissionsUserConnectionCreated_at';
  connection?: Maybe<UsersPermissionsUserConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type UsersPermissionsUserConnectionEmail = {
  __typename?: 'UsersPermissionsUserConnectionEmail';
  connection?: Maybe<UsersPermissionsUserConnection>;
  key?: Maybe<Scalars['String']>;
};

export type UsersPermissionsUserConnectionId = {
  __typename?: 'UsersPermissionsUserConnectionId';
  connection?: Maybe<UsersPermissionsUserConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type UsersPermissionsUserConnectionProvider = {
  __typename?: 'UsersPermissionsUserConnectionProvider';
  connection?: Maybe<UsersPermissionsUserConnection>;
  key?: Maybe<Scalars['String']>;
};

export type UsersPermissionsUserConnectionRole = {
  __typename?: 'UsersPermissionsUserConnectionRole';
  connection?: Maybe<UsersPermissionsUserConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type UsersPermissionsUserConnectionUpdated_At = {
  __typename?: 'UsersPermissionsUserConnectionUpdated_at';
  connection?: Maybe<UsersPermissionsUserConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type UsersPermissionsUserConnectionUsername = {
  __typename?: 'UsersPermissionsUserConnectionUsername';
  connection?: Maybe<UsersPermissionsUserConnection>;
  key?: Maybe<Scalars['String']>;
};

export type UsersPermissionsUserGroupBy = {
  __typename?: 'UsersPermissionsUserGroupBy';
  blocked?: Maybe<Array<Maybe<UsersPermissionsUserConnectionBlocked>>>;
  confirmed?: Maybe<Array<Maybe<UsersPermissionsUserConnectionConfirmed>>>;
  created_at?: Maybe<Array<Maybe<UsersPermissionsUserConnectionCreated_At>>>;
  email?: Maybe<Array<Maybe<UsersPermissionsUserConnectionEmail>>>;
  id?: Maybe<Array<Maybe<UsersPermissionsUserConnectionId>>>;
  provider?: Maybe<Array<Maybe<UsersPermissionsUserConnectionProvider>>>;
  role?: Maybe<Array<Maybe<UsersPermissionsUserConnectionRole>>>;
  updated_at?: Maybe<Array<Maybe<UsersPermissionsUserConnectionUpdated_At>>>;
  username?: Maybe<Array<Maybe<UsersPermissionsUserConnectionUsername>>>;
};

export type CreateFormMessageInput = {
  data?: Maybe<FormMessageInput>;
};

export type CreateFormMessagePayload = {
  __typename?: 'createFormMessagePayload';
  formMessage?: Maybe<FormMessages>;
};

export type CreateMenuInput = {
  data?: Maybe<MenuInput>;
};

export type CreateMenuPayload = {
  __typename?: 'createMenuPayload';
  menu?: Maybe<Menu>;
};

export type CreatePageInput = {
  data?: Maybe<PageInput>;
};

export type CreatePagePayload = {
  __typename?: 'createPagePayload';
  page?: Maybe<Page>;
};

export type CreateProjectInput = {
  data?: Maybe<ProjectInput>;
};

export type CreateProjectPayload = {
  __typename?: 'createProjectPayload';
  project?: Maybe<Project>;
};

export type CreateRoleInput = {
  data?: Maybe<RoleInput>;
};

export type CreateRolePayload = {
  __typename?: 'createRolePayload';
  role?: Maybe<UsersPermissionsRole>;
};

export type CreateUserInput = {
  data?: Maybe<UserInput>;
};

export type CreateUserPayload = {
  __typename?: 'createUserPayload';
  user?: Maybe<UsersPermissionsUser>;
};

export type DeleteFileInput = {
  where?: Maybe<InputId>;
};

export type DeleteFilePayload = {
  __typename?: 'deleteFilePayload';
  file?: Maybe<UploadFile>;
};

export type DeleteFormMessageInput = {
  where?: Maybe<InputId>;
};

export type DeleteFormMessagePayload = {
  __typename?: 'deleteFormMessagePayload';
  formMessage?: Maybe<FormMessages>;
};

export type DeleteGlobalPayload = {
  __typename?: 'deleteGlobalPayload';
  global?: Maybe<Global>;
};

export type DeleteMenuInput = {
  where?: Maybe<InputId>;
};

export type DeleteMenuPayload = {
  __typename?: 'deleteMenuPayload';
  menu?: Maybe<Menu>;
};

export type DeletePageInput = {
  where?: Maybe<InputId>;
};

export type DeletePagePayload = {
  __typename?: 'deletePagePayload';
  page?: Maybe<Page>;
};

export type DeleteProjectInput = {
  where?: Maybe<InputId>;
};

export type DeleteProjectPayload = {
  __typename?: 'deleteProjectPayload';
  project?: Maybe<Project>;
};

export type DeleteRoleInput = {
  where?: Maybe<InputId>;
};

export type DeleteRolePayload = {
  __typename?: 'deleteRolePayload';
  role?: Maybe<UsersPermissionsRole>;
};

export type DeleteUserInput = {
  where?: Maybe<InputId>;
};

export type DeleteUserPayload = {
  __typename?: 'deleteUserPayload';
  user?: Maybe<UsersPermissionsUser>;
};

export type EditComponentBlocksCardInput = {
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  image?: Maybe<Scalars['ID']>;
  label?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type EditComponentBlocksLinkInput = {
  id?: Maybe<Scalars['ID']>;
  label?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type EditComponentBlocksSingleFeatureInput = {
  bubbleColor?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  image?: Maybe<Scalars['ID']>;
  label?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type EditComponentBlocksSocialBubbleInput = {
  bubbleColor?: Maybe<Scalars['String']>;
  bubbleHoverColor?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  image?: Maybe<Scalars['ID']>;
  url?: Maybe<Scalars['String']>;
};

export type EditComponentGlobalCompanyDatumInput = {
  additionalLegalInfo?: Maybe<Scalars['String']>;
  capital?: Maybe<Scalars['Long']>;
  companyName?: Maybe<Scalars['String']>;
  copyright?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  legalCompanyName?: Maybe<Scalars['String']>;
  locations?: Maybe<Array<Maybe<EditComponentGlobalHeadquarterInput>>>;
  primaryEmail?: Maybe<Scalars['String']>;
  vatId?: Maybe<Scalars['String']>;
};

export type EditComponentGlobalFooterInput = {
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
};

export type EditComponentGlobalHeadquarterInput = {
  cap?: Maybe<Scalars['Long']>;
  city?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  province?: Maybe<Scalars['String']>;
  provinceInitials?: Maybe<Scalars['String']>;
  street?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type EditComponentGlobalTopbarInput = {
  id?: Maybe<Scalars['ID']>;
  menu?: Maybe<Scalars['ID']>;
};

export type EditComponentProjectBlockquoteBlockInput = {
  author?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  text?: Maybe<Scalars['String']>;
};

export type EditComponentProjectImageBlockInput = {
  id?: Maybe<Scalars['ID']>;
  image?: Maybe<Scalars['ID']>;
};

export type EditComponentProjectParagraphBlockInput = {
  id?: Maybe<Scalars['ID']>;
  text?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type EditComponentSectionCardSectionInput = {
  id?: Maybe<Scalars['ID']>;
  sectionTitle?: Maybe<Scalars['String']>;
  sections?: Maybe<Array<Maybe<EditComponentBlocksCardInput>>>;
  subtitle?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type EditComponentSectionContactsSectionInput = {
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  sectionTitle?: Maybe<Scalars['String']>;
  socialBubbles?: Maybe<Array<Maybe<EditComponentBlocksSocialBubbleInput>>>;
  subtitle?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type EditComponentSectionHeroSectionInput = {
  areBubblesActive?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['ID']>;
  subtitle?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type EditComponentSectionSimpleSectionInput = {
  id?: Maybe<Scalars['ID']>;
  sectionTitle?: Maybe<Scalars['String']>;
  sectionTitleColor?: Maybe<Scalars['String']>;
  subtitle?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type EditComponentSectionSingleFeatureSectionInput = {
  id?: Maybe<Scalars['ID']>;
  sectionTitle?: Maybe<Scalars['String']>;
  sections?: Maybe<Array<Maybe<EditComponentBlocksSingleFeatureInput>>>;
  subtitle?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type EditFileInput = {
  alternativeText?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
  created_by?: Maybe<Scalars['ID']>;
  ext?: Maybe<Scalars['String']>;
  formats?: Maybe<Scalars['JSON']>;
  hash?: Maybe<Scalars['String']>;
  height?: Maybe<Scalars['Int']>;
  mime?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  previewUrl?: Maybe<Scalars['String']>;
  provider?: Maybe<Scalars['String']>;
  provider_metadata?: Maybe<Scalars['JSON']>;
  related?: Maybe<Array<Maybe<Scalars['ID']>>>;
  size?: Maybe<Scalars['Float']>;
  updated_by?: Maybe<Scalars['ID']>;
  url?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Int']>;
};

export type EditFormMessageInput = {
  created_by?: Maybe<Scalars['ID']>;
  email?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditGlobalInput = {
  companyData?: Maybe<EditComponentGlobalCompanyDatumInput>;
  created_by?: Maybe<Scalars['ID']>;
  footer?: Maybe<EditComponentGlobalFooterInput>;
  published_at?: Maybe<Scalars['DateTime']>;
  topbar?: Maybe<EditComponentGlobalTopbarInput>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditLocaleInput = {
  code?: Maybe<Scalars['String']>;
  created_by?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditMenuInput = {
  created_by?: Maybe<Scalars['ID']>;
  links?: Maybe<Array<Maybe<EditComponentBlocksLinkInput>>>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<Array<Maybe<Scalars['ID']>>>;
  published_at?: Maybe<Scalars['DateTime']>;
  title?: Maybe<Scalars['String']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditPageInput = {
  created_by?: Maybe<Scalars['ID']>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<Array<Maybe<Scalars['ID']>>>;
  path?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  sections?: Maybe<Array<Scalars['PageSectionsDynamicZoneInput']>>;
  title?: Maybe<Scalars['String']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditProjectInput = {
  blocks?: Maybe<Array<Scalars['ProjectBlocksDynamicZoneInput']>>;
  companyName?: Maybe<Scalars['String']>;
  created_by?: Maybe<Scalars['ID']>;
  description?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['ID']>;
  linkLabel?: Maybe<Scalars['String']>;
  linkPath?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<Array<Maybe<Scalars['ID']>>>;
  path?: Maybe<Scalars['String']>;
  projectType?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditRoleInput = {
  created_by?: Maybe<Scalars['ID']>;
  description?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  permissions?: Maybe<Array<Maybe<Scalars['ID']>>>;
  type?: Maybe<Scalars['String']>;
  updated_by?: Maybe<Scalars['ID']>;
  users?: Maybe<Array<Maybe<Scalars['ID']>>>;
};

export type EditUserInput = {
  blocked?: Maybe<Scalars['Boolean']>;
  confirmationToken?: Maybe<Scalars['String']>;
  confirmed?: Maybe<Scalars['Boolean']>;
  created_by?: Maybe<Scalars['ID']>;
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  provider?: Maybe<Scalars['String']>;
  resetPasswordToken?: Maybe<Scalars['String']>;
  role?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
  username?: Maybe<Scalars['String']>;
};

export type UpdateFormMessageInput = {
  data?: Maybe<EditFormMessageInput>;
  where?: Maybe<InputId>;
};

export type UpdateFormMessagePayload = {
  __typename?: 'updateFormMessagePayload';
  formMessage?: Maybe<FormMessages>;
};

export type UpdateGlobalInput = {
  data?: Maybe<EditGlobalInput>;
};

export type UpdateGlobalPayload = {
  __typename?: 'updateGlobalPayload';
  global?: Maybe<Global>;
};

export type UpdateMenuInput = {
  data?: Maybe<EditMenuInput>;
  where?: Maybe<InputId>;
};

export type UpdateMenuPayload = {
  __typename?: 'updateMenuPayload';
  menu?: Maybe<Menu>;
};

export type UpdatePageInput = {
  data?: Maybe<EditPageInput>;
  where?: Maybe<InputId>;
};

export type UpdatePagePayload = {
  __typename?: 'updatePagePayload';
  page?: Maybe<Page>;
};

export type UpdateProjectInput = {
  data?: Maybe<EditProjectInput>;
  where?: Maybe<InputId>;
};

export type UpdateProjectPayload = {
  __typename?: 'updateProjectPayload';
  project?: Maybe<Project>;
};

export type UpdateRoleInput = {
  data?: Maybe<EditRoleInput>;
  where?: Maybe<InputId>;
};

export type UpdateRolePayload = {
  __typename?: 'updateRolePayload';
  role?: Maybe<UsersPermissionsRole>;
};

export type UpdateUserInput = {
  data?: Maybe<EditUserInput>;
  where?: Maybe<InputId>;
};

export type UpdateUserPayload = {
  __typename?: 'updateUserPayload';
  user?: Maybe<UsersPermissionsUser>;
};

export type GetPagesQueryVariables = Exact<{
  where?: Maybe<Scalars['JSON']>;
  locale?: Maybe<Scalars['String']>;
}>;


export type GetPagesQuery = { __typename?: 'Query', pages?: Maybe<Array<Maybe<{ __typename: 'Page', id: string, path?: Maybe<string>, title: string, locale?: Maybe<string>, localizations?: Maybe<Array<Maybe<{ __typename?: 'Page', id: string, path?: Maybe<string>, locale?: Maybe<string> }>>>, sections?: Maybe<Array<Maybe<{ __typename: 'ComponentSectionCardSection', id: string, sectionTitle?: Maybe<string>, title?: Maybe<string>, subtitle?: Maybe<string>, sections?: Maybe<Array<Maybe<{ __typename?: 'ComponentBlocksCard', id: string, title?: Maybe<string>, description?: Maybe<string>, url: string, label: string, image?: Maybe<{ __typename?: 'UploadFile', id: string, url: string, alternativeText?: Maybe<string> }> }>>> } | { __typename: 'ComponentSectionContactsSection', id: string, title?: Maybe<string>, subtitle?: Maybe<string>, email?: Maybe<string>, sectionTitle?: Maybe<string> } | { __typename: 'ComponentSectionHeroSection', id: string, title?: Maybe<string>, subtitle?: Maybe<string>, areBubblesActive?: Maybe<boolean> } | { __typename: 'ComponentSectionSimpleSection', id: string, sectionTitle?: Maybe<string>, sectionTitleColor?: Maybe<string>, title?: Maybe<string>, subtitle?: Maybe<string> } | { __typename: 'ComponentSectionSingleFeatureSection', id: string, sectionTitle?: Maybe<string>, title?: Maybe<string>, subtitle?: Maybe<string>, sections?: Maybe<Array<Maybe<{ __typename: 'ComponentBlocksSingleFeature', id: string, description?: Maybe<string>, title?: Maybe<string>, url: string, label: string, bubbleColor?: Maybe<string>, image?: Maybe<{ __typename?: 'UploadFile', id: string, name: string, alternativeText?: Maybe<string>, width?: Maybe<number>, height?: Maybe<number>, url: string }> }>>> }>>> }>>> };

export type InsertFormMessageMutationVariables = Exact<{
  input?: Maybe<CreateFormMessageInput>;
}>;


export type InsertFormMessageMutation = { __typename?: 'Mutation', createFormMessage?: Maybe<{ __typename?: 'createFormMessagePayload', formMessage?: Maybe<{ __typename?: 'FormMessages', id: string, name?: Maybe<string>, email?: Maybe<string>, message?: Maybe<string> }> }> };

export type CreatePageMutationVariables = Exact<{
  input?: Maybe<CreatePageInput>;
}>;


export type CreatePageMutation = { __typename?: 'Mutation', createPage?: Maybe<{ __typename?: 'createPagePayload', page?: Maybe<{ __typename?: 'Page', id: string }> }> };

export type GetGlobalQueryVariables = Exact<{ [key: string]: never; }>;


export type GetGlobalQuery = { __typename?: 'Query', global?: Maybe<{ __typename?: 'Global', id: string, topbar?: Maybe<{ __typename?: 'ComponentGlobalTopbar', id: string, menu?: Maybe<{ __typename?: 'Menu', id: string, title: string, links?: Maybe<Array<Maybe<{ __typename?: 'ComponentBlocksLink', id: string, label?: Maybe<string>, url?: Maybe<string> }>>> }> }>, companyData?: Maybe<{ __typename?: 'ComponentGlobalCompanyData', id: string, primaryEmail?: Maybe<string>, companyName?: Maybe<string>, copyright?: Maybe<string>, vatId?: Maybe<string>, capital?: Maybe<any>, additionalLegalInfo?: Maybe<string>, locations?: Maybe<Array<Maybe<{ __typename: 'ComponentGlobalHeadquarter', id: string, province?: Maybe<string>, provinceInitials?: Maybe<string>, type?: Maybe<string>, street?: Maybe<string>, city?: Maybe<string>, cap?: Maybe<any> }>>> }>, footer?: Maybe<{ __typename?: 'ComponentGlobalFooter', id: string, description?: Maybe<string> }> }> };

export type GetProjectsQueryVariables = Exact<{
  where?: Maybe<Scalars['JSON']>;
  locale?: Maybe<Scalars['String']>;
}>;


export type GetProjectsQuery = { __typename?: 'Query', projects?: Maybe<Array<Maybe<{ __typename?: 'Project', id: string, linkPath?: Maybe<string>, linkLabel?: Maybe<string>, projectType?: Maybe<string>, companyName?: Maybe<string>, description?: Maybe<string>, path?: Maybe<string>, locale?: Maybe<string>, localizations?: Maybe<Array<Maybe<{ __typename?: 'Project', id: string, path?: Maybe<string>, locale?: Maybe<string> }>>>, image?: Maybe<{ __typename?: 'UploadFile', id: string, url: string, alternativeText?: Maybe<string> }>, blocks?: Maybe<Array<Maybe<{ __typename: 'ComponentProjectBlockquoteBlock', id: string, text?: Maybe<string> } | { __typename: 'ComponentProjectImageBlock', id: string, image?: Maybe<{ __typename?: 'UploadFile', id: string, url: string, alternativeText?: Maybe<string> }> } | { __typename: 'ComponentProjectParagraphBlock', id: string, title?: Maybe<string>, text?: Maybe<string> }>>> }>>> };

export type SaveChangesMutationVariables = Exact<{
  pageInput?: Maybe<UpdatePageInput>;
  globalInput?: Maybe<UpdateGlobalInput>;
  topbarInput?: Maybe<UpdateMenuInput>;
}>;


export type SaveChangesMutation = { __typename?: 'Mutation', updatePage?: Maybe<{ __typename?: 'updatePagePayload', page?: Maybe<{ __typename?: 'Page', id: string }> }>, updateGlobal?: Maybe<{ __typename?: 'updateGlobalPayload', global?: Maybe<{ __typename?: 'Global', companyData?: Maybe<{ __typename?: 'ComponentGlobalCompanyData', id: string }>, footer?: Maybe<{ __typename?: 'ComponentGlobalFooter', id: string }> }> }>, updateMenu?: Maybe<{ __typename?: 'updateMenuPayload', menu?: Maybe<{ __typename?: 'Menu', id: string, title: string, links?: Maybe<Array<Maybe<{ __typename?: 'ComponentBlocksLink', id: string, url?: Maybe<string>, label?: Maybe<string> }>>> }> }> };

export type UpdateMenuMutationVariables = Exact<{
  input?: Maybe<UpdateMenuInput>;
}>;


export type UpdateMenuMutation = { __typename?: 'Mutation', updateMenu?: Maybe<{ __typename?: 'updateMenuPayload', menu?: Maybe<{ __typename?: 'Menu', id: string }> }> };

export type UpdateProjectMutationVariables = Exact<{
  projectInput?: Maybe<UpdateProjectInput>;
  menuInput?: Maybe<UpdateMenuInput>;
}>;


export type UpdateProjectMutation = { __typename?: 'Mutation', updateProject?: Maybe<{ __typename?: 'updateProjectPayload', project?: Maybe<{ __typename?: 'Project', id: string }> }>, updateMenu?: Maybe<{ __typename?: 'updateMenuPayload', menu?: Maybe<{ __typename?: 'Menu', id: string }> }> };


export const GetPages = `
    query GetPages($where: JSON, $locale: String) {
  pages(where: $where, locale: $locale) {
    id
    path
    title
    localizations {
      id
      path
      locale
    }
    locale
    __typename
    sections {
      ... on ComponentSectionSingleFeatureSection {
        __typename
        id
        sectionTitle
        title
        subtitle
        sections {
          __typename
          id
          description
          title
          url
          label
          bubbleColor
          image {
            id
            name
            alternativeText
            width
            height
            url
          }
        }
      }
      ... on ComponentSectionHeroSection {
        __typename
        id
        title
        subtitle
        areBubblesActive
      }
      ... on ComponentSectionCardSection {
        __typename
        id
        sectionTitle
        title
        subtitle
        sections {
          id
          title
          description
          image {
            id
            url
            alternativeText
          }
          url
          label
        }
      }
      ... on ComponentSectionContactsSection {
        __typename
        id
        title
        subtitle
        email
        sectionTitle
      }
      ... on ComponentSectionSimpleSection {
        __typename
        id
        sectionTitle
        sectionTitleColor
        title
        subtitle
      }
    }
  }
}
    `;
export const InsertFormMessage = `
    mutation insertFormMessage($input: createFormMessageInput) {
  createFormMessage(input: $input) {
    formMessage {
      id
      name
      email
      message
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
export const GetGlobal = `
    query GetGlobal {
  global {
    id
    topbar {
      id
      menu {
        id
        title
        links {
          id
          label
          url
        }
      }
    }
    companyData {
      id
      primaryEmail
      companyName
      copyright
      vatId
      capital
      additionalLegalInfo
      locations {
        __typename
        id
        province
        provinceInitials
        type
        street
        city
        cap
      }
    }
    footer {
      id
      description
    }
  }
}
    `;
export const GetProjects = `
    query getProjects($where: JSON, $locale: String) {
  projects(where: $where, locale: $locale) {
    id
    linkPath
    linkLabel
    projectType
    companyName
    description
    path
    locale
    localizations {
      id
      path
      locale
    }
    image {
      id
      url
      alternativeText
    }
    blocks {
      ... on ComponentProjectBlockquoteBlock {
        __typename
        id
        text
      }
      ... on ComponentProjectImageBlock {
        __typename
        id
        image {
          id
          url
          alternativeText
        }
      }
      ... on ComponentProjectParagraphBlock {
        __typename
        id
        title
        text
      }
    }
  }
}
    `;
export const SaveChanges = `
    mutation saveChanges($pageInput: updatePageInput, $globalInput: updateGlobalInput, $topbarInput: updateMenuInput) {
  updatePage(input: $pageInput) {
    page {
      id
    }
  }
  updateGlobal(input: $globalInput) {
    global {
      companyData {
        id
      }
      footer {
        id
      }
    }
  }
  updateMenu(input: $topbarInput) {
    menu {
      id
      title
      links {
        id
        url
        label
      }
    }
  }
}
    `;
export const UpdateMenu = `
    mutation updateMenu($input: updateMenuInput) {
  updateMenu(input: $input) {
    menu {
      id
    }
  }
}
    `;
export const UpdateProject = `
    mutation updateProject($projectInput: updateProjectInput, $menuInput: updateMenuInput) {
  updateProject(input: $projectInput) {
    project {
      id
    }
  }
  updateMenu(input: $menuInput) {
    menu {
      id
    }
  }
}
    `;