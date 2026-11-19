import { File, Paths } from "expo-file-system";

// Guarda só o NOME do arquivo (não o caminho completo), porque o caminho da
// pasta do app pode mudar entre atualizações. O caminho é montado na hora de exibir.

// Copia a imagem escolhida (que está em cache temporário) para a pasta permanente do app
export async function saveImage(tempUri: string): Promise<string> {
  const match = tempUri.match(/\.(\w{3,4})(?:\?.*)?$/);
  const extension = match ? match[1] : "jpg";
  const fileName = `produto-${Date.now()}.${extension}`;

  const source = new File(tempUri);
  const destination = new File(Paths.document, fileName);

  await source.copy(destination);

  return fileName;
}

// Monta o endereço completo da imagem a partir do nome salvo
export function getImageUri(fileName: string): string {
  return new File(Paths.document, fileName).uri;
}

// Apaga a imagem do produto removido, para não acumular arquivos
export function removeImage(fileName?: string): void {
  if (!fileName) {
    return;
  }

  try {
    const file = new File(Paths.document, fileName);

    if (file.exists) {
      file.delete();
    }
  } catch (error) {
    console.log(error);
  }
}
