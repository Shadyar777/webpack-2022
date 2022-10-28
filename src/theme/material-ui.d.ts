import { Theme as MuiTheme, ThemeOptions as MuiThemeOptions } from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: false
    sm: false
    md: false
    lg: false
    xl: false
  }

  interface Theme extends MuiTheme {}

  interface ThemeOptions extends MuiThemeOptions {}
}
