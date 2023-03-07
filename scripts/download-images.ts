import axios from 'axios'
import sharp from 'sharp'
//
import { images } from '../images.json'


/** Download all images from `images.json` and save them  `./src/assets/images` as `.jpg` */
async function downloadImages() {
  for (let i = 0; i < images.length; i++) {
    const url = images[i]
    console.log(`Descargando imagen ${(i + 1).toString().padStart(2, '0')}...`)
    
    await axios({
      url,
      responseType: 'arraybuffer'
    }).then(resp => {
      const filename = './src/assets/images/' + (i + 1).toString().padStart(2, '0') + '.jpg'

      return new Promise((resolve, reject) => {
        sharp(resp.data)
          .jpeg()
          .toFile(filename, err => {
            if (err) {
              console.log(`❌️ Ocurrio un error guardando la imagen: ${url}`)
              reject(err)
            } 
            
            console.log(`✅️ Imagen ${url} guardada con exito`);
            resolve(true)
          })
      })
    }).catch(err => console.error(err))
  }
}

downloadImages()