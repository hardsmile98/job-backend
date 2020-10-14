const { Router } = require('express')
const User = require('../models/User')
const auth = require('../middleware/auth')
const router = Router()

//Получение информации о профиле
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.id).select('-password')

    res.json(user)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так' })
  }
})

//Редактирование профиля
router.put('/edit', auth, async (req, res) => {
  try {
    const { avatar, email, name, phone } = req.body
    await User.findByIdAndUpdate(
      req.id,
      {
        $set: { avatar, email, name, phone },
      },
      {
        new: true,
        runValidators: true,
      }
    )

    res.json({ success: true })
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так' })
  }
})

module.exports = router
