declare type Nullable<T> = T | null;

declare type BlockTemplateData<TemplateName, Type> = {
  _template: TemplateName;
} & Type;

declare interface BlockItemProps {
  isPreview: boolean;
}
