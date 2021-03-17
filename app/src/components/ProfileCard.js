import { Avatar, Card, CardContent, CardHeader } from "@material-ui/core"

let ProfileCard = (props) => {
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar src="https://material-ui.com/static/images/avatar/1.jpg"></Avatar>
        }
      ></CardHeader>
      <CardContent>Hey</CardContent>
    </Card>
  )
}

export default ProfileCard
