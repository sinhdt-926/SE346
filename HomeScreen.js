import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import { useState, useEffect } from "react";
import { getPostsAPI, createPostAPI, currentUser } from "./api";

const getTimeAgo = (dateString) => {
  if (!dateString) return "";
  const past = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - past) / 1000);

  if (seconds < 60) return "vừa xong";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} phút trước`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} giờ trước`;
  const days = Math.floor(hours / 24);
  return `${days} ngày trước`;
};

const PostCard = ({ item }) => {
  return (
    <View style={styles.postCard}>
      <View style={styles.postMeta}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={require("./assets/images.png")}
            style={styles.authorAvatar}
          />
          <Text style={styles.authorText}>
            {item.creator_name || "Unknown User"}
          </Text>
        </View>
        <Text style={styles.dateText}>
          {item.created_at ? getTimeAgo(item.created_at) : "N/A"}
        </Text>
      </View>

      <Text style={styles.postTitle}>{item.title}</Text>

      <Text style={styles.postDescription}>{item.description}</Text>
    </View>
  );
};

const HomeScreen = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const loadPosts = async () => {
    const p = await getPostsAPI();
    setPosts(p);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handlePost = async () => {
    if (!title.trim() || !content.trim()) return;

    try {
      const email = currentUser ? currentUser.email : "anonymous@mail.com";
      await createPostAPI(title.trim(), content.trim(), email);
      await loadPosts();
      setTitle("");
      setContent("");
    } catch (err) {
      alert("Đăng bài thất bại!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Tạo bài viết mới</Text>

      <View style={styles.createPostBox}>
        <TextInput
          style={styles.inputTitle}
          placeholder="Tiêu đề..."
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.inputContent}
          placeholder="Bạn đang nghĩ gì?"
          multiline={true}
          numberOfLines={4}
          value={content}
          onChangeText={setContent}
        />
        <TouchableOpacity style={styles.button} onPress={handlePost}>
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: "500" }}>
            Đăng bài
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.headerTitle}>Bảng tin</Text>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <PostCard item={item} />}
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
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 10,
    color: "#1c1e21",
  },
  createPostBox: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 2,
  },
  inputTitle: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
    fontWeight: "bold",
  },
  inputContent: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
    minHeight: 80,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#1877f2",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  postCard: {
    backgroundColor: "#ffffff",
    padding: 18,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3,
  },
  postMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    alignItems: "center",
  },
  authorAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 8,
  },
  authorText: {
    fontSize: 16,
    color: "#1877f2",
    fontWeight: "bold",
  },
  dateText: {
    fontSize: 12,
    color: "#65676b",
    marginTop: 2,
  },
  postTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#050505",
    marginBottom: 8,
  },
  postDescription: {
    fontSize: 16,
    color: "#1c1e21",
    lineHeight: 24,
  },
});
