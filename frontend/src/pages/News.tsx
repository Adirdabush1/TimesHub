import NewsFeed from "../components/NewsFeed";
import { useUser } from "../components/UserContext"; // ודא שזה הנתיב הנכון

const News = () => {
  const { user } = useUser();
  return <NewsFeed user={user} />;
};

export default News;
