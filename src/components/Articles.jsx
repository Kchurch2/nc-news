import { useEffect, useState} from "react";
import { Link, useParams} from "react-router-dom";
import { getArticles } from "../utils/api";

const Articles = () => {
    const { topic } = useParams()
    const [Articles, setArticles] = useState([{}])
    const [ChosenSort, setChosenSort] = useState("created_at") 
    const [Pagination, setPagination] = useState(10) 
    useEffect(() => {
        getArticles(topic, ChosenSort, Pagination).then((articleList) => {
            if(articleList.length >0) {
            setArticles(articleList)
            } 
        })
    }, [Articles, topic, ChosenSort, Pagination])
    return (
        <div>
        <h2> {topic ? topic[0].toUpperCase() + topic.substring(1,): "All"} Articles </h2>
        <section className ="filter-bar"> 
            <select id="filter-pages"
                name="filter-pages"
                onChange={(e) => {
                    e.preventDefault();
                    setPagination(e.target.value);
                }}>
                <option selected value="10" >View 10</option>      
                <option value="20" >View 20</option>           
                <option value="100">View 100</option>
            </select>
            <select id="sort-by"
                name="sort-by"
                onChange={(e) => {
                    e.preventDefault();
                    setChosenSort(e.target.value);
                }}>
                <option value="created_at" selected> View Most Recent</option>
                <option value="comment_count" >View Most Commented</option>      
                <option value="votes" >View Most Popular</option>           
            </select>
        </section>
        <ul className = "article-list">
        {Articles.map((article) => {
            return (
            <section className ="article-box">    
            <Link to={`/article/${article.article_id}`} key={article.id}>
            <h2>{article.title}</h2> 
            <p>{article.topic}</p> 
            <p>{new Date(article.created_at).toUTCString()}</p> 
            <p>{article.author}</p> 
            <p> Votes: {article.votes}, Comments: {article.comment_count}</p> 
            </Link> 
            </section>
            )
        })}
        </ul>
        </div>
    )
    
}

export default Articles;