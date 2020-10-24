const faunadb = require("faunadb")
const q = faunadb.query

var client = new faunadb.Client({ secret: process.env.FAUNA })

async function run() {
  try {
    // const results = await client.query(
    //   q.Update(q.Ref(q.Collection("todos"), "280170789352768005"), {
    //     data: {
    //       done: true,
    //     },
    //   })
    // );

    // const results = await client.query(
    //   q.Create(q.Collection("todos"), {
    //     data: {
    //       title: "Whatever",
    //       done: false,
    //     },
    //   })
    // )

    const results = await client.query(
      q.Get(q.Ref(q.Collection("todos"), "1603559160518000"))
    )

    // const results = await client.query(
    //   q.Map(
    //     q.Paginate(q.Match(q.Index("get_todos"))),
    //     q.Lambda(x => q.Get(x))
    //   )
    // )

    console.log(results)
  } catch (error) {
    console.log(error)
  }
}
run()
