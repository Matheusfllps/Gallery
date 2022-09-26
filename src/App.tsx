import { useState, useEffect, FormEvent } from "react";
import * as C from "./App.styles";
import * as Photos from "./services/Photo"; /*  pega tudo da pasta services/photo*/
// import "./App.css";
import { Photo } from "./types/Photo";
import { PhotoItem } from './components/PhotoItem'

function App() {
  const [uploading,  setUploading] = useState(false)
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    const getPhotos = async () => {
      setLoading(true);
      setPhotos(
        await Photos.getAll()
      ); /*aqui é a parte que fica esperando até pegar as fotos e ja joga dentro da função setando o valor das fotos  */
      setLoading(false);
    };
    getPhotos();
  }, []);


  const  handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();// isso previne o comportamento normal do formulário que seria enviar dados 
  
    const formData = new FormData(e.currentTarget);//peguei o formulário
    const file = formData.get('image') as File;// peguei o arquivo do formulário
  
    if(file && file.size > 0) {
      setUploading(true);
      //faz o envio do arquivo 
      let result = await Photos.insert(file);
      setUploading(false);
    if(result instanceof Error) {
      alert(`${result.name} - ${result.message}`);
    } else{
      let newPhotolist = [...photos]
      newPhotolist.push(result);
      setPhotos(newPhotolist);
    }
    
    }

  
  
  
  
  
  }

  return (
    <C.Container>
      <C.Area>
        <C.Header>Galeria de Fotos</C.Header>


           
           <C.UploadForm method="POST" onSubmit={handleFormSubmit}>
            <input type="file" name="image"/>
            <input type="submit" name="enviar" />
            {uploading && 'enviando...'}

           </C.UploadForm>





        {loading && (
          <C.ScreenWarning>
            <div className="emoji">✋</div>
            <div>Carregando...</div>
          </C.ScreenWarning>
        )}

        {!loading && photos.length > 0 && (
          <C.PhotoList>
            {photos.map((item) => (
            <PhotoItem url={item.url} name={item.name} />
            ))}
          </C.PhotoList>
        )}

        {!loading && photos.length === 0  && (
          <C.ScreenWarning>
            <div className="emoji">😔</div>
            <div>Não há fotos cadastradas.</div>
          </C.ScreenWarning>
        )}
      </C.Area>
    </C.Container>
  );
}

export default App;
