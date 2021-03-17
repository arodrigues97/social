import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@material-ui/core"

import { useQuery } from "@apollo/client"
import CreatePost from "../components/post/CreatePost"
import ProfilePosts from "../components/profile/ProfilePosts"
import GET_USER from "../feed/getUserQuery"

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
          <Card>
            <CardMedia
              component="img"
              alt="Profile Pic"
              image="https://avatars.githubusercontent.com/u/36482887?s=460&u=4babd11bd036d847b91f98c500e652c2ce55e329&v=4"
            ></CardMedia>
            <CardContent>
              <Typography variant="h6" comonent="h3">
                Adam Rodrigues
              </Typography>
              <p>
                <h5>About Me:</h5>Occaecat do minim duis duis duis exercitation
                amet. Excepteur est officia officia elit laboris velit pariatur
                excepteur consectetur ea id consectetur deserunt incididunt.
              </p>
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
