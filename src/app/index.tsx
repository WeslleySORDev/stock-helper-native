import {
  Text,
  ScrollView,
  View,
  TouchableHighlight,
  SafeAreaView,
  StatusBar,
  Alert,
  Modal,
  TouchableWithoutFeedback,
  TextInput,
  Button,
} from "react-native";
import { useStockCount } from "../hooks/useStockCount";
import { useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Link } from "expo-router";

export default function Index() {
  const [modalVisible, setModalVisible] = useState(false);
  const { stockCountList, createStockCount } = useStockCount();
  const [newStockCountName, setNewStockCountName] = useState("");

  return (
    <SafeAreaView className="flex-1 p-5 bg-[#f9fafb]">
      <StatusBar backgroundColor="#4f46e5" barStyle="light-content" />
      <TouchableHighlight
        className="ml-auto"
        onPress={() => setModalVisible(true)}
      >
        <View className="flex flex-row items-center gap-4 px-4 py-2 rounded bg-[#4dad4a]">
          <AntDesign name="plus" size={24} color="#ffffff" />
          <Text className="text-[#ffffff]">Nova contagem de estoque</Text>
        </View>
      </TouchableHighlight>
      <ScrollView className="my-4" contentContainerStyle={{ flexGrow: 1 }}>
        {stockCountList && stockCountList.length > 0 ? (
          stockCountList.map((stockCount) => (
            <Link
              href={`/stockCount/${stockCount.stockId}`}
              key={stockCount.stockId}
            >
              <View className="flex flex-col gap-4 w-full p-2 border border-zinc-500 rounded">
                <Text className="text-xl font-semibold capitalize">
                  {stockCount.stockName}
                </Text>
                <Text>
                  Quantidade de itens: {stockCount.stockProducts.length}
                </Text>
              </View>
            </Link>
          ))
        ) : (
          <View className="flex flex-1 justify-center items-center">
            <Text className="text-center">
              Nenhuma contagem de estoque foi criada, crie uma acima!
            </Text>
          </View>
        )}
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
                  onChangeText={setNewStockCountName}
                  value={newStockCountName}
                  placeholder="Nome da nova contagem de estoque"
                  keyboardType="default"
                />
                <Button
                  title="Adicionar"
                  onPress={() => {
                    if (newStockCountName !== "") {
                      createStockCount(newStockCountName);
                      setNewStockCountName("");
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
