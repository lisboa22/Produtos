import AsyncStorage from "@react-native-async-storage/async-storage";

// Chave nova: evita conflito com os dados antigos da lista de compras (@comprar:items)
const ITEMS_STORAGE_KEY = "@produtos:items";

export type ItemStorage = {
  id: number;
  name: string;
  description: string;
  quantity: number;
  price: number;
};

export type NewItem = Omit<ItemStorage, "id">;

async function get(): Promise<ItemStorage[]> {
  try {
    const storage = await AsyncStorage.getItem(ITEMS_STORAGE_KEY);

    return storage ? JSON.parse(storage) : [];
  } catch (error) {
    throw new Error("ITEMS_GET: " + error);
  }
}

async function save(items: ItemStorage[]): Promise<void> {
  try {
    await AsyncStorage.setItem(ITEMS_STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    throw new Error("ITEMS_SAVE: " + error);
  }
}

async function add(newItem: NewItem): Promise<ItemStorage[]> {
  const items = await get();

  // id sequencial: maior id existente + 1
  const nextId = items.reduce((max, item) => Math.max(max, item.id), 0) + 1;

  const updatedItems = [...items, { id: nextId, ...newItem }];

  await save(updatedItems);

  return updatedItems;
}

async function remove(id: number): Promise<ItemStorage[]> {
  const items = await get();
  const updatedItems = items.filter((item) => item.id !== id);

  await save(updatedItems);

  return updatedItems;
}

export const itemsStorage = {
  get,
  add,
  remove,
};
