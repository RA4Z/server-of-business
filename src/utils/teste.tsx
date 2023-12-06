import React from 'react';
import { salvarImagem } from 'services/storage'; // Caminho para o arquivo com a função salvarImagem

interface Props {
  userName: string
}

function ImportImage(props: Props) {

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      try {
        const reader = new FileReader();
        reader.onload = async () => {
          const imageDataURL = reader.result as string;

          // Chama a função salvarImagem passando a URL da imagem e um nome para a imagem
          await salvarImagem(imageDataURL, `${props.userName}-avatar`);
        };
        reader.readAsDataURL(file);
      } catch (error) {
        console.error('Erro ao carregar a imagem:', error);
      }
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
    </div>
  );
}

export default ImportImage;
