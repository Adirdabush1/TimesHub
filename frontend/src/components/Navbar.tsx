
const Navbar = () => {
  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#f3f3f3' }}>
      <h2>📰 ArticleStore</h2>
      <div>
        <input placeholder="Search articles" style={{ marginRight: '1rem' }} />
        <button>My Account</button>
      </div>
    </nav>
  );
};

export default Navbar;
