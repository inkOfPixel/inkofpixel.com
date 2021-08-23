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
  /** Input type for dynamic zone sections of Pages */
  PagesSectionsDynamicZoneInput: any;
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
  url: Scalars['String'];
  label: Scalars['String'];
};

export type ComponentBlocksCardInput = {
  title: Scalars['String'];
  description: Scalars['String'];
  image?: Maybe<Scalars['ID']>;
  url: Scalars['String'];
  label: Scalars['String'];
};

export type ComponentBlocksFooterBlock = {
  __typename?: 'ComponentBlocksFooterBlock';
  id: Scalars['ID'];
  city?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  street?: Maybe<Scalars['String']>;
  province?: Maybe<Scalars['String']>;
  initials?: Maybe<Scalars['String']>;
  cap?: Maybe<Scalars['Int']>;
};

export type ComponentBlocksFooterBlockInput = {
  city?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  street?: Maybe<Scalars['String']>;
  province?: Maybe<Scalars['String']>;
  initials?: Maybe<Scalars['String']>;
  cap?: Maybe<Scalars['Int']>;
};

export type ComponentBlocksNavigationBlock = {
  __typename?: 'ComponentBlocksNavigationBlock';
  id: Scalars['ID'];
  label?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type ComponentBlocksNavigationBlockInput = {
  label?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type ComponentBlocksSingleFeature = {
  __typename?: 'ComponentBlocksSingleFeature';
  id: Scalars['ID'];
  description: Scalars['String'];
  title: Scalars['String'];
  image?: Maybe<UploadFile>;
  url: Scalars['String'];
  bubbleColor?: Maybe<Scalars['String']>;
  label: Scalars['String'];
};

export type ComponentBlocksSingleFeatureInput = {
  description: Scalars['String'];
  title: Scalars['String'];
  image?: Maybe<Scalars['ID']>;
  url: Scalars['String'];
  bubbleColor?: Maybe<Scalars['String']>;
  label: Scalars['String'];
};

export type ComponentBlocksSocialBubble = {
  __typename?: 'ComponentBlocksSocialBubble';
  id: Scalars['ID'];
  url?: Maybe<Scalars['String']>;
  bubbleColor?: Maybe<Scalars['String']>;
  bubbleHoverColor?: Maybe<Scalars['String']>;
  image?: Maybe<UploadFile>;
};

export type ComponentBlocksSocialBubbleInput = {
  url?: Maybe<Scalars['String']>;
  bubbleColor?: Maybe<Scalars['String']>;
  bubbleHoverColor?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['ID']>;
};

export type ComponentGlobalBottomBar = {
  __typename?: 'ComponentGlobalBottomBar';
  id: Scalars['ID'];
  footer?: Maybe<Footer>;
};

export type ComponentGlobalBottomBarInput = {
  footer?: Maybe<Scalars['ID']>;
};

export type ComponentGlobalTopbar = {
  __typename?: 'ComponentGlobalTopbar';
  id: Scalars['ID'];
  menu?: Maybe<Menu>;
};

export type ComponentGlobalTopbarInput = {
  menu?: Maybe<Scalars['ID']>;
};

export type ComponentMenuPageLink = {
  __typename?: 'ComponentMenuPageLink';
  id: Scalars['ID'];
  pageLinkName: Scalars['String'];
  link?: Maybe<Pages>;
};

export type ComponentMenuPageLinkInput = {
  pageLinkName: Scalars['String'];
  link?: Maybe<Scalars['ID']>;
};

export type ComponentSectionCardSection = {
  __typename?: 'ComponentSectionCardSection';
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
  subtitle?: Maybe<Scalars['String']>;
  sections?: Maybe<Array<Maybe<ComponentBlocksCard>>>;
  sectionTitle?: Maybe<Scalars['String']>;
};

export type ComponentSectionCardSectionInput = {
  title?: Maybe<Scalars['String']>;
  subtitle?: Maybe<Scalars['String']>;
  sections?: Maybe<Array<Maybe<ComponentBlocksCardInput>>>;
  sectionTitle?: Maybe<Scalars['String']>;
};

export type ComponentSectionContactsSection = {
  __typename?: 'ComponentSectionContactsSection';
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
  subtitle?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  sectionTitle?: Maybe<Scalars['String']>;
  socialBubbles?: Maybe<Array<Maybe<ComponentBlocksSocialBubble>>>;
};

export type ComponentSectionContactsSectionInput = {
  title?: Maybe<Scalars['String']>;
  subtitle?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  sectionTitle?: Maybe<Scalars['String']>;
  socialBubbles?: Maybe<Array<Maybe<ComponentBlocksSocialBubbleInput>>>;
};

export type ComponentSectionFooterSection = {
  __typename?: 'ComponentSectionFooterSection';
  id: Scalars['ID'];
  description?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  copyright?: Maybe<Scalars['String']>;
  sharedCapital?: Maybe<Scalars['String']>;
  street?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  vatNumber?: Maybe<Scalars['Int']>;
  sections?: Maybe<Array<Maybe<ComponentBlocksFooterBlock>>>;
  cap?: Maybe<Scalars['Int']>;
};

export type ComponentSectionFooterSectionInput = {
  description?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  copyright?: Maybe<Scalars['String']>;
  sharedCapital?: Maybe<Scalars['String']>;
  street?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  vatNumber?: Maybe<Scalars['Int']>;
  sections?: Maybe<Array<Maybe<ComponentBlocksFooterBlockInput>>>;
  cap?: Maybe<Scalars['Int']>;
};

export type ComponentSectionHeroSection = {
  __typename?: 'ComponentSectionHeroSection';
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
  subtitle?: Maybe<Scalars['String']>;
  areBubblesActive?: Maybe<Scalars['Boolean']>;
};

export type ComponentSectionHeroSectionInput = {
  title?: Maybe<Scalars['String']>;
  subtitle?: Maybe<Scalars['String']>;
  areBubblesActive?: Maybe<Scalars['Boolean']>;
};

export type ComponentSectionSimpleSection = {
  __typename?: 'ComponentSectionSimpleSection';
  id: Scalars['ID'];
  sectionTitle?: Maybe<Scalars['String']>;
  sectionTitleColor?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  subtitle?: Maybe<Scalars['String']>;
};

export type ComponentSectionSimpleSectionInput = {
  sectionTitle?: Maybe<Scalars['String']>;
  sectionTitleColor?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  subtitle?: Maybe<Scalars['String']>;
};

export type ComponentSectionSingleFeatureSection = {
  __typename?: 'ComponentSectionSingleFeatureSection';
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
  subtitle?: Maybe<Scalars['String']>;
  sections?: Maybe<Array<Maybe<ComponentBlocksSingleFeature>>>;
  sectionTitle?: Maybe<Scalars['String']>;
};

export type ComponentSectionSingleFeatureSectionInput = {
  title?: Maybe<Scalars['String']>;
  subtitle?: Maybe<Scalars['String']>;
  sections?: Maybe<Array<Maybe<ComponentBlocksSingleFeatureInput>>>;
  sectionTitle?: Maybe<Scalars['String']>;
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

export type Footer = {
  __typename?: 'Footer';
  id: Scalars['ID'];
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  copyright?: Maybe<Scalars['String']>;
  street?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  cap?: Maybe<Scalars['Int']>;
  blocks?: Maybe<Array<Maybe<ComponentBlocksFooterBlock>>>;
  sharedCapital?: Maybe<Scalars['Int']>;
  vatNumber?: Maybe<Scalars['Long']>;
  locale?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  localizations?: Maybe<Array<Maybe<Footer>>>;
};


export type FooterLocalizationsArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};

export type FooterAggregator = {
  __typename?: 'FooterAggregator';
  count?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
  sum?: Maybe<FooterAggregatorSum>;
  avg?: Maybe<FooterAggregatorAvg>;
  min?: Maybe<FooterAggregatorMin>;
  max?: Maybe<FooterAggregatorMax>;
};

export type FooterAggregatorAvg = {
  __typename?: 'FooterAggregatorAvg';
  cap?: Maybe<Scalars['Float']>;
  sharedCapital?: Maybe<Scalars['Float']>;
};

export type FooterAggregatorMax = {
  __typename?: 'FooterAggregatorMax';
  cap?: Maybe<Scalars['Float']>;
  sharedCapital?: Maybe<Scalars['Float']>;
};

export type FooterAggregatorMin = {
  __typename?: 'FooterAggregatorMin';
  cap?: Maybe<Scalars['Float']>;
  sharedCapital?: Maybe<Scalars['Float']>;
};

export type FooterAggregatorSum = {
  __typename?: 'FooterAggregatorSum';
  cap?: Maybe<Scalars['Float']>;
  sharedCapital?: Maybe<Scalars['Float']>;
};

export type FooterConnection = {
  __typename?: 'FooterConnection';
  values?: Maybe<Array<Maybe<Footer>>>;
  groupBy?: Maybe<FooterGroupBy>;
  aggregate?: Maybe<FooterAggregator>;
};

export type FooterConnectionCap = {
  __typename?: 'FooterConnectionCap';
  key?: Maybe<Scalars['Int']>;
  connection?: Maybe<FooterConnection>;
};

export type FooterConnectionCity = {
  __typename?: 'FooterConnectionCity';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<FooterConnection>;
};

export type FooterConnectionCopyright = {
  __typename?: 'FooterConnectionCopyright';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<FooterConnection>;
};

export type FooterConnectionCreated_At = {
  __typename?: 'FooterConnectionCreated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<FooterConnection>;
};

export type FooterConnectionDescription = {
  __typename?: 'FooterConnectionDescription';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<FooterConnection>;
};

export type FooterConnectionEmail = {
  __typename?: 'FooterConnectionEmail';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<FooterConnection>;
};

export type FooterConnectionId = {
  __typename?: 'FooterConnectionId';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<FooterConnection>;
};

export type FooterConnectionLocale = {
  __typename?: 'FooterConnectionLocale';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<FooterConnection>;
};

export type FooterConnectionPublished_At = {
  __typename?: 'FooterConnectionPublished_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<FooterConnection>;
};

export type FooterConnectionSharedCapital = {
  __typename?: 'FooterConnectionSharedCapital';
  key?: Maybe<Scalars['Int']>;
  connection?: Maybe<FooterConnection>;
};

export type FooterConnectionStreet = {
  __typename?: 'FooterConnectionStreet';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<FooterConnection>;
};

export type FooterConnectionUpdated_At = {
  __typename?: 'FooterConnectionUpdated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<FooterConnection>;
};

export type FooterConnectionVatNumber = {
  __typename?: 'FooterConnectionVatNumber';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<FooterConnection>;
};

export type FooterGroupBy = {
  __typename?: 'FooterGroupBy';
  id?: Maybe<Array<Maybe<FooterConnectionId>>>;
  created_at?: Maybe<Array<Maybe<FooterConnectionCreated_At>>>;
  updated_at?: Maybe<Array<Maybe<FooterConnectionUpdated_At>>>;
  description?: Maybe<Array<Maybe<FooterConnectionDescription>>>;
  email?: Maybe<Array<Maybe<FooterConnectionEmail>>>;
  copyright?: Maybe<Array<Maybe<FooterConnectionCopyright>>>;
  street?: Maybe<Array<Maybe<FooterConnectionStreet>>>;
  city?: Maybe<Array<Maybe<FooterConnectionCity>>>;
  cap?: Maybe<Array<Maybe<FooterConnectionCap>>>;
  sharedCapital?: Maybe<Array<Maybe<FooterConnectionSharedCapital>>>;
  vatNumber?: Maybe<Array<Maybe<FooterConnectionVatNumber>>>;
  locale?: Maybe<Array<Maybe<FooterConnectionLocale>>>;
  published_at?: Maybe<Array<Maybe<FooterConnectionPublished_At>>>;
};

export type FooterInput = {
  description?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  copyright?: Maybe<Scalars['String']>;
  street?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  cap?: Maybe<Scalars['Int']>;
  blocks?: Maybe<Array<Maybe<ComponentBlocksFooterBlockInput>>>;
  sharedCapital?: Maybe<Scalars['Int']>;
  vatNumber?: Maybe<Scalars['Long']>;
  localizations?: Maybe<Array<Maybe<Scalars['ID']>>>;
  locale?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type FormMessageInput = {
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type FormMessages = {
  __typename?: 'FormMessages';
  id: Scalars['ID'];
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
};

export type FormMessagesAggregator = {
  __typename?: 'FormMessagesAggregator';
  count?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type FormMessagesConnection = {
  __typename?: 'FormMessagesConnection';
  values?: Maybe<Array<Maybe<FormMessages>>>;
  groupBy?: Maybe<FormMessagesGroupBy>;
  aggregate?: Maybe<FormMessagesAggregator>;
};

export type FormMessagesConnectionCreated_At = {
  __typename?: 'FormMessagesConnectionCreated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<FormMessagesConnection>;
};

export type FormMessagesConnectionEmail = {
  __typename?: 'FormMessagesConnectionEmail';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<FormMessagesConnection>;
};

export type FormMessagesConnectionId = {
  __typename?: 'FormMessagesConnectionId';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<FormMessagesConnection>;
};

export type FormMessagesConnectionMessage = {
  __typename?: 'FormMessagesConnectionMessage';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<FormMessagesConnection>;
};

export type FormMessagesConnectionName = {
  __typename?: 'FormMessagesConnectionName';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<FormMessagesConnection>;
};

export type FormMessagesConnectionPublished_At = {
  __typename?: 'FormMessagesConnectionPublished_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<FormMessagesConnection>;
};

export type FormMessagesConnectionUpdated_At = {
  __typename?: 'FormMessagesConnectionUpdated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<FormMessagesConnection>;
};

export type FormMessagesGroupBy = {
  __typename?: 'FormMessagesGroupBy';
  id?: Maybe<Array<Maybe<FormMessagesConnectionId>>>;
  created_at?: Maybe<Array<Maybe<FormMessagesConnectionCreated_At>>>;
  updated_at?: Maybe<Array<Maybe<FormMessagesConnectionUpdated_At>>>;
  email?: Maybe<Array<Maybe<FormMessagesConnectionEmail>>>;
  name?: Maybe<Array<Maybe<FormMessagesConnectionName>>>;
  message?: Maybe<Array<Maybe<FormMessagesConnectionMessage>>>;
  published_at?: Maybe<Array<Maybe<FormMessagesConnectionPublished_At>>>;
};

export type Global = {
  __typename?: 'Global';
  id: Scalars['ID'];
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
  bottomBar?: Maybe<ComponentGlobalBottomBar>;
  topbar?: Maybe<ComponentGlobalTopbar>;
  published_at?: Maybe<Scalars['DateTime']>;
};

export type GlobalInput = {
  bottomBar?: Maybe<ComponentGlobalBottomBarInput>;
  topbar?: Maybe<ComponentGlobalTopbarInput>;
  published_at?: Maybe<Scalars['DateTime']>;
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


export type Menu = {
  __typename?: 'Menu';
  id: Scalars['ID'];
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
  links?: Maybe<Array<Maybe<ComponentBlocksNavigationBlock>>>;
  title: Scalars['String'];
  published_at?: Maybe<Scalars['DateTime']>;
};

export type MenuAggregator = {
  __typename?: 'MenuAggregator';
  count?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type MenuConnection = {
  __typename?: 'MenuConnection';
  values?: Maybe<Array<Maybe<Menu>>>;
  groupBy?: Maybe<MenuGroupBy>;
  aggregate?: Maybe<MenuAggregator>;
};

export type MenuConnectionCreated_At = {
  __typename?: 'MenuConnectionCreated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<MenuConnection>;
};

export type MenuConnectionId = {
  __typename?: 'MenuConnectionId';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<MenuConnection>;
};

export type MenuConnectionPublished_At = {
  __typename?: 'MenuConnectionPublished_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<MenuConnection>;
};

export type MenuConnectionTitle = {
  __typename?: 'MenuConnectionTitle';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<MenuConnection>;
};

export type MenuConnectionUpdated_At = {
  __typename?: 'MenuConnectionUpdated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<MenuConnection>;
};

export type MenuGroupBy = {
  __typename?: 'MenuGroupBy';
  id?: Maybe<Array<Maybe<MenuConnectionId>>>;
  created_at?: Maybe<Array<Maybe<MenuConnectionCreated_At>>>;
  updated_at?: Maybe<Array<Maybe<MenuConnectionUpdated_At>>>;
  title?: Maybe<Array<Maybe<MenuConnectionTitle>>>;
  published_at?: Maybe<Array<Maybe<MenuConnectionPublished_At>>>;
};

export type MenuInput = {
  links?: Maybe<Array<Maybe<ComponentBlocksNavigationBlockInput>>>;
  title?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type Morph = UsersPermissionsMe | UsersPermissionsMeRole | UsersPermissionsLoginPayload | UserPermissionsPasswordPayload | Footer | FooterConnection | FooterAggregator | FooterAggregatorSum | FooterAggregatorAvg | FooterAggregatorMin | FooterAggregatorMax | FooterGroupBy | FooterConnectionId | FooterConnectionCreated_At | FooterConnectionUpdated_At | FooterConnectionDescription | FooterConnectionEmail | FooterConnectionCopyright | FooterConnectionStreet | FooterConnectionCity | FooterConnectionCap | FooterConnectionSharedCapital | FooterConnectionVatNumber | FooterConnectionLocale | FooterConnectionPublished_At | CreateFooterPayload | UpdateFooterPayload | DeleteFooterPayload | FormMessages | FormMessagesConnection | FormMessagesAggregator | FormMessagesGroupBy | FormMessagesConnectionId | FormMessagesConnectionCreated_At | FormMessagesConnectionUpdated_At | FormMessagesConnectionEmail | FormMessagesConnectionName | FormMessagesConnectionMessage | FormMessagesConnectionPublished_At | CreateFormMessagePayload | UpdateFormMessagePayload | DeleteFormMessagePayload | Global | UpdateGlobalPayload | DeleteGlobalPayload | Menu | MenuConnection | MenuAggregator | MenuGroupBy | MenuConnectionId | MenuConnectionCreated_At | MenuConnectionUpdated_At | MenuConnectionTitle | MenuConnectionPublished_At | CreateMenuPayload | UpdateMenuPayload | DeleteMenuPayload | Pages | PagesConnection | PagesAggregator | PagesGroupBy | PagesConnectionId | PagesConnectionCreated_At | PagesConnectionUpdated_At | PagesConnectionTitle | PagesConnectionPath | PagesConnectionLocale | PagesConnectionPublished_At | CreatePagePayload | UpdatePagePayload | DeletePagePayload | I18NLocale | UploadFile | UploadFileConnection | UploadFileAggregator | UploadFileAggregatorSum | UploadFileAggregatorAvg | UploadFileAggregatorMin | UploadFileAggregatorMax | UploadFileGroupBy | UploadFileConnectionId | UploadFileConnectionCreated_At | UploadFileConnectionUpdated_At | UploadFileConnectionName | UploadFileConnectionAlternativeText | UploadFileConnectionCaption | UploadFileConnectionWidth | UploadFileConnectionHeight | UploadFileConnectionFormats | UploadFileConnectionHash | UploadFileConnectionExt | UploadFileConnectionMime | UploadFileConnectionSize | UploadFileConnectionUrl | UploadFileConnectionPreviewUrl | UploadFileConnectionProvider | UploadFileConnectionProvider_Metadata | DeleteFilePayload | UsersPermissionsPermission | UsersPermissionsRole | UsersPermissionsRoleConnection | UsersPermissionsRoleAggregator | UsersPermissionsRoleGroupBy | UsersPermissionsRoleConnectionId | UsersPermissionsRoleConnectionName | UsersPermissionsRoleConnectionDescription | UsersPermissionsRoleConnectionType | CreateRolePayload | UpdateRolePayload | DeleteRolePayload | UsersPermissionsUser | UsersPermissionsUserConnection | UsersPermissionsUserAggregator | UsersPermissionsUserGroupBy | UsersPermissionsUserConnectionId | UsersPermissionsUserConnectionCreated_At | UsersPermissionsUserConnectionUpdated_At | UsersPermissionsUserConnectionUsername | UsersPermissionsUserConnectionEmail | UsersPermissionsUserConnectionProvider | UsersPermissionsUserConnectionConfirmed | UsersPermissionsUserConnectionBlocked | UsersPermissionsUserConnectionRole | CreateUserPayload | UpdateUserPayload | DeleteUserPayload | ComponentBlocksCard | ComponentBlocksFooterBlock | ComponentBlocksNavigationBlock | ComponentBlocksSingleFeature | ComponentBlocksSocialBubble | ComponentGlobalBottomBar | ComponentGlobalTopbar | ComponentMenuPageLink | ComponentSectionCardSection | ComponentSectionContactsSection | ComponentSectionFooterSection | ComponentSectionHeroSection | ComponentSectionSimpleSection | ComponentSectionSingleFeatureSection;

export type Mutation = {
  __typename?: 'Mutation';
  createFooter?: Maybe<CreateFooterPayload>;
  updateFooter?: Maybe<UpdateFooterPayload>;
  deleteFooter?: Maybe<DeleteFooterPayload>;
  createFormMessage?: Maybe<CreateFormMessagePayload>;
  updateFormMessage?: Maybe<UpdateFormMessagePayload>;
  deleteFormMessage?: Maybe<DeleteFormMessagePayload>;
  updateGlobal?: Maybe<UpdateGlobalPayload>;
  deleteGlobal?: Maybe<DeleteGlobalPayload>;
  createMenu?: Maybe<CreateMenuPayload>;
  updateMenu?: Maybe<UpdateMenuPayload>;
  deleteMenu?: Maybe<DeleteMenuPayload>;
  createPage?: Maybe<CreatePagePayload>;
  updatePage?: Maybe<UpdatePagePayload>;
  deletePage?: Maybe<DeletePagePayload>;
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
  createFooterLocalization: Footer;
  createPageLocalization: Pages;
  upload: UploadFile;
  multipleUpload: Array<Maybe<UploadFile>>;
  updateFileInfo: UploadFile;
  login: UsersPermissionsLoginPayload;
  register: UsersPermissionsLoginPayload;
  forgotPassword?: Maybe<UserPermissionsPasswordPayload>;
  resetPassword?: Maybe<UsersPermissionsLoginPayload>;
  emailConfirmation?: Maybe<UsersPermissionsLoginPayload>;
};


export type MutationCreateFooterArgs = {
  input?: Maybe<CreateFooterInput>;
};


export type MutationUpdateFooterArgs = {
  input?: Maybe<UpdateFooterInput>;
};


export type MutationDeleteFooterArgs = {
  input?: Maybe<DeleteFooterInput>;
};


export type MutationCreateFormMessageArgs = {
  input?: Maybe<CreateFormMessageInput>;
};


export type MutationUpdateFormMessageArgs = {
  input?: Maybe<UpdateFormMessageInput>;
};


export type MutationDeleteFormMessageArgs = {
  input?: Maybe<DeleteFormMessageInput>;
};


export type MutationUpdateGlobalArgs = {
  input?: Maybe<UpdateGlobalInput>;
};


export type MutationCreateMenuArgs = {
  input?: Maybe<CreateMenuInput>;
};


export type MutationUpdateMenuArgs = {
  input?: Maybe<UpdateMenuInput>;
};


export type MutationDeleteMenuArgs = {
  input?: Maybe<DeleteMenuInput>;
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


export type MutationCreateFooterLocalizationArgs = {
  input: UpdateFooterInput;
};


export type MutationCreatePageLocalizationArgs = {
  input: UpdatePageInput;
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

export type PageInput = {
  title?: Maybe<Scalars['String']>;
  path: Scalars['String'];
  sections?: Maybe<Array<Scalars['PagesSectionsDynamicZoneInput']>>;
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
  title: Scalars['String'];
  path: Scalars['String'];
  sections?: Maybe<Array<Maybe<PagesSectionsDynamicZone>>>;
  locale?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  localizations?: Maybe<Array<Maybe<Pages>>>;
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

export type PagesConnectionTitle = {
  __typename?: 'PagesConnectionTitle';
  key?: Maybe<Scalars['String']>;
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
  title?: Maybe<Array<Maybe<PagesConnectionTitle>>>;
  path?: Maybe<Array<Maybe<PagesConnectionPath>>>;
  locale?: Maybe<Array<Maybe<PagesConnectionLocale>>>;
  published_at?: Maybe<Array<Maybe<PagesConnectionPublished_At>>>;
};

export type PagesSectionsDynamicZone = ComponentSectionCardSection | ComponentSectionHeroSection | ComponentSectionSingleFeatureSection | ComponentSectionContactsSection | ComponentSectionSimpleSection;


export enum PublicationState {
  Live = 'LIVE',
  Preview = 'PREVIEW'
}

export type Query = {
  __typename?: 'Query';
  footer?: Maybe<Footer>;
  footers?: Maybe<Array<Maybe<Footer>>>;
  footersConnection?: Maybe<FooterConnection>;
  formMessage?: Maybe<FormMessages>;
  formMessages?: Maybe<Array<Maybe<FormMessages>>>;
  formMessagesConnection?: Maybe<FormMessagesConnection>;
  global?: Maybe<Global>;
  menu?: Maybe<Menu>;
  menus?: Maybe<Array<Maybe<Menu>>>;
  menusConnection?: Maybe<MenuConnection>;
  page?: Maybe<Pages>;
  pages?: Maybe<Array<Maybe<Pages>>>;
  pagesConnection?: Maybe<PagesConnection>;
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


export type QueryFooterArgs = {
  id: Scalars['ID'];
  publicationState?: Maybe<PublicationState>;
};


export type QueryFootersArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
  publicationState?: Maybe<PublicationState>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryFootersConnectionArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryFormMessageArgs = {
  id: Scalars['ID'];
  publicationState?: Maybe<PublicationState>;
};


export type QueryFormMessagesArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
  publicationState?: Maybe<PublicationState>;
};


export type QueryFormMessagesConnectionArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
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
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
  publicationState?: Maybe<PublicationState>;
};


export type QueryMenusConnectionArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
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

export type CreateFooterInput = {
  data?: Maybe<FooterInput>;
};

export type CreateFooterPayload = {
  __typename?: 'createFooterPayload';
  footer?: Maybe<Footer>;
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
  page?: Maybe<Pages>;
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

export type DeleteFooterInput = {
  where?: Maybe<InputId>;
};

export type DeleteFooterPayload = {
  __typename?: 'deleteFooterPayload';
  footer?: Maybe<Footer>;
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
  page?: Maybe<Pages>;
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
  id?: Maybe<Scalars['ID']>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['ID']>;
  url?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
};

export type EditComponentBlocksFooterBlockInput = {
  id?: Maybe<Scalars['ID']>;
  city?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  street?: Maybe<Scalars['String']>;
  province?: Maybe<Scalars['String']>;
  initials?: Maybe<Scalars['String']>;
  cap?: Maybe<Scalars['Int']>;
};

export type EditComponentBlocksNavigationBlockInput = {
  id?: Maybe<Scalars['ID']>;
  label?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type EditComponentBlocksSingleFeatureInput = {
  id?: Maybe<Scalars['ID']>;
  description?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['ID']>;
  url?: Maybe<Scalars['String']>;
  bubbleColor?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
};

export type EditComponentBlocksSocialBubbleInput = {
  id?: Maybe<Scalars['ID']>;
  url?: Maybe<Scalars['String']>;
  bubbleColor?: Maybe<Scalars['String']>;
  bubbleHoverColor?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['ID']>;
};

export type EditComponentGlobalBottomBarInput = {
  id?: Maybe<Scalars['ID']>;
  footer?: Maybe<Scalars['ID']>;
};

export type EditComponentGlobalTopbarInput = {
  id?: Maybe<Scalars['ID']>;
  menu?: Maybe<Scalars['ID']>;
};

export type EditComponentMenuPageLinkInput = {
  id?: Maybe<Scalars['ID']>;
  pageLinkName?: Maybe<Scalars['String']>;
  link?: Maybe<Scalars['ID']>;
};

export type EditComponentSectionCardSectionInput = {
  id?: Maybe<Scalars['ID']>;
  title?: Maybe<Scalars['String']>;
  subtitle?: Maybe<Scalars['String']>;
  sections?: Maybe<Array<Maybe<EditComponentBlocksCardInput>>>;
  sectionTitle?: Maybe<Scalars['String']>;
};

export type EditComponentSectionContactsSectionInput = {
  id?: Maybe<Scalars['ID']>;
  title?: Maybe<Scalars['String']>;
  subtitle?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  sectionTitle?: Maybe<Scalars['String']>;
  socialBubbles?: Maybe<Array<Maybe<EditComponentBlocksSocialBubbleInput>>>;
};

export type EditComponentSectionFooterSectionInput = {
  id?: Maybe<Scalars['ID']>;
  description?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  copyright?: Maybe<Scalars['String']>;
  sharedCapital?: Maybe<Scalars['String']>;
  street?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  vatNumber?: Maybe<Scalars['Int']>;
  sections?: Maybe<Array<Maybe<EditComponentBlocksFooterBlockInput>>>;
  cap?: Maybe<Scalars['Int']>;
};

export type EditComponentSectionHeroSectionInput = {
  id?: Maybe<Scalars['ID']>;
  title?: Maybe<Scalars['String']>;
  subtitle?: Maybe<Scalars['String']>;
  areBubblesActive?: Maybe<Scalars['Boolean']>;
};

export type EditComponentSectionSimpleSectionInput = {
  id?: Maybe<Scalars['ID']>;
  sectionTitle?: Maybe<Scalars['String']>;
  sectionTitleColor?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  subtitle?: Maybe<Scalars['String']>;
};

export type EditComponentSectionSingleFeatureSectionInput = {
  id?: Maybe<Scalars['ID']>;
  title?: Maybe<Scalars['String']>;
  subtitle?: Maybe<Scalars['String']>;
  sections?: Maybe<Array<Maybe<EditComponentBlocksSingleFeatureInput>>>;
  sectionTitle?: Maybe<Scalars['String']>;
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

export type EditFooterInput = {
  description?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  copyright?: Maybe<Scalars['String']>;
  street?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  cap?: Maybe<Scalars['Int']>;
  blocks?: Maybe<Array<Maybe<EditComponentBlocksFooterBlockInput>>>;
  sharedCapital?: Maybe<Scalars['Int']>;
  vatNumber?: Maybe<Scalars['Long']>;
  localizations?: Maybe<Array<Maybe<Scalars['ID']>>>;
  locale?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditFormMessageInput = {
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditGlobalInput = {
  bottomBar?: Maybe<EditComponentGlobalBottomBarInput>;
  topbar?: Maybe<EditComponentGlobalTopbarInput>;
  published_at?: Maybe<Scalars['DateTime']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditLocaleInput = {
  name?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditMenuInput = {
  links?: Maybe<Array<Maybe<EditComponentBlocksNavigationBlockInput>>>;
  title?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditPageInput = {
  title?: Maybe<Scalars['String']>;
  path?: Maybe<Scalars['String']>;
  sections?: Maybe<Array<Scalars['PagesSectionsDynamicZoneInput']>>;
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

export type UpdateFooterInput = {
  where?: Maybe<InputId>;
  data?: Maybe<EditFooterInput>;
};

export type UpdateFooterPayload = {
  __typename?: 'updateFooterPayload';
  footer?: Maybe<Footer>;
};

export type UpdateFormMessageInput = {
  where?: Maybe<InputId>;
  data?: Maybe<EditFormMessageInput>;
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
  where?: Maybe<InputId>;
  data?: Maybe<EditMenuInput>;
};

export type UpdateMenuPayload = {
  __typename?: 'updateMenuPayload';
  menu?: Maybe<Menu>;
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

export type UpdateUserInput = {
  where?: Maybe<InputId>;
  data?: Maybe<EditUserInput>;
};

export type UpdateUserPayload = {
  __typename?: 'updateUserPayload';
  user?: Maybe<UsersPermissionsUser>;
};

export type GetPagesQueryVariables = Exact<{
  where?: Maybe<Scalars['JSON']>;
  locale?: Maybe<Scalars['String']>;
}>;


export type GetPagesQuery = (
  { __typename?: 'Query' }
  & { pages?: Maybe<Array<Maybe<(
    { __typename: 'Pages' }
    & Pick<Pages, 'id' | 'path' | 'title' | 'locale'>
    & { localizations?: Maybe<Array<Maybe<(
      { __typename?: 'Pages' }
      & Pick<Pages, 'id' | 'path' | 'locale'>
    )>>>, sections?: Maybe<Array<Maybe<(
      { __typename: 'ComponentSectionCardSection' }
      & Pick<ComponentSectionCardSection, 'id' | 'sectionTitle' | 'title' | 'subtitle'>
      & { sections?: Maybe<Array<Maybe<(
        { __typename?: 'ComponentBlocksCard' }
        & Pick<ComponentBlocksCard, 'id' | 'title' | 'description' | 'url' | 'label'>
        & { image?: Maybe<(
          { __typename?: 'UploadFile' }
          & Pick<UploadFile, 'id' | 'url' | 'alternativeText'>
        )> }
      )>>> }
    ) | (
      { __typename: 'ComponentSectionHeroSection' }
      & Pick<ComponentSectionHeroSection, 'id' | 'title' | 'subtitle' | 'areBubblesActive'>
    ) | (
      { __typename: 'ComponentSectionSingleFeatureSection' }
      & Pick<ComponentSectionSingleFeatureSection, 'id' | 'sectionTitle' | 'title' | 'subtitle'>
      & { sections?: Maybe<Array<Maybe<(
        { __typename: 'ComponentBlocksSingleFeature' }
        & Pick<ComponentBlocksSingleFeature, 'id' | 'description' | 'title' | 'url' | 'label' | 'bubbleColor'>
        & { image?: Maybe<(
          { __typename?: 'UploadFile' }
          & Pick<UploadFile, 'id' | 'name' | 'alternativeText' | 'width' | 'height' | 'url'>
        )> }
      )>>> }
    ) | (
      { __typename: 'ComponentSectionContactsSection' }
      & Pick<ComponentSectionContactsSection, 'id' | 'title' | 'subtitle' | 'email' | 'sectionTitle'>
    ) | (
      { __typename: 'ComponentSectionSimpleSection' }
      & Pick<ComponentSectionSimpleSection, 'id' | 'sectionTitle' | 'sectionTitleColor' | 'title' | 'subtitle'>
    )>>> }
  )>>> }
);

export type InsertFormMessageMutationVariables = Exact<{
  input?: Maybe<CreateFormMessageInput>;
}>;


export type InsertFormMessageMutation = (
  { __typename?: 'Mutation' }
  & { createFormMessage?: Maybe<(
    { __typename?: 'createFormMessagePayload' }
    & { formMessage?: Maybe<(
      { __typename?: 'FormMessages' }
      & Pick<FormMessages, 'id' | 'name' | 'email' | 'message'>
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

export type GetGlobalQueryVariables = Exact<{ [key: string]: never; }>;


export type GetGlobalQuery = (
  { __typename?: 'Query' }
  & { global?: Maybe<(
    { __typename?: 'Global' }
    & Pick<Global, 'id'>
    & { bottomBar?: Maybe<(
      { __typename?: 'ComponentGlobalBottomBar' }
      & Pick<ComponentGlobalBottomBar, 'id'>
      & { footer?: Maybe<(
        { __typename?: 'Footer' }
        & Pick<Footer, 'id' | 'description' | 'email' | 'copyright' | 'street' | 'city' | 'cap' | 'vatNumber' | 'sharedCapital'>
        & { blocks?: Maybe<Array<Maybe<(
          { __typename?: 'ComponentBlocksFooterBlock' }
          & Pick<ComponentBlocksFooterBlock, 'id' | 'city' | 'type' | 'street' | 'province' | 'initials' | 'cap'>
        )>>> }
      )> }
    )>, topbar?: Maybe<(
      { __typename?: 'ComponentGlobalTopbar' }
      & Pick<ComponentGlobalTopbar, 'id'>
      & { menu?: Maybe<(
        { __typename?: 'Menu' }
        & Pick<Menu, 'id' | 'title'>
        & { links?: Maybe<Array<Maybe<(
          { __typename?: 'ComponentBlocksNavigationBlock' }
          & Pick<ComponentBlocksNavigationBlock, 'id' | 'label' | 'url'>
        )>>> }
      )> }
    )> }
  )> }
);

export type SaveChangesMutationVariables = Exact<{
  pageInput?: Maybe<UpdatePageInput>;
  footerInput?: Maybe<UpdateFooterInput>;
  topbarInput?: Maybe<UpdateMenuInput>;
}>;


export type SaveChangesMutation = (
  { __typename?: 'Mutation' }
  & { updatePage?: Maybe<(
    { __typename?: 'updatePagePayload' }
    & { page?: Maybe<(
      { __typename?: 'Pages' }
      & Pick<Pages, 'id'>
    )> }
  )>, updateFooter?: Maybe<(
    { __typename?: 'updateFooterPayload' }
    & { footer?: Maybe<(
      { __typename?: 'Footer' }
      & Pick<Footer, 'id' | 'description' | 'email' | 'copyright' | 'street' | 'city' | 'cap' | 'sharedCapital' | 'vatNumber'>
      & { blocks?: Maybe<Array<Maybe<(
        { __typename?: 'ComponentBlocksFooterBlock' }
        & Pick<ComponentBlocksFooterBlock, 'id' | 'city' | 'type' | 'street' | 'province' | 'initials' | 'cap'>
      )>>> }
    )> }
  )>, updateMenu?: Maybe<(
    { __typename?: 'updateMenuPayload' }
    & { menu?: Maybe<(
      { __typename?: 'Menu' }
      & Pick<Menu, 'id' | 'title'>
      & { links?: Maybe<Array<Maybe<(
        { __typename?: 'ComponentBlocksNavigationBlock' }
        & Pick<ComponentBlocksNavigationBlock, 'id' | 'url' | 'label'>
      )>>> }
    )> }
  )> }
);


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
    bottomBar {
      id
      footer {
        id
        description
        email
        copyright
        street
        city
        cap
        vatNumber
        sharedCapital
        blocks {
          id
          city
          type
          street
          province
          initials
          cap
        }
      }
    }
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
  }
}
    `;
export const SaveChanges = `
    mutation saveChanges($pageInput: updatePageInput, $footerInput: updateFooterInput, $topbarInput: updateMenuInput) {
  updatePage(input: $pageInput) {
    page {
      id
    }
  }
  updateFooter(input: $footerInput) {
    footer {
      id
      description
      email
      copyright
      street
      city
      cap
      sharedCapital
      vatNumber
      blocks {
        id
        city
        type
        street
        province
        initials
        cap
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