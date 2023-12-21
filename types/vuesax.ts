enum ENotificationPosition {
  'top-right',
  'bottom-right',
  'bottom-left',
  'top-left',
  'top-center',
  'bottom-center'
}

export type TNotificationPosition = keyof typeof ENotificationPosition
