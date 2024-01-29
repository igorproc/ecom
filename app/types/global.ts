export type TNavigationDrawerLinkListItem = {
  key: string | number,
  label: string,
  icon: unknown,
  disabled: boolean,
  cb: () => Promise<unknown> | unknown
}
