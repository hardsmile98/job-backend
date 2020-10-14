const { Router } = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const auth = require('../middleware/auth')
const router = Router()

//Регистрация пользователя
router.post('/register', async (req, res) => {
  try {
    const { email, name, password } = req.body
    if (!email || !name || password.length < 6) {
      return res.status(400).json({ message: 'Неверные данные' })
    }

    const candidateEmail = await User.findOne({ email })
    if (candidateEmail) {
      return res.status(400).json({ message: 'Такой email занят' })
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const user = new User({ email, name, password: hashedPassword })
    await user.save()

    const token = jwt.sign({ id: user.id }, config.get('jwtSecret'), {
      expiresIn: '7d',
    })

    res.json({ token })
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: 'Что-то пошло не так' })
  }
})

//Авторизация
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || password.length < 6) {
      return res.status(400).json({ message: 'Неверные данные' })
    }

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'Пользователь не найден' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Неверный пароль' })
    }

    const token = jwt.sign({ id: user.id }, config.get('jwtSecret'), {
      expiresIn: '7d',
    })

    res.json({ token })
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так' })
  }
})

module.exports = router
