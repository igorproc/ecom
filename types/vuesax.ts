enum ENotificationPosition {
  'top-right',
  'bottom-right',
  'bottom-left',
  'top-left',
  'top-center',
  'bottom-center
}

enum ENotificationColors {
  'primary',
  'success',
  'danger',
  'warn',
  'dark'
}

export type TNotificationPosition = keyof typeof ENotificationPosition
export type TNotificationColor = keyof typeof ENotificationColors | string
