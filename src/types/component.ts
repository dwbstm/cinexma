export type HandlerType = {
  opened: boolean;
  onClose: () => void;
};

export type InputWrapperProps = {
  /** Contents of `Input.Label` component. If not set, label is not displayed. */
  label?: React.ReactNode;
  /** Contents of `Input.Description` component. If not set, description is not displayed. */
  description?: React.ReactNode;
  /** Contents of `Input.Error` component. If not set, error is not displayed. */
  error?: React.ReactNode;
  /** Adds required attribute to the input and a red asterisk on the right side of label @default `false` */
  required?: boolean;
};
