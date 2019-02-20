let router = require('express').Router()
let Dog = require('../models/Dog')

let dogs = [{
  name: "champ",
  colors: ["black", "white"],
  age: 3.5
}, {
  name: "bilbo waggons",
  colors: ["black", "grey", "white"],
  age: 10
}, {
  name: 'leo',
  colors: ["brown"],
  age: 3
}]


router.get('/', (req, res, next) => {
  res.send({
    count: dogs.length,
    dogs
  })
})

//creates a new dog
router.post('/', (req, res, next) => {
  let clientDog = req.body
  let newDog = new Dog(clientDog)
  dogs.push(newDog)
  res.send({
    message: "successfully added " + newDog.name
  })
})

router.put('/:number', (req, res, next) => {
  let index = req.params.number - 1
  if (dogs[index]) {
    let dog = dogs[index]
    for(let prop in req.body) {
      dog[prop] = req.body[prop]
    }
    dogs[index] = new Dog(dog)
    res.send({
      message: dog.name + " successfully updated!"
    })
  } else {
    res.send({
      message: "that dog doesn't exist"
    })
  }
})

router.delete('/:name', (req, res, next) => {
  let name = req.params.name
  let dog
  for(let i =0; i < dogs.length; i++) {
    dog = dogs[i]
    if (name == dog.name) {
      dogs.splice(i, 1)
      dog.removed = true
      break
    }
  }
  if(dog.removed) {
    res.send({
      message: "dog removed!"
    })
  } else {
    res.send({
      message: `Sorry we couldn't find a dog with this name: ${name}`
    })
  }
})

module.exports = router