// Importa os componentes visuais nativos do React Native e o utilitário de alertas
import { View, Image, Text, FlatList, Alert } from "react-native";
// Importa os hooks do React para gerenciar estados, efeitos colaterais e memorização de valores
import { useState, useEffect, useMemo } from "react";

// Importa os métodos de manipulação do armazenamento local e a tipagem do item
import { itemsStorage, ItemStorage } from "@/storage/itemsStorage";

// Importa os componentes personalizados da aplicação
import { Button } from "@/componentes/Button";
import { Input } from "@/componentes/Input";
import { Item } from "@/componentes/Item";

// Importa a folha de estilos específica desta tela
import { styles } from "./styles";

// Ignora maiúsculas/minúsculas e acentos na busca (ex.: "cafe" encontra "Café")
function normalize(text: string) {
  return text
    .normalize("NFD") // Separa os caracteres de seus respectivos acentos
    .replace(/[\u0300-\u036f]/g, "") // Remove os acentos isolados usando expressão regular
    .toLowerCase() // Converte todo o texto para letras minúsculas
    .trim(); // Remove espaços em branco extras no início e no fim
}

// Declara e exporta o componente principal da tela Home
export function Home() {
  // Estados para armazenar os valores digitados nos campos do formulário
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  // Estado para armazenar o termo digitado no campo de busca/filtro
  const [search, setSearch] = useState("");
  // Estado que guarda a lista completa de produtos carregados do armazenamento
  const [items, setItems] = useState<ItemStorage[]>([]);

  // Função assíncrona responsável por buscar os itens salvos e atualizar o estado
  async function getItems() {
    try {
      const response = await itemsStorage.get();
      setItems(response);
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível carregar os produtos.");
    }
  }

  // Função assíncrona executada ao clicar no botão "Adicionar"
  async function handleAdd() {
    // Limpa espaços extras das entradas e padroniza a vírgula do preço para ponto decimal
    const productName = name.trim();
    const productDescription = description.trim();
    const productQuantity = quantity.trim();
    const productPrice = price.trim().replace(",", ".");

    // Valida se o nome do produto foi preenchido
    if (!productName) {
      return Alert.alert("Adicionar", "Informe o nome do produto.");
    }

    // Valida se a quantidade é um número inteiro positivo (maior ou igual a 1)
    if (!/^\d+$/.test(productQuantity) || Number(productQuantity) < 1) {
      return Alert.alert("Adicionar", "Informe uma quantidade válida (número inteiro, mínimo 1).");
    }

    // Valida se o preço foi preenchido, se é um número válido e não negativo
    if (!productPrice || isNaN(Number(productPrice)) || Number(productPrice) < 0) {
      return Alert.alert("Adicionar", "Informe um valor válido (ex.: 12,50).");
    }

    try {
      // Salva o novo produto no armazenamento local convertendo quantidade e preço para número
      await itemsStorage.add({
        name: productName,
        description: productDescription,
        quantity: Number(productQuantity),
        price: Number(productPrice),
      });
      // Recarrega a lista de produtos na tela para exibir o novo item imediatamente
      await getItems();

      // Limpa os campos do formulário após salvar
      setName("");
      setDescription("");
      setQuantity("");
      setPrice("");
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível adicionar o produto.");
    }
  }

  // Exibe uma caixa de diálogo de confirmação antes de excluir um produto da lista
  function handleRemove(item: ItemStorage) {
    Alert.alert("Remover", `Deseja remover "${item.name}"?`, [
      { text: "Não", style: "cancel" },
      {
        text: "Sim",
        style: "destructive",
        onPress: async () => {
          try {
            // Remove o item pelo ID e recarrega a lista atualizada na tela
            await itemsStorage.remove(item.id);
            await getItems();
          } catch (error) {
            console.log(error);
            Alert.alert("Erro", "Não foi possível remover o produto.");
          }
        },
      },
    ]);
  }

  // Hook que carrega os itens salvos assim que a tela é montada pela primeira vez
  useEffect(() => {
    getItems();
  }, []);

  // Memoriza a lista filtrada para evitar reprocessamentos desnecessários a cada renderização
  const filteredItems = useMemo(() => {
    const term = normalize(search);

    // Se o campo de busca estiver vazio, retorna todos os produtos
    if (!term) {
      return items;
    }

    // Retorna apenas os produtos cujo nome normalizado contém o termo pesquisado
    return items.filter((item) => normalize(item.name).includes(term));
  }, [items, search]);

  // Renderiza a estrutura visual da tela
  return (
    <View style={styles.container}>
      {/* Exibe a imagem do logotipo no topo da tela */}
      <Image source={require("../assets/logo1.png")} style={styles.logo} />

      {/* Área do formulário de cadastro de novos produtos */}
      <View style={styles.form}>
        <Input
          placeholder="Nome do produto"
          value={name}
          onChangeText={setName}
        />

        <Input
          placeholder="Descrição"
          value={description}
          onChangeText={setDescription}
        />

        {/* Agrupa os campos de quantidade e valor lado a lado */}
        <View style={styles.row}>
          <View style={styles.rowItem}>
            <Input
              placeholder="Quantidade"
              value={quantity}
              onChangeText={setQuantity}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.rowItem}>
            <Input
              placeholder="Valor (R$)"
              value={price}
              onChangeText={setPrice}
              keyboardType="decimal-pad"
            />
          </View>
        </View>

        {/* Botão que dispara a função de adicionar produto */}
        <Button title="Adicionar" activeOpacity={0.2} onPress={handleAdd} />
      </View>

      {/* Área inferior contendo o filtro, o contador e a lista de produtos */}
      <View style={styles.content}>
        <Input
          placeholder="Filtrar por nome do produto"
          value={search}
          onChangeText={setSearch}
        />

        {/* Contador que mostra quantos itens estão visíveis em relação ao total */}
        <View style={styles.header}>
          <Text style={styles.counter}>
            {filteredItems.length} de {items.length} produto(s)
          </Text>
        </View>

        {/* Lista performática que renderiza os produtos filtrados */}
        <FlatList
          data={filteredItems}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <Item data={item} onRemove={() => handleRemove(item)} />
          )}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={styles.listContent}
          // Componente exibido automaticamente quando a lista está vazia
          ListEmptyComponent={() => (
            <Text style={styles.empty}>
              {items.length === 0
                ? "Nenhum produto cadastrado."
                : "Nenhum produto encontrado para esse filtro."}
            </Text>
          )}
        />
      </View>
    </View>
  );
}