import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    root: theme.mixins.gutters({
      maxWidth: 600,
      margin: "auto",
      padding: theme.spacing(3),
      marginTop: theme.spacing(5),
    }),
    title: {
      marginTop: theme.spacing(3),
      color: theme.palette.protectedTitle,
    },
  }));