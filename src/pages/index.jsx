import React, { useState } from "react"
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

const ADD_TODO = gql`
  mutation AddTodo($title: String!) {
    addTodo(title: $title) {
      id
    }
  }
`

const DELETE_TODO = gql`
  mutation deleteTodo($id: String!) {
    deleteTodo(id: $id)
  }
`
const UPDATE_TODO = gql`
  mutation updateTodo($id: String!, $done: Boolean!) {
    updateTodo(id: $id, done: $done)
  }
`

const GET_TODOS = gql`
  query GetTodos {
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
  const [checked, setChecked] = React.useState(false)
  const { data, loading, error, refetch } = useQuery(GET_TODOS)
  const [addTodo] = useMutation(ADD_TODO)
  const [deleteTodo] = useMutation(DELETE_TODO)
  const [updateTodo] = useMutation(UPDATE_TODO)

  const [todoText, setTodoText] = useState("")

  const addTodoFunc = todo => {
    addTodo({
      variables: { title: todo },
    })
    refetch()
  }

  const updateTodoFunc = (id, done) => {
    updateTodo({
      variables: { id: id, done: done },
    })
    refetch()
  }

  // const handleToggle = value => () => {
  //   const currentIndex = checked.indexOf(value)
  //   const newChecked = [...checked]

  //   if (currentIndex === -1) {
  //     newChecked.push(value)
  //   } else {
  //     newChecked.splice(currentIndex, 1)
  //   }

  //   setChecked(newChecked)
  // }

  return (
    <Container className={classes.page}>
      <Box>
        <TextField
          style={{ width: "90%", marginRight: "4px" }}
          id="outlined-basic"
          label="Add Todo"
          variant="outlined"
          onChange={e => setTodoText(e.target.value)}
        />
        <Button
          style={{ width: "5%", height: "56px" }}
          variant="contained"
          color="secondary"
          onClick={() => {
            addTodoFunc(todoText)
          }}
        >
          <AddIcon />
        </Button>
      </Box>
      {loading ? <div>loading...</div> : null}
      {error ? <div>{error.message}</div> : null}
      {!loading && !error && (
        <List className={classes.root}>
          {data.todos.map(todo => (
            <ListItem
              key={todo.id}
              role={undefined}
              dense
              button
              onClick={() => {
                console.log("updateTodoDone")
                updateTodoFunc(todo.id, todo.done)
                setChecked(!todo.done)
                console.log("refetching")
              }}
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={todo.done}
                  tabIndex={-1}
                  disableRipple
                />
              </ListItemIcon>
              <ListItemText id={todo.id} primary={`${todo.title}`} />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="comments"
                  onClick={() => {
                    deleteTodo({
                      variables: { id: todo.id },
                    })
                    refetch()
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  )
}
