import React from 'react';
import styles from './ImportImage.module.scss'
import { atualizarInfoService, atualizarInfoUser } from 'services/firestore';
import { salvarImagem } from 'services/storage'; // Caminho para o arquivo com a função salvarImagem
import { User_Interface } from 'types/User';

interface Props {
  userInfo?: User_Interface,
  serviceId?: any,
  service?: boolean
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
          if (props.service) {
            const url = await salvarImagem(imageDataURL, `${props.serviceId}-serviceIMG`, 'services');
            await atualizarInfoService(props.serviceId, { imagem: url! })
          } else {
            const url = await salvarImagem(imageDataURL, `${props.userInfo?.email}-avatar`, 'avatares');
            await atualizarInfoUser(props.userInfo?.id, { avatar: url! })
          }
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
