const express = require("express")
const mongoose = require('mongoose');
const app = express()
const port = 3000

const Resouce = require("./models/resource")

require('dotenv').config()

// mock database
const urlTable = [
    {
        "resourceName": "asdf",
        "feedback": {
            "2": {
                "likes": 0,
                "dislikes": 2
            },
            "13": {
                "likes": 1,
                "dislikes": 0
            },
            "17":  {
                "likes": 1,
                "dislikes": 0
            },
            "17.1":  {
                "altName": "super review front end",
                "likes": 1,
                "dislikes": 0
            },
            "21": {
                "likes": 1,
                "dislikes": 0
            }
        }
    }
]

// middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// database connection and start server
mongoose.connect(process.env.MONGO_URL)
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => {
  console.log('Connected to Mongoose')
  app.listen(process.env.PORT || port, () => {
    	console.log(`Listening on port ${port}`)
    })
})


// endpoints and controllers
app.get("/urltable", (req, res) => {
	console.log({ urlTable })
	console.log(urlTable[0]?.feedback)
	res.send(urlTable)
})

app.get("/n/:num", (req, res) => {
    const num = req.params.num
    
    res.send(urlTable[0].feedback[num])
    // urlTable.filter()
})

app.get("/:str", (req, res) => {
	const str = req.params.str
	res.send("recieved: " + str)
})

app.post("/:str", (req, res) => {
	console.log("POST: ", req.params.str)
	const { str } = req.params
	console.log("BODY: ", req.body)
	const { classNum, isLiked } = req.body
	// if (!urlTable.hasOwnProperty(req.params.str)) {
	// 	urlTable[req.params.str] = { classNum, isLiked };
	// }
	const resourceIdx = urlTable.findIndex((el) => el.resourceName === str)
	if (resourceIdx === -1) {
		urlTable.push({
			resourceName: str,
			feedback: {
				[classNum]: { likes: Number(!!isLiked), dislikes: Number(!isLiked) },
			},
		})
	} else {
		const votes = urlTable[resourceIdx].feedback[classNum]
        if (votes) {
            const {likes, dislikes} = votes
            if (likes) {
                urlTable[resourceIdx].feedback[classNum].likes += Number(!!isLiked)
            } else if (dislikes) {
                urlTable[resourceIdx].feedback[classNum].dislikes += Number(!isLiked)
            }
        }
         else {
            urlTable[resourceIdx].feedback[classNum] = { likes: Number(!!isLiked), dislikes: Number(!isLiked) }
        }
	}
	res.send("posted")
})

app.get("/", (req, res) => {
	res.send("Hello World!")
})

