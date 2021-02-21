const {Router} = require('express')
const Graph = require('../models/Graph')
const auth = require('../middleware/auth.middleware')
const router = Router()

router.post('/generate', auth, async (req, res) => {
    try {
        const {from} = req.body
        const graph = new Graph({
            data: from, date: new Date().toLocaleString(), owner: req.user.userId
        })

        await graph.save()

        res.status(201).json({ graph })
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

router.get('/', auth, async (req, res) => {
    try {
        const graphs = await Graph.find({ owner: req.user.userId })

        res.json(graphs)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

module.exports = router
