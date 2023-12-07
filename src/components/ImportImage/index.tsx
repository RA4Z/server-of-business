import React, { useState } from 'react';
import styles from './ImportImage.module.scss'
import { atualizarInfoUser } from 'services/firestore';
import { salvarImagem } from 'services/storage'; // Caminho para o arquivo com a função salvarImagem
import { User_Interface } from 'types/User';

interface Props {
  userInfo: User_Interface
}

function ImportImage(props: Props) {
  const [infoTemp, setInfoTemp] = useState({
    avatar: props.userInfo.avatar,
  })

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      try {
        const reader = new FileReader();
        reader.onload = async () => {
          const imageDataURL = reader.result as string;

          // Chama a função salvarImagem passando a URL da imagem e um nome para a imagem
          const url = await salvarImagem(imageDataURL, `${props.userInfo.email}-avatar`);
          setInfoTemp({ ...infoTemp, avatar: url! })
          await atualizarInfoUser(props.userInfo.id, { ...infoTemp, avatar: url! })
          window.location.reload()
        };
        reader.readAsDataURL(file);
      } catch (error) {
        console.error('Erro ao carregar a imagem:', error);
      }
    }
  };

  return (
    <div className={styles.export}>
      <label htmlFor='selecao-arquivo'>Alterar Imagem</label>
      <input id='selecao-arquivo' type="file" accept="image/png" onChange={handleFileChange} />
    </div>
  );
}

export default ImportImage;
