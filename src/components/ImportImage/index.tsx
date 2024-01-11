import React from 'react';
import styles from './ImportImage.module.scss';
import { atualizarInfoService, atualizarInfoUser } from 'services/firestore';
import { salvarImagem } from 'services/storage';
import { User_Interface } from 'types/User';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

interface Props {
  userInfo?: User_Interface;
  serviceId?: any;
  service?: boolean;
}

function ImportImage(props: Props) {
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      try {
        const reader = new FileReader();
        reader.onload = async () => {
          const imageDataURL = reader.result as string;

          const image = new Image();
          image.src = imageDataURL;

          image.onload = async () => {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');

            if (context) {
              canvas.width = 100;
              canvas.height = 100;
              context.drawImage(image, 0, 0, 100, 100);
              const avatarURL = canvas.toDataURL('image/jpeg'); // Redimensiona para JPEG

              canvas.width = 625;
              canvas.height = 420;
              context.drawImage(image, 0, 0, 625, 420);
              const serviceURL = canvas.toDataURL('image/jpeg'); // Redimensiona para JPEG

              // Salva a imagem redimensionada
              if (props.service) {
                const url = await salvarImagem(serviceURL, `${props.serviceId}`, 'services');
                await atualizarInfoService(props.serviceId, { imagem: url! });
              } else {
                const url = await salvarImagem(avatarURL, `${props.userInfo?.email}-avatar`, 'avatares');
                await atualizarInfoUser(props.userInfo?.id, { avatar: url! });
              }
              window.location.reload();
            }
          };
        };
        reader.readAsDataURL(file);
      } catch (error) {
        console.error('Erro ao carregar a imagem:', error);
      }
    }
  };

  return (
    <div className={styles.export} >
      <label htmlFor='selecao-arquivo'><AddPhotoAlternateIcon fontSize='large' /></label>
      <input id='selecao-arquivo' type="file" accept="image/png, image/jpeg, image/jpg" onChange={handleFileChange} />
    </div>
  );
}

export default ImportImage;
