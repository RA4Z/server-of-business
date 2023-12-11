import { storage } from "config/firebase";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export async function salvarImagem(imagem: string | null, imagemNome: string, path: string): Promise<string | null> {
  if (!imagem) return '';

  try {
    const downloadImagem = await fetch(imagem);
    const blobImagem = await downloadImagem.blob();

    const storageRef = ref(storage, `${path}/${imagemNome}.png`);
    await uploadBytes(storageRef, blobImagem);

    const url = await getDownloadURL(storageRef);
    return url;
  } catch (error) {
    console.error('Erro ao enviar imagem para o Firebase:', error);
    return '';
  }
}
