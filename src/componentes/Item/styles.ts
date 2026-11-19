import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F7F8FB",
    borderWidth: 1,
    borderColor: "#E4E6EC",
    borderRadius: 12,
    padding: 16,
    gap: 8,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },

  top: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  idBadge: {
    backgroundColor: "#2C46B1",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },

  idText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },

  name: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1F2A44",
  },

  description: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1F2A44",
  },

  infoRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 4,
  },

  info: {
    flex: 1,
  },

  label: {
    fontSize: 11,
    color: "#828282",
    textTransform: "uppercase",
    fontWeight: "600",
  },

  value: {
    fontSize: 15,
    fontWeight: "600",
    color: "#222222",
    marginTop: 2,
  },
});
