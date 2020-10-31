import React, { useState } from "react"
import { Container, TextField, List, Button, Box } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import AddIcon from "@material-ui/icons/Add"
import { gql, useMutation, useQuery } from "@apollo/client"
import Todo from "../components/Todo"
import Header from "../components/Header"
import "./index.css"

const ADD_TODO = gql`
  mutation AddTodo($title: String!) {
    addTodo(title: $title) {
      id
    }
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
    margin: "50px auto 0px",
    display: "flex",
    flexDirection: "column",
  },
}))

export default function Home() {
  const classes = useStyles()
  const { data, loading, error, refetch } = useQuery(GET_TODOS)
  const [addTodo] = useMutation(ADD_TODO)

  const [todoText, setTodoText] = useState("")

  const addTodoFunc = todo => {
    if (todo !== "") {
      addTodo({
        variables: { title: todo },
      })
      setTodoText("")
      refetch()
    } else {
      alert("Please fill in the required fields !!")
    }
  }

  return (
    <>
      <Header />
      <Container className={classes.page}>
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TextField
            style={{ width: "80%", marginRight: "4px" }}
            id="outlined-basic"
            label="Add Todo"
            variant="outlined"
            required={true}
            color="secondary"
            value={todoText}
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
              <Todo todo={todo} />
            ))}
          </List>
        )}
      </Container>
    </>
  )
}
