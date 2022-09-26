import styled  from 'styled-components'

export const Container = styled.div`
background-color: #22272f;
min-height: 100vh;// o tamnho da altura da sua tela
color: #fff;
`
export const Area = styled.div`
margin: auto;
max-width: 100vw;
padding: 30px 0;
`
export const Header =styled.h1`
margin: 0;
margin-bottom: 30px;
padding: 0;
text-align: center;

`
export const ScreenWarning = styled.div`
text-align: center;

.emoji  {
    font-size: 50px;
    margin-bottom: 20px;
}
`
export const PhotoList = styled.div`
display: grid;
grid-template-columns:  repeat(4, 1fr);
gap: 10px;

`
export const UploadForm  = styled.form`
background-color: #3d3f43;
padding: 15px;
border-radius:10px;
margin-bottom: 30px;

  input[type=submit] {
    background-color: #756df4;
    border: 0;
    color: #fff;
    padding: 8px 16px;
    font-size: 15px;
    border-radius:10px;
    margin: 0 20px;
    cursor: pointer;

    &:hover {
        opacity: .9;
    }
  }
`