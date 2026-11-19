import { View, Text, TouchableOpacity } from "react-native";
import { Trash2 } from "lucide-react-native";

import { ItemStorage } from "@/storage/itemsStorage";

import { styles } from "./styles";

type Props = {
  data: ItemStorage;
  onRemove: () => void;
};

// 1234.5 -> "R$ 1.234,50"
function formatPrice(value: number) {
  const [integer, decimal] = value.toFixed(2).split(".");
  return `R$ ${integer.replace(/\B(?=(\d{3})+(?!\d))/g, ".")},${decimal}`;
}

export function Item({ data, onRemove }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.idBadge}>
          <Text style={styles.idText}>ID {data.id}</Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onRemove}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Trash2 size={18} color="#828282" />
        </TouchableOpacity>
      </View>

      <Text style={styles.name} numberOfLines={2}>
        {data.name}
      </Text>

      <Text style={styles.description} numberOfLines={2}>
        {data.description}
      </Text>

      <View style={styles.infoRow}>
        <View style={styles.info}>
          <Text style={styles.label}>Quantidade</Text>
          <Text style={styles.value}>{data.quantity}</Text>
        </View>

        <View style={styles.info}>
          <Text style={styles.label}>Valor</Text>
          <Text style={styles.value}>{formatPrice(data.price)}</Text>
        </View>
      </View>
    </View>
  );
}
