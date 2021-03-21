import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@material-ui/core"

import { useQuery } from "@apollo/client"
import CreatePost from "../components/post/CreatePost"
import ProfilePosts from "../components/profile/ProfilePosts"
import GET_USER from "../user/getUserQuery"

const ProfilePage = () => {
  /**
   * The query hook to fetch the users data.
   */
  const { data } = useQuery(GET_USER, {
    onError({ error }) {},
  })

  return (
    <div style={{ padding: "4rem" }}>
      <Grid container spacing={4}>
        <Grid item sm={12} md={4}>
          <Card
            style={{
              padding: "2rem",
              maxWidth: "300px",
            }}
          >
            <CardMedia
              style={{ borderRadius: "50%" }}
              component="img"
              alt="Profile Pic"
              image="https://avatars.githubusercontent.com/u/36482887?s=460&u=4babd11bd036d847b91f98c500e652c2ce55e329&v=4"
            ></CardMedia>
            <CardContent style={{ textAlign: "center" }}>
              <Typography variant="h5" comonent="h3">
                Adam Rodrigues
              </Typography>
              <p>Full Stack Developer</p>
              <p>Cambridge, Ontario, Canada</p>
              <Button
                variant="contained"
                color="primary"
                size="small"
                style={{ marginRight: ".5rem" }}
              >
                Follow
              </Button>
              <Button variant="contained" size="small">
                Message
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item sm={12} md={8}>
          {data ? <CreatePost user={data.getUser} /> : <div></div>}
          <ProfilePosts />
        </Grid>
      </Grid>
    </div>
  )
}

export default ProfilePage
