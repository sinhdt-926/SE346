import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useState, useEffect } from "react";
import {
  getPostsDB,
  addPostDB,
  getCommentsByPostDB,
  addCommentDB,
  currentUser,
} from "./database";

const getTimeAgo = (dateString) => {
  if (!dateString) return "";
  const past = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - past) / 1000);

  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minutes ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hours ago`;
  const days = Math.floor(hours / 24);
  return `${days} days ago`;
};

const PostCard = ({ item }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const loadComments = async () => {
    const c = await getCommentsByPostDB(item.id);
    setComments(c);
  };

  useEffect(() => {
    loadComments();
  }, []);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    const author = currentUser ? currentUser.name : "Anonymous";

    const exactTime = new Date().toISOString();

    await addCommentDB(item.id, author, newComment.trim(), exactTime);
    setNewComment("");
    await loadComments();
  };

  return (
    <View style={styles.postCard}>
      <View style={styles.postMeta}>
        <Text style={styles.authorText}>{item.author}</Text>
        <Text style={styles.dateText}>{item.date.split("T")[0]}</Text>
      </View>

      <Text style={styles.postTitle}>{item.title}</Text>

      <Text style={styles.postDescription}>{item.description}</Text>

      <View style={styles.commentSection}>
        <Text style={styles.commentHeader}>Comment</Text>
        {comments.map((c) => (
          <View key={c.id.toString()} style={styles.commentItem}>
            <Text style={styles.commentBody}>
              <Text style={styles.commentAuthor}>{c.author}: </Text>
              <Text style={styles.commentText}>{c.content}</Text>
            </Text>

            <Text style={styles.commentTime}>{getTimeAgo(c.date)}</Text>
          </View>
        ))}

        <View style={styles.commentInputRow}>
          <TextInput
            style={styles.commentInput}
            placeholder="Write a comment..."
            value={newComment}
            onChangeText={setNewComment}
          />
          <TouchableOpacity
            style={styles.commentBtn}
            onPress={handleAddComment}
          >
            <Text style={styles.commentBtnText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const HomeScreen = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const loadPosts = async () => {
    const p = await getPostsDB();
    setPosts(p);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handlePost = async () => {
    if (!title.trim() || !content.trim()) return;

    const author = currentUser ? currentUser.name : "Anonymous";
    const date = new Date().toISOString();

    await addPostDB(title.trim(), content.trim(), author, date);
    await loadPosts();
    setTitle("");
    setContent("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Create New Post</Text>

      <View style={styles.createPostBox}>
        <TextInput
          style={styles.inputTitle}
          placeholder="Title..."
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.inputContent}
          placeholder="What's on your mind?"
          multiline={true}
          numberOfLines={4}
          value={content}
          onChangeText={setContent}
        />
        <TouchableOpacity style={styles.button} onPress={handlePost}>
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: "500" }}>
            Post
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.headerTitle}>New Feed</Text>
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
  },

  authorText: { fontSize: 26, color: "#1877f2", fontWeight: "bold" },
  dateText: { fontSize: 12, color: "#65676b", marginTop: 2 },
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
    marginBottom: 15,
  },

  commentSection: {
    borderTopWidth: 1,
    borderTopColor: "#e4e6eb",
    paddingTop: 10,
  },

  commentHeader: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#65676b",
    marginBottom: 8,
  },

  commentItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
    backgroundColor: "#f0f2f5",
    padding: 10,
    borderRadius: 12,
  },

  commentBody: {
    flex: 1,
    marginRight: 10,
  },

  commentAuthor: {
    fontWeight: "bold",
    color: "#1c1e21",
  },

  commentText: {
    color: "#1c1e21",
    lineHeight: 20,
  },

  commentTime: {
    fontWeight: "normal",
    fontSize: 12,
    color: "#65676b",
    marginTop: 2,
  },

  commentInputRow: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 6,
    backgroundColor: "#f0f2f5",
  },
  commentBtn: {
    marginLeft: 10,
    backgroundColor: "#e4e6eb",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  commentBtnText: { fontWeight: "bold", color: "#050505" },
});
