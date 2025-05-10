import "./ArticleCard.css";

type Props = {
  title: string;
  preview: string;
  price: number;
  imageUrl: string;
  onClick?: () => void;
};

const ArticleCard = ({ title, preview, price, imageUrl, onClick }: Props) => {
  return (
    <div className="article-card">
      <img src={imageUrl} alt={title} className="card-image" />
      <h3 className="card-title">{title}</h3>
      <p className="card-preview">{preview}...</p>
      <button onClick={onClick} className="card-button">
        Read me
      </button>
    </div>
  );
};

export default ArticleCard;
