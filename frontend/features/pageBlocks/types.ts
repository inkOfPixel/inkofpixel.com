export type SectionBlockTemplateData<TemplateName, Type> = {
  _template: TemplateName;
} & Type;

export interface BlockItemProps {
  isPreview: boolean;
}
