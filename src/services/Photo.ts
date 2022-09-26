import { Photo } from "../types/Photo";
import { storage } from "../libs/firebase";
import { ref, listAll, getDownloadURL, uploadBytes } from "firebase/storage";
import {v4 as createId} from 'uuid'

export const getAll = async () => {
  let list: Photo[] = [];
  /*Cria a referencia da pasta*/ 
  const imagesFolder = ref(storage, "images"); // vai la  no firebase e se refere ao diretorio storage com a pasta images
  /*Lê os arquivos que estçao na pasta*/ 
  const photoList = await listAll(imagesFolder); // como estou buscando dados que não são locais é necessario o uso de promesis:Promise é um objeto usado para processamento assíncrono. Uma Promise (de "promessa") representa um valor que pode estar disponível agora, no futuro ou nunca.
  /* faz um loop nos aquivos da pasta */
  for (let i in photoList.items) {
  /* pega os arquivos de dowload ou seja pega o link dierto para acessar aquela foto*/
    let photoUrl = await getDownloadURL(photoList.items[i]);
  /* monta o array  */
    list.push({
      name: photoList.items[i].name,
      url: photoUrl,
    });
  }
  /*retorna o array com todas a s fotos que tiver na lista */
  return list;
};

export const insert = async (file: File) => {
   if(['image/jpeg', 'image/png', 'image/png'].includes(file.type)){//fala o tipo de arquivo vai ser aceito

    let randomName = createId()
     let newFile = ref(storage, `image/${randomName}`)
    let upload = await uploadBytes(newFile, file)

    let PhotoUrl = await getDownloadURL(upload.ref)

    return {name: upload.ref.name, url: PhotoUrl} as Photo;

   } else {
    return new Error('Tipo de arquivo não permitido.')
   }
}
