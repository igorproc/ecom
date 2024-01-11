export type TNavigationDrawerLinkListItem = {
  key: string | number,
  label: string,
  icon: unknown,
  disabled: boolean,
  onClick: () => Promise<unknown> | unknown
}
