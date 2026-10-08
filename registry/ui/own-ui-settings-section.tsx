import * as React from "react"
import { cx } from "./own-ui-utils"
import styles from "./own-ui.module.css"

export function UiSettingsSection({ title, description, children, className, ...props }: Omit<React.HTMLAttributes<HTMLElement>, "title"> & { title: React.ReactNode; description?: React.ReactNode }) {
  const titleId = React.useId()
  return <section {...props} className={cx(styles.settings_section, className)} aria-labelledby={titleId}>
    <h2 id={titleId} className={styles.panel_title}>{title}</h2>
    {description && <p className={styles.panel_hint}>{description}</p>}
    <div>{children}</div>
  </section>
}

export function UiSettingsRow({ title, description, controls, footer, className, ...props }: Omit<React.HTMLAttributes<HTMLDivElement>, "title"> & { title: React.ReactNode; description?: React.ReactNode; controls: React.ReactNode; footer?: React.ReactNode }) {
  return <div {...props} className={cx(styles.settings_row, className)}>
    <div className={styles.settings_row_main}><div><div className={styles.field_label}>{title}</div>{description && <p className={styles.panel_hint}>{description}</p>}</div><div className={styles.settings_controls}>{controls}</div></div>
    {footer && <div className={styles.settings_footer}>{footer}</div>}
  </div>
}
