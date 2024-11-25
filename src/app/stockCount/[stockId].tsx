import {
  Text,
  SafeAreaView,
  StatusBar,
  TouchableHighlight,
  View,
  Modal,
  Pressable,
  TouchableWithoutFeedback,
  TextInput,
  Button,
  Alert,
  ScrollView,
} from "react-native";
import { useStockCount } from "../../hooks/useStockCount";
import { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import EvilIcons from "@expo/vector-icons/EvilIcons";

export default function StockCount() {
  const { stockId } = useLocalSearchParams();
  const [newProductCode, setNewProductCode] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const {
    stockCountList,
    addProductToStockCount,
    removeProductFromStockCount,
  } = useStockCount();

  return (
    <SafeAreaView className="flex-1 p-5 bg-[#f9fafb]">
      <Text>{stockId}</Text>
      <StatusBar backgroundColor="#4f46e5" barStyle="light-content" />
      <TouchableHighlight
        className="ml-auto"
        onPress={() => setModalVisible(true)}
      >
        <View className="flex flex-row items-center gap-4 px-4 py-2 rounded bg-[#4dad4a]">
          <AntDesign name="plus" size={24} color="#ffffff" />
          <Text className="text-[#ffffff]">Adicionar Itens</Text>
        </View>
      </TouchableHighlight>
      <ScrollView>
        <View className="border border-gray-200 border-t-0 rounded-b-md">
          {stockCountList
            .find((stockCount) => stockCount.stockId === stockId)
            ?.stockProducts.map((item, index) => (
              <View
                key={item.productCode}
                className={`flex flex-row justify-between items-center py-2 px-4 ${
                  index % 2 === 0 ? "bg-[#f3f4f6]" : "bg-white"
                }`}
              >
                <View className="flex flex-col">
                  <Text className="flex-1 text-lg text-[#111827] font-semibold">
                    {item.productCode}
                  </Text>
                  <Text className="flex-1 text-sm text-[#6b7280]">
                    Quantidade: {item.amount}
                  </Text>
                </View>
                <View className="flex flex-row items-center gap-3">
                  <EvilIcons name="pencil" size={28} color="#0a60ff" />
                  <TouchableHighlight
                    onPress={() => {
                      Alert.alert(
                        "Remover produto",
                        `Você tem certeza que deseja remover o produto ${item.productCode} da lista ?`,
                        [
                          {
                            text: "Não",
                            onPress: () => {},
                          },
                          {
                            text: "Sim",
                            onPress: () =>
                              removeProductFromStockCount(
                                stockId as string,
                                item.productCode
                              ),
                          },
                        ],
                        { cancelable: true }
                      );
                    }}
                  >
                    <EvilIcons name="trash" size={28} color="#ce3c3e" />
                  </TouchableHighlight>
                </View>
              </View>
            ))}
        </View>
      </ScrollView>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View className="flex-1 items-center justify-center bg-[rgba(0,0,0,0.3)]">
            <TouchableWithoutFeedback onPress={() => {}}>
              <View
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.25,
                  shadowRadius: 4,
                  elevation: 5,
                }}
                className="m-5 bg-white rounded-3xl p-9 items-center"
              >
                <TextInput
                  onChangeText={setNewProductCode}
                  value={newProductCode}
                  placeholder="Nome da nova contagem de estoque"
                  keyboardType="default"
                />
                <Button
                  title="Adicionar"
                  onPress={() => {
                    if (newProductCode !== "") {
                      addProductToStockCount(stockId as string, newProductCode);
                      setNewProductCode("");
                      setModalVisible(!modalVisible);
                      return;
                    }
                    return Alert.alert("Erro", "O nome não pode ficar vazio.", [
                      {
                        text: "OK",
                        onPress: () => console.log("OK Pressed"),
                      },
                    ]);
                  }}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
}
