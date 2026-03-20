import { View, StyleSheet, Text, FlatList } from "react-native";

const MOCK_POSTS = [
  {
    id: "1",
    author: "Alice",
    title: "Kết của Jujutsu Kaisen",
    description: "Có ai thấy buồn với cái kết mới đây của Jujutsu Kaisen không",
    date: "2023-10-25",
  },
  {
    id: "2",
    author: "Bob",
    title: "Tìm người đi chơi Halloween",
    description: "Cần tìm người đi chơi chung tối ngày Halloween",
    date: "2023-10-27",
  },
  {
    id: "3",
    author: "Charlie",
    title: "Tìm việc liên quan tới UI Designer",
    description:
      "Tôi đã có 5 năm kinh nghiệm làm UI Designer và hiện tại đang muốn tìm kiếm bến đỗ mới",
    date: "2023-10-26",
  },
  {
    id: "4",
    author: "Mark",
    title: "Thông báo tuyển nhân sự cho Meta",
    description:
      "Meta đang cần tuyển thêm 20 lập trình viên ở các vị trí Frontend, Backend và Fullstack. Nếu cần liên hệ về thông tin tuyển dụng hãy liên hệ tôi",
    date: "2023-10-31",
  },
  {
    id: "5",
    author: "Laura",
    title: "Tìm người đi chơi ngày giao thừa",
    description: "Mình cần tìm bạn nữ đi chơi đêm giao thừa với mình ở TPHCM",
    date: "2023-12-28",
  },
];

const HomeScreen = () => {
  const sortedPosts = [...MOCK_POSTS].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  const renderPost = ({ item }) => (
    <View style={styles.postCard}>
      <Text style={styles.postTitle}>{item.title}</Text>
      <View style={styles.postMeta}>
        <Text style={styles.authorText}>{item.author}</Text>
        <Text style={styles.dateText}>{item.date}</Text>
      </View>
      <Text style={styles.postDescription}>{item.description}</Text>
    </View>
  );
  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Recent Posts</Text>
      <FlatList
        data={sortedPosts}
        keyExtractor={(item) => item.id}
        renderItem={renderPost}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f2f5",
    paddingHorizontal: 15,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 50,
    marginBottom: 20,
    color: "#1c1e21",
  },
  postCard: {
    backgroundColor: "#ffffff",
    padding: 18,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  postTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#050505",
    marginBottom: 8,
  },
  postMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e4e6eb",
  },
  authorText: {
    fontSize: 14,
    color: "#65676b",
    fontWeight: "500",
  },
  dateText: {
    fontSize: 14,
    color: "#65676b",
  },
  postDescription: {
    fontSize: 16,
    color: "#1c1e21",
    lineHeight: 24,
  },
});
