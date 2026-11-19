import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d0d2d8",
    alignItems: "center",
    paddingTop: 62,
    padding: 24,
  },

  header: {
    width: "100%",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E4E6EC",
    paddingBottom: 12,
  },

  counter: {
    fontSize: 12,
    color: "#828282",
    fontWeight: "600",
  },

  form: {
    width: "100%",
    paddingHorizontal: 16,
    marginTop: 24,
  },

  row: {
    flexDirection: "row",
    gap: 10,
  },

  rowItem: {
    flex: 1,
  },

  logo: {
    height: 34,
    width: 134,
  },

  content: {
    flex: 1,
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    marginTop: 24,
  },

  separator: {
    width: "100%",
    height: 12,
  },

  listContent: {
    paddingTop: 16,
    paddingBottom: 62,
  },

  empty: {
    fontSize: 14,
    color: "#808080",
    textAlign: "center",
  },
});
