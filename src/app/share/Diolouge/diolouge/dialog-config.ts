export class DialogConfig <D = any>{
id?: string;
  /** Custom class for the overlay pane. */
  panelClass?: string | string[];
  /** Whether the dialog has a backdrop. */
  hasBackdrop?: boolean;
  /** Custom class for the backdrop, */
  backdropClass?: string;
  /** Whether the user can use escape or clicking on the backdrop to close the modal. */
  disableClose?: boolean;
  /** Width of the dialog. */
  width?: string;
  /** Height of the dialog. */
  height?: string;
  /** Min-width of the dialog. If a number is provided, pixel units are assumed. */
  minWidth?: number | string;
  /** Min-height of the dialog. If a number is provided, pixel units are assumed. */
  minHeight?: number | string;
  /** Max-width of the dialog. If a number is provided, pixel units are assumed. Defaults to 80vw */
  maxWidth?: number | string;
  /** Max-height of the dialog. If a number is provided, pixel units are assumed. */
  maxHeight?: number | string;
  /** Position overrides. */
  position?: DialogPosition;
  /** Data being injected into the child component. */
  data?: D | null;
  /** ID of the element that describes the dialog. */
  ariaDescribedBy?: string | null;
  /** Aria label to assign to the dialog element */
  ariaLabel?: string | null;
  /** Whether the dialog should focus the first focusable element on open. */
  autoFocus?: boolean;
  /** Scroll strategy to be used for the dialog. */
  scrollStrategy?: ScrollStrategy;
  /** Whether the dialog should close when the user goes backwards/forwards in history. */
  closeOnNavigation?: boolean;
  /** Adds padding to the dialog component */
  padding?: string;
}

export interface DialogPosition {
  /** Override for the dialog's top position. */
  top?: string;
  /** Override for the dialog's bottom position. */
  bottom?: string;
  /** Override for the dialog's left position. */
  left?: string;
  /** Override for the dialog's right position. */
  right?: string;
  /** Override for the Dialog's position */
  position?: string
}
export interface ScrollStrategy {
  /** Enable this scroll strategy (called when the attached overlay is attached to a portal). */
  enable: () => void;
  /** Disable this scroll strategy (called when the attached overlay is detached from a portal). */
  disable: () => void;
}

