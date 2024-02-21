export type TNavigationDrawerLinkListItem = {
  key: string | number,
  label: string,
  disabled: boolean,
  cb: () => Promise<unknown> | unknown
}
