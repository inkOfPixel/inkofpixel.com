declare type Nullable<T> = T | null;
export type BlockTemplateData<TemplateName, Type> = {
  _template: TemplateName;
} & Type;

export interface BlockItemProps {
  isPreview: boolean;
}
