import React from "react"
import {
  Container,
  TextField,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  ListItemSecondaryAction,
  IconButton,
  Button,
  Box,
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import DeleteIcon from "@material-ui/icons/Delete"
import AddIcon from "@material-ui/icons/Add"
import { gql, useMutation, useQuery } from "@apollo/client"

const GET_TODOS = gql`
  {
    todos {
      id
      title
      done
    }
  }
`

const useStyles = makeStyles(theme => ({
  root: {
    width: "90%",
    margin: "20px auto",
    backgroundColor: theme.palette.background.paper,
  },
  page: {
    width: "1024px",
    margin: "50px auto 0px",
    display: "flex",
    flexDirection: "column",
  },
}))

export default function Home() {
  const classes = useStyles()
  const [checked, setChecked] = React.useState([0])
  const { data, loading } = useQuery(GET_TODOS)
  console.log(data)

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setChecked(newChecked)
  }

  return (
    <Container className={classes.page}>
      <Box>
        <TextField
          style={{ width: "90%", marginRight: "4px" }}
          id="outlined-basic"
          label="Add Todo"
          variant="outlined"
        />
        <Button
          style={{ width: "5%", height: "56px" }}
          variant="contained"
          color="secondary"
        >
          <AddIcon />
        </Button>
      </Box>
      <List className={classes.root}>
        {[0, 1, 2, 3].map(value => {
          const labelId = `checkbox-list-label-${value}`

          return (
            <ListItem
              key={value}
              role={undefined}
              dense
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="comments">
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          )
        })}
      </List>
    </Container>
  )
}
