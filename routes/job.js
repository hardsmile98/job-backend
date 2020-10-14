const { Router } = require('express')
const Job = require('../models/Job')
const auth = require('../middleware/auth')
const router = Router()

//Получение всех вакансий
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find()

    res.json(jobs)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так' })
  }
})

//Получение информации о вакансии
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
    const recommends = await Job.find({ _id: { $ne: req.params.id } }).limit(3)

    res.json({ detail: job, recommends: recommends })
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так' })
  }
})

//Добавление вакансии
router.post('/add', auth, async (req, res) => {
  try {
    const data = req.body
    await Job.create(data)

    res.json({ success: true })
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: 'Что-то пошло не так' })
  }
})

//Поиск
router.post('/search', async (req, res) => {
  try {
    const { search } = req.body
    let jobs
    if (search) {
      const regex = new RegExp(['^', search, '$'].join(''), 'i')
      jobs = await Job.find({ job: { $regex: search, $options: 'i' } })
    } else {
      jobs = await Job.find()
    }

    res.json(jobs)
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: 'Что-то пошло не так' })
  }
})

module.exports = router
