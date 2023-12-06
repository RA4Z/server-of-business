import React, { useState, ChangeEvent, FormEvent } from 'react';
import { salvarImagem } from 'services/storage';

function ImportImage() {
  const [imagem, setImagem] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImagem(file);
    }
  };

  const handleUpload = async (event: FormEvent) => {
    event.preventDefault();

    if (!imagem) {
      console.error('Nenhuma imagem selecionada.');
      return;
    }
    await salvarImagem(imagem, imagem.name)
  };

  return (
    <form onSubmit={handleUpload}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Enviar</button>
    </form>
  );
}

export default ImportImage;
