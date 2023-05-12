const express = require('express')

const router = express.Router()

const fun = require('../fun')

router.post('/' , fun.add)

router.put('/:id' , fun.edit)

router.get('/:id' , fun.remove)

router.get('/' , fun.list)

router.put('/:id/check' , fun.check)

router.put('/:id/uncheck' , fun.uncheck)










module.exports = router