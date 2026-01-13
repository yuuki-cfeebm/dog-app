import express from 'express'
import axios from 'axios'
import cors from 'cors'

const app = express()
app.use(cors())

app.get('/dog/:raca', async (req, res) => {
  let { raca } = req.params
  if(raca.includes(" ")){
    const partes = raca.toLowerCase().split(" ")
    raca = `${partes[1]}/${partes[0]}`
  }

  try {
    const response = await axios.get(`https://dog.ceo/api/breed/${raca}/images/random`)
    res.json(
      {
        raca, 
        image: response.data.message
      })
  } catch(err) {
    res.status(500).json({ error: "erro ao buscar imagem"})
  }
})

app.listen(3000, () => console.log("backend rodando na porta 3000"))
