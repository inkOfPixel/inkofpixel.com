export default interface ThemeInterface {
  colors: {
    [name: string]: string | undefined;
  };
  navigationColor: string;
  languageSelector: {
    color: string;
    backgroundColor: string;
  };
}
