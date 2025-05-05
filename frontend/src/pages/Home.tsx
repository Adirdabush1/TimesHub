import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import ArticleCard from '../components/ArticleCard';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div>
      <Navbar />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <main style={{ flex: 1, padding: '1rem' }}>
          <h2>Available Articles</h2>
          <ArticleCard title="Introduction to TypeScript" preview="TypeScript is a typed superset of JavaScript that helps developers write safer code." price={10} />
          <ArticleCard title="5 Ways to Profit from Content Writing" preview="Content writing can become a highly profitable business with the right tools." price={8} />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
