

type Props = {
  title: string;
  preview: string;
  price: number;
};

const ArticleCard = ({ title, preview, price }: Props) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
      <h3>{title}</h3>
      <p>{preview}...</p>
      <button>🔓 Read for only ₪{price}</button>
    </div>
  );
};

export default ArticleCard;
