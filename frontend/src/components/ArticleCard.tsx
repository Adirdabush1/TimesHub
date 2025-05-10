type Props = {
  title: string;
  preview: string;
  price: number;
  onClick?: () => void;
};

const ArticleCard = ({ title, preview, price, onClick }: Props) => {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "1rem",
        marginBottom: "1rem",
      }}
    >
      <h3>{title}</h3>
      <p>{preview}...</p>
      <button onClick={onClick}>🔓 Read for only ₪{price}</button>
    </div>
  );
};

export default ArticleCard;
