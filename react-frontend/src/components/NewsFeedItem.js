import styles from "./NewsFeedItem.module.css";
import placeholderNewsImg from "../assets/images/news.png";

const NewsFeedItem = (props) => {
  const { source, author, title, description, publishedAt, urlToImage, url } =
    props.itemData;

  const stringifiedPublishedDate = new Date(publishedAt).toLocaleDateString(
    undefined,
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );

  const fullArticleLinkElement = (
    <a
      className={styles.readArticleLink}
      href={url}
      target="_blank"
      rel="noreferrer"
    >
      Read Full Article
    </a>
  );

  return (
    <li className={styles.newsFeedItemContainer}>
      <div className={styles.topImageContainer}>
        <img
          className={
            urlToImage
              ? `${styles.topImage}`
              : `${styles.topImage} ${styles.placeholderImage}`
          }
          src={urlToImage ? urlToImage : placeholderNewsImg}
          alt={`for article titled ${title}`}
        />
      </div>

      {(source.name || author || publishedAt) && (
        <div className={styles.credentialsDateContainer}>
          <div className={styles.textContainer}>
            {source.name && (
              <p className={`${styles.smallText} ${styles.topRowSmallText}`}>
                {source.name}
              </p>
            )}
            {author && <p className={styles.smallText}>{author}</p>}
          </div>

          {publishedAt && (
            <div className={styles.textContainer}>
              <p className={`${styles.smallText} ${styles.topRowSmallText}`}>
                Published Date
              </p>
              <p className={styles.smallText}>{stringifiedPublishedDate}</p>
            </div>
          )}
        </div>
      )}

      {(title || description) && (
        <div className={`${styles.textContainer} ${styles.mainContent}`}>
          {title && <p className={styles.title}>{title}</p>}
          {description && (
            <p className={styles.description}>
              {`${description.slice(0, 100)}...`}
              {fullArticleLinkElement}
            </p>
          )}
          {!description && url && fullArticleLinkElement}
        </div>
      )}
    </li>
  );
};

export default NewsFeedItem;
