import {
  Text,
  ScrollView,
  View,
  TouchableHighlight,
  SafeAreaView,
  StatusBar,
  Alert,
  Modal,
  Pressable,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useStock } from "../hooks/useStock";
import { useState } from "react";

export default function Index() {
  const [modalVisible, setModalVisible] = useState(false);
  const { stock, removeProduct, updateProductAmount } = useStock();

  return (
    <SafeAreaView className="flex-1 p-5 bg-[#f9fafb]">
      <StatusBar backgroundColor="#4f46e5" barStyle="light-content" />
      <Text className="text-2xl font-semibold text-center pb-8">
        Controle De Contagem
      </Text>
      <TouchableHighlight
        className="ml-auto"
        onPress={() => setModalVisible(true)}
      >
        <View className="flex flex-row items-center gap-4 px-4 py-2 rounded bg-[#4dad4a]">
          <AntDesign name="plus" size={24} color="#ffffff" />
          <Text className="text-[#ffffff]">Adicionar Itens</Text>
        </View>
      </TouchableHighlight>
      <ScrollView className="mt-3">
        <View className="border border-gray-200 border-t-0 rounded-b-md">
          {stock.map((item, index) => (
            <View
              key={item.productId}
              className={`flex flex-row justify-between items-center py-2 px-4 ${
                index % 2 === 0 ? "bg-[#f3f4f6]" : "bg-white"
              }`}
            >
              <View className="flex flex-col">
                <Text className="flex-1 text-lg text-[#111827] font-semibold">
                  {item.productId}
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
                      `Você tem certeza que deseja remover o produto ${item.productId} da lista ?`,
                      [
                        {
                          text: "Não",
                          onPress: () => {},
                        },
                        {
                          text: "Sim",
                          onPress: () => removeProduct(item.productId),
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
                  elevation: 5, // Necessário para Android
                }}
                className="m-5 bg-white rounded-3xl p-9 items-center"
              >
                <Text>Hello World!</Text>
                <Pressable onPress={() => setModalVisible(!modalVisible)}>
                  <Text>Hide Modal</Text>
                </Pressable>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
}
