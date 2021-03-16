import {
  Card,
  CardActions,
  CardHeader,
  Avatar,
  CardContent,
  makeStyles,
  Box,
  Button,
  CardActionArea,
} from "@material-ui/core"

/**
 * Represents the styling of a Comment.
 */
const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
  },
}))

/**
 * Represents a comment under a Post.
 * @param {*} props The props passed.
 * @returns The component Comment.
 */
const Comment = (props) => {
  /**
   * The instance of the styles to use.
   */
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Card variant="outlined">
        <CardHeader
          title={props.commenter}
          className={classes.cardHeader}
          avatar={
            <Avatar src="https://material-ui.com/static/images/avatar/1.jpg"></Avatar>
          }
        ></CardHeader>
        <CardContent>
          <Box component="span" fontWeight={500}>
            {props.commenter}
          </Box>
          <p>{props.comment}</p>
        </CardContent>
        <CardActionArea>
          <CardActions>
            <Button size="small">Reply</Button>
            <Button size="small">Like ({props.likes})</Button>
          </CardActions>
        </CardActionArea>
      </Card>
    </div>
  )
}

export default Comment
